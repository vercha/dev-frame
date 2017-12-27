<template>
  <div id="main-container">
    <div class="left">
      <div class="top">
        <div class="header">播放总量</div>
        <span>当前播放数</span>
        <div class="number-container">
          <tr>
          <template v-for="(item, t) in number">
              <td class="number" :data-text="item">{{item}}</td>
              <td v-if="((number.length-t-1)%3 === 0 && (t != number.length -1))" class="seperator"></td>
          </template>
          </tr>
        </div>
        <span class="time">{{time}}</span>
      </div>
      <div class="bottom">
        <div id="pie-chart-header">实时播放实时播放TOP10地区</div>
        <div style="height: 20rem; width: 100%;" id="pie-chart"></div>
        <div style="height: calc(100% - 21rem); width: 100%;" id="pie-bar-chart"></div>
      </div>
    </div>
    <div class="center">
      <div id="map-chart-header">实时播放热力图</div>
      <div id="map-chart" style="height: 49.2rem;"></div>
    </div>
    <div class="right">
      <div class="top">
        <div class="hotvideo-header">
          <div class="header-container">
            <span></span>
            <span>实时播放TOP10热剧</span>
          </div>
          <template v-for="(item, t) in hotVideoList">
            <div class="video-container">
              <span class="video-list_on" v-if="((t+1)==1 || (t+1)==2 || (t+1)==3)">{{t+1}}</span>
              <span class="video-list" v-if="((t+1)!=1 && (t+1)!=2 && (t+1)!=3)">{{t+1}}</span>
              <span class="video-image" :style="{backgroundImage: 'url('+item.img+')'}"></span>
              <span class="video-title">{{item.name}}</span>
              <span class="video-label">{{item.category}}</span>
            </div>
          </template>
        </div>
      </div>
      <div class="bottom">
        <div id="bar-chart-header">实时播放TOP10地区</div>
        <div id="bar-chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import clone from 'clone'
  import mapOption from '../data/map-options'
  import pieOption from '../data/pie-options'
  import barOption from '../data/bar-options'
  import piebarOption from '../data/pie-bar-options'

  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/map'
  import 'echarts/map/js/china.js'
  import 'echarts/lib/chart/lines'
  import 'echarts/lib/chart/gauge'
  import 'echarts/lib/component/geo'

  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'

  //import serverData from '../data/fakeData.js'

  var pieBarItemstyles = [
    {
      normal: {
        color:new echarts.graphic.LinearGradient(
            0, 1, 1, 0,
          [
              {offset: 0, color: '#fdd516'},
              {offset: 1, color: '#f78f06'}
          ]
        )
      }
    }, {
      normal: {
        color:new echarts.graphic.LinearGradient(
            0, 1, 1, 0,
          [
              {offset: 0, color: '#9bd845'},
              {offset: 1, color: '#32ac1a'}
          ]
        )
      }
    }, {
      normal: {
        color:new echarts.graphic.LinearGradient(
            0, 1, 1, 0,
          [
              {offset: 0, color: '#59c99e'},
              {offset: 1, color: '#138276'}
          ]
        )
      }
    }, {
      normal: {
        color:new echarts.graphic.LinearGradient(
              0, 1, 1, 0,
            [
                {offset: 0, color: '#03f7fe'},
                {offset: 1, color: '#48a7ed'}
            ]
          )
        }
    }, {
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
  ]
  var pieItemstyles = [
    {
      normal: {
        label : {
            show : true,
            position: 'center',
            formatter: "{a|{c}%\n}"+"{b|\n\n{b}}",
            //formatter: "{a|{c}}"+"{a|     %\n}"+"{b|\n\n{b}}",  // %必须作为字符串手动加上  否则pie无法计算比例和绘图
            // fontSize: 30,
            rich: {
              a: {
                color: '#fff',
                fontSize: '120%'
              },
              b: {
                color: '#fff',
                fontSize: '70%'
              },
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
    }, {
      normal:{
        color: '#32ac1a'
      }
    }, {
      normal:{
        color: '#138276'
      }
    }, {
      normal:{
        color: '#48a7ed'
      }
    }, {
      normal:{
        color: '#315ee9'
      }
    }
  ]

  var FIVE_MINUTE = 5 * 60 * 1000

  export default {
    name: '',
    data () {
      return {
        number: [1,2,3,4,5,6,7,8,9,1,2,3],
        time: new Date(),
        hotVideoList: [],
        barChartCityValues: [],
        barChartCityNames: [],
        pieChartDatas: [],
        piebarChartXDatas: [],
        piebarChartYDatas: [],
        mapData: [],
        visualMapTopTenCity: []
      }
    },

    created () {
    },

    mounted () {
      /*var self = this
      this.fetchData()
      .then(() => {
        self.drawMap()
        self.drawBar()
        self.drawPie()
        self.drawPieBar()
      })
      .catch((e) => {
        console.log(e)
      })
      this.dataTimmer()*/
    },

    watch: {
    },

    methods: {
      drawMap () {
        var self = this
        var myMap = echarts.init(document.getElementById('map-chart'))
        //mapOption.series[0].data = this.mapData
        myMap.setOption(mapOption)
      },
      drawPie () {
        var myPie = echarts.init(document.getElementById('pie-chart'))
        //pieOption.series[0].data = this.pieChartDatas
        myPie.setOption(pieOption)
      },
      drawBar () {
        var self = this
        var myBar = echarts.init(document.getElementById('bar-chart'))

        //barOption.yAxis.data = this.barChartCityNames
        //barOption.series[0].data = this.barChartCityValues
        myBar.setOption(barOption)
      },
      drawPieBar () {
        var myBar = echarts.init(document.getElementById('pie-bar-chart'))

        //piebarOption.yAxis.data = this.piebarChartYDatas
        //piebarOption.series[0].data = this.piebarChartXDatas
        myBar.setOption(piebarOption)
      },
      fetchData () {
        var self = this
        var date = this.timeParse(new Date().getTime()).substr(0, 8)
          return new Promise((res, rej) => {
            $.ajax(this.$serverUrl, {
               data: {
               },
               dataType: 'jsonp',
               crossDomain: true,
               success: function(result) {
                 res()
               },
               error: function(e) {
                 rej()
                 console.log(e)
               }
             });
          })

      },
      timeParse (timestamp) {
        var date = new Date(timestamp)
        var str = ''
        str += date.getFullYear()
        str += (date.getMonth() + 1) < 10 ? ('0'+ (date.getMonth() + 1)) : (date.getMonth() + 1)
        str += date.getDate() < 10 ? ('0'+date.getDate()) : date.getDate()
        str += ' '
        str += date.getHours() < 10 ? ('0'+date.getHours()) : date.getHours()
        str += ':'
        str += date.getMinutes() < 10 ? ('0'+date.getMinutes()) : date.getMinutes()
        str += ':'
        str += date.getSeconds() < 10 ? ('0'+date.getSeconds()) : date.getSeconds()
        return str
      },
      sortData(data, key) {
        //默认顺序从大到小
        data.sort( function(a, b) {
          return parseInt(a[key]) < parseInt(b[key]) ? 1 : parseInt(a[key]) === parseInt(b[key]) ? 0 : -1
        });
        return data
      },
      dataTimmer () {
        var self = this
        clearInterval(this.updateTimmer)
        this.updateTimmer = setInterval(function () {
          self.fetchData()
        }, FIVE_MINUTE)

      }
    },

  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  #main-container {
    position: relative;
    padding-left: 0.9rem;
    padding-right: 0.9rem;
    padding-top: 1rem;
    background-color: #1d1d35;
    //display: -webkit-flex !important;
    //display: -ms-flexbox !important;
    //display: flex !important;
    //-webkit-flex: 1 1 auto !important;
    //-ms-flex: 1 1 auto !important;
    //flex: 1 1 auto !important;
    //-webkit-flex-basis: auto !important;
    //-ms-flex-preferred-size: auto !important;
    //flex-basis: auto !important;
    //-webkit-flex-direction: row !important;
    //-ms-flex-direction: row !important;
    //flex-direction: row !important;
  }
  #main-container .left {
    vertical-align: middle;
    display: inline-block;
    width: 21.2rem;
  }
  #main-container .left .top{
    display: inline-block;
    color: #fff;
    padding-top: 0.9rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;

    width: calc(100% - 1rem);
    height: 16.1rem;
    margin-bottom: 0.8rem;
    background-color: #202038;
    box-shadow: 0px 0px 0.8rem rgba(0, 0, 0, 0.31);
  }
  #main-container .left .top span {
    font-size: 0.65rem;
  }
  #main-container .left .top .number-container {
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
  }
  #main-container .left .top .number-container td.number {
    position: relative;
    height: 2.6rem;
    width: 1.35rem;
    line-height: 2.6rem;
    background-color: #394664;
    border-radius: 2px;
    margin: 0.1rem;
    display: inline-block;
    text-align: center;
    color: #05f6f8;
    font-size: 2rem;
  }
  #main-container .left .top .number-container td.number[data-text]::after {
    content: attr(data-text);
    color: #2ea2fb;
    position: absolute;
    left: 0;
    z-index: 2;
    -webkit-mask-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#2ea2fb), to(#05f6f8));
  }
  #main-container .left .top .number-container td.seperator {
    height: 3.05rem;
    width: 0.4rem;
    line-height: 2.6rem;
    vertical-align: middle;
    background-image: url("../assets/seperator-bg.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position-y: bottom;
  }
  #main-container .left .top span.time {
    font-size: 0.9rem;
  }
  #main-container .left .top .header{
    margin: 0 0px 3rem 0px;
    width: 16.6rem;
    height: 2.05rem;
    line-height: 1.75rem;
    background-image: url("../assets/header-bg.png");
    background-size: cover;
    font-size: 1.4rem;
    color: #fff;
    padding-left: 3.5rem;
  }
  #main-container .left .bottom{
    padding-left: 1.8rem;
    padding-right: 1.8rem;
    padding-top: 0.9rem;
    display: inline-block;
    width: calc(100% - 3.6rem);
    height: 33.1rem;
    background-color: #202038;
    box-shadow: 0px 0px 0.8rem rgba(0, 0, 0, 0.31);
  }
  #main-container .left .bottom div {
    display: inline-block;
  }
  #main-container .left .bottom #pie-chart {

  }
  #main-container .left .bottom #pie-chart-header {
    color: #a09f9f;
    font-size: 0.75rem;
    //margin-left: 1rem;
    height: 1rem;
    line-height: 1rem;
    padding-left: 1rem;
    background-image: url("../assets/header-tip-bg.png");
    background-repeat: no-repeat;
    background-position-x: left;
    background-position-y: center;
  }
  #main-container .center {
    vertical-align: middle;
    display: inline-block;
    width: 50rem;
    height: 100%;
  }
  #main-container .center #map-chart-header {
    margin-left: 2rem;
    color: #a09f9f;
    font-size: 0.75rem;

    height: 1rem;
    line-height: 1rem;
    padding-left: 1rem;
    background-image: url("../assets/header-tip-bg.png");
    background-repeat: no-repeat;
    background-position-x: left;
    background-position-y: center;
  }
  #main-container .right {
    vertical-align: middle;
    position: absolute;
    right: 0.9rem;
    display: inline-block;
    width: 21.2rem;
  }
  #main-container .right .top {
    color: #fff;
    font-size: 0.65rem;
    padding-left: 1.8rem;
    padding-right: 1.8rem;
    padding-top: 0.9rem;
    display: inline-block;
    width: calc(100% - 3.6rem);
    height: 24.9rem;
    margin-bottom: 0.8rem;
    background-color: #202038;
    box-shadow: 0px 0px 0.8rem rgba(0, 0, 0, 0.31);
  }
  #main-container .right .top .hotvideo-header span {
    color: #a09f9f;
    font-size: 0.75rem;
  }
  #main-container .right .top .hotvideo-header .header-container {
    margin-bottom: 1.5rem;
  }
  #main-container .right .top .hotvideo-header .header-container span {
    vertical-align: middle;
  }
  #main-container .right .top .hotvideo-header .header-container span:first-child {
    display: inline-block;
    height: 0.5rem;
    width: 0.5rem;
    background-image: url("../assets/header-tip-bg.png");
    background-size: cover;
  }
  #main-container .right .top .hotvideo-header .video-container {
    margin-bottom: 1.2rem;
    position: relative;
  }
  #main-container .right .top .hotvideo-header .video-container span{
    display: inline-block;
    vertical-align: middle;
  }
  #main-container .right .top .hotvideo-header .video-container .video-list{
    font-size: 0.65rem;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    height: 0.9rem;
    line-height: 0.9rem;
    width: 0.9rem;
    /*background-image: url("../assets/hot-video-list-bg.png");*/
    background-color: #6fa900;
    background-size: cover;
    margin-right: 1.3rem;
  }
  #main-container .right .top .hotvideo-header .video-container .video-list_on{
    font-size: 0.65rem;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    height: 0.9rem;
    line-height: 0.9rem;
    width: 0.9rem;
    background-image: url("../assets/hot-video-list-bg.png");
    /*background-color: #6fa900;*/
    background-size: cover;
    margin-right: 1.3rem;
  }
  #main-container .right .top .hotvideo-header .video-container .video-image{
    height: 1.1rem;
    width: 1.7rem;
    margin-right: 1.3rem;
    background-size: cover;
    background-color: red;
  }
  #main-container .right .top .hotvideo-header .video-container .video-title{
    height: 1.1rem;
    line-height: 1.1rem;
    width: 1.7rem;
    text-align: left;
    font-size: 0.6rem;
    min-width: 9.5rem;
    color: #fff;
    overflow: hidden;
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  #main-container .right .top .hotvideo-header .video-container .video-label{
    line-height: 0.9rem;
    height: 0.9rem;
    padding: 0 0.4rem;
    position: absolute;
    right: 0px;
    text-align: center;
    border: 1px solid #fff;
    font-size: 0.6rem;
    border-radius: 0.4rem;
    color: #fff;
    overflow: hidden;
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  #main-container .right .bottom {
    color: #fff;
    font-size: 0.65rem;
    padding-left: 1.8rem;
    padding-right: 1.8rem;
    padding-top: 0.9rem;
    display: inline-block;
    width: calc(100% - 3.6rem);
    height: 24.3rem;
    background-color: #202038;
    box-shadow: 0px 0px 0.8rem rgba(0, 0, 0, 0.31);
  }
  #main-container .right .bottom #bar-chart {
    width: 100%;
    height: calc(100% - 1rem);
  }
  #main-container .right .bottom #bar-chart-header {
    color: #a09f9f;
    font-size: 0.75rem;

    height: 1rem;
    line-height: 1rem;
    padding-left: 1rem;
    background-image: url("../assets/header-tip-bg.png");
    background-repeat: no-repeat;
    background-position-x: left;
    background-position-y: center;
  }

  /*@media screen and (max-width:800px) {
    #main-container {
      -webkit-flex-direction: column !important;
      -ms-flex-direction: column !important;
      flex-direction: column !important;
    }
  }*/
  @media screen and (max-width:1100px) {
    #main-container .right {
      display: none;
    }
  }
  /*@media screen and (max-width:900px) {
    #main-container .right {
      display: none;
    }
    #main-container .left {
      display: none;
    }
  }*/
</style>
