<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <div class="box">
            <div class="title">
              <h4>信息列表</h4>
            </div>
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
              <span>市场</span>
              <el-select v-model="businessSelect" placeholder="请选择" size="mini" class="select" @change="businessChange">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <el-row style="margin-bottom: 35px;">
            <el-col :span="24">
              <div id="chart1" class="chartBox"></div>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 35px;">
            <el-col :span="24" class="main-title">
              <p><h5>{{this.businessSelect}}车市场销量</h5></p>
              <el-table
                :data="transPerformanceList"
                border
                center
                row-key="index"
                :header-cell-style="{'text-align':'center'}"
                :row-style="{height:'20px'}"
                :cell-style="{padding:'0px'}"
                style="font-size: 10px;width: 90%;">
                    <el-table-column
                      v-for="(item, index) in monthTitle"
                      :key="index"
                      :prop="item"
                      :label="item"
                      align="right"
                      :min-width="30"
                     >
                       <template slot-scope="scope" >
                            <span>{{ scope.row[index] }}</span>
                        </template>
                    </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 35px;">
            <el-col :span="24">
              <div id="chart2" class="chartBox"></div>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 35px;">
            <el-col :span="24" class="main-title">
              <p><h5>折扣表现</h5></p>
              <el-table
                :data="brandDiscountArr"
                border
                row-key="id"
                :header-cell-style="{'text-align':'center'}"
                :row-style="{height:'20px'}"
                :cell-style="{padding:'0px'}"
                style="font-size: 10px;width: 100%;">
                  <el-table-column
                    prop="brandName"
                    label=""
                    align="right"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="month1"
                    label="1月"
                    align="right"
                    min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="month2"
                    label="2月"
                    align="right"
                    min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="month3"
                    label="3月"
                    align="right"
                    min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="month4"
                    label="4月"
                    align="right"
                    min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="month5"
                    label="5月"
                    align="right"
                    min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="month6"
                    label="6月"
                    align="right"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    prop="month7"
                    label="7月"
                    align="right"
                    min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="month8"
                    label="8月"
                    align="right"
                    min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="month9"
                    label="9月"
                    align="right"
                    min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="month10"
                    label="10月"
                    align="right"
                    min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="month11"
                    label="11月"
                    align="right"
                    min-width="50">
                  </el-table-column>
                  <el-table-column
                    prop="month12"
                    label="12月"
                    align="right"
                    min-width="50">
                  </el-table-column>
              </el-table>
            </el-col>
          </el-row>
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
  import {getHeziBrandPerformance} from '@/api/common/brandPerformance.js';
  import {getHeziBrandDiscount} from '@/api/common/brandDiscount.js';
  import {getHeziComments} from '@/api/common/comments.js';

  export default {
    data() {
      return {
        moduleName:'品牌表现',
        nfOptions: [],
        options2: [{
          value: '乘用车',
          label: '乘用车'
        }, {
          value: '豪华车',
          label: '豪华车'
        }],
        yearSelect: new Date().getFullYear(),
        monthSelect: new Date().getMonth()+1,
        businessSelect: '乘用车',
        requestParams: {}, // 请求参数
        heziBrandPerformanceList: [] ,// 品牌表现-市场销量数据
        lastYearSalesArr: [], // 上一年销量数组
        nextYearSalesArr: [], // 下一年销量数组
        brandDiscountList: [] , // 品牌表现_折扣数据
        brandDiscountArr: [] , // 重新组合后的品牌折扣数据
        brandNameArr: [], //品牌折扣数据中的所有品牌名字数组
        messageRequestParams: {}, // 留言请求参数
        content: '', // 留言内容
        contentList: [] ,//留言内容列表
        transPerformanceList:[],
        monthTitle: ['', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      }
    },
    created() {
      // 获取本年及前后一年的数组
      this.getNf()
      // 获取页面留言
      this.getMessage()
      //加载市场销量数据
      this.initHeziBrandPerformance()
      //加载折扣数据
      this.initHeziBrandDiscount()
    },
    methods: {
      //加载市场销量数据
      initHeziBrandPerformance(){
        this.requestParams = {}
        this.requestParams.nextYear = this.yearSelect
        this.requestParams.month = this.monthSelect
        this.requestParams.tag = this.businessSelect
        getHeziBrandPerformance(this.requestParams).then(res => {
          this.heziBrandPerformanceList = res.data
          if(this.heziBrandPerformanceList !=  null){
              let arr1 = []
              let arr2 = []
              //遍历对象数组获取nextYear和lastYear的值，所有的都一样，所以只遍历一次就够了
              for(let key in this.heziBrandPerformanceList[0]){
                if(key == 'lastYear'){
                  arr1[0] = this.heziBrandPerformanceList[0][key]
                }
                if(key == 'nextYear'){
                  arr2[0] = this.heziBrandPerformanceList[0][key]
                }
              }
              //遍历对象数组将所有的月销量属性值取出来，放到一个数组里面
              this.lastYearSalesArr = this.heziBrandPerformanceList.map(function (item) {
                arr1.push(item.lastYearSales)
                return item.lastYearSales
              })
              this.nextYearSalesArr = this.heziBrandPerformanceList.map(function (item) {
                arr2.push(item.nextYearSales)
                return item.nextYearSales
              })
              this.transPerformanceList.push(arr1)
              this.transPerformanceList.push(arr2)
          }else{
            this.heziBrandPerformanceList = []
            this.lastYearSalesArr = []
            this.nextYearSalesArr = []
          }
          this.draw1()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      },
      //加载折扣数据
      initHeziBrandDiscount(){
        this.requestParams = {}
        this.requestParams.year = this.yearSelect
        this.requestParams.tag = this.businessSelect
        getHeziBrandDiscount(this.requestParams).then(res => {
          this.brandDiscountList = res.data
          if(this.brandDiscountList != null){
            var brandDiscountArr = [] // 重新组合的品牌数据数组
            var discountObj = {} //各品牌每月销量对象
            var brandNameSet = new Set(); // 所有品牌
            this.brandDiscountList.forEach(x => brandNameSet.add(x.brandName))
            for (let s of brandNameSet.keys()) {
              discountObj = {}
              this.brandDiscountList.forEach(item => {
                if(item.brandName === s){
                  discountObj.brandName = item.brandName
                  if(item.month == '1'){
                    discountObj.month1 = item.discountRate
                  }
                  if(item.month == '2'){
                    discountObj.month2 = item.discountRate
                  }
                  if(item.month == '3'){
                    discountObj.month3 = item.discountRate
                  }
                  if(item.month == '4'){
                    discountObj.month4 = item.discountRate
                  }
                  if(item.month == '5'){
                    discountObj.month5 = item.discountRate
                  }
                  if(item.month == '6'){
                    discountObj.month6 = item.discountRate
                  }
                  if(item.month == '7'){
                    discountObj.month7 = item.discountRate
                  }
                  if(item.month == '8'){
                    discountObj.month8 = item.discountRate
                  }
                  if(item.month == '9'){
                    discountObj.month9 = item.discountRate
                  }
                  if(item.month == '10'){
                    discountObj.month10 = item.discountRate
                  }
                  if(item.month == '11'){
                    discountObj.month11 = item.discountRate
                  }
                  if(item.month == '12'){
                    discountObj.month12 = item.discountRate
                  }
                }
              })
              brandDiscountArr.push(discountObj)
            }
            this.brandDiscountArr = brandDiscountArr
            this.brandNameArr = Array.from(brandNameSet)
          }else{
            this.brandDiscountList = []
            this.brandDiscountArr = []
          }
          this.draw2()
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
        this.initHeziBrandPerformance()
        this.initHeziBrandDiscount()
      },
      // 选择月份
      monthChange(e){
        this.monthSelect = e
      },
      // 选择市场
      businessChange(e){
        this.businessSelect = e
        this.initHeziBrandPerformance()
        this.initHeziBrandDiscount()
      },
      // 数字格式化成百分比
      percentFormatter(row, column, cellValue, index) {
        if (cellValue==0 || cellValue==-0 || isNaN(cellValue) ) {
            return 0
        }
        var str = ( cellValue * 100 ).toFixed(2) + "%";
        return str
      },
      // 市场销量折线图
      draw1() {
        var echartsOption1 = {
          // title: {
          //   text: this.businessSelect + '车市场销量',
          //   textStyle: {
          //     fontSize: 13
          //   }
          // },
          tooltip: {
            trigger: 'axis'   // axis   item   none三个值
          },
          grid: {
            height: '60%',
            width: '70%'
          },
          legend: {
            orient: 'horizontal',
          },
          xAxis: {
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLabel : {
                interval:0 // 坐标轴刻度标签的显示间隔(设置为0强制显示所有标签)
            }
          },
          yAxis: {},
          series: [{
              name: String(parseInt(this.yearSelect)-1),
              type: 'line',
              data: this.lastYearSalesArr,
              itemStyle: {
                color: '#82d1ec'
              },
              label: {
                show: true
              }
            },
            {
              name: this.yearSelect,
              type: 'line',
              data: this.nextYearSalesArr,
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
      // 折扣数据折线图
      draw2(){
        //转换Series
        var temp = {}
        var tmp = []
        this.brandDiscountArr.forEach(item =>{
          var arr = []
          for(let key in item){
            if(key == 'month1'){
              arr[0] = item[key].replace('%','')
            }
            if(key == 'month2'){
              arr[1] = item[key].replace('%','')
            }
            if(key == 'month3'){
              arr[2] = item[key].replace('%','')
            }
            if(key == 'month4'){
              arr[3] = item[key].replace('%','')
            }
            if(key == 'month5'){
              arr[4] = item[key].replace('%','')
            }
            if(key == 'month6'){
              arr[5] = item[key].replace('%','')
            }
            if(key == 'month7'){
              arr[6] = item[key].replace('%','')
            }
            if(key == 'month8'){
              arr[7] = item[key].replace('%','')
            }
            if(key == 'month9'){
              arr[8] = item[key].replace('%','')
            }
            if(key == 'month10'){
              arr[9] = item[key].replace('%','')
            }
            if(key == 'month11'){
              arr[10] = item[key].replace('%','')
            }
            if(key == 'month12'){
              arr[11] = item[key].replace('%','')
            }
          }
          temp = {
            name: item.brandName,
            type: 'line',
            data: arr,
            label: {
              show: true
            }
          }
          tmp.push(temp)
        })
        var echartsOption2 = {
          // title: {
          //   text: '折扣表现',
          //   textStyle: {
          //     fontSize: 13
          //   }
          // },
          grid: {
            height: '60%',
            width: '70%'
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
            data:this.brandNameArr
          },
          xAxis: {
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLabel : {
                interval:0 // 坐标轴刻度标签的显示间隔(设置为0强制显示所有标签)
            }
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: '{value} %'
              }
          },
          series: tmp
        }
        var myChart2 = echarts.init(document.getElementById('chart2'));
        myChart2.setOption(echartsOption2)
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

  h4 {
    padding: 0;
    margin: 0;
  }

  .selectBox {
    margin: 10px;
    display: flex;
  }

  .selectBox span {
    font-size: 14px;
    width: 30%;
    line-height: 28px;
  }

  .selectBox .select {
    width: 70%;
  }

  .buttonGroup {
    position: absolute;
    left: 50%;
    bottom: 50px;
    margin-left: -50px;
  }

  .container {
    margin: 0 15px;
  }

  .linkItem {
    line-height: 35px;
    margin: 10px;
  }

  h5 {
    margin: 0;
    font-size: 14px;
  }

  .message {
    margin: 10px;
    font-size: 12px;
  }

  img {
    width: 100%;
    height: 120px;
  }

  .chartBox {
    height: 200px;
  }

  .descript {
    font-size: 12px;
    background-color: #EEEEEE;
    margin: 0 5px;
    padding: 0 5px;
  }
</style>
