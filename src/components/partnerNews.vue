<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-col :span="24">
          <div class="box" v-html="this.news"></div>
        </el-col>
      </el-row>
    </el-card>
    <router-view></router-view>
  </div>
</template>

<script>

  import Buttongroup from '@/components/buttonGroup.vue';
  import {listById} from '@/api/common/partner.js';

  export default {
    data(){
      return{
        news:'',
        requestParams: {}
      }
   },
   created() {
     this.requestParams.id = this.$route.query.id // 获取标题id
     listById(this.requestParams).then(res => {
       this.news = res.data[0].news
     }).catch(error => {
       console.log(error)
       reject(error)
     })
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
  a {
    text-decoration: none;
  }
  .router-link-active {
    text-decoration: none;
  }
</style>
