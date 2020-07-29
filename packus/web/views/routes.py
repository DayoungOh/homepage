# -*- coding: utf-8 -*-

from flask import render_template
from packus.web.application import app


@app.route('/')
@app.route('/index')
def index():
    menu = 'dashboard'
    return render_template('index.html', menu=menu)


@app.route('/segments/segments')
def segments():
    menu = 'segments'
    return render_template('index.html', menu=menu)

@app.route('/segments/seg_reports')
def seg_reports():
    menu = 'seg_reports'
    return render_template('index.html', menu=menu)


@app.route('/dashboard')
def dashboard():
    menu = 'dashboard'
    return render_template('index.html', menu=menu)

@app.route('/model')
def model():
    menu = 'model'
    return render_template('index.html', menu=menu)
