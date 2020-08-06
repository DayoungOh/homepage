import $, { ajax } from "jquery";
import "../css/base.scss";

const DashboardChart = function () {
  const chartOptions = {
    segBarChartOption1: {
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
      console.log("차트시작");
      chart.loadChart(data);
    },
    loadChart: function (data) {
      console.log("chart");
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
              backgroundColor: "#82ccdd",
              borderColor: "#82ccdd",
              data: [data.chart1[0], data.chart1[1], data.chart1[2]],
            },
          ],
        },
        options: chartOptions.segBarChartOption1,
      });

      let myChart2 = new Chart("myChart2", {
        type: "horizontalBar",
        data: {
          labels: [selectedSeg0, selectedSeg1, selectedSeg2],
          datasets: [
            {
              label: "전체회원 대비 비율",
              backgroundColor: "#82ccdd",
              borderColor: "#82ccdd",
              data: [data.chart2[0], data.chart2[1], data.chart2[2]],
            },
          ],
        },
        options: chartOptions.segBarChartOption2,
      });

      let myChart3 = new Chart("myChart3", {
        type: "bar",
        data: {
          labels: data.chart3[0].recency.label,
          datasets: [
            {
              label: "회원 수",
              backgroundColor: "#6a89cc",
              borderColor: "#6a89cc",
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
              backgroundColor: "#6a89cc",
              borderColor: "#6a89cc",
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
              backgroundColor: "#6a89cc",
              borderColor: "#6a89cc",
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
              backgroundColor: "#6a89cc",
              borderColor: "#6a89cc",
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
              backgroundColor: "#6a89cc",
              borderColor: "#6a89cc",
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
              label: "회원 수",
              backgroundColor: "#6a89cc",
              borderColor: "#6a89cc",
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
              label: "회원 수",
              backgroundColor: "#6a89cc",
              borderColor: "#6a89cc",
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
              backgroundColor: "#6a89cc",
              borderColor: "#6a89cc",
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
              backgroundColor: "#6a89cc",
              borderColor: "#6a89cc",
              data: data.chart3[2].monetary.data,
            },
          ],
        },
        options: chartOptions.segBarChartOption1,
      });
    },
  };
  return chart;
};

export default DashboardChart;
