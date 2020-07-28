# -*- coding: utf-8 -*-

from elasticsearch import Elasticsearch

es_conn = Elasticsearch('52.78.186.240:8010')


def get_es_conn():
    print('[Flask Application] - GET ELASTICSEARCH CONNECTION')
    return es_conn
