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
            <div class="cardTitle"><h3>合资品牌新产品规划（2020.H1）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>合资品牌燃油车细分市场覆盖度</h4>
              </el-col>
            </el-row>
            <el-row class="img-box">
              <el-col :span="12">
                <div id="drawFuelShareList0" class="chartBox"></div>
              </el-col>
              <el-col :span="12">
                <div id="drawElectShareList0" class="chartBox"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div id="drawFuelShareList1" class="chartBox"></div>
              </el-col>
              <el-col :span="12">
                <div id="drawElectShareList1" class="chartBox"></div>
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>合资品牌新产品规划（2020.H1）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>销量及KPE</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div id="drawNewProlead" class="chartBox"></div>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/02.jpg">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/02.jpg">
              </el-col>
            </el-row> -->
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>合资品牌新产品规划（2020.H1）</h3></div>
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
            <!-- <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/03.jpg">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/03.jpg">
              </el-col>
            </el-row> -->
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>合资品牌新产品规划（2020.H1）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>项目回顾对比</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="img-box">
                <div id="drawProReview" class="chartBox"></div>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/04.jpg">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/04.jpg">
              </el-col>
            </el-row> -->
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
              <el-col :span="24" class="img-box">
                <img :src="rankingPicturePath" style="height: 800px;">
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>合资品牌表现（2020.08）</h3></div>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/06.jpg">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/07.jpg">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/08.jpg">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/09.jpg">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/10.jpg">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/11.jpg">
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>合资车型表现（2020.08）</h3></div>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/12.jpg" style="height: 1000px;">
              </el-col>
            </el-row>

          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>合资双积分合规情况（2020.6）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>行业积分供需关系（6+6）预测</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18" class="img-box">
                <img src="../assets/13.jpg">
              </el-col>
              <el-col :span="6" class="img-box">
                <img src="../assets/14.jpg">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <h4>合资企业双积分年度计划</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/15.jpg">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/15.jpg">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <h4>合资企业新能源销售完成情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/16.jpg">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/16.jpg">
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
            <div class="cardTitle"><h3>合资公司财务报表重点关注项（2020.08）</h3></div>
            <el-row>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <h4>一汽大众</h4>
                  </el-col>
               </el-row>
               <el-row>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/17.png">
                 </el-col>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/18.png">
                 </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <h4>一汽大众</h4>
                  </el-col>
               </el-row>
               <el-row>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/17.png">
                 </el-col>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/18.png">
                 </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <h4>一汽大众</h4>
                  </el-col>
               </el-row>
               <el-row>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/17.png">
                 </el-col>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/18.png">
                 </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <h4>一汽大众</h4>
                  </el-col>
               </el-row>
               <el-row>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/17.png">
                 </el-col>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/18.png">
                 </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <h4>一汽大众</h4>
                  </el-col>
               </el-row>
               <el-row>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/17.png">
                 </el-col>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/18.png">
                 </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <h4>一汽大众</h4>
                  </el-col>
               </el-row>
               <el-row>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/17.png">
                 </el-col>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/18.png">
                 </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>合资公司年度滚动预算（2020.08）</h3></div>
            <el-row>
              <el-col :span="12" class="img-box">
                <div id="drawBudget" class="chartBox"></div>
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
        <el-carousel :interval="5000" indicator-position='outside' height="670px">
          <el-carousel-item>
            <div class="cardTitle"><h3>开迈斯科技有限公司（2020.08）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>核心运营指标</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/20.png">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/21.png">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/22.png">
              </el-col>
            </el-row>

          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>摩斯智行有限公司（2020.06）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>核心运营指标</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/23.png">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/24.png">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/25.png">
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>摩斯智联科技有限公司（2020.06）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>核心运营指标</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" class="img-box">
                <img src="../assets/26.png">
              </el-col>
              <el-col :span="8" class="img-box">
                <img src="../assets/27.png">
              </el-col>
              <el-col :span="8" class="img-box">
                <img src="../assets/28.png">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/25.png">
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>大连一汽发动机公司（2020.06）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>核心产销完成情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/29.png">
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/25.png">
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>成都丰田纺（2020.06）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/30.png" style="height: 400px;">
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>天津艾达（2020.06）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/30.png" style="height: 400px;">
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>同方环球物流（2020.06）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/30.png" style="height: 400px;">
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>同方环球物流（2020.06）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/30.png" style="height: 400px;">
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
  import {getHeziNewPro} from '@/api/common/newPro.js';
  import {getHeziNewProlead} from '@/api/common/newProlead.js';
  import {getHeziProjectSchedule} from '@/api/common/proDev.js';
  import {getHeziProReview} from '@/api/common/proReview.js';
  import {getHeziMarketRanking} from '@/api/common/ranking.js';
  import {getHeziBudget} from '@/api/common/budget.js';

  var echarts = require('echarts');

  export default {
    data(){
      return{
        partnerNewsArr: [], //合作伙伴动态
        partnerNewsGroup: [], //重新组合后的合作伙伴动态
        nowYear: new Date().getFullYear(), //当前年
        nowMonth: new Date().getMonth()+1, //当前月
        fuelShareList0:[], //一汽燃油车市场份额饼图数据
        electShareList0:[], //一汽电动车市场份额饼图数据
        fuelShareList1:[], //上汽燃油车市场份额饼图数据
        electShareList1:[], //上汽电动车市场份额饼图数据
        newProleadList:[],
        fzgArr:[], //销量规划(Fzg)
        kpeArr:[], //KPE(%)
        feasibleSalesArr:[], //可研销量
        feasibleRateArr:[], //可研利润率
        actualSalesArr:[], //实际销量
        actualRateArr:[],//实际利润率
        proNameArr:[],  //产品
        basePath: window.document.location.href.substring(0,16),
        heziProjectScheduleList: [],
        rankingPicturePath:'',
        budgetList:[],
        totalProfitsPredictArr:[],
        totalProfitsTargetArr:[],
        hotNews:[{
                  name:'热门新闻1',
                  link:'#'
                  },
                  {
                    name:'热门新闻1',
                    link:'#'
                  },
                  {
                    name:'热门新闻1',
                    link:'#'
                  },
                  {
                    name:'热门新闻1',
                    link:'#'
                  }
                ]
      }
    },
    created() {
      this.initPartnerNews() // 初始化合作伙伴数据
      this.initNewPro() // 初始化新产品规划数据
      this.initNewProlead() //初始化新产品导入数据
      this.initHeziProjectSchedule() //初始化项目开发进度数据
      this.initHeziProReview() // 初始化项目回顾对比数据
      this.initHeziMarketRanking() //初始化厂商排名图片
      this.initBudget() //初始化预算管理数据
    },
    methods:{
      initPartnerNews(){
        selectAllHeziPartnerNews().then(res => {
          this.partnerNewsArr = res.data
          this.group()
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
            if(this.fuelShareList0 != null){
              this.drawFuelShareList0()
            }
            if(this.electShareList1 != null){
              this.drawElectShareList1()
            }
            if(this.electShareList0 != null){
              this.drawElectShareList0()
            }
            if(this.fuelShareList1 != null){
              this.drawFuelShareList1()
            }
          }
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      },
      initNewProlead(){
        let req = {}
        req.brand = 1
        getHeziNewProlead(req).then(res => {
          this.newProleadList = res.data
          if(this.newProleadList != null){
            // KPE
            this.kpeArr = this.newProleadList.map(function (item) {
              return item.kpe
            })
            // 销量规划
            this.fzgArr = this.newProleadList.map(function (item) {
              return item.fzg
            })
            // 里程碑
            this.vehicleModeArr = this.newProleadList.map(function (item) {
              return item.vehicleMode
            })
            this.drawNewProlead()
          }
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
        req.brandId = 1
        getHeziProReview(req).then(res => {
          this.heziProReviewList = res.data
          if(this.heziProReviewList != null){
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
            this.drawProReview()
          }
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      },
      initHeziMarketRanking(){
        this.picturePath = ''
        let req = {}
        req.year = this.nowYear
        req.month = this.nowMonth
        getHeziMarketRanking(req).then(res => {
          this.marketRankingList = res.data
          if(this.marketRankingList != null){
            var curWwwPath = window.document.location.href.substring(0,16) //获取根路径http://localhost
            this.rankingPicturePath = curWwwPath+this.marketRankingList[0].picturePath
          }
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      },
      initBudget(){
        let req = {}
        req.year = this.nowYear
        getHeziBudget(req).then(res => {
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
          this.drawBudget()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      },
      //一汽燃油车饼图
      drawFuelShareList0(){
        var drawFuelShareList0 = {
          title: {
                  text: '燃油车市场结构',
                  left: 'center',
                  textStyle: {
                    fontSize: 13
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
                      center: ['50%', '45%'],
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
                    fontSize: 13
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
                      center: ['50%', '45%'],
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
                    fontSize: 13
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
                      center: ['50%', '45%'],
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
                    fontSize: 13
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
                      center: ['50%', '45%'],
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
        var drawNewProlead = {
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
                  data: this.vehicleModeArr,
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
                  },
              },
              {
                  name: 'KPE',
                  type: 'line',
                  yAxisIndex: 1,
                  data: this.kpeArr,
                  itemStyle: {
                    color: '#aaaa7f'
                  },
              }
          ],
        }
        var myChart5 = echarts.init(document.getElementById('drawNewProlead'))
        myChart5.setOption(drawNewProlead)
      },
      // 项目回顾折线图
      drawProReview(){
        var drawProReview = {
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
          var myChart6 = echarts.init(document.getElementById('drawProReview'))
          myChart6.setOption(drawProReview)
      },
      // 市场销量折线图
      drawBudget() {
        var drawBudget = {
          title: {
            text: '年度预算',
            textStyle: {
              fontSize: 13
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
        var myChart7 = echarts.init(document.getElementById('drawBudget'));
        myChart7.setOption(drawBudget)
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
      .hotNewsbox{border: #c6effd 1px solid;padding: 5px;height: 225px; background-color: #dcf5fe;}
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
