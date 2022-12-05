<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
    <header class="navbar navbar-header navbar-header-fixed">
    	<a href="" id="mainMenuOpen" class="burger-menu"><i data-feather="menu"></i></a>
    	<div class="navbar-brand">
      		<img src="/dgi2/assets/img/dgi.png" style="height:90%; margin-top: -5px;"></img>
<!--     		<a href="index.html" class="df-logo">dash<span>forge</span></a> -->
    	</div><!-- navbar-brand -->
    	<div id="navbarMenu" class="navbar-menu-wrapper">
    		<div class="navbar-menu-header">
    				<img src="/dgi2/assets/img/dgi.png"></img>
<!--     			<a href="index.html" class="df-logo">dash<span>forge</span></a> -->
    			<a id="mainMenuClose" href=""><i data-feather="x"></i></a>
    		</div><!-- navbar-menu-header -->
    		<ul class="nav navbar-menu">
    			<li class="nav-label pd-l-20 pd-lg-l-25 d-lg-none">Main Navigation</li>
	          	<li class="nav-item"><a href="home.jsp" class="nav-link"><i></i> Home</a></li>
	          	<li class="nav-item"><a href="page-population.jsp" class="nav-link"><i></i> 인구현황</a></li>
	          	<li class="nav-item"><a href="page-income-consumption.jsp" class="nav-link"><i></i> 소득소비현황</a></li>
    			<li class="nav-item with-sub">
    				<a href="" class="nav-link"><i></i> 기업현황</a>
    				<ul class="navbar-menu-sub">
    					<li class="nav-sub-item"><a href="page-company-1.jsp" class="nav-sub-link"><i></i>기업 개요</a></li>
              			<li class="nav-sub-item"><a href="dashboard-two.html" class="nav-sub-link"><i></i>기업 재무</a></li>
              			<li class="nav-sub-item"><a href="dashboard-three.html" class="nav-sub-link"><i></i>기업 수출입</a></li>
            		</ul>
          		</li>
          		<li class="nav-item with-sub">
            		<a href="" class="nav-link"><i></i> 일자리현황</a>
            		<ul class="navbar-menu-sub">
              			<li class="nav-sub-item"><a href="app-calendar.html" class="nav-sub-link"><i></i>종사자 현황</a></li>
              			<li class="nav-sub-item"><a href="app-chat.html" class="nav-sub-link"><i></i>업종별 연봉 정보</a></li>
            		</ul>
          		</li>
          		<li class="nav-item with-sub">
            		<a href="" class="nav-link"><i></i> 상권현황</a>
            		<ul class="navbar-menu-sub">
              			<li class="nav-sub-item"><a href="app-calendar.html" class="nav-sub-link"><i></i>상권 매출</a></li>
              			<li class="nav-sub-item"><a href="app-chat.html" class="nav-sub-link"><i></i>업종별 매출</a></li>
              			<li class="nav-sub-item"><a href="app-chat.html" class="nav-sub-link"><i></i>상권 소비 특성</a></li>
            		</ul>
          		</li>
	          	<li class="nav-item"><a href="return false;" class="nav-link" onclick="Swal.fire('준비중입니다'); return false;"><i></i> 도시재생</a></li>
        	</ul>
      	</div><!-- navbar-menu-wrapper -->
    </header><!-- navbar -->
