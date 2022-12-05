<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR"%><%


	String mega_cd = "47";
%>
<!DOCTYPE html>
<html lang="ko">
<head>

<meta charset="euc-kr">
<meta name="Referrer" content="origin">
<meta http-equiv="Content-Script-Type" content="text/javascript">
<meta http-equiv="Content-Style-Type" content="text/css">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>leaflet map</title>

	<!-- leaflet -->
	<link rel="stylesheet" href="assets/css/leaflet/leaflet.css" />
	<script type="text/javascript" src="assets/js/leaflet/leaflet.js"></script>

	
	<script type="text/javascript" src="assets/js/leaflet/proj4.js"></script>
	<script type="text/javascript" src="assets/js/leaflet/proj4leaflet.js"></script>


    <script src="lib/jquery/jquery.min.js"></script>
	
	<style>
	.leaflet-container { background: #fafaf7; outline: 0 }
	.leaflet-control { display: none; }

	.info {
	    display: none;
	    padding: 6px 8px;
	    font: 14px/16px Arial, Helvetica, sans-serif;
	    background: white;
	    background: rgba(255,255,255,0.8);
	    box-shadow: 0 0 15px rgba(0,0,0,0.2);
	    border-radius: 5px;
	}
	.info h4 {
	    margin: 0 0 5px;
	    color: #777;
	}
	
	
	
	
	
	
	.legend {
	    line-height: 18px;
	    color: #555;
	}
	.legend i {
	    width: 18px;
	    height: 18px;
	    float: left;
	    margin-right: 8px;
	    opacity: 0.7;
	}
	
	</style>

<script type="text/javascript">
var geojson;
var ip = '10.81.100.131',
    _mega_cd_ = '<%= mega_cd %>';

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

	let style;
    if (feature.properties.MEGA_CD == _mega_cd_) {
    	style = activeStyle;
    } else {
    	style = inactiveStyle;
    }

    return style;
}

function zoomToFeature(e) {
// 	map.fitBounds(e.target.getBounds());
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
	
// 	// 현재 마우스아웃 레이어 스타일 초기화
// 	e.target.setStyle(activeStyle);

// 	// 마지막 선택 레이어 스타일 재적용 (위에서 스타일 초기화 했으므로)
// 	if (selectedLayer != null) {
// 		selectedLayer.target.setStyle(highlightStyle);
// 	}
	
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
</script>
</head>
<body>

	<div id="map" style="background: #ffffff; height: 484px; width: 100%;"> </div>

	<script>
	var map,
	    polygon,
	    EPSG0000 = '+proj=tmerc +lat_0=38.0 +lon_0=128.0 +x_0=400000.0 +y_0=600000.0 +k=0.9999 +ellps=bessel +a=6377397.155 +b=6356078.9628181886 +units=m +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43',
	    EPSG4326 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs' ;

	// EPSG0000 -> EPSG4326 경위도 좌표계(WGS84)
// 	var new_center = proj4(EPSG0000, EPSG4326, [238418, 92335]);
	map = L.map('map', {
		center: [35.86, 127.14],
		minZoom: 8,
		maxZoom: 13
	});
// 	map.scrollWheelZoom.disable();

	var bizmapUrl = 'http://map.nicebizmap.co.kr:38080/TileMap/{z}/{y}/{x}.png';
	L.tileLayer(bizmapUrl, { attribution: "Map data www.nicebizmap.co.kr", maxZoom: 13, minZoom: 8 }).addTo(map);

// 	var popup = L.popup();
// 	map.on('mouseover', function(e) {
// 		debugger
//         popup.setLatLng(e.latlng)
//         	.setContent("map at " + e.latlng.toString() + ' / ' + e.layerPoint.x)
//         	.openOn(map);
// 	});

	var data,
	    geojson_nm,
	    response;
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
            
            
            
//             geojson.bindPopup(function(layer) {
//             	if (layer.feature.properties.MEGA_CD === _mega_cd_)
//             		return layer.feature.properties.CTY_NM;
//             	else return false;
//             }, function(layer) {
            	
//             	var adm_cd = '', adm_nm = '';
//             	switch (geojson_nm) {
// 	            	case 'tbshp_cty_tk':
// 	            		adm_cd = layer.feature.properties.CTY_CD;
// 	            		adm_nm = layer.feature.properties.CTY_NM;
// 	            		break;
//             	}

//             });

            polygon = L.geoJson(tk);
            polygon_t = L.geoJson(t);
            if ('<%= mega_cd %>' == 27) {
            	map.fitBounds(polygon_t.getBounds());
            } else {
            	map.fitBounds(polygon.getBounds());
            }

        },
        complete : function() {
        },
        error : function(request, status, error) { // 에러
            alert('문제가 발생하였습니다. 잠시후 다시 이용해주세요.');
            return;
        }
    });
    
    
    
    
    
    
    
    
    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };
    
    info.update = function (props) {
        this._div.innerHTML = '<h4>행정동 평균 매출</h4>'
                            + (props ? '<b>' + props.properties.MEGA_NM + ' ' + props.properties.CTY_NM + ' ' + props.properties.ADMI_NM + '</b><br />'
                            		+ (numberFormat(parseInt(props.data.sale_amt/props.data.store_cnt/10000))) + '만원<sup>2</sup>' : 'none-data');
    };

    info.addTo(map);
    
    
    
    
    
    
    
    
    
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [1, 1000, 2000, 3000, 4000, 5000, 6000],
            labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

//     legend.addTo(map);


    
    
    function zoom_feature() {
        map.fitBounds(polygon.getBounds());
    };
	</script>

</body>



</html>


