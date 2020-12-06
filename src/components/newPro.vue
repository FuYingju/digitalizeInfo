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
              <el-select v-model="monthSelect" placeholder="请选择" size="mini" class="select" @change="monthChange">
                <el-option
                  v-for="item in monthOptions"
                  :key="item.index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="selectBox">
              <span>厂家</span>
              <el-select v-model="companySelect" placeholder="请选择" size="mini" class="select" @change="companyChange">
                <el-option
                  v-for="item in companyOptions"
                  :key="item.index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="buttonGroup">
              <Buttongroup />
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="container">
            <!-- <el-row class="img-box">
              <el-col :span="24">
                <el-table
                  :data="newProList"
                  row-key="id"
                  border
                  show-summary
                  :summary-method="getSummaries"
                  sum-text="细分市场覆盖率"
                  height="200"
                  style="width: 100%; margin-top: 20px">
                  <el-table-column
                    prop="vehicleMode"
                    label="品牌"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="share"
                    label="市场份额"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="yoychange"
                    label="同比"
                    width="100">
                  </el-table-column>
                  <el-table-column :label="String(yearSelect)+'年'">
                    <el-table-column
                      prop="brandName"
                      label="一汽大众"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="brandName"
                      label="上汽大众"
                      width="100">
                    </el-table-column>
                  </el-table-column>
                  </el-table>
              </el-col>
            </el-row> -->
            <el-row>
              <el-col :span="24">
                <div id="chart1" class="chartBox"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div id="chart2" class="chartBox"></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div id="chart3" class="chartBox"></div>
              </el-col>
            </el-row>
            <el-input
              type="textarea"
              placeholder="请输入留言内容"
              v-model="content"
              maxlength="100"
              show-word-limit
            >
            </el-input>
            <el-button type="text" @click="submitMessage">提交留言</el-button>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="box">
            <div class="title"><h4>留言区</h4></div>
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
  import {addComments,getHeziComments} from '@/api/common/comments.js';
  import {getHeziNewPro} from '@/api/common/newPro.js';

  export default {
    data(){
      return{
        nfOptions: [],
        monthOptions:[{
            label:'1~6月',
            value:'0'
          },
          {
            label:'6~12月',
            value:'1'
          }
        ],
        companyOptions:[{
            label:'一汽大众',
            value:'0'
          },
          {
            label:'上汽大众',
            value:'1'
          }
        ],
        companySelect: '0',
        yearSelect: new Date().getFullYear(),
        monthSelect: '0',
        monthFormat: '1~6月', //当前选择的品牌名称
        requestParams: {},
        messageRequestParams: {}, // 留言请求参数
        newProList:[],
        coverList:[], //细分市场覆盖度列表
        fuelCoverList:[], //燃油车细分市场覆盖度列表
        electCoverList:[], //电动车细分市场覆盖度列表
        shareList:[], //细分市场份额列表
        fuelShareList:[], //燃油车市场份额列表
        electShareList:[], //电动车市场份额列表
        content: '', // 留言内容
        contentList: [] //留言内容列表
      }

   },
   created(){
     this.getNf()
     this.getMessage()
     this.initNewPro()
   },
   methods:{
     // 初始化新产品规划
     initNewPro(){
       this.requestParams.year = this.yearSelect
       this.requestParams.month = this.monthSelect
       this.requestParams.company = this.companySelect
       getHeziNewPro(this.requestParams).then(res => {
         this.newProList = res.data
         if(this.newProList != null){
           this.newProList.forEach(item =>{
             var obj = {}
             obj.value = item.share
             obj.name = item.marketSegment
             if(item.tag == '1'){
               this.fuelShareList.push(obj)
               this.fuelCoverList.push(item.cover)
             }else{
               this.electShareList.push(obj)
               this.electCoverList.push(item.cover)
             }
           })
         }else{
           this.fuelShareList = []
           this.fuelCoverList = []
           this.electShareList = []
           this.electCoverList = []
         }
         this.draw()
       }).catch(error => {
         console.log(error)
         reject(error)
       })
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
       this.initNewPro()
     },
     // 选择月份
     monthChange(e){
       let obj = {}
       obj = this.monthOptions.find((item) => {
        return item.value === e;
       });
       this.monthFormat = obj.label
       this.initNewPro()
     },
     // 选择厂家
     companyChange(e){
       this.initNewPro()
     },
     // 获取页面留言
     getMessage(){
       this.messageRequestParams.belongModule = '新产品规划'
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
       this.messageRequestParams.belongModule = '新产品规划'
       addComments(this.messageRequestParams).then(res => {
         alert('留言成功')
         this.content = ''
         this.getMessage()
       }).catch(error => {
         console.log(error)
         reject(error)
       })
     },
     draw() {
       // 饼图
       var echartsOption1 = {
         title: {
                 text: this.yearSelect+'年'+this.monthFormat+'燃油车市场结构',
                 left: 'center'
             },
             tooltip: {
                 trigger: 'item',
                 formatter: '{a} <br/>{b} : {c} ({d}%)'
             },
             series: [
                 {
                     name: this.yearSelect+'年'+this.monthFormat+'燃油车市场结构',
                     type: 'pie',
                     radius: '55%',
                     center: ['50%', '60%'],
                     data: this.fuelShareList,
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
       var myChart = echarts.init(document.getElementById('chart1'))
       myChart.setOption(echartsOption1)
       var echartsOption2 = {
         title: {
                 text: this.yearSelect+'年'+this.monthFormat+'电动车市场结构',
                 left: 'center'
             },
             tooltip: {
                 trigger: 'item',
                 formatter: '{a} <br/>{b} : {c} ({d}%)'
             },
             series: [
                 {
                     name: this.yearSelect+'年'+this.monthFormat+'电动车市场结构',
                     type: 'pie',
                     radius: '55%',
                     center: ['50%', '60%'],
                     data: this.electShareList,
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
       var myChart2 = echarts.init(document.getElementById('chart2'))
       myChart2.setOption(echartsOption2)
       // 细分市场覆盖度折线图
       var echartsOption3 = {
         title: {
           text: '',
           textStyle: {
             fontSize: 15
           }
         },
         legend: {
             data: ['燃油车','电动车']
         },
         xAxis: [
             {
                 type: 'category',
                 data: this.nfOptions.map((item)=>{return item.dictLabel}),
                 axisPointer: {
                     type: 'shadow'
                 }
             }
         ],
         yAxis: [
           {
               type: 'value',
               min: 0,
               max: 100,
               interval: 5,
               axisLabel: {
                   formatter: '{value} %'
               }
           }
         ],
         series: [{
             name: '燃油车',
             type: 'line',
             data: this.fuelCoverList,
             itemStyle: {
               color: '#82d1ec'
             },
             label: {
               show: true
             }
           },
           {
             name: '电动车',
             type: 'line',
             data: this.electCoverList,
             itemStyle: {
               color: '#ffaa00'
             },
             label: {
               show: true
             }
           },
         ]
       };
       var myChart3 = echarts.init(document.getElementById('chart3'));
       myChart3.setOption(echartsOption3)
     }
   },
   components:{
       'Buttongroup': Buttongroup
     },
 }
</script>

<style scoped>
  .box{width: 100%;margin: 0 auto;border: 1px solid #eee;height: 500px;position: relative;}
  .box .title{border-bottom: 1px solid #EEEEEE;background-color: #FFFFFF;width: 100%;text-align: center;padding: 10px 0;}
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
  .hotNewsbox{border: #c6effd 1px solid;padding: 5px;height: 150px; background-color: #dcf5fe;}
  .linkItem2{line-height: 10px;margin: 10px;}
  .chartBox {
    height: 200px;
  }
</style>
