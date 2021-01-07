<template>
  <div class="loginBox">
    <div>
        <el-carousel height="400px">
              <el-carousel-item v-for="item in partnerNewsGroup" :key="item.id">
                <div class="title">{{item.brandName}}</div>
                <div v-for="(item2,index) in item.data" :key="item2.id" class="linkItem">
                  <!-- <router-link :to="{path:'/partnerNews', query:{id:item2.id}}">
                    <el-link>{{index+1}} 、 {{item2.title}}</el-link>
                  </router-link> -->
                </div>
              </el-carousel-item>
        </el-carousel>
    </div>
    <div>
      <h1>合作事业部数字化信息系统</h1>
      <div class="buttonBox">
        <el-form :model="form" ref='loginForm' :rules="formItemRules">
          <el-form-item label="" prop="username">
            <el-input v-model="form.username" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input placeholder="请输入密码" v-model="form.password" show-password ></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="submitForm" class="button">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
     </div>
  </div>
</template>

<script>
  import {selectAllHeziPartnerNews} from '@/api/common/partner.js';
  
  export default {
      data() {
        return {
          partnerNewsArr: [], //合作伙伴动态
          partnerNewsGroup: [], //重新组合后的合作伙伴动态
           form: {
             username: '',
             password: ''
           },
           input:'',
           input2:'',
          formItemRules: {
            username: [
              { required: true, message: '用户名不能为空', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '密码不能为空', trigger: 'blur' }
            ]
          }
        };
      },
      created() {
        this.initPartnerNews()  // 合作伙伴
      },
      methods: {
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
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },

        submitForm (){
          console.log(this.form)
          this.$refs['loginForm'].validate((valid) => {
            this.$store
              .dispatch("Login", this.form)
              .then((res) => {
                console.log("#####################")
                console.log(res)
                this.$router.push({ path:'/' });
              })
              .catch(() => {
                // this.loading = false;
                // this.getCode();
              });
          })

        }
      }
    }
</script>

<style scoped>
  .loginBox{width: 70%;margin: 13% auto 0;overflow: hidden;max-width: 1126px;}
  .loginBox >div:first-child{float: left;width: 70%;}
  .loginBox >div:last-child{float: right;width: 30%;background-color: #2C3E50;height: 400px;}
  img{width: 100%;height: 100%;}
  h1{color: #FFFFFF;margin: 1.875rem 0.625rem 0;margin: 30px 10px 0;}
  .buttonBox{width: 90%;margin: 70px auto 0;}
  .buttonBox >div{overflow: hidden; color: #fff;display: flex;margin: 10px 0;}
  .buttonBox >div span{font-size: 16px;width: 100px;line-height: 2rem;line-height: 32px;margin-right: 0.3125rem;margin-right: 5px;}
  .loginBut{width: 100%;margin-left: 5px;}
  /* .el-input{background-color: #FFFFFF; color: #000;} */
</style>
