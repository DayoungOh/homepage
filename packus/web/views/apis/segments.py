# -*- coding: utf-8 -*-

from flask import jsonify, request
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
    data = [{'id': item['_id'], 'data': item['_source']} for item in raw['hits']['hits']]
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
    data = [{'id': item['_id'], 'data': item['_source']} for item in raw['hits']['hits']]
    return jsonify(data)