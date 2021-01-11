<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>合作伙伴动态</span>
      </div>
      <template>
        <el-carousel :interval="5000" indicator-position='outside'>
          <el-carousel-item v-for="item in partnerNewsGroup" :key="item.id">
            <div class="title">{{item.brandName}}</div>
            <div v-for="(item2,index) in item.data" :key="item2.id" class="linkItem">
              <router-link :to="{path:'/partnerNews', query:{id:item2.id}}">
                <el-link>{{index+1}} 、 {{item2.title}}</el-link>
              </router-link>
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>产品管理</span>
      </div>
      <template>
        <el-carousel :interval="5000" indicator-position='outside' height="650px">
          <el-carousel-item>
            <div class="cardTitle"><h3>合资品牌新产品规划（{{this.nowYear}}.{{this.halfYear}}）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>合资品牌燃油车细分市场覆盖度</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" >
                <div id="drawFuelShareList0" class="chartBox"></div>
              </el-col>
              <el-col :span="12">
                <div id="drawFuelShareList1" class="chartBox"></div>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: -45px;">
              <el-col :span="24">
                <h4>合资品牌电动车细分市场覆盖度</h4>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: -35px;">
              <el-col :span="12">
                <div id="drawElectShareList0" class="chartBox"></div>
              </el-col>
              <el-col :span="12">
                <div id="drawElectShareList1" class="chartBox"></div>
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>合资品牌新产品导入（{{this.nowYear}}.{{this.nowMonth}}）</h3></div>
            <el-row>
              <el-col :span="12" v-for="(item,index) in this.newProleadList" :key="index">
                <div class="chartBox roseChart"></div>
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>合资品牌新产品项目开发进度（{{this.nowYear}}.{{this.nowMonth}}）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>项目开发进度</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" v-for="item in this.heziProjectScheduleList" :key="item.id">
                <img :src="basePath+item.picturePath">
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>合资品牌产品项目收益回顾（{{this.nowYear}}）</h3></div>
            <el-row>
              <el-col :span="12" v-for="(item,index) in this.newProReviewList" :key="index">
                <div class="chartBox roseChartReview"></div>
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售管理</span>
      </div>
      <template>
        <el-carousel :interval="5000" indicator-position='outside' height="1100px">
          <el-carousel-item>
            <div class="cardTitle"><h3>新车销售厂商排名（2020.08）</h3></div>
            <el-row>
              <el-col :span="24">
                <el-table
                  :data="heziMarketRankingListC"
                  border
                  row-key="id"
                  :header-cell-style="{'text-align':'center'}"
                  :row-style="{height:'20px'}"
                  :cell-style="{padding:'0px'}"
                  style="font-size: 10px;width: 100%;margin-bottom: 35px;">
                  <el-table-column
                    prop="brandName"
                    label="乘用车"
                    align="right"
                    min-width="100">
                  </el-table-column>
                  <el-table-column :label="String(this.nowMonth)+'月'">
                    <el-table-column
                      prop="monthlySalesRanking"
                      label="排名"
                      align="right"
                      min-width="50">
                    </el-table-column>
                    <el-table-column
                      prop="monthlySales"
                      label="销量"
                      align="right"
                      min-width="70">
                    </el-table-column>
                    <el-table-column
                      prop="monthYoychangeCompare"
                      label="同比变化"
                      :formatter="percentFormatter"
                      align="right"
                      min-width="70">
                    </el-table-column>
                    <el-table-column
                      prop="monthMarketShare"
                      label="市场份额"
                      :formatter="percentFormatter"
                      align="right"
                      min-width="70">
                    </el-table-column>
                    <el-table-column
                      prop="monthShareMonthOnMonth"
                      label="份额环比"
                      :formatter="percentFormatter"
                      align="right"
                      min-width="70">
                    </el-table-column>
                    <el-table-column
                      prop="monthYearOnYearShare"
                      label="份额同比"
                      :formatter="percentFormatter"
                      align="right"
                      min-width="70">
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="'1-'+String(this.nowMonth)+'月'">
                    <el-table-column
                      prop="shareRanking"
                      label="排名"
                      align="right"
                      min-width="50">
                    </el-table-column>
                    <el-table-column
                      prop="salesMonthAgo"
                      label="销量"
                      align="right"
                      min-width="70">
                    </el-table-column>
                    <el-table-column
                      prop="monthlyChange"
                      label="同比变化"
                      align="right"
                      :formatter="percentFormatter"
                      min-width="70">
                    </el-table-column>
                    <el-table-column
                      prop="marketShare"
                      label="累计份额"
                      :formatter="percentFormatter"
                      align="right"
                      width="70">
                    </el-table-column>
                    <el-table-column
                      prop="yearOnYearShare"
                      label="份额同比"
                      :formatter="percentFormatter"
                      align="right"
                      min-width="70">
                    </el-table-column>
                  </el-table-column>
                </el-table>
                <el-table
                  :data="heziMarketRankingListH"
                  border
                  row-key="id"
                  :header-cell-style="{'text-align':'center'}"
                  :row-style="{height:'20px'}"
                  :cell-style="{padding:'0px'}"
                  style="font-size: 10px;width: 100%;margin-bottom: 35px;">
                  <el-table-column
                    prop="brandName"
                    label="豪华车"
                    align="right"
                    min-width="100">
                  </el-table-column>
                  <el-table-column :label="String(this.nowMonth)+'月'">
                    <el-table-column
                      prop="monthlySalesRanking"
                      label="排名"
                      align="right"
                      min-width="50">
                    </el-table-column>
                    <el-table-column
                      prop="monthlySales"
                      label="销量"
                      align="right"
                      min-width="70">
                    </el-table-column>
                    <el-table-column
                      prop="monthYoychangeCompare"
                      label="同比变化"
                      :formatter="percentFormatter"
                      align="right"
                      min-width="70">
                    </el-table-column>
                    <el-table-column
                      prop="monthMarketShare"
                      label="市场份额"
                      :formatter="percentFormatter"
                      align="right"
                      min-width="70">
                    </el-table-column>
                    <el-table-column
                      prop="monthShareMonthOnMonth"
                      label="份额环比"
                      :formatter="percentFormatter"
                      align="right"
                      min-width="70">
                    </el-table-column>
                    <el-table-column
                      prop="monthYearOnYearShare"
                      label="份额同比"
                      :formatter="percentFormatter"
                      align="right"
                      min-width="70">
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="'1-'+String(this.nowMonth)+'月'">
                    <el-table-column
                      prop="shareRanking"
                      label="排名"
                      align="right"
                      min-width="50">
                    </el-table-column>
                    <el-table-column
                      prop="salesMonthAgo"
                      label="销量"
                      align="right"
                      min-width="70">
                    </el-table-column>
                    <el-table-column
                      prop="monthlyChange"
                      label="同比变化"
                      align="right"
                      :formatter="percentFormatter"
                      min-width="70">
                    </el-table-column>
                    <el-table-column
                      prop="marketShare"
                      label="累计份额"
                      :formatter="percentFormatter"
                      align="right"
                      width="70">
                    </el-table-column>
                    <el-table-column
                      prop="yearOnYearShare"
                      label="份额同比"
                      :formatter="percentFormatter"
                      align="right"
                      min-width="70">
                    </el-table-column>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>合资品牌表现（{{this.nowYear}}.{{this.nowMonth}}）</h3></div>
            <el-row>
              <el-col :span="24">
                <div id="chart5" class="chartBox"></div>
              </el-col>
              <el-col :span="24">
                <div id="chart6" class="chartBox"></div>
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>折扣数据（{{this.nowYear}}.{{this.nowMonth}}）</h3></div>
            <el-row>
              <el-col :span="24">
                <div id="chart7" class="chartBox"></div>
              </el-col>
              <el-col :span="24">
                <div id="chart8" class="chartBox"></div>
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
      </template>

    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>财务管理</span>
      </div>
      <template>
        <el-carousel :interval="5000" indicator-position='outside' height="1100px">
          <el-carousel-item>
            <div class="cardTitle"><h3>合资公司财务报表重点关注项（{{this.nowYear}}.{{this.nowMonth}}）</h3></div>
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
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>合资公司年度滚动预算（{{this.nowYear}}）</h3></div>
            <el-row>
              <el-col :span="12" v-for="(item,index) in this.budgetList" :key="index">
                <div class="chartBox roseChartBudget"></div>
              </el-col>
            </el-row>
          </el-carousel-item>

        </el-carousel>
      </template>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>参股公司管理</span>
      </div>
      <template>
        <el-carousel :interval="5000" indicator-position='outside' height="1300px">
          <el-carousel-item>
            <div class="cardTitle"><h3>CSC参股公司管理（{{this.nowYear}}）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>核心运营指标</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <h6>大众</h6>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div id="chartYy1" class="chartBox"></div>
              </el-col>
              <el-col :span="12">
                <div id="chartYy2" class="chartBox"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <h6>捷达</h6>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div id="chartYy3" class="chartBox"></div>
              </el-col>
              <el-col :span="12">
                <div id="chartYy4" class="chartBox"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div id="chartCw0" class="chartBox"></div>
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>摩捷出行参股公司管理（{{this.nowYear}}）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>核心运营指标</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <h6>长春</h6>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div id="chartYy5" class="chartBox"></div>
              </el-col>
              <el-col :span="12">
                <div id="chartYy6" class="chartBox"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <h6>成都</h6>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div id="chartYy7" class="chartBox"></div>
              </el-col>
              <el-col :span="12">
                <div id="chartYy8" class="chartBox"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div id="chartCw1" class="chartBox"></div>
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>开迈斯（{{this.nowYear}}）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>核心运营指标</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div id="chartYy9" class="chartBox"></div>
              </el-col>
              <el-col :span="12">
                <div id="chartYy10" class="chartBox"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div id="chartCw2" class="chartBox"></div>
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>大连一汽发动机（{{this.nowYear}}）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>核心运营指标</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div id="chartYy11" class="chartBox"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div id="chartCw3" class="chartBox"></div>
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>成都丰田纺（{{this.nowYear}}）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div id="chartCw4" class="chartBox"></div>
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>天津艾达（{{this.nowYear}}）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div id="chartCw5" class="chartBox"></div>
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>同方环球物流（{{this.nowYear}}）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div id="chartCw6" class="chartBox"></div>
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>丰田一汽模具（{{this.nowYear}}）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div id="chartCw7" class="chartBox"></div>
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-card>
    <router-view></router-view>
  </div>
