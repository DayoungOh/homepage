# -*- coding: utf-8 -*-
import os

from flask import *
from elasticsearch import Elasticsearch
from packus.web.config import get_es_conn
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

cur_dir = os.path.dirname(__file__)

app.es_conn = get_es_conn()

@app.before_first_request
def prepare_session():
    app.es_conn = Elasticsearch('52.78.186.240:8010')


@app.teardown_appcontext
def shutdown_session(exception=None):
    try:
        app.es_conn.close()
    except:
        pass


# load views (circular import)
from .views import routes, apis

routes, apis  # DO NOT REMOVE THIS! This is to avoid PyCharm's auto-reformat
