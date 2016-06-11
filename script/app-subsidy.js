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
    "江门市": [112.90, 22.258017],
    "蓬江区": [113.044926, 22.650981],
    "江海区": [113.139394, 22.547064],
    "台山市": [112.800201, 22.158017],
    "恩平市": [112.311613, 22.189447],
    "开平市": [112.604689, 22.382973],
    "鹤山市": [112.800744, 22.601332],
    "新会区": [113.010162, 22.400848]
};

var subsidyModule = {
    init: function() {
        var self = this;
        $('#SubsidyModule .panel-subject').click(function() {
            $('#SubsidyModule .panel-subject').removeClass('active');
            $(this).addClass('active');
        });


        self.mainChart.init();
        self.areaChart.init();
        self.barChart.init();

    },

    /**
     * 地图图表，显示在平台中间
     */
    mainChart: {
        chart: null,
        options: {},
        init: function() {
            var self = this;
            $('#subsidy_mainChart').height($(window).height());
            // 基于准备好的dom，初始化echarts实例
            self.chart = echarts.init(document.getElementById('subsidy_mainChart'), 'dark');
            // 指定图表的配置项和数据
            option = {
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
                    center: geoCoordMap['江门市'],
                    zoom: 1.3,
                    roam: false,
                    selectedMode: 'single',
                    itemStyle: {
                        normal: {
                            areaColor: '#3d4f65',
                            borderColor: '#ffffff',
                            borderWidth: 1,
                            opacity: 0.7
                        },

                    }
                }
            };
            // 使用刚指定的配置项和数据显示图表。
            self.chart.setOption(option);

            self.options.mapName = '江门市';

            //显示数据
            self.loadData();


            self.chart.on('geoselectchanged', function(param) {
                if (param.name != self.options.mapName && 1 == 2) {
                    var option = {
                        title: {
                            text: param.name + '地图'
                        },
                        geo: {
                            map: param.name,
                            center: geoCoordMap[param.name]
                        }
                    }
                    self.chart.setOption(option, false);
                    self.options.mapName = param.name;

                    //显示数据
                    self.loadData();
                }
            });

            self.chart.on('click', function(param) {
                if (param.seriesType == 'effectScatter') {
                    layer.open({
                        type: 2,
                        area: ['700px', '400px'],
                        fix: false, //不固定
                        maxmin: true,
                        shade: 0,
                        shift: 5,
                        moveType: 1,
                        title: param.name + '明细数据',
                        content: 'charts/area.html'
                    });
                }
            });


            self.chart.on('dblclick', function(param) {
                if (self.options.mapName != '江门市') {
                    var option = {
                        title: {
                            text: '江门市地图'
                        },
                        geo: {
                            map: '江门市',
                            center: geoCoordMap['江门市']
                        }
                    }
                    self.chart.setOption(option, false);
                    self.options.mapName = '江门市';

                    //显示数据
                    self.loadData();
                }
            });

            //支持echarts响应式的方法
            $(window).resize(function() {
                self.resize();
            });

        },
        resize: function() {
            var self = this;
            $('#subsidy_mainChart').height($(window).height());
            self.chart.resize();
        },
        loadData: function() {
            var self = this;
            self.chart.showLoading();
            var param = this.getParam();
            var option = {};
            if (param.mapName == '江门市') {
                option = {
                    series: [{
                        name: 'pm2.5',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData([{ name: "江门", value: 45 }])
                    }, {
                        name: '',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: convertData([{ name: "蓬江区", value: 150 }, { name: "开平市", value: 150 }, { name: "台山市", value: 150 }, { name: "新会区", value: 150 }, { name: "恩平市", value: 150 }, { name: "鹤山市", value: 150 }, { name: "江海区", value: 150 }]),
                        symbolSize: function(val) {
                            return val[2] / 10;
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        tooltip: {
                            trigger: 'item',
                            formatter: function(params) {
                                return params.name + ' : ' + params.value[2];
                            }
                        },
                        label: {
                            normal: {
                                formatter: '\n{b}',
                                position: 'bottom',
                                show: true,
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 16
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#f4e925',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        markPoint: {
                            symbol: 'rect',
                            symbolSize: [120, 50],
                            symbolOffset: [0, -50],
                            // animation: false,
                            // animationEasing:'bounceIn',
                            // animationDelay: 1000,
                            // animationDelayUpdate: 2000,
                            tooltip: {
                                show: false
                            },
                            itemStyle: {
                                normal: {
                                    color: '#000',
                                    opacity: 0.5
                                },
                                emphasis: {
                                    opacity: 1
                                }

                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideLeft',
                                    formatter: '{b}',
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 13
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    position: 'insideLeft',
                                    formatter: '{b}',
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 13
                                    }
                                }
                            },
                            data: [{
                                name: '求职岗位：12332\n招聘岗位：432\n供求比　：1:3',
                                coord: geoCoordMap['蓬江区']
                            }, {
                                name: '求职岗位：12332\n招聘岗位：432\n供求比　：1:3',
                                coord: geoCoordMap['新会区'],
                                symbolOffset: [80, 0]
                            }, {
                                name: '求职岗位：12332\n招聘岗位：432\n供求比　：1:3',
                                coord: geoCoordMap['江海区'],
                                symbolOffset: [50, -50]
                            }, {
                                name: '求职岗位：12332\n招聘岗位：432\n供求比　：1:3',
                                coord: geoCoordMap['台山市']
                            }, {
                                name: '求职岗位：12332\n招聘岗位：432\n供求比　：1:3',
                                coord: geoCoordMap['恩平市']
                            }, {
                                name: '求职岗位：12332\n招聘岗位：432\n供求比　：1:3',
                                coord: geoCoordMap['鹤山市']
                            }, {
                                name: '求职岗位：12332\n招聘岗位：432\n供求比　：1:3',
                                coord: geoCoordMap['开平市']
                            }]
                        },
                        animationDelayUpdate: function(idx) {
                            // 越往后的数据延迟越大
                            return idx * 150;
                        },
                        zlevel: 1
                    }]
                };
            } else {
                option = {
                    series: [{
                        name: 'pm2.5',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: null
                    }, {
                        name: 'Top 5',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: null,
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
                };
            }
            self.chart.setOption(option);
            self.chart.hideLoading();






        },
        getParam: function() {
            var self = this;
            var param = {
                mapName: self.options.mapName
            }
            return param;
        }
    },
    /**
     * 区域统计图
     * @type {Object}
     */
    areaChart: {
        chart: null,
        init: function() {
            var self = this;
            //************************************************************************
            //************************************************************************
            //************************************************************************
            // 基于准备好的dom，初始化echarts实例
            self.chart = echarts.init(document.getElementById('subsidy_areaChart'), 'dark');


            option = {
                // legend: {
                //     x: 'center',
                //     y: 'center',
                //     data: [
                //         'GoogleMaps', 'Facebook', 'Youtube', 'Google+', 'Weixin',
                //         'Twitter', 'Skype', 'Messenger', 'Whatsapp', 'Instagram'
                //     ]
                // },
                title: {
                    text: '资金使用完成预算比例',
                    x: 'left'
                }

            };


            // 使用刚指定的配置项和数据显示图表。
            self.chart.setOption(option);

            self.loadData();


        },
        loadData: function() {
            var self = this;

            // 指定图表的配置项和数据
            var labelTop = {
                normal: {
                    label: {
                        show: true,
                        position: 'center',
                        formatter: '{b}'
                    },
                    labelLine: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                }
            };
            var labelFromatter = {
                normal: {
                    label: {
                        formatter: function(params) {
                            return 100 - params.value + '%'
                        },
                        textStyle: {
                            baseline: 'top',
                            fontSize: 15

                        }
                    }
                },
            }
            var labelBottom = {
                normal: {
                    color: '#ccc',
                    label: {
                        show: true,
                        position: 'center'
                    },
                    labelLine: {
                        show: false
                    },
                    opacity: 0.1
                },
                emphasis: {
                    color: '#ccc'
                }
            };
            var radius = [40, 55];

            var option = {
                series: [{
                    type: 'pie',
                    center: ['12.5%', '30%'],
                    radius: radius,
                    x: '0%', // for funnel
                    itemStyle: labelFromatter,
                    data: [
                        { name: 'other', value: 46, itemStyle: labelBottom },
                        { name: '蓬江区', value: 54, itemStyle: labelTop }
                    ]
                }, {
                    type: 'pie',
                    center: ['37.5%', '30%'],
                    radius: radius,
                    x: '25%', // for funnel
                    itemStyle: labelFromatter,
                    data: [
                        { name: 'other', value: 56, itemStyle: labelBottom },
                        { name: '江海区', value: 44, itemStyle: labelTop }
                    ]
                }, {
                    type: 'pie',
                    center: ['62.5%', '30%'],
                    radius: radius,
                    x: '50%', // for funnel
                    itemStyle: labelFromatter,
                    data: [
                        { name: 'other', value: 65, itemStyle: labelBottom },
                        { name: '新会区', value: 35, itemStyle: labelTop }
                    ]
                }, {
                    type: 'pie',
                    center: ['87.5%', '30%'],
                    radius: radius,
                    x: '75%', // for funnel
                    itemStyle: labelFromatter,
                    data: [
                        { name: 'other', value: 70, itemStyle: labelBottom },
                        { name: '恩平市', value: 30, itemStyle: labelTop }
                    ]
                }, {
                    type: 'pie',
                    center: ['12.5%', '75%'],
                    radius: radius,
                    y: '55%', // for funnel
                    x: '0%', // for funnel
                    itemStyle: labelFromatter,
                    data: [
                        { name: 'other', value: 78, itemStyle: labelBottom },
                        { name: '开平市', value: 22, itemStyle: labelTop }
                    ]
                }, {
                    type: 'pie',
                    center: ['37.5%', '75%'],
                    radius: radius,
                    y: '55%', // for funnel
                    x: '25%', // for funnel
                    itemStyle: labelFromatter,
                    data: [
                        { name: 'other', value: 78, itemStyle: labelBottom },
                        { name: '台山市', value: 22, itemStyle: labelTop }
                    ]
                }, {
                    type: 'pie',
                    center: ['62.5%', '75%'],
                    radius: radius,
                    y: '55%', // for funnel
                    x: '50%', // for funnel
                    itemStyle: labelFromatter,
                    data: [
                        { name: 'other', value: 78, itemStyle: labelBottom },
                        { name: '鹤山市', value: 22, itemStyle: labelTop }
                    ]
                }, {
                    type: 'pie',
                    center: ['87.5%', '75%'],
                    radius: radius,
                    y: '55%', // for funnel
                    x: '75%', // for funnel
                    itemStyle: labelFromatter,
                    data: [
                        { name: 'other', value: 83, itemStyle: labelBottom },
                        { name: '全市', value: 17, itemStyle: labelTop }
                    ]
                }]
            };
            self.chart.setOption(option);


            //支持echarts响应式的方法
            $(window).resize(function() {
                self.resize();
            });
            self.resize();
        },
        getParam: function() {
            var param = {};
            return param;
        },
        resize: function() {
            var self = this;
            var height = $(window).height() / 3;
            $('#subsidy_areaChart').height(height);
            self.chart.resize();
        }
    },
    /**
     * bar统计图
     * @type {Object}
     */
    barChart: {
        chart: null,
        init: function() {
            var self = this;
            //************************************************************************
            //************************************************************************
            //************************************************************************
            // 基于准备好的dom，初始化echarts实例
            self.chart = echarts.init(document.getElementById('subsidy_barChart'), 'dark');


            // 指定图表的配置项和数据
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['利润', '支出', '收入']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'value'
                }],
                yAxis: [{
                    type: 'category',
                    axisTick: { show: false },
                    data: ['蓬江区', '江海区', '新会区', '恩平市', '开平市', '台山市', '鹤山市']
                }]
            };


            // 使用刚指定的配置项和数据显示图表。
            self.chart.setOption(option);

            self.loadData();


        },
        loadData: function() {
            var self = this;

            // 指定图表的配置项和数据

            var option = {
                series: [{
                    name: '利润',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: [200, 170, 240, 244, 200, 220, 210]
                }, {
                    name: '收入',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    data: [320, 302, 341, 374, 390, 450, 420]
                }, {
                    name: '支出',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'left'
                        }
                    },
                    data: [-120, -132, -101, -134, -190, -230, -210]
                }]
            };
            self.chart.setOption(option);


            //支持echarts响应式的方法
            $(window).resize(function() {
                self.resize();
            });
            self.resize();
        },
        getParam: function() {
            var param = {};
            return param;
        },
        resize: function() {
            var self = this;
            var height = $(window).height() / 3;
            $('#subsidy_barChart').height(height);
            self.chart.resize();
        }
    }

}

$(function() {
    subsidyModule.init();
});
