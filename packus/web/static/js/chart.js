const chartOptions = {
    segBarChartOption1: {
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';
                    var value = tooltipItem.value;
                    var unit = '명';
                    return label + ': ' + value + unit;
                }
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                baseAtZero: true
                }
            }]
        }
    },

    segBarChartOption2: {
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';
                    var value = tooltipItem.value;
                    var unit = '%';
                    return label + ': ' + value + unit;
                }
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                baseAtZero: true
                }
            }]
        }
    }
};

export default chartOptions