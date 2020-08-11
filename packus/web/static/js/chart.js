import $, { ajax } from "jquery";
import "../css/base.scss";

const DashboardChart = function () {
  const chartOptions = {
    segBarChartOption1: {
      legend: {
        display: false
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            let label = data.datasets[tooltipItem.datasetIndex].label || "";
            let value = tooltipItem.value;
            let unit = "명";
            return label + ": " + value + unit;
          },
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              baseAtZero: true,
            },
          },
        ],
      },
    },
    segBarChartOption2: {
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            let label = data.datasets[tooltipItem.datasetIndex].label || "";
            let value = tooltipItem.value;
            let unit = "%";
            return label + ": " + value + unit;
          },
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              baseAtZero: true,
            },
          },
        ],
      },
    },
  };
  const chart = {
    init: function (data) {
      console.log("Chart Init");
      chart.loadChart(data);
    },
    updateChart: function(data) {
      console.log('Chart Data Update')
      chart.myChart1.destroy();
      chart.myChart2.destroy();
      chart.myChart3.destroy();
      chart.myChart4.destroy();
      chart.myChart5.destroy();
      chart.myChart6.destroy();
      chart.myChart7.destroy();
      chart.myChart8.destroy();
      chart.myChart9.destroy();
      chart.myChart10.destroy();
      chart.myChart11.destroy();
      chart.loadChart(data)
    },
    loadChart: function (data) {
      const selectedSeg0 = $("#segmentSelect0 option:selected").text();
      const selectedSeg1 = $("#segmentSelect1 option:selected").text();
      const selectedSeg2 = $("#segmentSelect2 option:selected").text();
      let myChart1 = new Chart("myChart1", {
        type: "bar",
        data: {
          labels: [selectedSeg0, selectedSeg1, selectedSeg2],
          datasets: [
            {
              label: "회원 수",
              backgroundColor: ["#92CAEF","#FFE7A7","#F8ABA8"],
              borderColor: "#82ccdd",
              data: [data.chart1[0], data.chart1[1], data.chart1[2]],
            },
          ],
        },
        options: {
          ...chartOptions.segBarChartOption1,
          legend: {
            display: true
          }
        },
      });

      let myChart2 = new Chart("myChart2", {
        type: "horizontalBar",
        data: {
          labels: [selectedSeg0, selectedSeg1, selectedSeg2],
          datasets: [
            {
              label: "전체회원 대비 비율",
              backgroundColor: ["#92CAEF","#FFE7A7","#F8ABA8"],
              borderColor: "#82ccdd",
              data: [data.chart2[0], data.chart2[1], data.chart2[2]],
            },
          ],
        },
        options: chartOptions.segBarChartOption2,
      });
      chart.myChart2 = myChart2

      let myChart3 = new Chart("myChart3", {
        type: "bar",
        data: {
          labels: data.chart3[0].recency.label,
          datasets: [
            {
              label: "회원 수",
              backgroundColor: "#92CAEF",
              borderColor: "#92CAEF",
              data: data.chart3[0].recency.data,
            },
          ],
        },
        options: chartOptions.segBarChartOption1,
      });

      let myChart4 = new Chart("myChart4", {
        type: "bar",
        data: {
          labels: data.chart3[0].frequency.label,
          datasets: [
            {
              label: "회원 수",
              backgroundColor: "#92CAEF",
              borderColor: "#92CAEF",
              data: data.chart3[0].frequency.data,
            },
          ],
        },
        options: chartOptions.segBarChartOption1,
      });

      let myChart5 = new Chart("myChart5", {
        type: "bar",
        data: {
          labels: data.chart3[0].monetary.label,
          datasets: [
            {
              label: "회원 수",
              backgroundColor: "#92CAEF",
              borderColor: "#92CAEF",
              data: data.chart3[0].monetary.data,
            },
          ],
        },
        options: chartOptions.segBarChartOption1,
      });

      let myChart6 = new Chart("myChart6", {
        type: "bar",
        data: {
          labels: data.chart3[1].recency.label,
          datasets: [
            {
              label: "회원 수",
              backgroundColor: "#FFE7A7",
              borderColor: "#FFE7A7",
              data: data.chart3[1].recency.data,
            },
          ],
        },
        options: chartOptions.segBarChartOption1,
      });

      let myChart7 = new Chart("myChart7", {
        type: "bar",
        data: {
          labels: data.chart3[1].frequency.label,
          datasets: [
            {
              label: "회원 수",
              backgroundColor: "#FFE7A7",
              borderColor: "#FFE7A7",
              data: data.chart3[1].frequency.data,
            },
          ],
        },
        options: chartOptions.segBarChartOption1,
      });

      let myChart8 = new Chart("myChart8", {
        type: "bar",
        data: {
          labels: data.chart3[1].monetary.label,
          datasets: [
            {
              // label: "회원 수",
              backgroundColor: "#FFE7A7",
              borderColor: "#FFE7A7",
              data: data.chart3[1].monetary.data,
            },
          ],
        },
        options: chartOptions.segBarChartOption1,
      });

      let myChart9 = new Chart("myChart9", {
        type: "bar",
        data: {
          labels: data.chart3[2].recency.label,
          datasets: [
            {
              // label: "회원 수",
              backgroundColor: "#F8ABA8",
              borderColor: "#F8ABA8",
              data: data.chart3[2].recency.data,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  baseAtZero: true,
                },
              },
            ],
          },
        },
      });

      let myChart10 = new Chart("myChart10", {
        type: "bar",
        data: {
          labels: data.chart3[2].frequency.label,
          datasets: [
            {
              label: "회원 수",
              backgroundColor: "#F8ABA8",
              borderColor: "#F8ABA8",
              data: data.chart3[2].frequency.data,
            },
          ],
        },
        options: chartOptions.segBarChartOption1,
      });

      let myChart11 = new Chart("myChart11", {
        type: "bar",
        data: {
          labels: data.chart3[2].monetary.label,
          datasets: [
            {
              label: "회원 수",
              backgroundColor: "#F8ABA8",
              borderColor: "#F8ABA8",
              data: data.chart3[2].monetary.data,
            },
          ],
        },
        options: chartOptions.segBarChartOption1,
      });

      chart.myChart1 = myChart1
      chart.myChart2 = myChart2
      chart.myChart3 = myChart3
      chart.myChart4 = myChart4
      chart.myChart5 = myChart5
      chart.myChart6 = myChart6
      chart.myChart7 = myChart7
      chart.myChart8 = myChart8
      chart.myChart9 = myChart9
      chart.myChart10 = myChart10
      chart.myChart11 = myChart11
    },
  };
  return chart;
};

export default DashboardChart;