<template>
  <div class="loginBox">
    <div>
        <el-carousel height="400px">
              <el-carousel-item v-for="item in maplist" :key="item.url">
                <img :src="item.url">
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
  import {selectHeziIndexNews} from '@/api/common/indexNews.js';

  export default {
      data() {
        return {
          maplist:[
            {
              "url": require("../assets/login/u0.png")
            }
           ],
          basePath: window.document.location.href.substring(0,16),
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
        this.initIndexNews()  // 主页新闻
      },
      methods: {
        initIndexNews(){
          selectHeziIndexNews().then(res => {
            if(res.data != null){
              this.maplist = []
              res.data.forEach(item => {
                let obj = {}
                obj.url = this.basePath+item.picturePath
                this.maplist.push(obj)
              })
            }
          }).catch(error => {
            console.log(error)
            reject(error)
          })
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
  .linkItem{line-height: 35px;margin: 10px;}
  /* .el-input{background-color: #FFFFFF; color: #000;} */
</style>
