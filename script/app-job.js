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



var jobModule = {
    init: function() {
        var self = this;
        $('#JobModule .panel-subject').click(function() {
            $('#JobModule .panel-subject').removeClass('active');
            $(this).addClass('active');

            self.mainChart.loadData();
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
            $('#job_mainChart').height($(window).height());
            // 基于准备好的dom，初始化echarts实例
            self.chart = echarts.init(document.getElementById('job_mainChart'), 'dark');
            // 指定图表的配置项和数据
            option = {
                title: {
                    text: '江门市地图',
                    // subtext: '数据纯属虚构',
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
            // self.loadData();


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
            $('#job_mainChart').height($(window).height());
            self.chart.resize();
        },
        loadData: function() {
            var self = this;
            self.chart.showLoading();
            var param = this.getParam();
            var option = {};

            //判断项目获取数据配置
            if (param.subject == 'unemployed') {

                if (param.mapName == '江门市') {
                    option = {
                        series: [{
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

            } else if (param.subject == 'unit') {
                option = {
                    series: [{
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
                                name: '企业数：12332',
                                coord: geoCoordMap['蓬江区']
                            }, {
                                name: '企业数：12332',
                                coord: geoCoordMap['新会区'],
                                symbolOffset: [80, 0]
                            }, {
                                name: '企业数：12332',
                                coord: geoCoordMap['江海区'],
                                symbolOffset: [50, -50]
                            }, {
                                name: '企业数：12332',
                                coord: geoCoordMap['台山市']
                            }, {
                                name: '企业数：12332',
                                coord: geoCoordMap['恩平市']
                            }, {
                                name: '企业数：12332',
                                coord: geoCoordMap['鹤山市']
                            }, {
                                name: '企业数：12332',
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


            } else if (param.subject == "recruitment") {
                option = {
                    visualMap: {
                        min: 0,
                        max: 2500,
                        color: ['#d94e5d', '#eac736', '#50a3ba'],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    series: [{
                        name: '中国',
                        type: 'map',
                        mapType: '江门市',
                        center: geoCoordMap['江门市'],
                        zoom: 1.3,
                        roam: false,
                        itemStyle: {
                            normal: {
                                areaColor: '#3d4f65',
                                borderColor: '#ffffff',
                                borderWidth: 1,
                                opacity: 0.7
                            },

                        },

                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data: [
                            { name: '江门市', value: 500 },
                            { name: '蓬江区', value: 1500 },
                            { name: '江海区', value: 2500 },
                            { name: '台山市', value: 400 },
                            { name: '恩平市', value: 600 },
                            { name: '开平市', value: 800 },
                            { name: '鹤山市', value: 400 },
                            { name: '新会区', value: 100 }



                        ]
                    }]
                };

            } else if (param.subject == "offerratio") {
                option = {
                    visualMap: {
                        min: 0,
                        max: 2500,
                        splitNumber: 5,
                        color: ['#d94e5d', '#eac736', '#50a3ba'],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    series: [{
                        name: 'pm2.5',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        itemStyle: {
                            normal: {
                                areaColor: '#3d4f65',
                                borderColor: '#ffffff',
                                borderWidth: 1,
                                opacity: 0.7
                            },
                        },
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        data: convertData([
                            { name: '蓬江区', value: 1500 },
                            { name: '江海区', value: 2500 },
                            { name: '台山市', value: 400 },
                            { name: '恩平市', value: 600 },
                            { name: '开平市', value: 800 },
                            { name: '鹤山市', value: 400 },
                            { name: '新会区', value: 100 }
                        ])
                    }]
                }

            }




            self.chart.setOption(option);
            self.chart.hideLoading();






        },
        getParam: function() {
            var self = this;
            var subject = $('#JobModule .panel-subject.active').attr('data-subject');
            var param = {
                mapName: self.options.mapName,
                subject: subject
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
            self.chart = echarts.init(document.getElementById('job_areaChart'), 'dark');


            // 指定图表的配置项和数据
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['招聘岗位', '求职岗位']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: ['蓬江区', '江海区', '新会区', '恩平市', '开平市', '台山市', '鹤山市']
                }],
                yAxis: [{
                    type: 'value'
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            self.chart.setOption(option);

            self.loadData();


        },
        loadData: function() {
            var self = this;
            var option = {
                series: [{
                    name: '招聘岗位',
                    type: 'bar',
                    data: [60, 72, 701, 734, 1090, 1130, 1120]
                }, {
                    name: '求职岗位',
                    type: 'bar',
                    data: [620, 732, 70, 73, 109, 113, 620]
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
            $('#job_areaChart').height(height);
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
            self.chart = echarts.init(document.getElementById('job_barChart'), 'dark');


            // 指定图表的配置项和数据
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['招聘岗位', '求职人数']
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
                    data: ['第一季度', '第二季度', '第三季度', '第四季度']
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
                    name: '招聘岗位',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: [200, 170, 240, 244]
                }, {
                    name: '求职人数',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    data: [320, 302, 341, 374]
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
            $('#job_barChart').height(height);
            self.chart.resize();
        }
    }

}


$(function() {
    jobModule.init();
});
