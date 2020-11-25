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
              <el-select v-model="yearSelect" placeholder="请选择" size="mini" class="select" @change="changeSel">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="selectBox">
              <span>月度</span>
              <el-select v-model="monthSelect" placeholder="请选择" size="mini" class="select" @change="changeSel">
                <el-option v-for="item in 12" :key="item.index" :label="item" :value="item">
                </el-option>
              </el-select>
            </div>
            <div class="selectBox">
              <span>企业</span>
              <el-select v-model="businessSelect" placeholder="请选择" size="mini" class="select" @change="changeSel">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="buttonGroup">
              <Buttongroup />
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <el-row>
            <el-col :span="24">
              <div>{{this.businessSelect}}车市场销量</div>
              <el-table
                    :data="heziBrandPerformanceList"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="month"
                      label=""
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="lastYearSales"
                      :label="String(parseInt(yearSelect)-1)"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="nextYearSales"
                      :label="String(yearSelect)"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="growthRate"
                      label="同比增速"
                      width="120">
                    </el-table-column>
                  </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div id="chart1" class="chartBox"></div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div>{{this.businessSelect}}车市场行业表现（AaK）</div>
              <el-table
                :data="heziMarketRankingList"
                row-key="id"
                style="width: 100%">
                <el-table-column
                  prop="brandName"
                  label="厂商品牌"
                  width="100">
                </el-table-column>
                <el-table-column :label="String(monthSelect)+'月'">
                  <el-table-column
                    prop="monthlySalesRanking"
                    label="排名"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    prop="monthlySales"
                    label="销量"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    prop="monthYoychangeCompare"
                    label="同比变化"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    prop="monthMarketShare"
                    label="市场份额"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    prop="monthShareMonthOnMonth"
                    label="份额环比"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    prop="monthYearOnYearShare"
                    label="份额同比"
                    width="50">
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="'1-'+String(monthSelect)+'月'">
                  <el-table-column
                    prop="shareRanking"
                    label="排名"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    prop="salesMonthAgo"
                    label="销量"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    prop="monthlyChange"
                    label="同比变化"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    prop="marketShare"
                    label="累计份额"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    prop="yearOnYearShare"
                    label="份额同比"
                    width="50">
                  </el-table-column>
                </el-table-column>
              </el-table>
              <div>大众品牌与主要竞品折扣情况</div>
              <el-table
                :data="brandDiscountArr"
                border
                row-key="id"
                style="width: 100%">
                <el-table-column
                  prop="brandName"
                  label=""
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="Jan"
                  label="1月"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="Feb"
                  label="2月"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="Mar"
                  label="3月"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="Apr"
                  label="4月"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="May"
                  label="5月"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="Jun"
                  label="6月"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="Jul"
                  label="7月"
                  width="80">
                </el-table-column>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-input
              type="textarea"
              placeholder="请输入留言内容"
              v-model="content"
              maxlength="100"
              show-word-limit
            >
            </el-input>
            <el-button type="text" @click="submitMessage">提交留言</el-button>
          </el-row>
        </el-col>
        <el-col :span="4">
          <div class="box">
            <div class="title">
              <h4>留言区</h4>
            </div>
            <div class="message" v-for="item in contentList" :key="item.id">
              <div>{{item.content}}</div>
              <div style="text-align: right;">
                -{{item.userName}}
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
  import Buttongroup from '@/components/buttonGroup.vue';
  import {getHeziBrandPerformance} from '@/api/common/brandPerformance.js';
  import {getHeziMarketRanking} from '@/api/common/brand.js';
  import {getHeziBrandDiscount} from '@/api/common/brandDiscount.js';
  import {addComments,getHeziComments} from '@/api/common/comments.js';

  export default {
    data() {
      return {
        options: [{
          value: '2020',
          label: '2020'
        }, {
          value: '2019',
          label: '2019'
        }, {
          value: '2018',
          label: '2018'
        }, {
          value: '2017',
          label: '2017'
        }],
        options2: [{
          value: '量产',
          label: '量产'
        }, {
          value: '豪华',
          label: '豪华'
        }],
        yearSelect: new Date().getFullYear(),
        monthSelect: new Date().getMonth()+1,
        businessSelect: '量产',
        requestParams: {}, // 请求参数
        heziMarketRankingList: [], // 品牌表现_市场排名对象
        heziBrandPerformanceList: [] ,// 品牌表现-市场销量数据
        lastYearSalesArr: [], // 上一年销量数组
        nextYearSalesArr: [], // 下一年销量数组
        brandDiscountList: [] , // 品牌表现_折扣数据
        brandDiscountArr: [] , // 重新组合后的品牌折扣数据
        messageRequestParams: {}, // 留言请求参数
        content: '', // 留言内容
        contentList: [] //留言内容列表
      }
    },
    created() {
      this.initHeziBrandPerformance()
      this.initHeziMarketRanking()
      this.initHeziBrandDiscount()
      this.getMessage()
    },
    components: {
      'Buttongroup': Buttongroup
    },
    methods: {
      //加载市场销量数据
      initHeziBrandPerformance(){
        this.heziBrandPerformanceList = []
        this.lastYearSalesArr = []
        this.nextYearSalesArr = []
        this.requestParams = {}
        this.requestParams.nextYear = this.yearSelect+'年'
        this.requestParams.tag = this.businessSelect+'车'
        if(this.businessSelect === '量产'){
          this.requestParams.tag = '乘用车'
        }
        getHeziBrandPerformance(this.requestParams).then(res => {
          this.heziBrandPerformanceList = res.data
          if(this.heziBrandPerformanceList !=  null){
            this.lastYearSalesArr = this.heziBrandPerformanceList.map(function (item) {
              return item.lastYearSales
            })
            this.nextYearSalesArr = this.heziBrandPerformanceList.map(function (item) {
              return item.nextYearSales
            })
          }else{
            this.lastYearSalesArr = []
            this.nextYearSalesArr = []
          }
          this.draw()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      },
      //加载主要品牌表现数据
      initHeziMarketRanking(){
        this.heziMarketRankingList = []
        this.requestParams = {}
        this.requestParams.year = this.yearSelect
        this.requestParams.month = this.monthSelect
        this.requestParams.tag = this.businessSelect+'车'
        if(this.businessSelect === '量产'){
          this.requestParams.tag = '乘用车'
        }
        getHeziMarketRanking(this.requestParams).then(res => {
          this.heziMarketRankingList = res.data
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      },
      //加载折扣数据
      initHeziBrandDiscount(){
        this.brandDiscountList = []
        this.brandDiscountArr = []
        this.requestParams = {}
        getHeziBrandDiscount(this.requestParams).then(res => {
          this.brandDiscountList = res.data
          var brandDiscountArr = [] // 重新组合的品牌数据数组
          var discountObj = {} //各品牌每月销量对象
          var brandNameSet = new Set(); // 所有品牌
          this.brandDiscountList.forEach(x => brandNameSet.add(x.brandName));
          for (let s of brandNameSet.keys()) {
            discountObj = {}
            this.brandDiscountList.forEach(item => {
              if(item.brandName === s){
                discountObj.brandName = item.brandName
                if(item.month === '1月'){
                  discountObj.Jan = item.discountRate
                }
                if(item.month === '2月'){
                  discountObj.Feb = item.discountRate
                }
                if(item.month === '3月'){
                  discountObj.Mar = item.discountRate
                }
                if(item.month === '4月'){
                  discountObj.Apr = item.discountRate
                }
                if(item.month === '5月'){
                  discountObj.May = item.discountRate
                }
                if(item.month === '6月'){
                  discountObj.Jun = item.discountRate
                }
                if(item.month === '7月'){
                  discountObj.Jul = item.discountRate
                }
              }
            })
            brandDiscountArr.push(discountObj)
          }
          this.brandDiscountArr = brandDiscountArr
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      },
      changeSel(value){
        this.initHeziBrandPerformance()
        this.initHeziMarketRanking()
      },
      draw() {
        // 市场销量折线图
        var echartsOption1 = {
          title: {
            text: this.businessSelect + '车市场销量',
            textStyle: {
              fontSize: 15
            }
          },
          grid: {
            height: '50%',
            width: '90%' //左右边距，设置为100，显示不全12月
          },
          legend: {
            orient: 'horizontal',
            right: '10%',
            width: '500',
            top: '25'
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
      // 获取页面留言
      getMessage(){
        this.messageRequestParams.belongModule = '品牌表现'
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
        this.messageRequestParams.belongModule = '品牌表现'
        addComments(this.messageRequestParams).then(res => {
          alert('留言成功')
          this.content = ''
          this.getMessage()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      }
    }
  }
</script>

<style scoped>
  .box {
    width: 100%;
    margin: 0 auto;
    border: 1px solid #eee;
    height: 500px;
    position: relative;
  }

  .box .title {
    border-bottom: 1px solid #EEEEEE;
    background-color: #FFFFFF;
    width: 100%;
    text-align: center;
    padding: 10px 0;
  }

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
