<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <div class="box">
            <div class="title"><h4>设置区</h4></div>
            <div class="selectBox">
              <span>品牌</span>
              <el-select v-model="businessSelect" placeholder="请选择" size="mini" class="select" @change='change'>
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
          <div class="container" style="margin-bottom: 35px;">
            <div v-for="(item, index) in partnerNewsTitle" :key="item.id" class="linkItem">
              <router-link :to="{path:'/partnerNews', query:{id:item.id}}">
                <el-link>{{index+1}} 、 {{item.title}}</el-link>
              </router-link>
            </div>
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
            <div class="contentmsg">
              <div class="message" v-for="item in contentList" :key="item.id">
                <div>{{item.content}}</div>
                <div style="text-align: right;">
                  -{{item.userName}}
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <router-view></router-view>
  </div>
</template>

<script>

  import {listBrandName,getTitleByBrandName} from '@/api/common/partner.js';
  import {addComments,getHeziComments} from '@/api/common/comments.js';

  export default {
    data(){
      return{
        businessSelect: '',
        businessNameArr: [],
        partnerNewsTitle: [],
        requestParams: {},
        messageRequestParams: {}, // 留言请求参数
        content: '', // 留言内容
        contentList: [] //留言内容列表
      }

   },
   created() {
     this.initBussinessSel()
     this.getMessage()
   },
   methods:{
     //初始化品牌下拉
     initBussinessSel(){
       listBrandName().then(res => {
         this.businessNameArr = res.data
         if(this.businessNameArr != null){
           this.businessSelect = this.businessNameArr[0].brandId // 预选中第一项
           this.initNewsTitle()
         }
       }).catch(error => {
         console.log(error)
         reject(error)
       })
     },
     //根据品牌查标题
     initNewsTitle(){
       this.requestParams.brandId = this.businessSelect
       getTitleByBrandName(this.requestParams).then(res => {
         this.partnerNewsTitle = res.data
       }).catch(error => {
         console.log(error)
         reject(error)
       })
     },
     change(e){
       this.initNewsTitle()
     },
     // 获取页面留言
     getMessage(){
       this.messageRequestParams.belongModule = '合作伙伴'
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
       this.messageRequestParams.belongModule = '车型表现'
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
  a {
    text-decoration: none;
  }
  .router-link-active {
    text-decoration: none;
  }
</style>
