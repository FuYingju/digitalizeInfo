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
              <el-col :span="12" style="margin-top: 35px;margin-bottom: 35px;">
                <div id="chart1" class="chartBox"></div>
              </el-col>
              <el-col :span="12" style="margin-top: 35px;margin-bottom: 35px;" v-show="this.businessSelect != '2'">
                <div id="chart2" class="chartBox"></div>
              </el-col>
              <el-col :span="12" style="margin-top: 35px;margin-bottom: 35px;" v-show="this.businessSelect == '2'">
                <div id="chart3" class="chartBox"></div>
              </el-col>
              <el-col :span="12" style="margin-top: 35px;margin-bottom: 35px;" v-show="this.businessSelect == '2'">
                <div id="chart4" class="chartBox"></div>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 35px;" v-show="this.businessSelect != '2'">
              <el-col :span="24">
                <el-table
                  :data="newProleadList"
                  border
                  row-key="id"
                  :header-cell-style="{'text-align':'center'}"
                  :row-style="{height:'20px'}"
                  :cell-style="{padding:'0px'}"
                  style="font-size: 10px;width: 100%;">
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                          <el-form-item label="hut">
                            <span>{{ props.row.hut || '-' }}</span>
                          </el-form-item>
                          <el-form-item label="平台分摊">
                            <span>{{ props.row.platformShar || '-' }}</span>
                          </el-form-item>
                          <el-form-item label="MIB/I CAS 3 分摊">
                            <span>{{ props.row.mib || '-' }}</span>
                          </el-form-item>
                          <el-form-item label="ICAS 3中国专有">
                            <span>{{ props.row.icas || '-' }}</span>
                          </el-form-item>
                          <el-form-item label="ENP P">
                            <span>{{ props.row.enpP || '-' }}</span>
                          </el-form-item>
                          <el-form-item label="ENP Q">
                            <span>{{ props.row.enpQ || '-' }}</span>
                          </el-form-item>
                          <el-form-item label="ENP VSC">
                            <span>{{ props.row.enpVsc || '-' }}</span>
                          </el-form-item>
                          <el-form-item label="FAS Module">
                            <span>{{ props.row.fasModule || '-' }}</span>
                          </el-form-item>
                          <el-form-item label="HUT Module">
                            <span>{{ props.row.hutModule || '-' }}</span>
                          </el-form-item>
                          <el-form-item label="中国专有平台">
                            <span>{{ props.row.proprietaryPlatform || '-' }}</span>
                          </el-form-item>
                          <el-form-item label="中国专有平台分摊">
                            <span>{{ props.row.proprietaryPlatformShar || '-' }}</span>
                          </el-form-item>
                          <el-form-item label="SEL">
                            <span>{{ props.row.sel || '-' }}</span>
                          </el-form-item>
                          <el-form-item label="Lokaliesirung">
                            <span>{{ props.row.lokaliesirung || '-' }}</span>
                          </el-form-item>
                        </el-form>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="vehicleMode"
                      label="细分市场"
                      align="right"
                      min-width="75">
                    </el-table-column>
                    <el-table-column
                      prop="sopTime"
                      label="SOP时间"
                      align="right"
                      min-width="60">
                    </el-table-column>
                    <el-table-column
                      prop="level"
                      label="级别"
                      align="right"
                      min-width="40">
                    </el-table-column>
                    <el-table-column
                      prop="length"
                      label="长-宽-高-轴距（mm)"
                      align="right"
                      :formatter="lwhwFormatter"
                      min-width="130">
                    </el-table-column>
                    <el-table-column
                      prop="fzg"
                      label="销量规划"
                      align="right"
                      min-width="60">
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
                      min-width="70">
                    </el-table-column>
                    <el-table-column
                      prop="licensePercent"
                      label="总许可费占比"
                      align="right"
                      :formatter="percentFormatter"
                      min-width="80">
                    </el-table-column>
                    <el-table-column
                      prop="kpe"
                      label="KPE"
                      align="right"
                      :formatter="percentFormatter"
                      min-width="60">
                    </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 35px;" v-show="this.businessSelect == '2'">
              <el-col :span="24">
                <el-table
                  :data="newProleadList"
                  border
                  row-key="id"
                  :header-cell-style="{'text-align':'center'}"
                  :row-style="{height:'20px'}"
                  :cell-style="{padding:'0px'}"
                  style="font-size: 10px;width: 100%;">
                  <el-table-column
                    prop="vehicleMode"
                    label="细分市场"
                    align="right"
                    min-width="90">
                  </el-table-column>
                    <el-table-column
                      prop="sopTime"
                      label="SOP时间"
                      align="right"
                      min-width="70">
                    </el-table-column>
                    <el-table-column
                      prop="level"
                      label="级别"
                      align="right"
                      min-width="50">
                    </el-table-column>
                    <el-table-column
                      prop="length"
                      label="长-宽-高-轴距（mm)"
                      align="right"
                      :formatter="lwhwFormatter"
                      min-width="140">
                    </el-table-column>
                    <el-table-column
                      prop="fzg"
                      label="销量规划"
                      align="right"
                      min-width="70">
                    </el-table-column>
                    <el-table-column
                      prop="mainPrice"
                      label="主力车型售价"
                      align="right"
                      min-width="95">
                    </el-table-column>
                    <el-table-column
                      prop="dealerCommision"
                      label="经销商佣金"
                      align="right"
                      min-width="85">
                    </el-table-column>
                    <el-table-column
                      prop="salesSupport"
                      label="销售支持"
                      align="right"
                      min-width="70">
                    </el-table-column>
                    <el-table-column
                      prop="ckd100"
                      label="100%CKD价格"
                      align="right"
                      min-width="105">
                    </el-table-column>
                    <el-table-column
                      prop="lcr"
                      label="LCR"
                      align="right"
                      :formatter="percentFormatter"
                      min-width="55">
                    </el-table-column>
                    <el-table-column
                      prop="lbi"
                      label="LBI"
                      align="right"
                      min-width="55">
                    </el-table-column>
                    <el-table-column
                      prop="importedMaterialsCost"
                      label="进口材料成本"
                      align="right"
                      min-width="95">
                    </el-table-column>
                    <el-table-column
                      prop="domesticMaterialsCost"
                      label="国产化材料成本"
                      align="right"
                      min-width="110">
                    </el-table-column>
                    <el-table-column
                      prop="licenceFeeCar"
                      label="单车许可费"
                      align="right"
                      min-width="85">
                    </el-table-column>
                    <el-table-column
                      prop="compensate"
                      label="补偿"
                      align="right"
                      min-width="50">
                    </el-table-column>
                    <el-table-column
                      prop="directCost"
                      label="直接成本"
                      align="right"
                      min-width="70">
                    </el-table-column>
                    <el-table-column
                      prop="depreciationShare"
                      label="折旧分摊"
                      align="right"
                      min-width="70">
                    </el-table-column>
                    <el-table-column
                      prop="licenseFeeOnce"
                      label="一次性许可费"
                      align="right"
                      min-width="95">
                    </el-table-column>
                    <el-table-column
                      prop="adRate"
                      label="广告费"
                      align="right"
                      min-width="60">
                    </el-table-column>
                    <el-table-column
                      prop="fawFee"
                      label="一汽-大众管理费"
                      align="right"
                      min-width="110">
                    </el-table-column>
                    <el-table-column
                      prop="kpe"
                      label="KPE"
                      align="right"
                      :formatter="percentFormatter"
                      min-width="60">
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
  import {getHeziNewProlead, getHeziNewProleadParams} from '@/api/common/newProlead.js';

  export default {
    data(){
      return{
        moduleName:'新产品导入',
        nfOptions: [],
        yearSelect: new Date().getFullYear(),
        monthSelect: new Date().getMonth()+1,
        requestParams: {},
        messageRequestParams: {}, // 留言请求参数
        content: '', // 留言内容
        contentList: [], //留言内容列表
        businessSelect: '', //选中品牌的id
        businessNameArr: [] ,//品牌列表
        newProleadList:[] //新产品导入数据
      }
   },
   created(){
     this.getNf()
     this.getMessage()
     this.initBussinessSel()
   },
   methods:{
     // 初始化新产品导入数据
     initNewProlead(){
       this.requestParams.year = this.yearSelect
       this.requestParams.brandId = this.businessSelect
       getHeziNewProlead(this.requestParams).then(res => {
         this.newProleadList = res.data
         if(this.businessSelect == '2'){
           this.drawAudi()
         }else{
           this.draw()
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
     // 选择年份
     yearChange(e){
       this.yearSelect = e
       this.initNewProlead()
     },
     // 选择月份
     monthChange(e){
       this.monthSelect = e
       this.initNewProlead()
     },
     // 选择品牌
     businessChange(e){
       this.initNewProlead()
     },
     // 初始化品牌下拉
     initBussinessSel(){
       getHeziNewProleadParams().then(res => {
         this.businessNameArr = res.data
         if(this.businessNameArr != null){
           this.businessSelect = this.businessNameArr[0].brandId // 预选中第一项
           this.initNewProlead()
         }
       }).catch(error => {
         console.log(error)
         reject(error)
       })
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
     draw() {
       var kpeArr = []
       var fzgArr = []
       var vehicleModeArr = []
       var licenseFeeOnceArr = []
       var licensePercentArr = []
       if(this.newProleadList != null){
         // KPE
         kpeArr = this.newProleadList.map(function (item) {
           return item.kpe
         })
         // 销量规划
         fzgArr = this.newProleadList.map(function (item) {
           return item.fzg
         })
         // 里程碑
         vehicleModeArr = this.newProleadList.map(function (item) {
           return item.vehicleMode
         })
         // 一次性许可费
         licenseFeeOnceArr = this.newProleadList.map(function (item) {
           return item.licenseFeeOnce
         })
         // 总许可费占比
         licensePercentArr = this.newProleadList.map(function (item) {
           return item.licensePercent
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
          legend: {
              data: ['销量规划', 'KPE']
          },
          grid: {
            height: '60%',
            width: '75%',
            left:'70px'
          },
          xAxis: [
              {
                  type: 'category',
                  data: vehicleModeArr,
                  axisPointer: {
                      type: 'shadow'
                  },
                  axisLabel : {
                      interval:0 // 坐标轴刻度标签的显示间隔(设置为0强制显示所有标签)
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
              },
              {
                  name: 'KPE',
                  type: 'line',
                  yAxisIndex: 1,
                  data: kpeArr,
                  itemStyle: {
                    color: '#ffaa00'
                  },
              }
          ]
      }
       var myChart = echarts.init(document.getElementById('chart1'))
       myChart.setOption(echartsOption1)

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
              data: ['一次性许可费', '总许可费占比']
          },
          grid: {
            height: '60%',
            width: '80%'
          },
          xAxis: [
              {
                  type: 'category',
                  data: vehicleModeArr,
                  axisPointer: {
                      type: 'shadow'
                  },
                  axisLabel : {
                      interval:0 // 坐标轴刻度标签的显示间隔(设置为0强制显示所有标签)
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
       var myChart2 = echarts.init(document.getElementById('chart2'))
       myChart2.setOption(echartsOption2)
     },
     drawAudi(){
      var kpeArr = []
       var fzgArr = []
       var vehicleModeArr = []
       var ckdArr = []
       var lcrArr = []
       var licenceFeeCarArr = []
       var compensateArr = []
       if(this.newProleadList != null){
         // 里程碑
         vehicleModeArr = this.newProleadList.map(function (item) {
           return item.vehicleMode
         })
         // KPE
         kpeArr = this.newProleadList.map(function (item) {
           return item.kpe
         })
         // 销量规划
         fzgArr = this.newProleadList.map(function (item) {
           return item.fzg
         })
         // 100%CDK价格
         ckdArr = this.newProleadList.map(function (item) {
           return item.ckd100
         })
         // LCR
         lcrArr = this.newProleadList.map(function (item) {
           return item.lcr
         })
         // 单车许可费
         licenceFeeCarArr = this.newProleadList.map(function (item) {
           return item.licenceFeeCar
         })
         // 补偿
         compensateArr = this.newProleadList.map(function (item) {
           return item.compensate
         })
       }
       var echartsOption1 = {
         title: {
           text: '销量及KPE',
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
              data: ['销量规划', 'KPE']
          },
          grid: {
            height: '60%',
            width: '75%'
          },
          xAxis: [
              {
                  type: 'category',
                  data: vehicleModeArr,
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
              },
              {
                  name: 'KPE',
                  type: 'line',
                  yAxisIndex: 1,
                  data: kpeArr,
                  itemStyle: {
                    color: '#ffaa00'
                  },
              }
          ]
      }
       var myChart = echarts.init(document.getElementById('chart1'))
       myChart.setOption(echartsOption1)
       var echartsOption3 = {
         title: {
           text: 'CKD及LCR',
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
               data: ['100%CDK价格', 'LCR']
           },
           grid: {
             height: '60%',
             width: '80%'
           },
           xAxis: [
               {
                   type: 'category',
                   data: vehicleModeArr,
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
                   name: '100%CDK价格',
                   type: 'bar',
                   data: ckdArr,
                   itemStyle: {
                     color: '#82d1ec'
                   },
               },
               {
                   name: 'LCR',
                   type: 'line',
                   yAxisIndex: 1,
                   data: lcrArr,
                   itemStyle: {
                     color: '#ffaa00'
                   },
               }
           ]
       }
        var myChart3 = echarts.init(document.getElementById('chart3'))
        myChart3.setOption(echartsOption3)
        var echartsOption4 = {
          title: {
            text: '补偿及许可',
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
                data: ['单车许可费', '补偿']
            },
            grid: {
              height: '60%',
              width: '80%'
            },
            xAxis: [
                {
                    type: 'category',
                    data: vehicleModeArr,
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
                    name: '单车许可费',
                    type: 'bar',
                    data: licenceFeeCarArr,
                    itemStyle: {
                      color: '#82d1ec'
                    },
                },
                {
                    name: '补偿',
                    type: 'line',
                    yAxisIndex: 1,
                    data: compensateArr,
                    itemStyle: {
                      color: '#ffaa00'
                    },
                }
            ]
        }
         var myChart4 = echarts.init(document.getElementById('chart4'))
         myChart4.setOption(echartsOption4)
     },
     // 数字格式化成百分比
     percentFormatter(row, column, cellValue, index) {
       if (cellValue==0 || cellValue==-0 || isNaN(cellValue) ) {
           return 0
       }
       return cellValue + '%'
     },
     lwhwFormatter(row, column, cellValue, index){
       return row.length+'-'+row.width+'-'+row.height+'-'+row.wheel
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
  .container{margin: 0 15px;}
  .chartBox {height: 200px;}
  .img-box{text-align: center;}
  .linkItem{line-height: 35px;margin: 10px;}
  h5{margin: 0;font-size: 14px;}
  .message{margin: 10px;font-size: 12px;}
  img{width: 100%;}
  .linkItem2{line-height: 10px;margin: 10px;}
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
