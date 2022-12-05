<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%><%

    String region = request.getParameter("region") == null ? "경상북도" : request.getParameter("region");
    String period = request.getParameter("period") == null ? "2020년 07월" : request.getParameter("period");
    String regionVal = request.getParameter("regionVal") == null ? "47" : request.getParameter("regionVal");
    String periodVal = request.getParameter("periodVal") == null ? "202007" : request.getParameter("periodVal");
    
//     String region = aaa;
//     String period = "2020년 07월";
    
    
    String ctxLabel = "['19.07', '19.08', '19.09', '19.10', '19.11', '19.12', '20.01', '20.02', '20.03', '20.04', '20.05', '20.06', '20.07']";
    String ctxData1 = "[-33, 20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30]";
    String ctxData2 = "[44, 10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20]";
    
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
    <link href="lib/select2/css/select2.min.css" rel="stylesheet">
    <link href="http://www.nicebizmap.co.kr/assets/js/plugins/sweetalert2/sweetalert2.min.css" rel="stylesheet" id="theme-styles">

    <!-- DashForge CSS -->
    <link rel="stylesheet" href="assets/css/dashforge.css">
    <link rel="stylesheet" href="assets/css/dashforge.nice.css">
    
    <style>
    
    
    </style>

</head>
<body>

    <%@ include file = "navbar.jsp" %>

    <div class="content content-fixed"> 
		<div class="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
			<div class="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30">
	        	<div>
	            	<nav aria-label="breadcrumb">
	              		<ol class="breadcrumb breadcrumb-style1 mg-b-10">
	                		<li class="breadcrumb-item">소득소비현황</li>
	                		<li class="breadcrumb-item active" aria-current="page">주거인구 소득/소비</li>
	              		</ol>
	            	</nav>
	            	<h4 class="mg-b-0 tx-spacing--1">데이터로 보는 <b><%= region %></b> 현황 <span class="tx-color-03 tx-14">(<%= period %>)</span></h4>
	          	</div>
				<%@ include file = "print.jsp" %>
	        </div>
	        
	    	<%@ include file = "header.jsp" %>

        	<div class="row row-xs">
          		<div class="col-lg-12 col-xl-12 mg-t-10">
          			<div class="card">
              			<div class="card-header d-flex align-items-start justify-content-between">
                			<h6 class="lh-5 mg-b-0">1. 관내 기업 현황</h6>
                			<p class="period tx-13 tx-color-03 mg-b-0"><%= period %></p>
              			</div><!-- card-header -->
              			<div class="card-body pd-y-15 pd-x-10">
	              			<div class="table-responsive table-hover">
	                			<table class="table mg-b-0">
	                  				<thead class="thead-secondary">
	                    				<tr>
	                      					<th scope="col" class="text-center">기업체수</th>
						                    <th scope="col" class="text-center">종사자 총 수</th>
						                    <th scope="col" class="text-center">매출총액</th>
						                    <th scope="col" class="text-center">자산총계</th>
						                    <th scope="col" class="text-center">전월대비 수출증감률</th>
						                    <th scope="col" class="text-center">전월대비 수입증감률</th>
	                    				</tr>
	                  				</thead>
	                  				<tbody>
	                    				<tr>
	                      					<td class="tx-medium text-center">{} 개</td>
	                      					<td class="tx-medium text-center">{} 명</td>
	                      					<td class="tx-medium text-center">{} 억원</td>
	                      					<td class="tx-medium text-center">{} 억원</td>
	                      					<td class="tx-medium text-center">{} %</td>
	                      					<td class="tx-medium text-center">{} %</td>
	                    				</tr>
	                  				</tbody>
	                			</table>
	              			</div><!-- table-responsive -->
              			</div><!-- card-body -->
            		</div><!-- card -->
          		</div><!-- col -->
        
          		<div class="col-md-12 col-xl-12 mg-t-10">
            		<div class="card ht-lg-100p">
              			<div class="card-header d-flex align-items-center justify-content-between">
              				<h6 class="mg-b-0">* 관내 기업 수 변동</h6>
              				<ul class="list-inline d-flex mg-b-0">
              					<li class="list-inline-item d-flex align-items-center">
              						<p class="period tx-13 tx-color-03 mg-b-0"><%= period %></p>
              					</li>
                			</ul>
              			</div><!-- card-header -->
<!--               			<div class="card-body"> -->
                 			<div class="mg-t-20 px-3">
                 			<canvas id="chartLine01" style="position: relative; margin: auto; height:300px;"></canvas></div>
