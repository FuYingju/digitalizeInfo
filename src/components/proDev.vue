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
          </div>
        </el-col>
        <el-col :span="16">
          <div class="container">
            <el-row>
              <el-col :span="24">
                <h5>合资品牌新产品项目开发进度</h5>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" v-for="item in this.heziProjectScheduleList" :key="item.id">
                <img :src="basePath+item.picturePath" @click="vShow">
              </el-col>
            </el-row>
            <el-row v-show="showBtn == true">
              <el-col>
                <el-table
                  :data="heziProjectScheduleList"
                  row-key="id"
                  border
                  :header-cell-style="{'text-align':'center'}"
                  :row-style="{height:'20px'}"
                  :cell-style="{padding:'0px'}"
                  style="font-size: 10px;width: 100%;">
                  <el-table-column
                    prop="projectName"
                    label="项目"
                    min-width="100">
                  </el-table-column>
                  <el-table-column
                    prop="point"
                    label="重点项"
                    min-width="100">
                  </el-table-column>
                  <el-table-column
                    prop="step"
                    label="措施"
                    min-width="100">
                  </el-table-column>
                  <el-table-column
                    prop="principal"
                    label="负责人"
                    min-width="100">
                  </el-table-column>
                  <el-table-column
                    prop="plan"
                    label="进度"
                    min-width="100">
                  </el-table-column>
                  <el-table-column
                    prop="state"
                    label="状态"
                    width="100">
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

  import AddComments from '@/components/addComments.vue';
  import {getHeziComments} from '@/api/common/comments.js';
  import {getHeziProjectSchedule,getHeziProjectScheduleParams} from '@/api/common/proDev.js';

  export default {
    data(){
      return{
        moduleName:'项目开发进度',
        nfOptions: [],
        heziProjectScheduleList: [],
        yearSelect: new Date().getFullYear(),
        monthSelect: new Date().getMonth()+1,
        requestParams: {},
        businessSelect: '', //选中品牌的id
        businessNameArr: [], //品牌列表
        brandName: '', //当前选择的品牌名称
        basePath: window.document.location.href.substring(0,16),
        messageRequestParams: {}, // 留言请求参数
        content: '', // 留言内容
        contentList: [] ,//留言内容列表
        showBtn:false
      }
   },
   created() {
     this.getNf()
     this.initBussinessSel()
     this.getMessage()
   },
   methods:{
     //初始化项目开发进度
     initHeziProjectSchedule(){
       this.requestParams.year = this.yearSelect
       this.requestParams.month = this.monthSelect
       this.requestParams.brandId = this.businessSelect
       getHeziProjectSchedule(this.requestParams).then(res => {
         this.heziProjectScheduleList = res.data
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
       this.initHeziProjectSchedule()
     },
     // 选择月份
     monthChange(e){
       this.monthSelect = e
       this.initHeziProjectSchedule()
     },
     //初始化品牌下拉
     initBussinessSel(){
       getHeziProjectScheduleParams().then(res => {
         this.businessNameArr = res.data
         if(this.businessNameArr != null){
           this.businessSelect = this.businessNameArr[0].brandId // 预选中第一项
           this.brandName = this.businessNameArr[0].brandName
           this.initHeziProjectSchedule()
         }
       }).catch(error => {
         console.log(error)
         reject(error)
       })
     },
     //选择品牌
     businessChange(e){
       let obj = {}
       obj = this.businessNameArr.find((item) => {
        return item.brandId === e;
       });
       //获取当前选择的品牌名称
       this.brandName = obj.brandName
       this.initHeziProjectSchedule()
     },
     vShow(){
       if(this.showBtn == false){
         this.showBtn = true
       }else{
         this.showBtn = false
       }
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
  .container{margin: 0 15px;}
  .linkItem{line-height: 35px;margin: 10px;}
  h5{margin: 0;font-size: 14px;}
  .message{margin: 10px;font-size: 12px;}
  img{width: 100%;}
  .hotNewsbox{border: #c6effd 1px solid;padding: 5px;height: 150px; background-color: #dcf5fe;}
  .linkItem2{line-height: 10px;margin: 10px;}
</style>
