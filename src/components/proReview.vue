<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <div class="box">
            <div class="title"><h4>信息列表</h4></div>
            <div class="selectBox">
              <span>品牌</span>
              <el-select v-model="businessSelect" placeholder="请选择" size="mini" class="select" @change='businessChange'>
                <el-option
                  v-for="item in businessNameArr"
                  :key="item.brandId"
                  :label="item.brandName"
                  :value="item.brandId">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="container">
            <el-row>
              <el-col :span="24">
                <div id="chart1" class="chartBox" v-show="this.brandName == '一汽大众'"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div id="chart2" class="chartBox" v-show="this.brandName != '一汽大众'"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div id="chart3" class="chartBox" v-show="this.brandName != '一汽大众'"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-input
                  type="textarea"
                  placeholder="请输入留言内容"
                  v-model="content"
                  maxlength="100"
                  show-word-limit
                >
                </el-input>
                <el-button type="text" @click="submitMessage">提交留言</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="box">
            <div class="title"><h4>留言区</h4></div>
            <div class="contentmsg">
              <div class="message" v-for="item in contentList" :key="item.id">
                <div>{{item.content}}</div>
                <div style="text-align: right;">
                  -{{item.userName}}
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  var echarts = require('echarts');
  import {addComments,getHeziComments} from '@/api/common/comments.js';
  import {getBrand,getHeziProReview} from '@/api/common/proReview.js';

  export default {
    data(){
      return{
        messageRequestParams: {}, // 留言请求参数
        content: '', // 留言内容
        contentList: [] ,//留言内容列表
        requestParams: {},
        businessSelect: '', //选中品牌的id
        businessNameArr: [], //品牌列表
        brandName: '', //当前选择的品牌名称
        fzgArr:[], //销量规划(Fzg)
        kpeArr:[], //KPE(%)
        mileStoneArr:[] , //里程碑
        licenseFeeOnceArr:[] , //一次性许可费（Mio€)
        licensePercentArr:[] , //总许可费占比
        feasibleSalesArr:[] , //可研销量
        feasibleRateArr:[] , //可研利润率
        actualSalesArr:[] , //实际销量
        actualRateArr:[]  ,//实际利润率
        proNameArr:[]  //产品
      }
   },
   created() {
     this.initBussinessSel()
     this.getMessage()
   },
   methods:{
     //初始化项目开发进度
     initHeziProReview(){
       this.requestParams.brandId = this.businessSelect
       getHeziProReview(this.requestParams).then(res => {
         this.heziProReviewList = res.data
         if(this.heziProReviewList != null){
           // KPE
           this.kpeArr = this.heziProReviewList.map(function (item) {
             return item.kpePercent
           })
           // 销量规划
           this.fzgArr = this.heziProReviewList.map(function (item) {
             return item.fzg
           })
           // 里程碑
           this.mileStoneArr = this.heziProReviewList.map(function (item) {
             return item.mileStone
           })
           // 一次性许可费
           this.licenseFeeOnceArr = this.heziProReviewList.map(function (item) {
             return item.licenseFeeOnce
           })
           // 总许可费占比
           this.licensePercentArr = this.heziProReviewList.map(function (item) {
             return item.licensePercent
           })
           // 可研销量
           this.feasibleSalesArr = this.heziProReviewList.map(function (item) {
             return item.feasibleSales
           })
           // 可研利润率
           this.feasibleRateArr = this.heziProReviewList.map(function (item) {
             return item.feasibleRate
           })
           // 实际销量
           this.actualSalesArr = this.heziProReviewList.map(function (item) {
             return item.actualSales
           })
           // 实际利润率
           this.actualRateArr = this.heziProReviewList.map(function (item) {
             return item.actualRate
           })
           // 产品
           this.proNameArr = this.heziProReviewList.map(function (item) {
             return item.proName
           })
           this.draw()
         }
       }).catch(error => {
         console.log(error)
         reject(error)
       })
     },
     //初始化品牌下拉
     initBussinessSel(){
       getBrand().then(res => {
         this.businessNameArr = res.data
         if(this.businessNameArr != null){
           this.businessSelect = this.businessNameArr[0].brandId // 预选中第一项
           this.brandName = this.businessNameArr[0].brandName
           this.initHeziProReview()
         }
       }).catch(error => {
         console.log(error)
         reject(error)
       })
     },
     //选择品牌
     businessChange(e){
       let obj = {}
       obj = this.businessNameArr.find((item) => {
        return item.brandId === e;
       });
       //获取当前选择的品牌名称
       this.brandName = obj.brandName
       this.initHeziProReview()
     },
     // 获取页面留言
     getMessage(){
       this.messageRequestParams.belongModule = '项目开发进度'
       this.messageRequestParams = getHeziComments(this.messageRequestParams).then(res => {
         this.contentList = res.data
       }).catch(error => {
         console.log(error)
         reject(error)
       })
     },
     // 留言
     submitMessage(){
       this.messageRequestParams.content = this.content
       this.messageRequestParams.belongModule = '项目开发进度'
       addComments(this.messageRequestParams).then(res => {
         alert('留言成功')
         this.content = ''
         this.getMessage()
       }).catch(error => {
         console.log(error)
         reject(error)
       })
     },
     // 折线图
     draw() {
       var echartsOption1 = {
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  crossStyle: {
                      color: '#999'
                  }
              }
          },
           legend: {
               data: ['可研销量','实际销量','可研利润率','实际利润率']
           },
           xAxis: [
               {
                   type: 'category',
                   data: this.proNameArr,
                   axisPointer: {
                       type: 'shadow'
                   }
               }
           ],
           yAxis: [
             {
                 type: 'value',
                 interval: 200000,
                 axisLabel: {
                     formatter: '{value}'
                 }
             },
             {
                 type: 'value',
                 min: 0,
                 max: 100,
                 minInterval: 5,
                 axisLabel: {
                     formatter: '{value} %'
                 }
             }
           ],
           series: [
               {
                   name: '可研销量',
                   type: 'bar',
                   data: this.feasibleSalesArr,
                   itemStyle: {
                     color: '#ff5500'
                   },
               },
               {
                   name: '实际销量',
                   type: 'bar',
                   data: this.actualSalesArr,
                   itemStyle: {
                     color: '#82d1ec'
                   },
               },
               {
                   name: '可研利润率',
                   type: 'line',
                   data: this.feasibleRateArr,
                   itemStyle: {
                     color: '#ffaa7f'
                   },
               },
               {
                   name: '实际利润率',
                   type: 'line',
                   data: this.actualRateArr,
                   itemStyle: {
                     color: '#aaaa7f'
                   },
               }
           ]
         }
       var echartsOption2 = {
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  crossStyle: {
                      color: '#999'
                  }
              }
          },
          legend: {
              data: ['销量规划', 'KPE']
          },
          xAxis: [
              {
                  type: 'category',
                  data: this.mileStoneArr,
                  axisPointer: {
                      type: 'shadow'
                  }
              }
          ],
          yAxis: [
              {
                  type: 'value',
                  minInterval: 0,
                  axisLabel: {
                      formatter: '{value}'
                  }
              },
              {
                  type: 'value',
                  minInterval: 0,
                  axisLabel: {
                      formatter: '{value} %'
                  }
              }
          ],
          series: [
              {
                  name: '销量规划',
                  type: 'bar',
                  data: this.fzgArr,
                  itemStyle: {
                    color: '#82d1ec'
                  }
              },
              {
                  name: 'KPE',
                  type: 'line',
                  yAxisIndex: 1,
                  data: this.kpeArr,
                  itemStyle: {
                    color: '#ffaa00'
                  }
              }
          ]
      }
       var echartsOption3 = {
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  crossStyle: {
                      color: '#999'
                  }
              }
          },
          legend: {
              data: ['一次性许可费', '总许可费占比']
          },
          xAxis: [
              {
                  type: 'category',
                  data: this.mileStoneArr,
                  axisPointer: {
                      type: 'shadow'
                  }
              }
          ],
          yAxis: [
              {
                  type: 'value',
                  minInterval: 0,
                  axisLabel: {
                      formatter: '{value}'
                  }
              },
              {
                  type: 'value',
                  minInterval: 0,
                  axisLabel: {
                      formatter: '{value} %'
                  }
              }
          ],
          series: [
              {
                  name: '一次性许可费',
                  type: 'bar',
                  data: this.licenseFeeOnceArr,
                  itemStyle: {
                    color: '#82d1ec'
                  }
              },
              {
                  name: '总许可费占比',
                  type: 'line',
                  yAxisIndex: 1,
                  data: this.licensePercentArr,
                  itemStyle: {
                    color: '#ffaa00'
                  }
              }
          ]
      }
       if(this.brandName == '一汽大众'){
         var myChart1 = echarts.init(document.getElementById('chart1'))
         myChart1.setOption(echartsOption1)
         echarts.dispose(document.getElementById('chart2'))
         echarts.dispose(document.getElementById('chart3'))
       }else{
         var myChart2 = echarts.init(document.getElementById('chart2'))
         myChart2.setOption(echartsOption2)
         var myChart3 = echarts.init(document.getElementById('chart3'))
         myChart3.setOption(echartsOption3)
         echarts.dispose(document.getElementById('chart1'))
       }
     }
   }
 }
</script>

<style scoped>
  .box{width: 100%;margin: 0 auto;border: 1px solid #eee;height: 500px;position: relative;overflow: hidden;}
  .box .title{border-bottom: 1px solid #EEEEEE;background-color: #FFFFFF;width: 100%;text-align: center;padding: 10px 0;}
  .contentmsg {height: 450px;overflow: hidden;width: calc(100% - 17px);}
  .contentmsg:hover {overflow: auto;width: 100%;}
  h4{padding: 0;margin: 0;}
  .selectBox{margin: 10px; display: flex;}
  .selectBox span{font-size: 14px;width: 30%;line-height: 28px;}
  .selectBox .select{width: 70%;}
  .container{margin: 0 15px;}
  .linkItem{line-height: 35px;margin: 10px;}
  h5{margin: 0;font-size: 14px;}
  .message{margin: 10px;font-size: 12px;}
  img{width: 100%;}
  .chartBox {
    height: 200px;
  }
  .hiden {
    display: none;
  }
</style>
