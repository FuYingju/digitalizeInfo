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
            <div class="selectBox">
              <span>公司</span>
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
            <el-row style="margin-top: 35px;margin-bottom: 35px;">
              <el-col :span="24">
                <div id="chart1" class="chartBox"></div>
              </el-col>
            </el-row>
          </div>
          <div class="container">
            <el-row style="margin-bottom: 35px;">
              <el-col :span="24">
                <el-table
                  :data="budgetDataList"
                  border
                  center
                  row-key="id"
                  :header-cell-style="{'text-align':'center'}"
                  :row-style="{height:'40px'}"
                  :cell-style="{padding:'0px'}"
                  style="font-size: 8px;width: 100%;">
                    <el-table-column
                      prop="title"
                      label=""
                      align="center"
                      width="110">
                    </el-table-column>
                    <el-table-column
                      prop="month1"
                      label="1月"
                      align="right"
                      width="90">
                    </el-table-column>
                    <el-table-column
                      prop="month2"
                      label="2月"
                      align="right"
                      width="90">
                    </el-table-column>
                    <el-table-column
                      prop="month3"
                      label="3月"
                      align="right"
                      width="90">
                    </el-table-column>
                    <el-table-column
                      prop="month4"
                      label="4月"
                      align="right"
                      width="90">
                    </el-table-column>
                    <el-table-column
                      prop="month5"
                      label="5月"
                      align="right"
                      width="90">
                    </el-table-column>
                    <el-table-column
                      prop="month6"
                      label="6月"
                      align="right"
                      width="90">
                    </el-table-column>
                    <el-table-column
                      prop="month7"
                      label="7月"
                      align="right"
                      width="90">
                    </el-table-column>
                    <el-table-column
                      prop="month8"
                      label="8月"
                      align="right"
                      width="90">
                    </el-table-column>
                    <el-table-column
                      prop="month9"
                      label="9月"
                      align="right"
                      width="90">
                    </el-table-column>
                    <el-table-column
                      prop="month10"
                      label="10月"
                      align="right"
                      width="90">
                    </el-table-column>
                    <el-table-column
                      prop="month11"
                      label="11月"
                      align="right"
                      width="90">
                    </el-table-column>
                    <el-table-column
                      prop="month12"
                      label="12月"
                      align="right"
                      width="90">
                    </el-table-column>
                    <el-table-column
                      prop="total"
                      label="合计"
                      align="right"
                      width="90">
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
  </div>
</template>

<script>

  var echarts = require('echarts');
  import AddComments from '@/components/addComments.vue';
  import {getHeziComments} from '@/api/common/comments.js';
  import {getBrand,getHeziBudget,getHeziBudgetListYear} from '@/api/common/budget.js';

  export default {
    data(){
      return{
        moduleName:'预算管理',
        nfOptions: [],
        yearSelect: new Date().getFullYear(),
        requestParams: {},
        messageRequestParams: {}, // 留言请求参数
        content: '', // 留言内容
        contentList: [] ,//留言内容列表
        budgetList:[] ,//结果集
        budgetDataList:[] ,//结果集
        totalProfitsPredictArr:[],
        totalProfitsTargetArr:[],
        businessSelect: '', //选中品牌的id
        businessNameArr: [] //品牌列表
      }
   },
   created(){
     // 获取本年及前后一年的数组
     this.getNf()
     //初始化品牌下拉
     this.initBussinessSel()
     // 获取页面留言
     this.getMessage()
   },
   methods:{
     //初始化品牌下拉
     initBussinessSel(){
       getBrand().then(res => {
         this.businessNameArr = res.data
         if(this.businessNameArr != null){
           this.businessSelect = this.businessNameArr[0].brandId // 预选中第一项
           this.brandName = this.businessNameArr[0].brandName
           this.initBudget()
         }
       }).catch(error => {
         console.log(error)
         reject(error)
       })
     },
     initBudget(){
       this.requestParams.year = this.yearSelect
       this.requestParams.brandId = this.businessSelect
       getHeziBudgetListYear(this.requestParams).then(res => {
         this.budgetList = res.data
         if(this.budgetList != null){
           let arr1 = [];
           let arr2 = [];
           this.budgetList.forEach(function (item,index,arr){
             if(item.title.indexOf('利润总额预测')!= -1){
               arr1[0] = item.month1
               arr1[1] = item.month2
               arr1[2] = item.month3
               arr1[3] = item.month4
               arr1[4] = item.month5
               arr1[5] = item.month6
               arr1[6] = item.month7
               arr1[7] = item.month8
               arr1[8] = item.month9
               arr1[9] = item.month10
               arr1[10] = item.month11
               arr1[11] = item.month12
             }
             if(item.title.indexOf('利润总额目标')!= -1){
               arr2.push(item.month1)
               arr2.push(item.month2)
               arr2.push(item.month3)
               arr2.push(item.month4)
               arr2.push(item.month5)
               arr2.push(item.month6)
               arr2.push(item.month7)
               arr2.push(item.month8)
               arr2.push(item.month9)
               arr2.push(item.month10)
               arr2.push(item.month11)
               arr2.push(item.month12)
             }
           })
           this.totalProfitsPredictArr = arr1
           this.totalProfitsTargetArr = arr2
         }else{
           this.totalProfitsPredictArr = []
           this.totalProfitsTargetArr = []
         }
         this.draw()
       }).catch(error => {
         console.log(error)
         reject(error)
       })
       getHeziBudget(this.requestParams).then(res => {
         this.budgetDataList = res.data
       }).catch(error => {
         console.log(error)
         reject(error)
       })
     },
     draw() {
       // 市场销量折线图
       var echartsOption1 = {
         title: {
           text: '年度预算',
           textStyle: {
             fontSize: 13
           }
         },
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
             data: ['利润总额预测', '利润总额目标']
         },
         grid: {
           height: '60%',
           width: '70%'
         },
         legend: {
           orient: 'horizontal'
         },
         xAxis: {
           data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
           axisLabel : {
               interval:0 // 坐标轴刻度标签的显示间隔(设置为0强制显示所有标签)
           }
         },
         yAxis: {},
         series: [{
             name: '利润总额预测',
             type: 'line',
             data: this.totalProfitsPredictArr,
             itemStyle: {
               color: '#82d1ec'
             },
             label: {
               show: true
             }
           },
           {
             name: '利润总额目标',
             type: 'line',
             data: this.totalProfitsTargetArr,
             itemStyle: {
               color: '#888'
             },
             label: {
               show: true
             }
           },
         ]
       };
       var myChart = echarts.init(document.getElementById('chart1'));
       myChart.setOption(echartsOption1)
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
       this.initBudget()
     },
     // 选择企业
     businessChange(e){
       this.businessSelect = e
       this.initBudget()
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
  h4{padding: 0;margin: 0;}
  .selectBox{margin: 10px; display: flex;}
  .selectBox span{font-size: 14px;width: 30%;line-height: 28px;}
  .selectBox .select{width: 70%;}
  .buttonGroup{position: absolute;left: 50%;bottom: 50px;margin-left: -50px;}
  .container{margin: 0 15px;}
  .linkItem{line-height: 35px;margin: 10px;}
  h5{margin: 0;font-size: 14px;}
  .message{margin: 10px;font-size: 12px;}
  img{width: 100%;}
  .chartBox {height: 200px;}

</style>
