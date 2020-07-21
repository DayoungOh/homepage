# -*- coding: utf-8 -*-
import os

from flask import *

app = Flask(__name__)

cur_dir = os.path.dirname(__file__)

app.config['JSON_AS_ASCII'] = False

# load views (circular import)
from .views import routes, apis

routes, apis  # DO NOT REMOVE THIS! This is to avoid PyCharm's auto-reformat
