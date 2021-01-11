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
              <span>月度</span>
              <el-select v-model="monthSelect" placeholder="请选择" size="mini" class="select" @change='monthChange'>
                <el-option
                  v-for="item in 12"
                  :key="item.index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </div>
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
            <div class="selectBox">
              <span>阶段</span>
              <el-select v-model="tagSelect" placeholder="请选择" size="mini" class="select" @change="tagChange">
                <el-option
                  v-for="item in tagOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="container" >
            <el-row>
              <el-col :span="24" style="margin-bottom: 30px;">
                <div id="chart1" class="chartBox" v-show="this.tagSelect == '0'"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div id="chart2" class="chartBox" v-show="this.tagSelect == '1' || this.tagSelect == '2'"></div>
              </el-col>
              <el-col :span="12">
                <div id="chart3" class="chartBox" v-show="this.tagSelect == '1'"></div>
              </el-col>
              <el-col :span="12">
                <div id="chart4" class="chartBox" v-show="this.tagSelect == '2'"></div>
              </el-col>
              <el-col :span="16" style="margin-bottom: 30px;margin-top: 30px;">
                <div id="chart5" class="chartBox" v-show="this.tagSelect == '2'"></div>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 30px;" v-show="this.businessSelect != '2' && this.tagSelect == '0'">
              <el-col :span="24">
                <el-table
                  :data="heziProReviewList"
                  border
                  row-key="id"
                  :header-cell-style="{'text-align':'center'}"
                  :row-style="{height:'20px'}"
                  :cell-style="{padding:'0px'}"
                  style="font-size: 10px;width: 100%;">
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                          <el-form-item label="可研">
                            <span>{{ props.row.feasible || '-' }}</span>
                          </el-form-item>
                          <el-form-item label="平均售价">
                            <span>{{ props.row.avgPrice || '-' }}</span>
                          </el-form-item>
                          <el-form-item label="售价净收入">
                            <span>{{ props.row.priceIncome || '-' }}</span>
                          </el-form-item>
                          <el-form-item label="销售支持">
                            <span>{{ props.row.salesSupport+'%' || '-' }}</span>
                          </el-form-item>
                          <el-form-item label="经销商佣金">
                            <span>{{ props.row.dealerCommision || '-' }}</span>
                          </el-form-item>
                          <el-form-item label="直接成本">
                            <span>{{ props.row.directCost || '-' }}</span>
                          </el-form-item>
                          <el-form-item label="管理费">
                            <span>{{ props.row.manageCost || '-' }}</span>
                          </el-form-item>
                        </el-form>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="proName"
                      label="细分市场"
                      align="center"
                      min-width="100">
                    </el-table-column>
                    <el-table-column
                      prop="feasibleSales"
                      label="可研销量"
                      align="right"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="actualSales"
                      label="实际销量"
                      align="right"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="feasibleRate"
                      label="可研利润率"
                      align="right"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="actualRate"
                      label="实际利润率"
                      align="right"
                      min-width="80">
                    </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 35px;" v-show="this.businessSelect != '2' && this.tagSelect == '1'">
              <el-col :span="24">
                <el-table
                  :data="heziProReviewList"
                  border
                  row-key="id"
                  :header-cell-style="{'text-align':'center'}"
                  :row-style="{height:'20px'}"
                  :cell-style="{padding:'0px'}"
                  style="font-size: 10px;width: 100%;">
                    <el-table-column
                      prop="mileStone"
                      label="里程碑"
                      align="center"
                      min-width="110">
                    </el-table-column>
                    <el-table-column
                      prop="sopTime"
                      label="SOP时间"
                      align="right"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="fzg"
                      label="销量规划"
                      align="right"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="mainPrice"
                      label="主力车型售价"
                      align="right"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="licenseFeeOnce"
                      label="一次性许可费"
                      align="right"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="licenceFeeCar"
                      label="单车许可费"
                      align="right"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="licensePercent"
                      label="总许可费占比"
                      align="right"
                      :formatter="percentFormatter"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="kpePercent"
                      label="KPE(%)"
                      align="right"
                      :formatter="percentFormatter"
                      min-width="80">
                    </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 35px;" v-show="this.businessSelect == '2' && this.tagSelect == '2'">
              <el-col :span="24">
                <el-table
                  :data="heziProReviewList"
                  border
                  row-key="id"
                  :header-cell-style="{'text-align':'center'}"
                  :row-style="{height:'20px'}"
                  :cell-style="{padding:'0px'}"
                  style="font-size: 10px;width: 100%;">
                    <el-table-column
                      prop="sopTime"
                      label="SOP时间"
                      align="right"
                      min-width="110">
                    </el-table-column>
                    <el-table-column
                      prop="fzg"
                      label="销量规划"
                      align="right"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="mainPrice"
                      label="主力车型售价"
                      align="right"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="salesSupport"
                      label="销售支持"
                      :formatter="percentFormatter"
                      align="right"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="ckd"
                      label="CKD部分材料成本"
                      align="right"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="lc"
                      label="LC部分材料成本"
                      align="right"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="investProd"
                      label="产品投资"
                      align="right"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="costState"
                      label="费用情况"
                      align="right"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="kpePercent"
                      label="KPE(%)"
                      align="right"
                      :formatter="percentFormatter"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="mileStone"
                      label="里程碑"
                      align="center"
                      min-width="80">
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
  import {getBrand,getHeziProReview} from '@/api/common/proReview.js';

  export default {
    data(){
      return{
        moduleName:'项目回顾',
        nfOptions: [],
        yearSelect: new Date().getFullYear(),
        monthSelect: new Date().getMonth()+1,
        tagSelect: '0',
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
        proNameArr:[]  ,//产品
        heziProReviewList:[] //项目回顾数据
      }
   },
   created() {
     // 获取本年及前后一年的数组
     this.getNf()
     //初始化品牌下拉
     this.initBussinessSel()
     //初始化阶段下拉
     this.initTagOptions()
     // 获取页面留言
     this.getMessage()
   },
   methods:{
     //初始化项目回顾
     initHeziProReview(){
       this.requestParams.brandId = this.businessSelect
       this.requestParams.year = this.yearSelect
       this.requestParams.month = this.monthSelect
       this.requestParams.tag = this.tagSelect
       getHeziProReview(this.requestParams).then(res => {
         this.heziProReviewList = res.data
         //加载Echarts
         if(this.tagSelect == '0'){
           this.draw1()
         }else if(this.tagSelect == '1'){
           this.draw2()
           this.draw3()
         }else if(this.tagSelect == '2'){
           this.draw2()
           this.draw4()
         }
       }).catch(error => {
         console.log(error)
         reject(error)
       })
     },
     // 获取本年及前后一年的数组
     getNf(){
      var nfOptionsArray = new Array();
      var years= new Date().getFullYear();
      for(var i=years-1; i<= years+1; i++){
        var anOption = {};
        anOption.dictValue=i;
        anOption.dictLabel=i;
        nfOptionsArray.push(anOption);
      }
        this.nfOptions = nfOptionsArray;
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
     //初始化阶段下拉
     initTagOptions(){
       if(this.businessSelect == '2'){
         this.tagOptions = [{
                   label:'PD~EOP',
                   value:'2'
                 }
               ]
       }else{
         this.tagOptions = [{
                   label:'SOP后',
                   value:'0'
                 },
                 {
                   label:'PD~SOP',
                   value:'1'
                 },
               ]
       }
     },
     //选择品牌
     businessChange(e){
       if(e == '2'){
         this.tagSelect = '2'
       }else{
         this.tagSelect = '0'
       }
       let obj = {}
       obj = this.businessNameArr.find((item) => {
        return item.brandId === e;
       });
       //获取当前选择的品牌名称
       this.brandName = obj.brandName
       this.initTagOptions()
       this.initHeziProReview()
     },
     // 选择年份
     yearChange(e){
       this.yearSelect = e
       this.initHeziProReview()
     },
     // 选择月份
     monthChange(e){
       this.monthSelect = e
       this.initHeziProReview()
     },
     // 选择阶段
     tagChange(e){
       this.tagSelect = e
       this.initHeziProReview()
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
     // 折线图
     draw1() {
       var feasibleSalesArr = []
       var feasibleRateArr = []
       var actualSalesArr = []
       var actualRateArr = []
       var proNameArr = []
       if(this.heziProReviewList != null){
         // 可研销量
         feasibleSalesArr = this.heziProReviewList.map(function (item) {
           return item.feasibleSales
         })
         // 可研利润率
         feasibleRateArr = this.heziProReviewList.map(function (item) {
           return item.feasibleRate
         })
         // 实际销量
         actualSalesArr = this.heziProReviewList.map(function (item) {
           return item.actualSales
         })
         // 实际利润率
         actualRateArr = this.heziProReviewList.map(function (item) {
           return item.actualRate
         })
         // 产品
         proNameArr = this.heziProReviewList.map(function (item) {
           return item.proName
         })
       }
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
          grid: {
            height: '60%',
            width: '80%'
          },
           legend: {
               data: ['可研销量','实际销量','可研利润率','实际利润率']
           },
           xAxis: [
               {
                   type: 'category',
                   data: proNameArr,
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
                     formatter: '{value}%'
                 }
             }
           ],
           series: [
               {
                   name: '可研销量',
                   type: 'bar',
                   data: feasibleSalesArr,
                   yAxisIndex: 0,
                   itemStyle: {
                     color: '#ff5500'
                   },
               },
               {
                   name: '实际销量',
                   type: 'bar',
                   data: actualSalesArr,
                   yAxisIndex: 0,
                   itemStyle: {
                     color: '#82d1ec'
                   },
               },
               {
                   name: '可研利润率',
                   type: 'line',
                   data: feasibleRateArr,
                   yAxisIndex: 1,
                   itemStyle: {
                     color: '#ffaa7f'
                   },
               },
               {
                   name: '实际利润率',
                   type: 'line',
                   data: actualRateArr,
                   yAxisIndex: 1,
                   itemStyle: {
                     color: '#aaaa7f'
                   },
               }
           ]
         }
         var myChart1 = echarts.init(document.getElementById('chart1'))
         myChart1.setOption(echartsOption1)
     },
     draw2() {
       var kpeArr = []
       var fzgArr = []
       var mileStoneArr = []
       if(this.heziProReviewList != null){
         // KPE
         kpeArr = this.heziProReviewList.map(function (item) {
           return item.kpePercent
         })
         // 销量规划
         fzgArr = this.heziProReviewList.map(function (item) {
           return item.fzg
         })
         // 里程碑
         mileStoneArr = this.heziProReviewList.map(function (item) {
           return item.mileStone
         })
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
          grid: {
            height: '60%',
            width: '80%',
            left: '55px'
          },
          xAxis: [
              {
                  type: 'category',
                  data: mileStoneArr,
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
                      formatter: '{value}%'
                  }
              }
          ],
          series: [
              {
                  name: '销量规划',
                  type: 'bar',
                  data: fzgArr,
                  itemStyle: {
                    color: '#82d1ec'
                  },
                  label: {
                    show: true
                  }
              },
              {
                  name: 'KPE',
                  type: 'line',
                  yAxisIndex: 1,
                  data: kpeArr,
                  itemStyle: {
                    color: '#ffaa00'
                  },
                  label: {
                    show: true
                  }
              }
          ]
      }
      var myChart2 = echarts.init(document.getElementById('chart2'))
      myChart2.setOption(echartsOption2)
     },
     draw3() {
       var mileStoneArr = []
       var licenseFeeOnceArr = []
       var licensePercentArr = []
       if(this.heziProReviewList != null){
         // 里程碑
         mileStoneArr = this.heziProReviewList.map(function (item) {
           return item.mileStone
         })
         // 一次性许可费
         licenseFeeOnceArr = this.heziProReviewList.map(function (item) {
           return item.licenseFeeOnce
         })
         // 总许可费占比
         licensePercentArr = this.heziProReviewList.map(function (item) {
           return item.licensePercent
         })
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
              data: ['一次性许可费', '总许可费占比'],
              left:'180px'
          },
          grid: {
            height: '60%',
            width: '80%'
          },
          xAxis: [
              {
                  type: 'category',
                  data: mileStoneArr,
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
                      formatter: '{value}%'
                  }
              }
          ],
          series: [
              {
                  name: '一次性许可费',
                  type: 'bar',
                  data: licenseFeeOnceArr,
                  itemStyle: {
                    color: '#82d1ec'
                  },
              },
              {
                  name: '总许可费占比',
                  type: 'line',
                  yAxisIndex: 1,
                  data: licensePercentArr,
                  itemStyle: {
                    color: '#ffaa00'
                  },
              }
          ]
      }
      var myChart2 = echarts.init(document.getElementById('chart3'))
      myChart2.setOption(echartsOption2)
     },
     draw4() {
       var mileStoneArr = []
       var mainPriceArr = []
       var salesSupportArr = []
       var ckdArr = []
       var lcArr = []
       if(this.heziProReviewList != null){
         // 里程碑
         mileStoneArr = this.heziProReviewList.map(function (item) {
           return item.mileStone
         })
         // 主力车型售价
         mainPriceArr = this.heziProReviewList.map(function (item) {
           return item.mainPrice
         })
         // 销售支持
         salesSupportArr = this.heziProReviewList.map(function (item) {
           return item.salesSupport
         })
         // CKD部分材料成本
         ckdArr = this.heziProReviewList.map(function (item) {
           return item.ckd
         })
         // LC部分材料成本
         lcArr = this.heziProReviewList.map(function (item) {
           return item.lc
         })
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
              data: ['主力车型售价', '销售支持']
          },
          grid: {
            height: '60%',
            width: '80%',
            left: '60px'
          },
          xAxis: [
              {
                  type: 'category',
                  data: mileStoneArr,
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
                      formatter: '{value}%'
                  }
              }
          ],
          series: [
              {
                  name: '主力车型售价',
                  type: 'bar',
                  data: mainPriceArr,
                  itemStyle: {
                    color: '#82d1ec'
                  },
              },
              {
                  name: '销售支持',
                  type: 'line',
                  yAxisIndex: 1,
                  data: salesSupportArr,
                  itemStyle: {
                    color: '#ffaa00'
                  },
              }
          ]
      }
      var myChart3 = echarts.init(document.getElementById('chart4'))
      myChart3.setOption(echartsOption3)
      var echartsOption4 = {
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
              data: ['CKD部分材料成本', 'LC部分材料成本'],
              left: '155px'
          },
          grid: {
            height: '60%',
            width: '60%',
            left: '60px'
          },
          xAxis: [
              {
                  type: 'category',
                  data: mileStoneArr,
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
                      formatter: '{value}%'
                  }
              }
          ],
          series: [
              {
                  name: 'CKD部分材料成本',
                  type: 'bar',
                  data: ckdArr,
                  itemStyle: {
                    color: '#82d1ec'
                  },
                  label: {
                    show: true
                  }
              },
              {
                  name: 'LC部分材料成本',
                  type: 'line',
                  yAxisIndex: 1,
                  data: lcArr,
                  itemStyle: {
                    color: '#ffaa00'
                  },
                  label: {
                    show: true
                  }
              }
          ]
        }
      var myChart4 = echarts.init(document.getElementById('chart5'))
      myChart4.setOption(echartsOption4)
     },
     // 数字格式化成百分比
     percentFormatter(row, column, cellValue, index) {
       if (cellValue==0 || cellValue==-0 || isNaN(cellValue) ) {
           return 0
       }
       return cellValue + '%'
     },
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
  .demo-table-expand {
     font-size: 0;
   }
   .demo-table-expand label {
     width: 90px;
     color: #99a9bf;
   }
   .demo-table-expand .el-form-item {
     margin-right: 0;
     margin-bottom: 0;
     width: 50%;
   }
</style>
