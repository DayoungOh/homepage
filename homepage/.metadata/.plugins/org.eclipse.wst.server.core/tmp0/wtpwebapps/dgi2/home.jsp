<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%><%

    String region = "경상북도";
    String period = "2020년 07월";
    String megacd = "47";
    
%>
<!DOCTYPE html>
<html lang="ko">
<head>

    <!-- Required meta tags -->
    <meta charset="euck-kr">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>데이터 기반 정책지원시스템</title>

    <!-- vendor css -->
    <link href="lib/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet">
    <link href="lib/ionicons/css/ionicons.min.css" rel="stylesheet">
    <link href="http://themepixels.me/demo/dashforge1.1/lib/select2/css/select2.min.css" rel="stylesheet">
    <link href="http://www.nicebizmap.co.kr/assets/js/plugins/sweetalert2/sweetalert2.min.css" rel="stylesheet" id="theme-styles">

	<!-- leaflet css -->
	<link rel="stylesheet" href="assets/css/leaflet/leaflet.css" />

    <!-- DashForge CSS -->
    <link rel="stylesheet" href="assets/css/dashforge.css">
    <link rel="stylesheet" href="assets/css/dashforge.nice.css">

</head>
<body>

    <%@ include file = "navbar.jsp" %>

    <div class="content content-fixed">
		<div class="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
			<div class="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30">
	        	<div>
	            	<nav aria-label="breadcrumb">
	              		<ol class="breadcrumb breadcrumb-style1 mg-b-10">
	                		<li class="breadcrumb-item">Home</li>
	                		<li class="breadcrumb-item active" aria-current="page">Dashboard</li>
	              		</ol>
	            	</nav>
	            	<h4 class="mg-b-0 tx-spacing--1">데이터로 보는 <b><%= region %></b> 현황 <span class="tx-color-03 tx-14">(<%= period %>)</span></h4>
	          	</div>
				<%@ include file = "print.jsp" %>
	        </div>
	        
	    	<%@ include file = "header.jsp" %>

        	<div class="row row-xs">
          		<div class="col-print col-sm-6 col-lg-4 mg-t-10 mg-sm-t-0">
            		<div class="card card-body">
              			<h6 class="tx-uppercase tx-14 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">기업매출</h6>
              			<div class="d-flex d-lg-block d-xl-flex align-items-end">
                			<h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">{12,500}억</h3>
                			<p class="tx-12 tx-color-03 mg-b-0"><span class="tx-medium tx-success">{10}% <i class="icon ion-md-arrow-up"></i></span> 전월대비</p>
              			</div>
            		</div>
          		</div><!-- col -->
          		<div class="col-print col-sm-6 col-lg-4 mg-t-10 mg-sm-t-0">
            		<div class="card card-body">
              			<h6 class="tx-uppercase tx-14 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">소상공인매출</h6>
              			<div class="d-flex d-lg-block d-xl-flex align-items-end">
                			<h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">{7,500}억</h3>
                			<p class="tx-12 tx-color-03 mg-b-0"><span class="tx-medium tx-danger">{5}% <i class="icon ion-md-arrow-down"></i></span> 전월대비</p>
              			</div>
            		</div>
          		</div><!-- col -->
		        <div class="col-print col-sm-6 col-lg-4 mg-t-10 mg-lg-t-0">
		            <div class="card card-body">
		              	<h6 class="tx-uppercase tx-14 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">주거인구</h6>
		              	<div class="d-flex d-lg-block d-xl-flex align-items-end">
		                	<h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">{302}만명</h3>
		                	<p class="tx-12 tx-color-03 mg-b-0"><span class="tx-medium tx-success">{1}% <i class="icon ion-md-arrow-up"></i></span> 전월대비</p>
		              	</div>
		            </div>
		        </div><!-- col -->
          		<div class="col-print col-sm-6 col-lg-4 mg-t-10 mg-lg-t-10">
            		<div class="card card-body">
            			<h6 class="tx-uppercase tx-14 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">기업일자리</h6>
            			<div class="d-flex d-lg-block d-xl-flex align-items-end">
            				<h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">{340,120}명</h3>
            				<p class="tx-12 tx-color-03 mg-b-0"><span class="tx-medium tx-success">{17}% <i class="icon ion-md-arrow-up"></i></span> 전월대비</p>
            			</div>
            		</div>
            	</div><!-- col -->
            	<div class="col-print col-sm-6 col-lg-4 mg-t-10 mg-lg-t-10">
            		<div class="card card-body">
            			<h6 class="tx-uppercase tx-14 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">유입인구 소비</h6>
            			<div class="d-flex d-lg-block d-xl-flex align-items-end">
            				<h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">{2,600}만건</h3>
            				<p class="tx-12 tx-color-03 mg-b-0"><span class="tx-medium tx-danger">{7}% <i class="icon ion-md-arrow-down"></i></span> 전월대비</p>
            			</div>
            		</div>
            	</div><!-- col -->
            	<div class="col-print col-sm-6 col-lg-4 mg-t-10 mg-lg-t-10">
            		<div class="card card-body">
            			<h6 class="tx-uppercase tx-14 tx-spacing-1 tx-color-02 tx-semibold mg-b-8">주거인구소득</h6>
            			<div class="d-flex d-lg-block d-xl-flex align-items-end">
            				<h3 class="tx-normal tx-rubik mg-b-0 mg-r-5 lh-1">{305}만원</h3>
            				<p class="tx-12 tx-color-03 mg-b-0"><span class="tx-medium tx-success">{7}% <i class="icon ion-md-arrow-up"></i></span> 전반기대비</p>
            			</div>
            		</div>
            	</div><!-- col -->
            </div><!-- row -->

	        <div class="row row-xs">
	        	<div class="col-lg-12 col-xl-12 mg-t-10">
	        		<div class="card">
	        			<div class="card-body pos-relative pd-0">
	        				<div id="map" style="background: #ffffff; height: 484px; width: 100%;"></div>
