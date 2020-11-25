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
            <div class="buttonGroup">
              <Buttongroup />
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="container">
            <el-row class="img-box">
              <el-col :span="24">
                <img :src="picturePath">
              </el-col>
            </el-row>
          </div>
          <el-input
            type="textarea"
            placeholder="请输入留言内容"
            v-model="content"
            maxlength="100"
            show-word-limit
          >
          </el-input>
          <el-button type="text" @click="submitMessage">提交留言</el-button>
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

  import Buttongroup from '@/components/buttonGroup.vue';
  import {getHeziMarketRanking} from '@/api/common/ranking.js';
  import {addComments,getHeziComments} from '@/api/common/comments.js';

  export default {
    data(){
      return{
        nfOptions: [],
        yearSelect: new Date().getFullYear(),
        monthSelect: new Date().getMonth()+1,
        requestParams: {},
        picturePath: '',
        messageRequestParams: {}, // 留言请求参数
        content: '', // 留言内容
        contentList: [] //留言内容列表
      }
   },
   created() {
     this.getNf()
     this.initHeziMarketRanking()
     this.getMessage()
   },
   methods:{
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
       this.initHeziMarketRanking()
     },
     // 选择月份
     monthChange(e){
       this.monthSelect = e
       this.initHeziMarketRanking()
     },
     // 初始化厂商排名
     initHeziMarketRanking(){
       this.picturePath = ''
       this.requestParams.year = this.yearSelect
       this.requestParams.month = this.monthSelect
       getHeziMarketRanking(this.requestParams).then(res => {
         this.marketRankingList = res.data
         if(this.marketRankingList != null){
           var curWwwPath = window.document.location.href.substring(0,16) //获取根路径http://localhost
           this.picturePath = curWwwPath+this.marketRankingList[0].picturePath
         }
       }).catch(error => {
         console.log(error)
         reject(error)
       })
     },
     // 获取页面留言
     getMessage(){
       this.messageRequestParams.belongModule = '厂商排行'
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
       this.messageRequestParams.belongModule = '厂商排行'
       addComments(this.messageRequestParams).then(res => {
         alert('留言成功')
         this.content = ''
         this.getMessage()
       }).catch(error => {
         console.log(error)
         reject(error)
       })
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
</style>