</template>

<script>
  import {selectAllHeziPartnerNews} from '@/api/common/partner.js';
  import {getHeziMarketRanking} from '@/api/common/ranking.js';
  import {getHeziBrandPerformance} from '@/api/common/brandPerformance.js';
  import {getHeziBrandDiscount} from '@/api/common/brandDiscount.js';
  import {getHeziNewPro} from '@/api/common/newPro.js';
  import {getHeziNewProleadIndex} from '@/api/common/newProlead.js';
  import {getHeziProjectSchedule} from '@/api/common/proDev.js';
  import {getHeziProReviewIndex} from '@/api/common/proReview.js';
  import {getHeziBudgetListYear} from '@/api/common/budget.js';
  import {getInventoryStatus,getCashFlowStatus} from '@/api/common/reportAnalysis.js';
  import {getHeziCompanyManage} from '@/api/common/companyManage.js';

  var echarts = require('echarts');

  export default {
    data(){
      return{
        partnerNewsArr: [], //合作伙伴动态
        partnerNewsGroup: [], //重新组合后的合作伙伴动态
        nowYear: new Date().getFullYear(), //当前年
        nowMonth: new Date().getMonth()+1, //当前月
        halfYear: 'H1',
        fuelShareList0:[], //一汽燃油车市场份额饼图数据
        electShareList0:[], //一汽电动车市场份额饼图数据
        fuelShareList1:[], //上汽燃油车市场份额饼图数据
        electShareList1:[], //上汽电动车市场份额饼图数据
        newProleadList:[], //新产品导入数据
        newProReviewList:[], //项目回顾数据
        inventoryStatusList:[], //存货状态的ECharts数据
        cashFlowStatusList:[], //现金流状态的ECharts数据
        basePath: window.document.location.href.substring(0,16),
        heziProjectScheduleList: [],
        rankingPicturePath:'',
        heziMarketRankingList: [], //厂商排名表格
        heziMarketRankingListH: [], //豪华车厂商排名表格
        heziMarketRankingListC: [], //乘用车厂商排名表格
        heziBrandPerformanceList: [], //品牌表现数据
        heziBrandDiscountList: [], //折扣数据
        budgetList:[], //预算管理数据
        heziCompanyManageList: [] //参股公司管理
      }
    },
    created() {
      if(this.nowMonth<=6){
        this.halfYear = 'H1'
      }else{
        this.halfYear = 'H2'
      }
      this.initPartnerNews()          // 合作伙伴
      this.initNewPro()               // 新产品规划
      this.initNewProlead()           //新产品导入
      this.initHeziProjectSchedule()  //项目开发进度
      this.initHeziProReview()        // 项目回顾对比
      this.initBudget()               //预算管理
      this.initInventoryStatus()      //存货状态
      this.initCashFlowStatus()       //现金流状态
      this.initHeziMarketRanking()    //市场排名表格数据
      this.initHeziBrandPerformance() //市场销量数据
      this.initHeziBrandDiscount()    //折扣数据
      this.initCompanyManage()        //参股公司管理数据
    },
    methods:{
      initPartnerNews(){
        selectAllHeziPartnerNews().then(res => {
          this.partnerNewsArr = res.data
          if(this.partnerNewsArr != null){
            this.group()
          }
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      },
      initHeziMarketRanking(){
        let req = {}
        req.year = this.nowYear
        req.month = this.nowMonth
        getHeziMarketRanking(req).then(res => {
          this.heziMarketRankingList = res.data
          if(this.heziMarketRankingList != null){
            this.heziMarketRankingList.forEach(item =>{
              if(item.tag == '乘用车'){
                this.heziMarketRankingListC.push(item)
              }else if(item.tag == '豪华车'){
                this.heziMarketRankingListH.push(item)
              }
            })
          }else{
            this.heziMarketRankingList = []
          }
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      },
      initHeziBrandPerformance(){
        let req = {}
        req.year = this.nowYear
        getHeziBrandPerformance(req).then(res => {
          this.heziBrandPerformanceList = res.data
          this.drawBrandPerformance()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      },
      initHeziBrandDiscount(){
        let req = {}
        req.year = this.nowYear
        getHeziBrandDiscount(req).then(res => {
          this.heziBrandDiscountList = res.data
          this.drawBrandDiscount()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      },
      initNewPro(){
        let req = {}
        req.year = this.nowYear
        if(this.nowMonth<=6){
          req.month = 0
        }else{
          req.month = 1
        }
        getHeziNewPro(req).then(res => {
          this.newProList = res.data
          if(this.newProList != null){
            this.newProList.forEach(item =>{
              var obj = {}
              obj.value = item.share
              obj.name = item.marketSegment
              if(item.tag == '1' && item.company == '0'){
                this.fuelShareList0.push(obj)
              }else if(item.tag == '0' && item.company == '0'){
                this.electShareList0.push(obj)
              }
              if(item.tag == '1' && item.company == '1'){
                this.fuelShareList1.push(obj)
              }else if(item.tag == '0' && item.company == '1'){
                this.electShareList1.push(obj)
              }
            })
            this.drawFuelShareList0()
            this.drawElectShareList1()
            this.drawElectShareList0()
            this.drawFuelShareList1()
          }
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      },
      initNewProlead(){
        let req = {}
        req.year = this.nowYear
        getHeziNewProleadIndex(req).then(res => {
          if(res.data != null){
             var map = {}
             var dest = []
             for(var i = 0; i < res.data.length; i++){
               var ai = res.data[i]
               if(!map[ai.brandName]){
                   dest.push({
                       id: ai.id,
                       brandName: ai.brandName,
                       data: [ai]
                   });
                   map[ai.brandName] = ai
               }else{
                   for(var j = 0; j < dest.length; j++){
                       var dj = dest[j];
                       if(dj.brandName== ai.brandName){
                           dj.data.push(ai)
                           break
                       }
                   }
               }
           }
            this.newProleadList = dest
          }else{
            this.newProleadList = []
          }
          this.$nextTick(() => {
            this.drawNewProlead()
          })
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      },
      initHeziProjectSchedule(){
        let req = {}
        req.year = this.nowYear
        req.month = this.nowMonth
        req.brandId = 1
        getHeziProjectSchedule(req).then(res => {
          this.heziProjectScheduleList = res.data
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      },
      initHeziProReview(){
        let req = {}
        req.year = this.nowYear
        req.month = this.nowMonth
        req.tag = 0
        getHeziProReviewIndex(req).then(res => {
          if(res.data != null){
             var map = {}
             var dest = []
             for(var i = 0; i < res.data.length; i++){
               var ai = res.data[i]
               if(!map[ai.brandName]){
                   dest.push({
                       id: ai.id,
                       brandName: ai.brandName,
                       data: [ai]
                   });
                   map[ai.brandName] = ai
               }else{
                   for(var j = 0; j < dest.length; j++){
                       var dj = dest[j];
                       if(dj.brandName== ai.brandName){
                           dj.data.push(ai)
                           break
                       }
                   }
               }
           }
            this.newProReviewList = dest
          }else{
            this.newProReviewList = []
          }
          this.$nextTick(() => {
            this.drawProReview()
          })
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      },
      initBudget(){
        let req = {}
        req.year = this.nowYear
        getHeziBudgetListYear(req).then(res => {
          if(res.data != null){
            var map = {}
            var dest = []
            for(var i = 0; i < res.data.length; i++){
                var ai = res.data[i]
                if(!map[ai.brandName]){
                    dest.push({
                        id: ai.id,
                        brandName: ai.brandName,
                        data: [ai]
                    });
                    map[ai.brandName] = ai
                }else{
                    for(var j = 0; j < dest.length; j++){
                        var dj = dest[j];
                        if(dj.brandName== ai.brandName){
                            dj.data.push(ai)
                            break
                        }
                    }
                }
            }
            this.budgetList = dest
          }else{
            this.budgetList = []
          }
          this.$nextTick(() => {
            this.drawBudget()
          })
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      },
      initInventoryStatus(){
        let req = {}
        req.year = this.nowYear
        req.month = this.nowMonth
        getInventoryStatus(req).then(res => {
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
      initCashFlowStatus(){
        let req = {}
        req.year = this.nowYear
        req.month = this.nowMonth
        getCashFlowStatus(req).then(res => {
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
      initCompanyManage(){
        let req = {}
        req.year = this.nowYear
        getHeziCompanyManage(req).then(res => {
          if(res.data != null){
            this.heziCompanyManageList = res.data
          }else{
            this.heziCompanyManageList = []
          }
          this.initYyChart() //运营
          this.initCwChart() //财务
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      },
      initYyChart(){
        var list1 = [],list2 = [],list3 = [],list4 = [],list5 = [],list6 = [],list7 = [],list8 = [],list9 = [],list10 = [],list11 = [],list12 = []
        var title1 = [],title2 = [],title3 = [],title4 = [],title5 = [],title6 = [],title7 = [],title8 = []
        var name1 = '',name2 = '',name3 = '',name4 = '',name5 = '',name6 = '',name7 = '',name8 = ''
        var zjz = [],zlz = [],jrz = [],cdl = []
        var xl = [],cl=[]
        if(this.heziCompanyManageList != null){
          this.heziCompanyManageList.forEach(item => {
            //运营
            if(item.moduleName == '0'){
              //CSC参股公司管理
              if(item.jointCompany == '0'){
                if(item.title.indexOf('累计用户数') != -1 && item.company.indexOf('大众') != -1){
                  list1 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
                  title1 = '激活率及累计用户数量'
                  name1 = item.title
                }
                if(item.title.indexOf('激活率') != -1 && item.company.indexOf('大众') != -1){
                  list2 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
                  name2 = item.title
                }
                if(item.title.indexOf('用户转化率') != -1 && item.company.indexOf('大众') != -1){
                  list3 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
                  title2 = '用户转化率'
                }
                if(item.title.indexOf('累计用户数') != -1 && item.company.indexOf('捷达') != -1){
                  list4 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
                  title3 = '激活率及累计用户数量'
                  name3 = item.title
                }
                if(item.title.indexOf('激活率') != -1 && item.company.indexOf('捷达') != -1){
                  list5 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
                  name4 = item.title
                }
                if(item.title.indexOf('用户转化率') != -1 && item.company.indexOf('捷达') != -1){
                  list6 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
                  title4 = '用户转化率'
                }
              //摩捷出行参股公司管理
              }else if(item.jointCompany == '1'){
                if(item.title.indexOf('注册用户') != -1 && item.area.indexOf('长春') != -1){
                  list9 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
                  title6 = '注册用户'
                }
                if(item.title.indexOf('运营车辆数') != -1 && item.area.indexOf('长春') != -1){
                  list7 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
                  name5 = item.title
                }
                if(item.title.indexOf('车辆使用率') != -1 && item.area.indexOf('长春') != -1){
                  list8 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
                  title5 = '运营车辆数及使用率'
                  name6 = item.title
                }
                if(item.title.indexOf('注册用户') != -1 && item.area.indexOf('成都') != -1){
                  list12 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
                  title8 = '注册用户'
                }
                if(item.title.indexOf('运营车辆数') != -1 && item.area.indexOf('成都') != -1){
                  list10 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
                  name7 = item.title
                }
                if(item.title.indexOf('车辆使用率') != -1 && item.area.indexOf('成都') != -1){
                  list11 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
                  name8 = item.title
                  title7 = '运营车辆数及使用率'
                }
              //开迈斯
              }else if(item.jointCompany == '2'){
                if(item.title.indexOf('自建桩') != -1 && item.moduleName == '0'){
                  zjz = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12,item.total,item.goal]
                }
                if(item.title.indexOf('租赁桩') != -1 && item.moduleName == '0'){
                  zlz = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12,item.total,item.goal]
                }
                if(item.title.indexOf('接入桩') != -1 && item.moduleName == '0'){
                  jrz = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12,item.total,item.goal]
                }
                if(item.title.indexOf('充电量') != -1 && item.moduleName == '0'){
                  cdl = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
                }
              //大连一汽发动机
              }else if(item.jointCompany == '3'){
                if(item.title.indexOf('销量') != -1 && item.moduleName == '0'){
                  xl = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12,item.total,item.goal]
                }
                if(item.title.indexOf('产量') != -1 && item.moduleName == '0'){
                  cl = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12,item.total,item.goal]
                }
              }
            }
          })
        }
        this.drawYyEcharts(list1,list2,list3,name1,name2,title1,title2,1)
        this.drawYyEcharts(list4,list5,list6,name3,name4,title3,title4,3)
        this.drawYyEcharts(list7,list8,list9,name5,name6,title5,title6,5)
        this.drawYyEcharts(list10,list11,list12,name7,name8,title7,title8,7)
        this.drawKmsYyEcharts(zjz,zlz,jrz,cdl)
        this.drawDlYyEcharts(cl,xl)
      },
      drawDlYyEcharts(cl,xl){
       var echartsOption1 = {
          title: {
            text: '大众一汽发动机公司年度产销量',
            textStyle: {
              fontSize: 13
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
              data: ['销量', '产量']
          },
          xAxis: {
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLabel : {
                interval:0 // 坐标轴刻度标签的显示间隔(设置为0强制显示所有标签)
            }
          },
          yAxis: {
              type: 'value'
          },
          series: [
                  {
                      name: '销量',
                      type: 'bar',
                      data: xl,
                      itemStyle: {
                        color: '#82d1ec'
                      },
                      label: {
                        show: true
                      }
                  },
                  {
                      name: '产量',
                      type: 'bar',
                      data: cl,
                      itemStyle: {
                        color: '#ffaa00'
                      },
                      label: {
                        show: true
                      }
                  }
              ]
        }
       var myChart1 = echarts.init(document.getElementById('chartYy11'))
       myChart1.setOption(echartsOption1)
     },
      drawKmsYyEcharts(zjz,zlz,jrz,cdl){
        var echartsOption1 = {
           title: {
             text: '充电桩筹建',
             textStyle: {
               fontSize: 13
             }
           },
           tooltip: {
             trigger: 'axis'
           },
           legend: {
               data: ['自建桩', '租赁桩', '接入桩']
           },
           xAxis: {
             data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1~12月累计', '年度目标'],
             axisLabel : {
                 interval:0 // 坐标轴刻度标签的显示间隔(设置为0强制显示所有标签)
             }
           },
           yAxis: {
               type: 'value'
           },
           series: [
                   {
                       name: '自建桩',
                       type: 'bar',
                       data: zjz,
                       itemStyle: {
                         color: '#82d1ec'
                       },
                       label: {
                         show: true
                       }
                   },
                   {
                       name: '租赁桩',
                       type: 'bar',
                       data: zlz,
                       itemStyle: {
                         color: '#ffaa00'
                       },
                       label: {
                         show: true
                       }
                   },
                   {
                       name: '接入桩',
                       type: 'bar',
                       data: jrz,
                       itemStyle: {
                         color: '#878786'
                       },
                       label: {
                         show: true
                       }
                   }
               ]
         }
        var myChart1 = echarts.init(document.getElementById('chartYy9'))
        myChart1.setOption(echartsOption1)

        var echartsOption3 = {
           title: {
             text: '充电量',
             textStyle: {
               fontSize: 13
             }
           },
           tooltip: {
             trigger: 'axis'
           },
           legend: {
               data: ['充电量']
           },
           xAxis: {
             data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
             axisLabel : {
                 interval:0 // 坐标轴刻度标签的显示间隔(设置为0强制显示所有标签)
             }
           },
           yAxis: {
               type: 'value'
           },
           series: [
                   {
                       name: '充电量',
                       type: 'bar',
                       data: cdl,
                       itemStyle: {
                         color: '#82d1ec'
                       },
                       label: {
                         show: true
                       }
                   }
               ]
         }
        var myChart3 = echarts.init(document.getElementById('chartYy10'))
        myChart3.setOption(echartsOption3)
      },
      drawYyEcharts(list1,list2,list3,name1,name2,title1,title2,index){
        var echartsOption1 = {
         title: {
           text: title1,
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
              data: [name1, name2]
          },
          grid: {
            height: '60%',
            width: '80%'
          },
          xAxis: {
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLabel : {
                interval:0 // 坐标轴刻度标签的显示间隔(设置为0强制显示所有标签)
            }
          },
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
                  name: name1,
                  type: 'bar',
                  data: list1,
                  itemStyle: {
                    color: '#ffaa00'
                  },
              },
              {
                  name: name2,
                  type: 'line',
                  yAxisIndex: 1,
                  data: list2,
                  itemStyle: {
                    color: '#82d1ec'
                  },
              }
          ]
        }
        var chartId = 'chartYy'+index
        var myChart = echarts.init(document.getElementById(chartId))
        myChart.setOption(echartsOption1)

        var echartsOption2 = {
          title: {
            text: title2,
            textStyle: {
              fontSize: 13
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '70px',
            height: '60%',
            width: '80%'
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
              type: 'line',
              data: list3,
              itemStyle: {
                color: '#82d1ec'
              },
              label: {
                show: true
              }
            }
          ]
        }
        var chartId = 'chartYy'+(index+1)
        var myChart2 = echarts.init(document.getElementById(chartId))
        myChart2.setOption(echartsOption2)
      },
      initCwChart(){
        var ys = []
        var sj = []
        if(this.heziCompanyManageList != null){
          for(var i=0;i<8;i++){
            this.heziCompanyManageList.forEach(item => {
              if(item.moduleName == '1'){
                if(item.title.indexOf('预算') != -1 && item.jointCompany == i){
                  ys = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12,item.total]
                }
                if(item.title.indexOf('实际') != -1 && item.jointCompany == i){
                  sj = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12,item.total]
                }
              }
            })
            this.drawCwEcharts(ys,sj,i)
          }
        }
      },
      drawCwEcharts(ys,sj,index){
        var echartsOption5 = {
           title: {
             text: this.nowYear+'年利润完成情况',
             textStyle: {
               fontSize: 13
             }
           },
           tooltip: {
             trigger: 'axis'
           },
           legend: {
               data: ['预算', '实际']
           },
           xAxis: {
             data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '1~12月累计'],
             axisLabel : {
                 interval:0 // 坐标轴刻度标签的显示间隔(设置为0强制显示所有标签)
             }
           },
           yAxis: {
               type: 'value'
           },
           series: [
                   {
                       name: '预算',
                       type: 'bar',
                       data: ys,
                       itemStyle: {
                         color: '#82d1ec'
                       },
                       label: {
                         show: true
                       }
                   },
                   {
                       name: '实际',
                       type: 'bar',
                       data: sj,
                       itemStyle: {
                         color: '#ffaa00'
                       },
                       label: {
                         show: true
                       }
                   }
               ]
         }
        var chartId = 'chartCw'+index
        var myChart5 = echarts.init(document.getElementById(chartId))
        myChart5.setOption(echartsOption5)
      },
      //一汽燃油车饼图
      drawFuelShareList0(){
        var drawFuelShareList0 = {
          title: {
                  text: '燃油车市场结构',
                  left: 'center',
                  textStyle: {
                    fontSize: 11
                  }
              },
              tooltip: {
                  trigger: 'item',
                  formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              series: [
                  {
                      name: '燃油车市场结构',
                      type: 'pie',
                      radius: '55%',
                      center: ['40%', '40%'],
                      data: this.fuelShareList0,
                      emphasis: {
                          itemStyle: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }
              ]
          }
          var myChart1 = echarts.init(document.getElementById('drawFuelShareList0'))
          myChart1.setOption(drawFuelShareList0)
      },
      //一汽电动车饼图
      drawElectShareList0(){
        var drawElectShareList0 = {
          title: {
                  text: '电动车市场结构',
                  left: 'center',
                  textStyle: {
                    fontSize: 11
                  }
              },
              tooltip: {
                  trigger: 'item',
                  formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              series: [
                  {
                      name: '电动车市场结构',
                      type: 'pie',
                      radius: '55%',
                      center: ['40%', '40%'],
                      data: this.electShareList0,
                      emphasis: {
                          itemStyle: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }
              ]
          }
          var myChart2 = echarts.init(document.getElementById('drawElectShareList0'))
          myChart2.setOption(drawElectShareList0)
      },
      //上汽燃油车饼图
      drawFuelShareList1(){
        var drawFuelShareList1 = {
          title: {
                  text: '燃油车市场结构',
                  left: 'center',
                  textStyle: {
                    fontSize: 11
                  }
              },
              tooltip: {
                  trigger: 'item',
                  formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              series: [
                  {
                      name: '燃油车市场结构',
                      type: 'pie',
                      radius: '55%',
                      center: ['40%', '40%'],
                      data: this.fuelShareList1,
                      emphasis: {
                          itemStyle: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }
              ]
          }
          var myChart3 = echarts.init(document.getElementById('drawFuelShareList1'))
          myChart3.setOption(drawFuelShareList1)
      },
      //上汽电动车饼图
      drawElectShareList1(){
        var drawElectShareList1 = {
          title: {
                  text: '电动车市场结构',
                  left: 'center',
                  textStyle: {
                    fontSize: 11
                  }
              },
              tooltip: {
                  trigger: 'item',
                  formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              series: [
                  {
                      name: '电动车市场结构',
                      type: 'pie',
                      radius: '55%',
                      center: ['40%', '40%'],
                      data: this.electShareList1,
                      emphasis: {
                          itemStyle: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }
              ]
          }
          var myChart4 = echarts.init(document.getElementById('drawElectShareList1'))
          myChart4.setOption(drawElectShareList1)
      },
      // 新产品导入—销量及KPE折线图
      drawNewProlead(){
        var roseCharts = document.getElementsByClassName('roseChart')
        for(var i = 0;i < roseCharts.length;i++ ){
          let arr1 = []
          let kpeArr = []
          let fzgArr = []
          this.newProleadList[i].data.forEach(item =>{
            arr1.push(item.vehicleMode)
            kpeArr.push(item.kpe)
            fzgArr.push(item.fzg)
          })
          let xAxisObj = {}
          xAxisObj.type = 'category'
          xAxisObj.data = arr1
          xAxisObj.axisPointer = {type: 'shadow'}
          var myChart = echarts.init(roseCharts[i])
          myChart.setOption({
            title: {
              text: this.newProleadList[i].brandName+'品牌',
              textStyle: {
                fontSize: 11
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
              left:'60',
              height: '50%',
              width: '60%'
            },
            xAxis: xAxisObj,
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
                      color: '#aaaa7f'
                    },
                    label: {
                      show: true
                    }
                }
            ],
          })
        }
      },
      // 项目回顾折线图
      drawProReview(){
        var roseCharts = document.getElementsByClassName('roseChartReview')
        for(var i = 0;i < roseCharts.length;i++ ){
          let proNameArr = []
          let feasibleSalesArr = []
          let actualSalesArr = []
          let feasibleRateArr = []
          let actualRateArr = []
          this.newProReviewList[i].data.forEach(item =>{
            proNameArr.push(item.proName)
            feasibleSalesArr.push(item.feasibleSales)
            actualSalesArr.push(item.actualSales)
            feasibleRateArr.push(item.feasibleRate)
            actualRateArr.push(item.actualRate)
          })
          let xAxisObj = {}
          xAxisObj.type = 'category'
          xAxisObj.data = proNameArr
          xAxisObj.axisPointer = {type: 'shadow'}
          var myChart = echarts.init(roseCharts[i])
          myChart.setOption({
            title: {
              text: this.newProReviewList[i].brandName+'品牌',
              textStyle: {
                fontSize: 11
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
                data: ['可研销量','实际销量','可研利润率','实际利润率']
            },
            grid: {
              left:'60',
              height: '50%',
              width: '60%'
            },
            xAxis: xAxisObj,
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
                    data: feasibleSalesArr,
                    itemStyle: {
                      color: '#ff5500'
                    },
                },
                {
                    name: '实际销量',
                    type: 'bar',
                    data: actualSalesArr,
                    itemStyle: {
                      color: '#82d1ec'
                    },
                },
                {
                    name: '可研利润率',
                    type: 'line',
                    data: feasibleRateArr,
                    itemStyle: {
                      color: '#ffaa7f'
                    },
                },
                {
                    name: '实际利润率',
                    type: 'line',
                    data: actualRateArr,
                    itemStyle: {
                      color: '#aaaa7f'
                    },
                }
            ],
          })
        }
      },
      // 预算管理折线图
      drawBudget() {
        var totalProfitsPredictArr = [] //利润总额预测
        var totalProfitsTargetArr = [] //利润总额目标
        var brandName = '' //公司
        var roseCharts = document.getElementsByClassName('roseChartBudget')
        for(var i = 0;i < roseCharts.length;i++ ){
          if(this.budgetList != null){
            let arr1 = []
            let arr2 = []
            this.budgetList[i].data.forEach(function (item,index,arr){
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
              brandName = item.brandName
            })
            totalProfitsPredictArr = arr1
            totalProfitsTargetArr = arr2
          }
          var myChart = echarts.init(roseCharts[i])
          myChart.setOption({
          title: {
            text: brandName+'年度预算',
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
              type: 'line',
              data: totalProfitsPredictArr,
              itemStyle: {
                color: '#82d1ec'
              },
              label: {
                show: true
              }
            },
            {
              type: 'line',
              data: totalProfitsTargetArr,
              itemStyle: {
                color: '#888'
              },
              label: {
                show: true
              }
            },
          ]
        })
        }
      },
      drawBrandPerformance(){
        let brandPerformanceLastC = []
        let brandPerformanceNextC = []
        let brandPerformanceLastH = []
        let brandPerformanceNextH = []
        this.heziBrandPerformanceList.forEach(item => {
          if(item.tag == '乘用车'){
            let obj1 = {}
            obj1.month = item.month
            obj1.lastYearSales = item.lastYearSales
            brandPerformanceLastC.push(obj1)
            let obj2 = {}
            obj2.month = item.month
            obj2.nextYearSales = item.nextYearSales
            brandPerformanceNextC.push(obj2)
          }else if(item.tag == '豪华车'){
            let obj1 = {}
            obj1.month = item.month
            obj1.lastYearSales = item.lastYearSales
            brandPerformanceLastH.push(obj1)
            let obj2 = {}
            obj2.month = item.month
            obj2.nextYearSales = item.nextYearSales
            brandPerformanceNextH.push(obj2)
          }
        })
        let lastYearSalesArrC = this.sortByMonth(brandPerformanceLastC,'lastYearSales')
        let nextYearSalesArrC = this.sortByMonth(brandPerformanceNextC,'nextYearSales')
        let lastYearSalesArrH = this.sortByMonth(brandPerformanceLastH,'lastYearSales')
        let nextYearSalesArrH = this.sortByMonth(brandPerformanceNextH,'nextYearSales')
        var echartsOption5 = {
          title: {
            text: '乘用车市场销量',
            textStyle: {
              fontSize: 13
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left:'60',
            height: '50%',
            width: '60%'
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
              name: String(parseInt(this.nowYear)-1),
              type: 'line',
              data: lastYearSalesArrC,
              itemStyle: {
                color: '#82d1ec'
              },
              label: {
                show: true
              }
            },
            {
              name: this.nowYear,
              type: 'line',
              data: nextYearSalesArrC,
              itemStyle: {
                color: '#888'
              },
              label: {
                show: true
              }
            },
          ]
        };
        var myChart5 = echarts.init(document.getElementById('chart5'));
        myChart5.setOption(echartsOption5)
        var echartsOption6 = {
          title: {
            text: '豪华车市场销量',
            textStyle: {
              fontSize: 13
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left:'60',
            height: '50%',
            width: '60%'
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
              name: String(parseInt(this.nowYear)-1),
              type: 'line',
              data: lastYearSalesArrH,
              itemStyle: {
                color: '#82d1ec'
              },
              label: {
                show: true
              }
            },
            {
              name: this.nowYear,
              type: 'line',
              data: nextYearSalesArrH,
              itemStyle: {
                color: '#888'
              },
              label: {
                show: true
              }
            },
          ]
        };
        var myChart6 = echarts.init(document.getElementById('chart6'));
        myChart6.setOption(echartsOption6)
      },
      drawBrandDiscount(){
        var brandNameSet1 = new Set()
        var brandNameSet2 = new Set()
        var brandNameArrC = [] // 所有乘用车品牌
        var brandNameArrH = [] // 所有豪华车品牌
        var heziBrandDiscountListC = [] // 所有乘用车折扣
        var heziBrandDiscountListH = [] // 所有豪华车折扣
        if(this.heziBrandDiscountList != null){
          this.heziBrandDiscountList.forEach(item => {
            if(item.tag == '乘用车'){
              brandNameSet1.add(item.brandName)
              heziBrandDiscountListC.push(item)
            }else if(item.tag == '豪华车'){
              brandNameSet2.add(item.brandName)
              heziBrandDiscountListH.push(item)
            }
          })
        }
        brandNameArrC = Array.from(brandNameSet1)
        brandNameArrH = Array.from(brandNameSet2)
        var tmp1 = []
        for (let s of brandNameSet1.keys()) {
          let arr = this.sortDiscountByMonth(heziBrandDiscountListC,'discountRate',s)
          let temp = {}
          temp = {
            name: s,
            type: 'line',
            data: arr,
            label: {
              show: true
            }
          }
          tmp1.push(temp)
        }
        var echartsOption7 = {
          title: {
            text: '乘用车折扣表现',
            textStyle: {
              fontSize: 13
            }
          },
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
            data:brandNameArrC
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
          series: tmp1
        }
        var myChart7 = echarts.init(document.getElementById('chart7'));
        myChart7.setOption(echartsOption7)
        var tmp2 = []
        for (let s of brandNameSet2.keys()) {
          let arr = this.sortDiscountByMonth(heziBrandDiscountListH,'discountRate',s)
          let temp = {}
          temp = {
            name: s,
            type: 'line',
            data: arr,
            label: {
              show: true
            }
          }
          tmp2.push(temp)
        }
        var echartsOption8 = {
          title: {
            text: '豪华车折扣表现',
            textStyle: {
              fontSize: 13
            }
          },
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
            data:brandNameArrH
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
          series: tmp2
        }
        var myChart8 = echarts.init(document.getElementById('chart8'));
        myChart8.setOption(echartsOption8)
      },
      sortDiscountByMonth(data,propertyName,brandName){
        var array = new Array(12).fill(0)
        for(var i=0;i<12;i++){
          for(var j=0;j<data.length;j++){
            if(data[j] != null && data[j].brandName == brandName && data[j].month == i+1){
              array[i] = data[j][propertyName].replace('%','') || 0
            }
          }
        }
        return array
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
                  }
              }]
          })
        }
      },
      group(){
        var map = {}
        var dest = []
        for(var i = 0; i < this.partnerNewsArr.length; i++){
            var ai = this.partnerNewsArr[i]
            if(!map[ai.brandName]){
                dest.push({
                    id:ai.id,
                    brandName: ai.brandName,
                    data: [ai]
                });
                map[ai.brandName] = ai
            }else{
                for(var j = 0; j < dest.length; j++){
                    var dj = dest[j];
                    if(dj.brandName == ai.brandName){
                        dj.data.push(ai)
                        break
                    }
                }
            }
        }
        this.partnerNewsGroup = dest
      },
      // 数字格式化成百分比
      percentFormatter(row, column, cellValue, index) {
        if (cellValue==0 || cellValue==-0 || isNaN(cellValue) ) {
            return 0 + "%"
        }
        var str = ( cellValue * 100 ).toFixed(2) + "%";
        return str
      },
      sortByMonth(data,propertyName){
        var array = new Array(12).fill(0)
        for(var i=0;i<12;i++){
          if(data[i] != null && data[i].month == i+1){
            array[i] = data[i][propertyName] || 0
          }
        }
        return array
      }
    }
  }
</script>

<style scoped>
  .text {
      font-size: 14px;
    }
    .item {
      margin-bottom: 18px;
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #fff;
    }
    .el-carousel__item:nth-child(2n+1) {
      background-color: #fff;
    }
    .title{padding: 5px 0;background-color: #c8dbf6;width: 100px;text-align: center;}
    .linkItem{line-height: 40px;margin: 10px;}
    .el-divider__text, .el-link{font-size: 16px;}
    .cardTitle{width: 100%;line-height: 25px; text-align: center;}
    .el-row {
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .el-col {
        border-radius: 4px;
      }
      .chartBox{height: 300px;}
      .linkItem2{line-height: 25px;margin: 10px;}
      h4{padding: 0;margin: 0;}
      .img-box{text-align: center;}
      img{width: 100%;height: 260px;}
      .el-carousel__button{background-color: #2C3E50;}
      a {
        text-decoration: none;
      }
      .router-link-active {
        text-decoration: none;
      }
</style>