<!--               			</div> -->
              			<!-- card-body -->
              			<div class="card-body mg-t-10">
	              			<div class="table-responsive table-hover">
	                			<table class="table mg-b-0">
	                  				<thead class="thead-secondary">
	                    				<tr>
											<th scope="col" class="text-center">구분</th>
											<th scope="col" class="text-center">19.06</th>
											<th scope="col" class="text-center">19.07</th>
											<th scope="col" class="text-center">19.08</th>
											<th scope="col" class="text-center">19.09</th>
											<th scope="col" class="text-center">19.10</th>
											<th scope="col" class="text-center">19.11</th>
											<th scope="col" class="text-center">19.12</th>
											<th scope="col" class="text-center">20.01</th>
											<th scope="col" class="text-center">20.02</th>
											<th scope="col" class="text-center">20.03</th>
											<th scope="col" class="text-center">20.04</th>
											<th scope="col" class="text-center">20.05</th>
											<th scope="col" class="text-center">20.06</th>
	                   					</tr>
	                  				</thead>
	                  				<tbody>
	                    				<tr>
											<td class="tx-medium text-center" style="min-width:100px;" >기업 수</td>
											<td class="tx-medium text-center">{33} 개</td>
											<td class="tx-medium text-center">{20} 개</td>
											<td class="tx-medium text-center">{60} 개</td>
											<td class="tx-medium text-center">{50} 개</td>
											<td class="tx-medium text-center">{45} 개</td>
											<td class="tx-medium text-center">{50} 개</td>
											<td class="tx-medium text-center">{60} 개</td>
											<td class="tx-medium text-center">{70} 개</td>
											<td class="tx-medium text-center">{40} 개</td>
											<td class="tx-medium text-center">{45} 개</td>
											<td class="tx-medium text-center">{35} 개</td>
											<td class="tx-medium text-center">{25} 개</td>
											<td class="tx-medium text-center">{30} 개</td>
										</tr>
	                  				</tbody>
	                			</table>
	              			</div><!-- table-responsive -->
              			</div><!-- card-body -->
           			</div>
          		</div>
          	</div><!-- row -->
          	
      	</div><!-- container -->
    </div><!-- content -->

    <script src="lib/jquery/jquery.min.js"></script>
    <script src="lib/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="lib/feather-icons/feather.min.js"></script>
    <script src="lib/perfect-scrollbar/perfect-scrollbar.min.js"></script>
    <script src="lib/chart.js/Chart.bundle.min.js"></script>
    <script src="lib/select2/js/select2.min.js"></script>
    <script src="http://www.nicebizmap.co.kr/assets/js/plugins/sweetalert2/sweetalert2.min.js"></script>
    <script src="http://www.nicebizmap.co.kr/assets/js/plugins/sweetalert2/polyfill.js"></script>

    <script src="assets/js/dashforge.js"></script>
    <script src="assets/js/dashforge.nice.js"></script>
    <script src="assets/js/dashforge.chartjs.js"></script>
	<script>
	var region = '<%= regionVal %>',
	    period = '<%= periodVal %>';

	var chartjs01;
	$(function(){
		'use strict'

		// 선택 메뉴 활성화
		setNavbarMenu(2);
		
		chartjs01();
	});
	
	var chartjs01 = function() {

		// create chartjs.chart
        var ctx = document.getElementById('chartLine01');
        chartjs01 = new Chart(ctx, {
        	type: 'line',
        	data: {
        		labels: <%= ctxLabel %>,
        		datasets: [{
        			data: <%= ctxData1 %>,
        			borderColor: '#1ce1ac',
        			borderWidth: 1.2,
        			fill: false
        		}]
       		},
       		options: lineOptions01
       	});
	}
	
	var reloadChartjs = function(region, period) {
		// 분기태우는거는 테스트를 위함이며
		// 실제 개발 때는 하나만 있으면 됨!
		if (period === '202007') {
			// chartLine01 reload
			chartjs01.data.labels = ['19.07', '19.08', '19.09', '19.10', '19.11', '19.12', '20.01', '20.02', '20.03', '20.04', '20.05', '20.06', '20.07'];
			chartjs01.data.datasets.forEach(function(dataset) {
				dataset.data = [-33, 20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30];
			});
			chartjs01.update();
		} else {
			// chartLine01 reload
			chartjs01.data.labels = ['19.06', '19.07', '19.08', '19.09', '19.10', '19.11', '19.12', '20.01', '20.02', '20.03', '20.04', '20.05', '20.06'];
			chartjs01.data.datasets.forEach(function(dataset) {
				dataset.data = [44, 10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20];
			});
			chartjs01.update();
		}
		
		if (period != null && period.length > 0 && period != undefined)
			$('.period').html(period.substring(0,4) + '년 ' + period.substring(4) + '월');
	};
	
		
	
	
	
	
	
	// 출력
	if (typeof MLReportStartPrint == 'function') {
// 		alert('st');
		setTimeout("callTimeoutFunction()", 500);
	}
	
	var callTimeoutFunction = function() {
// 		alert('ctf')
		MLReportStartPrint();
	}
	
	
	
	
	</script>
</body>
</html>