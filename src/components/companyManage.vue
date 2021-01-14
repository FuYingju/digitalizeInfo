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
              <el-select v-model="companySelect" placeholder="请选择" size="mini" class="select" @change="companyChange">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!-- <el-button type="primary" size="mini" class="creatReport">生成报告</el-button>
            <div class="buttonGroup">
              <Buttongroup />
            </div> -->
          </div>
        </el-col>
        <el-col :span="16">
          <div class="container">
            <span class="yyztpart" v-show="this.companySelect == 0 || this.companySelect == 1 || this.companySelect == 2 || this.companySelect == 3">
            <el-row>
              <el-col :span="24">
                <h5>运营状态</h5>
              </el-col>
              <el-col :span="24" v-show="this.companySelect == 0 || this.companySelect == 1">
                <h6 v-show="this.companySelect == 0">大众</h6>
                <h6 v-show="this.companySelect == 1">长春</h6>
              </el-col>
            </el-row>
            <el-row v-show="this.companySelect == 0 || this.companySelect == 1">
              <el-col :span="12">
                <div id="chart1" class="chartBox"></div>
              </el-col>
              <el-col :span="12">
                <div id="chart2" class="chartBox"></div>
              </el-col>
            </el-row>
            <el-row v-show="this.companySelect == 2">
              <el-col :span="24">
                <div id="chart11" class="chartBox"></div>
              </el-col>
            </el-row>
            <el-row v-show="this.companySelect == 3">
              <el-col :span="24">
                <div id="chart22" class="chartBox"></div>
              </el-col>
            </el-row>
            <el-row style="margin-top: 35px;margin-bottom: 35px;">
              <el-col :span="24">
                <!-- 运营状态1 -->
                <el-table
                  :data="this.yy_List1"
                  row-key="id"
                  border
                  :header-cell-style="{'text-align':'center'}"
                  :row-style="{height:'40px'}"
                  :cell-style="{padding:'0px'}"
                  style="font-size: 10px;width: 100%;">
                      <el-table-column
                        prop="title"
                        label=""
                        align="right"
                        min-width="70">
                      </el-table-column>
                      <el-table-column
                        prop="month1"
                        label="1月"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month2"
                        label="2月"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month3"
                        label="3月"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month4"
                        label="4月"
                        :formatter="percentFormatter"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month5"
                        label="5月"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month6"
                        label="6月"
                        :formatter="percentFormatter"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month7"
                        label="7月"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month8"
                        label="8月"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month9"
                        label="9月"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month10"
                        label="10月"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month11"
                        label="11月"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month12"
                        label="12月"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="total"
                        label="1-12月累计"
                        align="right"
                        min-width="80">
                      </el-table-column>
                      <el-table-column
                        v-if="this.companySelect == '2'"
                        prop="goal"
                        label="年度目标"
                        align="right"
                        min-width="80">
                      </el-table-column>
                  </el-table>
              </el-col>
            </el-row>
            <span class="yyzt2" v-show="this.companySelect == 0 || this.companySelect == 1 || this.companySelect == 2">
            <el-row v-show="this.companySelect == 0 || this.companySelect == 1">
              <el-col :span="24">
                <h6 v-show="this.companySelect == 0">捷达</h6>
                <h6 v-show="this.companySelect == 1">成都</h6>
              </el-col>
            </el-row>
            <el-row v-show="this.companySelect == 0 || this.companySelect == 1">
              <el-col :span="12">
                <div id="chart3" class="chartBox"></div>
              </el-col>
              <el-col :span="12">
                <div id="chart4" class="chartBox"></div>
              </el-col>
            </el-row>
            <el-row v-show="this.companySelect == 2">
              <el-col :span="24">
                <div id="chart33" class="chartBox"></div>
              </el-col>
            </el-row>
            <el-row style="margin-top: 35px;margin-bottom: 35px;">
              <el-col :span="24">
                <!-- 运营状态2 -->
                <el-table
                  :data="this.yy_List2"
                  row-key="id"
                  border
                  :header-cell-style="{'text-align':'center'}"
                  :row-style="{height:'40px'}"
                  :cell-style="{padding:'0px'}"
                  style="font-size: 10px;width: 100%;">
                      <el-table-column
                        prop="title"
                        label=""
                        align="right"
                        min-width="70">
                      </el-table-column>
                      <el-table-column
                        prop="month1"
                        label="1月"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month2"
                        label="2月"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month3"
                        label="3月"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month4"
                        label="4月"
                        :formatter="percentFormatter"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month5"
                        label="5月"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month6"
                        label="6月"
                        :formatter="percentFormatter"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month7"
                        label="7月"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month8"
                        label="8月"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month9"
                        label="9月"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month10"
                        label="10月"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month11"
                        label="11月"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="month12"
                        label="12月"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="55">
                      </el-table-column>
                      <el-table-column
                        prop="total"
                        label="1-12月累计"
                        align="right"
                        min-width="80">
                      </el-table-column>
                  </el-table>
              </el-col>
            </el-row>
            </span>
            </span>
            <span class="cwqkpart">
           <el-row>
             <el-col :span="24">
               <h5>财务情况</h5>
             </el-col>
           </el-row>
           <el-row style="margin-top: 35px;margin-bottom: 35px;">
             <el-col :span="24">
               <div id="chart5" class="chartBox"></div>
             </el-col>
           </el-row>
           <el-row style="margin-top: 35px;margin-bottom: 35px;">
             <el-col :span="24">
               <el-table
                 :data="this.cw_list"
                 row-key="id"
                 border
                 :header-cell-style="{'text-align':'center'}"
                 :row-style="{height:'40px'}"
                 :cell-style="{padding:'0px'}"
                 style="font-size: 10px;width: 100%;">
                     <el-table-column
                       prop="title"
                       label=""
                       align="right"
                       min-width="70">
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
                       min-width="50">
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
                     <el-table-column
                       prop="total"
                       label="1-12月累计"
                       align="right"
                       min-width="80">
                     </el-table-column>
                 </el-table>
             </el-col>
           </el-row>
           </span>
           <span class="zyxmjkpart" v-show="this.companySelect != '3'">
           <el-row style="margin-top: 35px;margin-bottom: 35px;">
             <el-col :span="24">
               <h5>重要项目监控</h5>
             </el-col>
           </el-row>
           <el-row style="margin-top: 35px;margin-bottom: 35px;" v-show="this.companySelect == '0' || this.companySelect == '1' || this.companySelect == '2'">
             <el-col :span="24">
               <el-table
                 :data="this.jk_list"
                 row-key="id"
                 border
                 :header-cell-style="{'text-align':'center'}"
                 :row-style="{height:'40px'}"
                 :cell-style="{padding:'0px'}"
                 style="font-size: 10px;width: 100%;">
                     <el-table-column
                       prop="keyPerformance"
                       label="关键绩效指标"
                       min-width="100">
                     </el-table-column>
                     <el-table-column
                       prop="goalEndTime"
                       label="目标完成时间"
                       min-width="100">
                     </el-table-column>
                     <el-table-column
                       prop="actual"
                       label="现状"
                       min-width="100">
                     </el-table-column>
                     <el-table-column
                       prop="finishingRate"
                       label="完成率"
                       align="right"
                       min-width="50">
                     </el-table-column>
                     <el-table-column
                       prop="riskDesc"
                       label="风险描述"
                       min-width="100">
                     </el-table-column>
                     <el-table-column
                       prop=""
                       label="状态"
                       min-width="50">
                       <template slot-scope="scope">
                          <div v-if="scope.row.state == '0'" style="background-color:greenyellow;" class="circle"></div>
                          <div v-else-if="scope.row.state == '1'" style="background-color:yellow;" class="circle"></div>
                          <div v-else="scope.row.state == '2'" style="background-color:red;" class="circle"></div>
                       </template>
                     </el-table-column>
                 </el-table>
             </el-col>
           </el-row>
           <el-row style="margin-top: 35px;margin-bottom: 35px;" v-show="this.companySelect == '4' || this.companySelect == '5' || this.companySelect == '6' || this.companySelect == '7'">
             <el-col :span="24">
               <el-table
                 :data="this.jk_list2"
                 row-key="id"
                 border
                 :header-cell-style="{'text-align':'center'}"
                 :row-style="{height:'40px'}"
                 :cell-style="{padding:'0px'}"
                 style="font-size: 10px;width: 100%;">
                     <el-table-column
                       prop="majorProject"
                       label="重大项目"
                       min-width="100">
                     </el-table-column>
                     <el-table-column
                       prop="monthSummary"
                       label="本月工作总结"
                       min-width="100">
                     </el-table-column>
                     <el-table-column
                       prop="monthPlan"
                       label="下月工作计划"
                       min-width="100">
                     </el-table-column>
                 </el-table>
             </el-col>
           </el-row>
           </span>
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
  import Buttongroup from '@/components/buttonGroup.vue';
  import AddComments from '@/components/addComments.vue';
  import {getHeziComments} from '@/api/common/comments.js';
  import {getHeziCompanyManage} from '@/api/common/companyManage.js';

  export default {
    data(){
      return{
        moduleName:'参股公司管理',
        nfOptions: [],
        yearSelect: new Date().getFullYear(),
        companySelect:'0',
        requestParams: {},
        heziCompanyManageList: [],
        messageRequestParams: {}, // 留言请求参数
        content: '', // 留言内容
        contentList: [] , //留言内容列表
        yy_List1:[], //大众或长春运营
        yy_List2:[], //捷达或成都运营
        cw_list:[], //财务
        jk_list:[], //重要项目监控
        jk_list2:[], //重要项目监控
        options2: [
                {
                  value: '0',
                  label: 'CSC参股公司管理'
                }, {
                  value: '1',
                  label: '摩捷出行参股公司管理'
                }, {
                  value: '2',
                  label: '开迈斯'
                }, {
                  value: '3',
                  label: '大连一汽发动机'
                },
                {
                  value: '4',
                  label: '成都丰田纺'
                },
                {
                  value: '5',
                  label: '天津艾达'
                },
                {
                  value: '6',
                  label: '同方环球物流'
                },
                {
                  value: '7',
                  label: '丰田一汽模具'
                }
               ]
      }

   },
   created() {
     this.getNf()
     this.getMessage()
     this.initCompanyManage()
   },
   methods:{
     initCompanyManage(){
       this.requestParams.year = this.yearSelect
       this.requestParams.jointCompany = this.companySelect
       getHeziCompanyManage(this.requestParams).then(res => {
          this.heziCompanyManageList = res.data
          this.yy_List1 = []
          this.yy_List2 = []
          this.cw_list = []
          this.jk_list = []
          this.jk_list2 = []
          if(this.heziCompanyManageList != null){
            this.heziCompanyManageList.forEach(item => {
              if(item.jointCompany == '0' && item.moduleName == '0' && item.company.indexOf('大众') != -1){
                this.yy_List1.push(item)
              }
              if(item.jointCompany == '0' && item.moduleName == '0' && item.company.indexOf('捷达') != -1){
                this.yy_List2.push(item)
              }
              if(item.jointCompany == '1' && item.moduleName == '0' && item.area.indexOf('长春') != -1){
                this.yy_List1.push(item)
              }
              if(item.jointCompany == '1' && item.moduleName == '0' && item.area.indexOf('成都') != -1){
                this.yy_List2.push(item)
              }
              if(item.jointCompany == '2' && item.moduleName == '0' && item.title.indexOf('充电量') == -1){
                this.yy_List1.push(item)
              }
              if(item.jointCompany == '2' && item.moduleName == '0' && item.title.indexOf('充电量') != -1){
                this.yy_List2.push(item)
              }
              if(item.jointCompany == '3' && item.moduleName == '0'){
                this.yy_List1.push(item)
              }
              if(item.moduleName == '1'){
                this.cw_list.push(item)
              }
              if((item.jointCompany == '0' || item.jointCompany == '1' || item.jointCompany == '2') && item.moduleName == '2'){
                this.jk_list.push(item)
              }else if((item.jointCompany == '4' || item.jointCompany == '5' || item.jointCompany == '6' || item.jointCompany == '7') && item.moduleName == '2'){
                this.jk_list2.push(item)
              }

            })
          }else{
            this.heziCompanyManageList = []
          }
          if(this.companySelect == '0' || this.companySelect == '1'){
            this.draw()
            this.draw2()
          }else if(this.companySelect == '2'){
            this.draw3()
          }else if(this.companySelect == '3'){
            this.draw4()
          }
          this.draw5()
       }).catch(error => {
         console.log(error)
         reject(error)
       })
     },
     // 运营情况折线图
     draw() {
       var list1 = []
       var list2 = []
       var list3 = []
       var title1 = ''
       var title2 = ''
       var name1 = ''
       var name2 = ''
       if(this.heziCompanyManageList != null){
         this.heziCompanyManageList.forEach(item =>{
           if(this.companySelect == '0'){
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
           }else if(this.companySelect == '1'){
             if(item.title.indexOf('注册用户') != -1 && item.area.indexOf('长春') != -1){
               list3 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
               title2 = '注册用户'
             }
             if(item.title.indexOf('运营车辆数') != -1 && item.area.indexOf('长春') != -1){
               list1 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
               name1 = item.title
             }
             if(item.title.indexOf('车辆使用率') != -1 && item.area.indexOf('长春') != -1){
               list2 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
               title1 = '运营车辆数及使用率'
               name2 = item.title
             }
           }
         })
       }
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
       var myChart = echarts.init(document.getElementById('chart1'))
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
       var myChart2 = echarts.init(document.getElementById('chart2'))
       myChart2.setOption(echartsOption2)
     },
     // 运营情况折线图
     draw2() {
       var list1 = []
       var list2 = []
       var list3 = []
       var title1 = ''
       var title2 = ''
       var name1 = ''
       var name2 = ''
       if(this.heziCompanyManageList != null){
         this.heziCompanyManageList.forEach(item =>{
           if(this.companySelect == '0'){
             if(item.title.indexOf('累计用户数') != -1 && item.company.indexOf('捷达') != -1){
               list1 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
               title1 = '激活率及累计用户数量'
               name1 = item.title
             }
             if(item.title.indexOf('激活率') != -1 && item.company.indexOf('捷达') != -1){
               list2 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
               name2 = item.title
             }
             if(item.title.indexOf('用户转化率') != -1 && item.company.indexOf('捷达') != -1){
               list3 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
               title2 = '用户转化率'
             }
           }else if(this.companySelect == '1'){
             if(item.title.indexOf('注册用户') != -1 && item.area.indexOf('成都') != -1){
               list3 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
               title2 = '注册用户'
             }
             if(item.title.indexOf('运营车辆数') != -1 && item.area.indexOf('成都') != -1){
               list1 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
               name1 = item.title
             }
             if(item.title.indexOf('车辆使用率') != -1 && item.area.indexOf('成都') != -1){
               list2 = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12]
               name2 = item.title
               title1 = '运营车辆数及使用率'
             }
           }
         })
       }
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
       var myChart = echarts.init(document.getElementById('chart3'))
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
       var myChart2 = echarts.init(document.getElementById('chart4'))
       myChart2.setOption(echartsOption2)
     },
     draw3(){
       var zjz = []
       var zlz = []
       var jrz = []
       var cdl = []
       if(this.heziCompanyManageList != null){
         this.heziCompanyManageList.forEach(item =>{
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
         })
       }
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
       var myChart1 = echarts.init(document.getElementById('chart11'))
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
       var myChart3 = echarts.init(document.getElementById('chart33'))
       myChart3.setOption(echartsOption3)
     },
     draw4(){
       var cl = []
       var xl = []
       if(this.heziCompanyManageList != null){
         this.heziCompanyManageList.forEach(item =>{
           if(item.title.indexOf('销量') != -1 && item.moduleName == '0'){
             xl = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12,item.total,item.goal]
           }
           if(item.title.indexOf('产量') != -1 && item.moduleName == '0'){
             cl = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12,item.total,item.goal]
           }
         })
       }
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
       var myChart1 = echarts.init(document.getElementById('chart22'))
       myChart1.setOption(echartsOption1)
     },
     //财务状况柱状图
     draw5(){
       var ys = []
       var sj = []
       if(this.heziCompanyManageList != null){
         this.heziCompanyManageList.forEach(item =>{
           if(item.title.indexOf('预算') != -1 && item.moduleName == '1'){
             ys = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12,item.total]
           }
           if(item.title.indexOf('实际') != -1 && item.moduleName == '1'){
             sj = [item.month1,item.month2,item.month3,item.month4,item.month5,item.month6,item.month7,item.month8,item.month9,item.month10,item.month11,item.month12,item.total]
           }
         })
       }
       var echartsOption5 = {
          title: {
            text: this.yearSelect+'年利润完成情况',
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
       var myChart5 = echarts.init(document.getElementById('chart5'))
       myChart5.setOption(echartsOption5)
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
       this.initCompanyManage()
     },
     // 选择公司
     companyChange(e){
       this.companySelect = e
       this.initCompanyManage()
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
     percentFormatter(row, column, cellValue, index) {
       if (cellValue==0 || cellValue==-0 || isNaN(cellValue) ) {
           cellValue = 0
       }
       if(this.companySelect == '0'){
         if(row.title.indexOf('累计用户数') == -1){
           return cellValue + '%'
         }else{
           return cellValue
         }
       }else if(this.companySelect == '1'){
         if(row.title.indexOf('车辆使用率') != -1){
           return cellValue + '%'
         }else{
           return cellValue
         }
       }else if(this.companySelect == '2' || this.companySelect == '3'){
         return cellValue
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
  .creatReport{margin: 10px auto 10px 20px; width: 100px;}
  .chartBox {height: 200px;}
  .circle{width: 20px;height: 20px;margin: 0px 20px;border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;}
</style>
