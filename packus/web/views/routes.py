# -*- coding: utf-8 -*-

from flask import render_template
from packus.web.application import app


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/segments')
def segments():
    return render_template('segments.html')