<!-- 	        				<iframe src="map.jsp" frameborder="0" style="width: 100%; height: 500px;" ></iframe> -->
	        			</div><!-- card-body -->
	        		</div><!-- card -->
	        	</div>
	        </div><!-- row -->
      	</div><!-- container -->
    </div><!-- content -->

    <script src="lib/jquery/jquery.min.js"></script>
    <script src="lib/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="lib/feather-icons/feather.min.js"></script>
    <script src="lib/perfect-scrollbar/perfect-scrollbar.min.js"></script>
    <script src="lib/chart.js/Chart.bundle.min.js"></script>
    <script src="http://themepixels.me/demo/dashforge1.1/lib/select2/js/select2.min.js"></script>
    <script src="http://www.nicebizmap.co.kr/assets/js/plugins/sweetalert2/sweetalert2.min.js"></script>
    <script src="http://www.nicebizmap.co.kr/assets/js/plugins/sweetalert2/polyfill.js"></script>
    
	<script type="text/javascript" src="assets/js/leaflet/leaflet.js"></script>
	<script type="text/javascript" src="assets/js/leaflet/proj4.js"></script>
	<script type="text/javascript" src="assets/js/leaflet/proj4leaflet.js"></script>
	
	<script>
    var _mega_cd_ = '<%= megacd %>';
	</script>

    <script src="assets/js/dashforge.js"></script>
    <script src="assets/js/dashforge.nice.js"></script>
	<script>

	$(function(){
		'use strict'

		// 선택 메뉴 활성화
		setNavbarMenu(0);

	});
	
	// * ------------------------------------------------------------------------------------------
    // * 지도 시작
    // * ------------------------------------------------------------------------------------------
	
	var geojson;
	var ip = '10.81.100.131';

	function getColor(d) {
	    return d > 6000 ? '#800026' :
	           d > 5000 ? '#BD0026' :
	           d > 4000 ? '#E31A1C' :
	           d > 3000 ? '#FC4E2A' :
	           d > 2000 ? '#FD8D3C' :
	           d > 1000 ? '#FEB24C' :
	           d >    0 ? '#69b2f8' :
	                      '#fdfdfd' ;
	}

	// 선택 가능 feature 스타일
	const activeStyle = {
		fillColor: '#0168fa',
		fillOpacity: 0.5,
		color: '#ffffff',
		weight: 1,
		opacity: 1,
		dashArray: ''
	}

	const highlightStyle = {
		fillColor: '#ffda1a',
		fillOpacity: 0.8,
		color: '#ffffff',
		weight: 1,
		opacity: 1,
		dashArray: ''
	}

	// 선택 불가능 feature 스타일
	const inactiveStyle = {
		fillColor: '#8392a5',
		fillOpacity: 0.5,
		color: '#ffffff',
		weight: 1,
		opacity: 1,
		dashArray: ''
	}

	// 최초 스타일 세팅
	function setStyle(feature) {

		var style;
	    if (feature.properties.MEGA_CD == _mega_cd_) {
	    	style = activeStyle;
	    } else {
	    	style = inactiveStyle;
	    }

	    return style;
	}

	function zoomToFeature(e) {
//	 	map.fitBounds(e.target.getBounds());
	}

	// add layer-event-listener
	function onEachFeature(feature, layer) {

		// 활성화 지역만 이벤트 등록
		if (feature.properties.MEGA_CD == _mega_cd_) {
		    layer.on({
		        mouseover: highlightFeature,
		        mouseout: resetHighlight,
		        click: clickToFeature
		    });
		}
	}

	// mouseover event-lestener
	var popup;
	function highlightFeature(e) {

		// 현재 마우스오버 레이어 스타일 적용
		e.target.setStyle(highlightStyle);

		// 현재 마우스오버 레이어 팝업 띄우기
		popup = L.popup();
	    popup.setLatLng(e.latlng)
	    	.setContent(e.target.feature.properties.CTY_NM)
	    	.openOn(map);

	    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
	    	e.target.bringToFront();
	    }
	}

	// mouseout event-lestener
	function resetHighlight(e) {

		// 선택된 레이어가 없으면 현재 마우스오버 레이어 스타일 초기화
		if (selectedLayer === null)
			e.target.setStyle(activeStyle);
		// 선택된 레이어가 있으며 현재 마우스오버 레이어와 선택된 레이어가 다르면 스타일 초기화
		else if (selectedLayer.target.feature.properties.CTY_CD != e.target.feature.properties.CTY_CD)
			e.target.setStyle(activeStyle);
		
		popup.onRemove(map);

	    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
	    	e.target.bringToFront();
	    }
	}

	var selectedLayer = null;
	function clickToFeature(e) {

		// 이전 선택 레이어 스타일 초기화
		if (selectedLayer != null)
			selectedLayer.target.setStyle(activeStyle);

		// 현재 선택 레이어 스타일 적용
		e.target.setStyle(highlightStyle);
		
		// 현재 선택 레이어 정보 저장
		selectedLayer = e;

		// 현재 선택 레이어 팝업 띄우기
		popup = L.popup();
	    popup.setLatLng(e.latlng)
	    	.setContent(e.target.feature.properties.CTY_NM)
	    	.openOn(map);

	    // selectbox option change
	    changeSelectBox(e);
	}

	function changeSelectBox(e) {
		var cty_cd = e.target.feature.properties.CTY_CD;
		
	    parent.$('.select2-region').val(cty_cd);
	    parent.$('.select2-region').select2().trigger('change');
		
	}


	var map,
	polygon,
	EPSG0000 = '+proj=tmerc +lat_0=38.0 +lon_0=128.0 +x_0=400000.0 +y_0=600000.0 +k=0.9999 +ellps=bessel +a=6377397.155 +b=6356078.9628181886 +units=m +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43',
	EPSG4326 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs' ;

	// EPSG0000 -> EPSG4326 경위도 좌표계(WGS84)
	//var new_center = proj4(EPSG0000, EPSG4326, [238418, 92335]);
	map = L.map('map', {
	center: [35.86, 127.14],
	minZoom: 8,
	maxZoom: 13
	});
	//map.scrollWheelZoom.disable();

	var bizmapUrl = 'http://map.nicebizmap.co.kr:38080/TileMap/{z}/{y}/{x}.png';
	L.tileLayer(bizmapUrl, { attribution: "Map data www.nicebizmap.co.kr", maxZoom: 13, minZoom: 8 }).addTo(map);


	var data, geojson_nm, response;
	$.ajax({
		type     : 'post',
		url      : '/dgi/tbshp_cty_tk.geojson',
		dataType : 'json',
		async    : false,
		success  : function(response, status, request) {

			// 전역변수
			geojson_nm = response.name;

			// filter
			tk = response.features.filter(function(feature) {
				var mega_cd = feature.properties.MEGA_CD
		
				if (mega_cd == 27 || mega_cd == 47) return feature.properties.CTY_CD;
				else return null;
			});
			t = response.features.filter(function(feature) {
				var mega_cd = feature.properties.MEGA_CD
		
				if (mega_cd == 27) return feature.properties.CTY_CD;
				else return null;
			});

		    geojson = L.geoJson(tk, {
		    	style: setStyle,
		    	onEachFeature: onEachFeature
		    }).addTo(map);

		    polygon = L.geoJson(tk);
		    polygon_t = L.geoJson(t);
		    if (_mega_cd_ == 27) {
		    	map.fitBounds(polygon_t.getBounds());
		    } else {
		    	map.fitBounds(polygon.getBounds());
		    }
		
		},
		complete : function() {},
		error : function(request, status, error) { // 에러
		    alert('문제가 발생하였습니다. 잠시후 다시 이용해주세요.');
		    return;
		}
	});

	function zoom_feature() {
		map.fitBounds(polygon.getBounds());
	};
	
	// * ------------------------------------------------------------------------------------------
    // * 지도 종료
    // * ------------------------------------------------------------------------------------------
	
	// 출력
	if (typeof MLReportStartPrint == 'function') {
		setTimeout("callTimeoutFunction()", 500);
	}
	
	var callTimeoutFunction = function() {
		MLReportStartPrint();
	}
	</script>
</body>
</html>