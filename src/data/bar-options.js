 // TODO:条的高度
import echarts from 'echarts/lib/echarts';
export default {
  title: {
        show: false,
        text: 'TOP10地区',
        textStyle: {
          color: '#fff',
          fontSize: 15
        }
    },
    tooltip: {
        show: false,
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        show: false
        //data: ['City Alpha', 'City Beta', 'City Gamma']
    },
    toolbox: {
      show: false,
      feature: {
        saveAsImage: {}
      }
    },
    //bar 在容器中的位置
    grid: {
        left: '0%',
        right: '15%',
        bottom: '2%',
        containLabel: true
    },
    xAxis: {
        show: false,
        type: 'value',
        name: '播放次数',
        axisLabel: {
            formatter: '{value}'
        }
    },
    yAxis: {
        type: 'category',
        inverse: true,
        data: [
            {value:'北京', textStyle:{color:'#fff'}},
            {value:'哈尔滨', textStyle:{color:'#fff'}},
            {value:'上海', textStyle:{color:'#fff'}},
            {value:'成都', textStyle:{color:'#fff'}},
            {value:'广州', textStyle:{color:'#fff'}},
            {value:'深圳', textStyle:{color:'#fff'}},
            {value:'杭州', textStyle:{color:'#fff'}},
            {value:'石家庄', textStyle:{color:'#fff'}},
            {value:'南京', textStyle:{color:'#fff'}},
            {value:'西安', textStyle:{color:'#fff'}}
        ],
        axisLabel: {
            formatter: function (value) {
                return value;
            },
            margin: 20,
            rich: {
                value: {
                    //lineHeight: 0,
                    align: 'center'
                }
            },
            fontSize: '90%'
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        }
    },
    series: [
        {
            name: 'TOP10播放次数',
            type: 'bar',
            data: [165, 170, 30, 20, 20, 20, 20, 20, 20,10],
            label: {
              normal: {
                  show: true,
                  position: 'right',
                  formatter: '{c}'+'万',
                  color: '#fff',
                  fontSize: '90%'
              }
            },
            itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                      0, 1, 1, 0,
                      [
                          {offset: 0, color: '#fed515'},
                          {offset: 1, color: '#f88f05'}
                      ]
                  ),
                }
            },
            barCategoryGap: '50%' //20

        }
    ]
}
