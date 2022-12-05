
// chartjs
var ctxLabel = ['19.07', '19.08', '19.09', '19.10', '19.11', '19.12', '20.01', '20.02', '20.03', '20.04', '20.05', '20.06', '20.07'];
var ctxData1 = [33, 20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30];
var ctxData2 = [44, 10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20];
var ctxColor1 = '#001737';
var ctxColor2 = '#1ce1ac';


var lineOptions01 = {
	maintainAspectRatio: false,
	legend: {
		display: false,
		labels: {
			display: false
		}
	},
	scales: {
		yAxes: [{
			gridLines: {
				display: true,
				color: "#dee2e6",
				borderDash: [2],
				drawBorder: false,
			},
			ticks: {
				beginAtZero:true,
				fontSize: 12
			}
		}],
		xAxes: [{
			gridLines: {
				display: false,
			},
			ticks: {
				beginAtZero:true,
				fontSize: 12
			}
		}]
	}
}