<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <div class="box">
            <div class="title"><h4>信息列表</h4></div>
            <div class="selectBox">
              <span>年度</span>
              <el-select v-model="value" placeholder="请选择" size="mini" class="select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="selectBox">
              <span>月度</span>
              <el-select v-model="value2" placeholder="请选择" size="mini" class="select">
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
            <el-row>
              <el-col :span="24">
                <h5>合资品牌燃油车细分市场覆盖度</h5>
              </el-col>
            </el-row>
            <el-row class="img-box">
              <el-col :span="6">
                <img src="../assets/01.jpg">
              </el-col>
              <el-col :span="6">
                <img src="../assets/01.jpg">
              </el-col>
              <el-col :span="6">
                <img src="../assets/01.jpg">
              </el-col>
              <el-col :span="6">
                <img src="../assets/01.jpg">
              </el-col>
            </el-row>
            
            <el-row>
              <el-col :span="24">
                <h5>合资品牌燃油车细分市场覆盖度</h5>
              </el-col>
            </el-row>
            <el-row class="img-box">
              <el-col :span="6">
                <img src="../assets/01.jpg">
              </el-col>
              <el-col :span="6">
                <img src="../assets/01.jpg">
              </el-col>
              <el-col :span="6">
                <img src="../assets/01.jpg">
              </el-col>
              <el-col :span="6">
                <img src="../assets/01.jpg">
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="box">
            <div class="title"><h4>留言区</h4></div>
            <div class="message">
              <h5>任务</h5>
              <div>请做一下大众品牌PR69.1和PR68.1的变化分析</div>
              <div style="text-align: right;">
                -潘占福
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
  export default {
    data(){
      return{
        options: [{
                  value: '2020',
                  label: '2020'
                }, {
                  value: '2019',
                  label: '2019'
                }, {
                  value: '2018',
                  label: '2018'
                }, {
                  value: '2017',
                  label: '2017'
                }],
        value: '',
        value2:'',
        value3:'',
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
</style>
