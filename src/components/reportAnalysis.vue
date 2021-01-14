<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <div class="box">
            <div class="title"><h4>信息列表</h4></div>
            <div class="selectBox">
              <span>年度</span>
              <el-select v-model="yearSelect" placeholder="请选择" size="mini" class="select" @change="yearChange">
                <el-option
                  v-for="item in nfOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="container">
            <el-row>
              <el-col :span="12" v-for="(item,index) in this.inventoryStatusList" :key="index">
                <div class="chartBox roseChart1"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" v-for="(item,index) in this.cashFlowStatusList" :key="index">
                <div class="chartBox roseChart2"></div>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 35px;">
              <el-col :span="24">
                <el-table
                  :data="heziReportAnalysisList"
                  border
                  row-key="id"
                  :header-cell-style="{'text-align':'center'}"
                  :row-style="{height:'40px'}"
                  :cell-style="{padding:'0px'}"
                  style="font-size: 10px;width: 100%;">
                    <el-table-column
                      prop="reportType"
                      label="报表"
                      :formatter="formatterReportType"
                      align="right"
                      min-width="140">
                    </el-table-column>
                    <el-table-column
                      prop="company"
                      label="企业"
                      align="right"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="year"
                      label="年份"
                      align="right"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="month"
                      label="月份"
                      align="right"
                      min-width="80">
                    </el-table-column>
                    <el-table-column min-width="110">
                       <template slot-scope="scope">
                          <el-button size="mini">
                            <router-link :to="{path:'/reportAnalysisDetail', query:{reportType:scope.row.reportType,year:scope.row.year,month:scope.row.month,company:scope.row.company}}">
                              <el-link>查看详情</el-link>
                            </router-link>
                          </el-button>
                       </template>
                    </el-table-column>
                </el-table>
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
          <div>
            <AddComments :moduleName ="moduleName" @reload="getMessage"/>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <router-view></router-view>
  </div>
</template>

