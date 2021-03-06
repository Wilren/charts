$(function() {
    //************************************************************************
    //************************************************************************
    //************************************************************************

    // 基于准备好的dom，初始化echarts实例
    var areaChart = echarts.init(document.getElementById('areaChart'), 'dark');

    // 指定图表的配置项和数据
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['直接访问', '搜索引擎', '百度', '谷歌', '其他']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '直接访问',
            type: 'bar',
            data: [320, 332, 301, 334, 390, 330, 320]
        }, {
            name: '搜索引擎',
            type: 'bar',
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            markLine: {
                lineStyle: {
                    normal: {
                        type: 'dashed'
                    }
                },
                data: [
                    [{
                        type: 'min'
                    }, {
                        type: 'max'
                    }]
                ]
            }
        }, {
            name: '百度',
            type: 'bar',
            barWidth: 5,
            data: [620, 732, 701, 734, 1090, 1130, 1120]
        }, {
            name: '谷歌',
            type: 'bar',
            data: [120, 132, 101, 134, 290, 230, 220]
        }, {
            name: '其他',
            type: 'bar',
            data: [62, 82, 91, 84, 109, 110, 120]
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    areaChart.setOption(option);


})
