# -*- coding: utf-8 -*-

from flask import jsonify, request
import pandas as pd
from elasticsearch import Elasticsearch
from packus.web.application import app
from packus.web.config import get_es_conn

index = 'segments'
upjong_index = 'packus-upjong'


@app.route('/api/segments/list')
def get_segments_list():
    """세그먼트 리스트 가져오기
    """
    # es = app.es_conn
    # es = Elasticsearch('52.78.186.240:8010')
    es = get_es_conn()
    body = {
        "from": 0,
        "size": 100,
        "query": {"match_all": {}},  # 모든 데이터 가져오기
        # "query": {"match":{"category":"1234"}} # {"category":"1234"}인 데이터 가져오기
    }
    raw = es.search(index=index, body=body)
    data = [{'id': item['_id'], 'data': item['_source']}
            for item in raw['hits']['hits']]
    return jsonify(data)


@app.route('/api/segments/put', methods=['POST'])
def put_segments_doc():
    """ segments 인덱스에 document를 입력
    key: age, sexfl, upjong, sales
    :return: 입력 상태와 입력된 document의 id
    """
    # es = Elasticsearch('52.78.186.240:8010')
    body = {**request.form}
    es = get_es_conn()
    print('[Flask Application] 세그먼트 입력 완료: ', body)
    resp = es.index(index=index, body=body)
    return jsonify({'status': resp['_shards'], 'id': resp['_id']})


@app.route('/api/segments/delete', methods=['POST'])
def delete_segments_doc():
    """ segments 인덱스에 document의 id를 받아 삭제
    :return: 삭제 상태
    """
    # es = Elasticsearch('52.78.186.240:8010')
    seg_id = request.form['id']
    es = get_es_conn()
    print('[Flask Application] 세그먼트 삭제 완료: ', id)
    resp = es.delete(index=index, id=seg_id)

    return jsonify({'status': resp['_shards']})


@app.route('/api/upjong/list')
def get_upjong_list():
    """업종 리스트 가져오기
    """
    es = get_es_conn()
    body = {
        "from": 0,
        "size": 1000,
        "query": {"match_all": {}},
    }
    raw = es.search(index=upjong_index, body=body)
    data = [{'id': item['_id'], 'data': item['_source']}
            for item in raw['hits']['hits']]
    return jsonify(data)


