# -*- coding: utf-8 -*-

from flask import render_template
from packus.web.application import app


@app.route('/')
@app.route('/index')
def index():
    menu = 'dashboard'
    return render_template('index.html', menu=menu)

@app.route('/segments')
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

@app.route('/rfm')
@app.route('/rfm/model')
def model():
    menu = 'model'
    return render_template('index.html', menu=menu)

@app.route('/rfm/cluster')
def cluster():
    menu = 'cluster'
    return render_template('index.html', menu=menu)

@app.route('/event')
@app.route('/event/upjong')
def upjong():
    menu = 'upjong'
    return render_template('index.html', menu=menu)

@app.route('/event/area')
def area():
    menu = 'area'
    return render_template('index.html', menu=menu)

@app.route('/event/total')
def total():
    menu = 'total'
    return render_template('index.html', menu=menu) 

@app.route('/event/okpos')
def okpos():
    menu = 'okpos'
    return render_template('index.html', menu=menu)   

@app.route('/event/ncafe')
def ncafe():
    menu = 'ncafe'
    return render_template('index.html', menu=menu)    

@app.route('/event/sms')
def sms():
    menu = 'sms'
    return render_template('index.html', menu=menu)   

@app.route('/event/ad/catalog')
def catalog():
    menu = 'catalog'
    return render_template('index.html', menu=menu)

@app.route('/event/ad/sample')
def sample():
    menu = 'sample'
    return render_template('index.html', menu=menu)

@app.route('/event/ad/order')
def order():
    menu = 'order'
    return render_template('index.html', menu=menu)


@app.route('/event/shop')
def shop():
    menu = 'shop'
    return render_template('index.html', menu=menu)    

@app.route('/test/map')
def test_map():
    return render_template('test/map.html') 

@app.route('/test/simple')
def test_simple_map():
    return render_template('test/simple.html')        
