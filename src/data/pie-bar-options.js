import echarts from 'echarts/lib/echarts';
export default {
  title: {
      show: false,
      text: '实时播放TOP10地区',
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
  grid: {
      left: '2%',
      right: '15%',
      bottom: '2%',
      top: '0%',
      containLabel: true
  },
  toolbox: {
      show: false,
      feature: {
          saveAsImage: {}
      }
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
          {value:'移动设备', textStyle:{color:'#fff'}},
          {value:'TV设备', textStyle:{color:'#fff'}},
          {value:'PC客户端', textStyle:{color:'#fff'}},
          {value:'PC网页', textStyle:{color:'#fff'}},
          {value:'H5页面', textStyle:{color:'#fff'}}
      ],
      axisLabel: {
          formatter: function (value) {
              return value;
          },
          margin: 20,
          fontSize: '60%',
          rich: {
              value: {
                  //lineHeight: 25,
                  align: 'center'
              }
          }
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
          data: [
            {
              value:170,
              itemStyle: {
                normal: {
                  color:new echarts.graphic.LinearGradient(

                      0, 1, 1, 0,
                    [
                        {offset: 0, color: '#fdd516'},
                        {offset: 1, color: '#f78f06'}
                    ]
                  )
                }
              }
            },
            {
              value:165,
              itemStyle: {
                normal: {
                  color:new echarts.graphic.LinearGradient(

                      0, 1, 1, 0,
                    [
                        {offset: 0, color: '#9bd845'},
                        {offset: 1, color: '#32ac1a'}
                    ]
                  )
                }
              }
            },
            {
              value:30,
              itemStyle: {
                normal: {
                  color:new echarts.graphic.LinearGradient(

                      0, 1, 1, 0,
                    [
                        {offset: 0, color: '#59c99e'},
                        {offset: 1, color: '#138276'}
                    ]
                  )
                }
              }
            },
            {
              value:20,
              itemStyle: {
                normal: {
                  color:new echarts.graphic.LinearGradient(

                      0, 1, 1, 0,
                    [
                        {offset: 0, color: '#03f7fe'},
                        {offset: 1, color: '#48a7ed'}
                    ]
                  )
                }
              }
            },
            {
              value:20,
              itemStyle: {
                normal: {
                  color:new echarts.graphic.LinearGradient(

                      0, 1, 1, 0,
                    [
                        {offset: 0, color: '#315ee9'},
                        {offset: 1, color: '#40178d'}
                    ]
                  )
                }
              }
          }],
          label: {
            normal: {
                show: true,
                position: 'right',
                formatter: '{c}'+'万',
                color: '#fff',
                fontSize: '60%'
            }
          },
          itemStyle: {
              normal: {
                //color: 'orange'
                // color: new echarts.graphic.LinearGradient(
                //     1, 1, 1, 0,
                //     [
                //         {offset: 0, color: '#83bff6'},
                //         {offset: 0.5, color: '#188df0'},
                //         {offset: 1, color: '#188df0'}
                //     ]
                // ),
              }
          },
          barCategoryGap: '50%'

      }
  ]
}