<script>
  var echarts = require('echarts');
  import AddComments from '@/components/addComments.vue';
  import {getHeziComments} from '@/api/common/comments.js';
  import {getHeziReportAnalysis,getInventoryStatus,getCashFlowStatus,getHeziReportAnalysisByYear,getHeziReportAnalysisDetail} from '@/api/common/reportAnalysis.js';

  export default {
    data(){
      return{
        moduleName:'报表分析',
        nfOptions: [],
        yearSelect: new Date().getFullYear(),
        monthSelect: new Date().getMonth()+1,
        requestParams: {},
        messageRequestParams: {}, // 留言请求参数
        content: '', // 留言内容
        contentList: [] ,//留言内容列表
        heziReportAnalysisList: [] ,//结果集
        inventoryStatusList:[] ,//存货状态的ECharts数据
        cashFlowStatusList:[] //现金流状态的ECharts数据
      }
   },
   created(){
     this.getNf()
     this.getMessage()
     this.initReportAnalysis()
   },
   methods:{
     //初始化报表分析相关数据
     initReportAnalysis(){
       this.requestParams = {}
       this.requestParams.year = this.yearSelect
       this.requestParams.month = this.monthSelect
       //初始化存货状态
       this.initInventoryStatus()
       //初始化现金流状态
       this.initCashFlowStatus()
       //查询本年度所有的报表
       this.initHeziReportAnalysisByYear()
     },
     //初始化存货状态
     initInventoryStatus(){
       getInventoryStatus(this.requestParams).then(res => {
         this.inventoryStatusList = res.data
         this.$nextTick(() => {
           if(this.inventoryStatusList != null){
               this.inventoryStatusList.forEach((item,index)=>{
               this.draw1(this.inventoryStatusList)
             })
           }else{
             this.inventoryStatusList = []
           }
         })
       }).catch(error => {
         console.log(error)
         reject(error)
       })
     },
     //初始化现金流状态
     initCashFlowStatus(){
       getCashFlowStatus(this.requestParams).then(res => {
         this.cashFlowStatusList = res.data
         this.$nextTick(() => {
           if(this.cashFlowStatusList != null){
               this.cashFlowStatusList.forEach((item,index)=>{
               this.draw2(this.cashFlowStatusList)
             })
           }else{
             this.cashFlowStatusList = []
           }
         })
       }).catch(error => {
         console.log(error)
         reject(error)
       })
     },
     //查询本年度所有的报表
     initHeziReportAnalysisByYear(){
       getHeziReportAnalysisByYear(this.requestParams).then(res => {
         this.heziReportAnalysisList = res.data
       }).catch(error => {
         console.log(error)
         reject(error)
       })
     },
     draw1(inventoryStatusList){
       var roseCharts = document.getElementsByClassName('roseChart1')
       for(var i = 0;i < roseCharts.length;i++ ){
         var myChart = echarts.init(roseCharts[i])
         myChart.setOption({
             title: {
               text: inventoryStatusList[i].company+'存货状态',
               textStyle: {
                 fontSize: 13
               }
             },
             grid: {
               left:'50',// 调整这个属性
               height: '50%',
               width: '60%' //左右边距，设置为100，显示不全12月
             },
             xAxis: {
                 type: 'category',
                 data: ['上年同期', '当月']
             },
             yAxis: {
                 type: 'value'
             },
             series: [{
                 data: [inventoryStatusList[i].nowMonth, inventoryStatusList[i].nowMonthPass],
                 type: 'bar',
                 label: {
                   show: true
                 },
                 itemStyle: {
                   color: '#82d1ec'
                 }
             }]
         })
       }
     },
     draw2(cashFlowStatusList){
       var roseCharts = document.getElementsByClassName('roseChart2')
       for(var i = 0;i < roseCharts.length;i++ ){
         var myChart = echarts.init(roseCharts[i])
         myChart.setOption({
             title: {
               text: cashFlowStatusList[i].company+'现金流状态',
               textStyle: {
                 fontSize: 13
               }
             },
             grid: {
               left:'50',// 调整这个属性
               height: '50%',
               width: '60%' //左右边距，设置为100，显示不全12月
             },
             xAxis: {
                 type: 'category',
                 data: ['月初现金流', '月末现金流']
             },
             yAxis: {
                 type: 'value'
             },
             series: [{
                 data: [cashFlowStatusList[i].lastSum, cashFlowStatusList[i].nextSum],
                 type: 'bar',
                 label: {
                   show: true
                 },
                 itemStyle: {
                   color: '#82d1ec'
                 }
             }]
         })
       }
     },
     // 获取本年及前后一年的数组
     getNf(){
      var nfOptionsArray = new Array();
      var years= new Date().getFullYear();
      for(var i=years-1; i<= years+3; i++){
        var anOption = {};
        anOption.dictValue=i;
        anOption.dictLabel=i;
        nfOptionsArray.push(anOption);
      }
        this.nfOptions = nfOptionsArray;
      },
     // 选择年份
     yearChange(e){
       this.initReportAnalysis()
     },
     // 选择月份
     monthChange(e){
       this.initReportAnalysis()
     },
     // 获取页面留言
     getMessage(){
       this.messageRequestParams.belongModule = this.moduleName
       this.messageRequestParams = getHeziComments(this.messageRequestParams).then(res => {
         this.contentList = res.data
       }).catch(error => {
         console.log(error)
         reject(error)
       })
     },
     formatterReportType(row, column, cellValue, index){
       if(cellValue == '0'){
         return '资产情况'
       }else if(cellValue == '1'){
         return '负债及所有者权益'
       }else if(cellValue == '2'){
         return '利润'
       }else if(cellValue == '3'){
         return '现金流量'
       }
     }
   },
   components:{
       'AddComments': AddComments
     },
 }
</script>

<style scoped>
  .box{width: 100%;margin: 0 auto;border: 1px solid #eee;height: 500px;position: relative;overflow: hidden;}
  .box .title{border-bottom: 1px solid #EEEEEE;background-color: #FFFFFF;width: 100%;text-align: center;padding: 10px 0;}
  .contentmsg {height: 450px;overflow: hidden;width: calc(100% - 17px);}
  .contentmsg:hover {overflow: auto;width: 100%;}
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
  .chartBox {height: 200px;}
  a {
    text-decoration: none;
  }
  .router-link-active {
    text-decoration: none;
  }
</style>