@app.route('/api/segments/dashboard-data', methods=['POST'])
def get_segments_data():
    """세그먼트 대시보드를 위한 데이터 가져오기
    자세한 사용 방법은 README 참고
    """
    search_cond_list = request.json['search_cond_list']
    
    es = get_es_conn()
    chart1_data = []
    chart2_data = []
    table_data = []
    chart3_data = []
    total_data = es.search(
        index="packus-ecommerce-*",
        _source=['n_memno'],
        body={
            "size": 0,
            "aggs": {
                "total_mem_count": {
                    "cardinality": {
                        "field": "n_memno"
                    }
                }
            }
        }
    )
    total_mem_count = total_data['aggregations']['total_mem_count']['value']
    print('===전체 멤버 수: ', total_mem_count)
    for search_cond in search_cond_list:
        datefrom = search_cond['datefrom']
        dateto = search_cond['dateto']
        upjong3_nm = search_cond['upjong3_nm'].split(',')
        sales_cond = search_cond['sales_cond'].split(',')
        body = {
            'query': {
                'bool': {
                    'must':  [
                        {
                            'bool': {
                                'should': [
                                    {'match': {'upjong3_nm': item}} for item in upjong3_nm
                                ]
                            }
                        }
                    ],
                    'filter': [{
                        "range": {
                            "regdt": {
                                "gte": datefrom,
                                "lte": dateto
                            }
                        }
                    }]

                }
            },
            'aggs': {
                'data': {
                    'terms': {
                        'field': 'n_memno',
                        "size": 100000,
                    },
                    'aggs': {
                        'sales_sum': {
                            'sum': {
                                'field': 'totalgoodsprice'
                            },
                        },
                        'recency': {
                            'avg': {
                                'field': 'recency'
                            },
                        },
                        'frequency': {
                            'avg': {
                                'field': 'frequency'
                            },
                        },
                        'monetary': {
                            'avg': {
                                'field': 'monetary'
                            },
                        },
                    }
                }

            }
        }
        data = es.search(
            index="packus-ecommerce-*",
            body=body
        )

        re = [{'n_memno': item['key'],
               'sales': item['sales_sum']['value'],
               'recency': item['recency']['value'],
               'monetary': item['monetary']['value'],
               'frequency': item['frequency']['value']}
              for item in data['aggregations']['data']['buckets']
              if sales_validator(sales_cond, item['sales_sum']['value'])]

        chart1_data.append(len(re))
        chart2_data.append(round(len(re)/total_mem_count* 100, 2))

        if len(re) > 0:
            df = pd.DataFrame(re)
            df.fillna(0, inplace=True)
            table_data.append({
                'mem_count': len(re),
                'recency': round(df['recency'].mean(), 0),
                'monetary': round(df['monetary'].mean(), 0),
                'frequency': round(df['frequency'].mean(), 1),
            })
            df['recency_g'] = df['recency'].apply(recency_by)
            df['frequency_g'] = df['frequency'].apply(frequency_by)
            df['monetary_g'] = df['monetary'].apply(monetary_by)

            df_r = df[['n_memno', 'recency_g']].groupby('recency_g').count()
            df_f = df[['n_memno', 'frequency_g']].groupby('frequency_g').count()
            df_m = df[['n_memno', 'monetary_g']].groupby('monetary_g').count()

            dict_r = df_r.to_dict()['n_memno']
            li_r = [68,136,204,272,340,408,476,544,612,680,748,816,884,952,1020,1088,1156,1224]
            li_r_str = [ "< " + str(i) for i in li_r]
            li_r_str.append(str(li_r[-1]) + " 이상" )
            
            dict_f = df_f.to_dict()['n_memno']
            li_f = [3, 5, 7, 9, 11, 21]
            li_f_str = [ "< " + str(i) for i in li_f]
            li_f_str.append(str(li_f[-1]) + " 이상" )
            
            dict_m = df_m.to_dict()['n_memno']
            li_m = [215000, 385000, 555000, 725000, 895000, 1065000, 1235000,
            1405000, 1575000, 1745000, 1915000, 2085000, 2255000]
            li_m_str = [ "< " + str(i) for i in li_m]
            li_m_str.append(str(li_m[-1]) + " 이상" )
            
            chart3_data.append({
                'recency': {'label': li_r_str, 'data': [ (dict_r[i] if i in dict_r else 0) for i in li_r_str]},
                'frequency': {'label': li_f_str, 'data': [ (dict_f[i] if i in dict_f else 0) for i in li_f_str]},
                'monetary': {'label': li_m_str, 'data': [ (dict_m[i] if i in dict_m else 0) for i in li_m_str]},
            })
        else:
            table_data.append({
                'mem_count': 0,
                'recency': 0,
                'monetary': 0,
                'frequency': 0,
            })
            li_r = [68,136,204,272,340,408,476,544,612,680,748,816,884,952,1020,1088,1156,1224]
            li_r_str = [ "< " + str(i) for i in li_r]
            li_f = [3, 5, 7, 9, 11, 21]
            li_f_str = [ "< " + str(i) for i in li_f]
            li_m = [215000, 385000, 555000, 725000, 895000, 1065000, 1235000,
            1405000, 1575000, 1745000, 1915000, 2085000, 2255000]
            li_m_str = [ "< " + str(i) for i in li_m]
            chart3_data.append({
                'recency': {'label': li_r_str, 'data': [0] * len(li_r_str)},
                'frequency': {'label': li_f_str, 'data': [0] * len(li_f_str)},
                'monetary': {'label': li_m_str, 'data': [0] * len(li_m_str)},
            }) 
    return jsonify({
        'chart1': chart1_data,
        'chart2': chart2_data,
        'table': table_data,
        'chart3': chart3_data
    })


def sales_validator(sales_cond, sales):
    """get_segments_data에서 사용되는 함수
    """
    i = 0
    for cond in sales_cond:
        if cond == '100만원 이상':
            i += (sales >= 1000000)
        elif cond == '50 - 100만원':
            i += (sales >= 500000 and sales < 1000000)
        elif cond == '30 - 50만원':
            i += (sales >= 300000 and sales < 500000)
        elif cond == '15 - 30만원':
            i += (sales >= 150000 and sales < 300000)
        elif cond == '5 - 15만원':
            i += (sales >= 50000 and sales < 150000)
        elif cond == '5만원 미만':
            i += (sales < 50000)
    return i > 0


def recency_by(x):
    """get_segments_data에서 사용되는 함수
    """
    li = [68, 136, 204, 272, 340, 408, 476, 544, 612,
          680, 748, 816, 884, 952, 1020, 1088, 1156, 1224]
    for i in li:
        if x < i:
            return "< " + str(i)
    return str(i) + "이상"


def frequency_by(x):
    """get_segments_data에서 사용되는 함수
    """
    li = [3, 5, 7, 9, 11, 21]
    for i in li:
        if x < i:
            return "< " + str(i)
    return str(i) + " 이상"


def monetary_by(x):
    """get_segments_data에서 사용되는 함수
    """
    li = [215000, 385000, 555000, 725000, 895000, 1065000, 1235000,
          1405000, 1575000, 1745000, 1915000, 2085000, 2255000]
    for i in li:
        if x < i:
            return "< " + str(i)
    return str(i) + " 이상"
