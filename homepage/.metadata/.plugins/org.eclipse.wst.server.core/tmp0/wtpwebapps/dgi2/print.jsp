<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
	          	<div class="d-none d-md-block none-print">
		            <button class="btn btn-sm pd-x-15 btn-white btn-uppercase" onclick="excel();"><i data-feather="download" class="wd-10 mg-r-5"></i> Excel</button>
		            <button class="btn btn-sm pd-x-15 btn-white btn-uppercase mg-l-5" onclick="print();"><i data-feather="printer" class="wd-10 mg-r-5"></i> Print</button>
		            <button class="btn btn-sm pd-x-15 btn-primary btn-uppercase mg-l-5" onclick="mlreport();"><i data-feather="file" class="wd-10 mg-r-5"></i> Generate Report</button>
          		</div>
				<script src="lib/jquery/jquery.min.js"></script>
          		<script type="text/javascript" src="https://www.nicebizmap.co.kr/MLReport/js/mlreport.js"></script>
				<script type="text/javascript" src="https://www.nicebizmap.co.kr/MLReport/js/mlrpt.js"></script>
				<script>
					function excel() {
						Swal.fire('¿¢¼¿´Ù¿î·Îµå');
					}

					function mlreport() {
						MLReportJS.SetCookie(document.cookie);
				        PreviewDlgURL();
					}

					// ML REPORT
					var MLReportLicenseURL = "https://www.nicebizmap.co.kr" + "/MLReport/WEYFFFBI8AZHMNQ.pwl";
					function PreviewDlgURL() {
					    MLReportJS.Ready(null, function(version) {
							var region = $('.select2-region option:selected').text();
							var period = $('.select2-period option:selected').text();
							var regionVal = $('.select2-region option:selected').val();
							var periodVal = $('.select2-period option:selected').val();
					        var pathname = window.location.pathname,
					            urlList = '';


					        MLReportJS.DelayPrint = true;
					        MLReportJS.License = MLReportLicenseURL;
// 					        MLReportJS.EnableScript= false;
// 					        MLReportJS.PrintRate = 0.95;
						    MLReportJS.SetCookie(document.cookie);
					        if (pathname.indexOf('home') > -1) {
					        	urlList = "http://localhost:8030/dgi2/home.jsp";
					        	
						        MLReportJS.PreviewDlgURL(urlList);
					        } else if (pathname.indexOf('page-company-1') > -1) {
					        	debugger;
					        	urlList = ""
				                    + "http://localhost:8030/dgi2/page-company-1.jsp?region=" + region + "&period=" + period
				                    + "&regionVal=" + regionVal + "&periodVal=" + periodVal + ";"
				            	;

						        MLReportJS.PreviewDlgURL(urlList);
					        } else if (pathname.indexOf('page-income-consumption') > -1) {
					        	urlList = ""
				                    + "http://localhost:8030/dgi2/page-income-consumption.jsp?region=" + region + "&period=" + period
				                    + "&regionVal=" + regionVal + "&periodVal=" + periodVal + ";"
				            	;

						        MLReportJS.PreviewDlgURL(urlList);
					        }
					            
				
					    });
					};
				</script>