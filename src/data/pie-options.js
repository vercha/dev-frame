export default {
  title: {
    show: false,
    text: "实时播放TOP10地区",
    textStyle: {
      color: '#a09f9f',
      fontSize: '15'
    }
  },
  tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    	show: false
  },
  calculable : true,
  series : [
      {
          name:'访问来源',
          type:'pie',
          radius : ['55%', '70%'],
          center: ['60%', '50%'], //pie 在容器中位置
          itemStyle : {
              normal : {
                  label : {
                      show : true,
                      formatter: "{c}"+'%',
                      verticalAlign: 'middle',
                      color: '#fff',
                      fontSize: '70%'
                  },
                  labelLine : {
                      show : true,
                      smooth: false,
                      lineStyle: {
                        color: "#fff"
                      }
                  }
              }
              /*emphasis : {
                  label : {
                      show : false,
                      position : 'center',
                    	formatter: "{d}%<br/>{a}",
                      // formatter: function (param) {
                      //     return '{' + name + '| }\n{value|' + value + '}';
                      // },
                      textStyle : {
                          //fontSize : '30',
                          //fontWeight : 'bold',
                          color: '#fff'
                      }
                  }
              }*/
          },
          data:[
              {name:'移动设备', value:70, itemStyle: {
                normal: {
                  label : {
                      show : true,
                      position: 'center',
                      formatter: "{a|{c}}"+"{a|%\n}"+"{b|\n\n{b}}",
                      // fontSize: 30,
                      rich: {
                        a: {
                          color: '#fff',
                          //fontSize: '80%' //52
                        },
                        b: {
                          color: '#fff',
                          //fontSize: '70%' //13
                        }
                      }
                  },
                  labelLine : {
                      show : false,
                  },
                  color: '#f78f06'
                },
                emphasis: {
                  label : {
                      show : true,
                      position: 'center'
                  },
                  labelLine : {
                      show : false
                  }
                }
              }},
              {name:'TV设备', value:5, itemStyle: {
                normal:{
                  color: '#32ac1a'
                }
              }},
              {name:'PC客户端',value:5,itemStyle: {
                normal:{
                  color: '#138276'
                }
              }},
              {name:'PC网页',value:10,itemStyle: {
                normal:{
                  color: '#48a7ed'
                }
              }},
              {name:'H5页面',value:10,itemStyle: {
                normal:{
                  color: '#315ee9'
                }
              }}
          ]
      }
  ]
}
