var oneChart, twoChart, threeChart, fourChart, fiveChart, sixChart, sevenChart, elevenChart, nineChart, tenChart;
var charts = [];

var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};


var geoCoordMap = {
    "江门": [113.06, 22.61],
    "蓬江区": [113.084926, 22.600981],
    "江海区": [113.109394, 22.567064],
    "台山市": [112.800201, 22.258017],
    "恩平市": [112.311613, 22.189447],
    "开平市": [112.704689, 22.382973],
    "鹤山市": [112.970744, 22.771332],
    "新会区": [113.010162, 22.480848]


};


$(function() {

    //************************************************************************
    //************************************************************************
    //************************************************************************
    // 基于准备好的dom，初始化echarts实例
    oneChart = echarts.init(document.getElementById('oneChart'), 'dark');

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: []
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            center: ['50%', '50%'],
            data: []
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    oneChart.setOption(option);



    //************************************************************************
    //************************************************************************
    //************************************************************************
    // 基于准备好的dom，初始化echarts实例
    twoChart = echarts.init(document.getElementById('twoChart'), 'dark');

    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        title: {
            text: '用工企业风险统计'
        },
        legend: {
            data: ['风险']
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                textStyle: {
                    // fontSize: 8
                },
                rotate: 0,
                // margin  : 0,
                interval: 0
            },
            data: ["蓬江区", "江海区", "新会区", "恩平市", "开平市", "鹤山市", "台山市"]
        },
        yAxis: {
            splitNumber: 5
        },
        series: []
    };
    // 使用刚指定的配置项和数据显示图表。
    twoChart.setOption(option);



    //************************************************************************
    //************************************************************************
    //************************************************************************
    // 基于准备好的dom，初始化echarts实例
    threeChart = echarts.init(document.getElementById('threeChart'), 'dark');

    // 指定图表的配置项和数据
    var option = {
        legend: {
            data: ['已注册企业', '未注册企业'],
            bottom: 15
        },
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            lableLine: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            }
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    threeChart.setOption(option);



    //************************************************************************
    //************************************************************************
    //************************************************************************
    // 基于准备好的dom，初始化echarts实例
    fourChart = echarts.init(document.getElementById('fourChart'), 'dark');

    // 指定图表的配置项和数据
    option = {
        backgroundColor: '#404a59',
        title: {
            text: '江门市地图',
            subtext: '数据纯属虚构',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        geo: {
            map: '江门市',
            show: true,
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#1b1b1b',
                    borderColor: 'rgba(100,149,237,0.2)'
                }
            }
        }
    };
    // 使用刚指定的配置项和数据显示图表。
    fourChart.setOption(option);




    $('#btnDataOne').click(function() {
        info.showDataOne();
    });

    $('#btnDataTwo').click(function() {
        info.showDataTwo();
    });

    $('#btnDataThree').click(function() {
        info.showDataThree();
    });
    setTimeout(function() {
        charts = [oneChart, twoChart, threeChart, fourChart, fiveChart, sixChart, sevenChart, elevenChart, nineChart, tenChart];
        $('#btnDataOne').click();
    }, 1000);


});


var info = {
    showLoading: function() {
        $.each(charts, function(i, chart) {
            if (chart) {
                chart.showLoading();
            }
        })
    },
    hideLoading: function() {
        $.each(charts, function(i, chart) {
            if (chart) {
                chart.hideLoading();
            }
        })
    },
    showDataOne: function() {
        info.showLoading();

        setTimeout(function() {
            oneChart.setOption({
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫"]
                },
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36]
                }]
            });


            twoChart.setOption({
                series: [{
                    name: '数据A',
                    type: 'bar',
                    data: [5, 20, 36, 5, 40, 50, 10]
                }, {
                    name: '数据B',
                    type: 'bar',
                    data: [15, 10, 26, 25, 30, 30, 40]
                }]
            });


            threeChart.setOption({
                series: [{
                    data: [
                        { value: 235, name: '已注册企业' },
                        { value: 274, name: '未注册企业' },
                    ]
                }]
            });



            fourChart.setOption({
                series: [{
                    name: 'pm2.5',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData([{ name: "江门", value: 45 }])
                }, {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData([{ name: "蓬江区", value: 150 }, { name: "开平市", value: 150 }, { name: "台山市", value: 150 }, { name: "新会区", value: 150 }, { name: "恩平市", value: 150 }, { name: "鹤山市", value: 150 }, { name: "新会区", value: 150 }]),
                    symbolSize: function(val) {
                        return val[2] / 10;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                }]
            });
            info.hideLoading();
        }, 1000);



    },
    showDataTwo: function() {

        info.showLoading();
        setTimeout(function() {
            oneChart.setOption({
                xAxis: {
                    data: ["裤子", "高跟鞋", "袜子"]
                },
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [10, 10, 20]
                }]
            });
            info.hideLoading();

            twoChart.setOption({
                series: [{
                    name: '数据A',
                    type: 'bar',
                    data: [150, 100, 260, 250, 300, 300, 40]
                }, {
                    name: '数据B',
                    type: 'bar',
                    data: [50, 200, 360, 50, 400, 500, 10]
                }]
            });


            threeChart.setOption({
                series: [{
                    data: [
                        { value: 55, name: '已注册企业' },
                        { value: 14, name: '未注册企业' },
                    ]
                }]
            });



        }, 1000);

    },
    showDataThree: function() {

        oneChart.showLoading();
        setTimeout(function() {
            oneChart.setOption({
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
            info.hideLoading();

        }, 1000);

    }
}
