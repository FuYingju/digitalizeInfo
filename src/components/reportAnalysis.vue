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
            <div class="selectBox">
              <span>企业</span>
              <el-select v-model="value3" placeholder="请选择" size="mini" class="select">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
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
            <el-row class="img-box">
              <el-col :span="12">
                <img src="../assets/35.png">
              </el-col>
              <el-col :span="12">
                <img src="../assets/35.png">
              </el-col>
            </el-row>
            <el-row class="img-box">
              <el-col :span="12">
                <img src="../assets/35.png">
              </el-col>
              <el-col :span="12">
                <img src="../assets/35.png">
              </el-col>
            </el-row>
            <el-row class="img-box">
              <el-col :span="12">
                <img src="../assets/35.png">
              </el-col>
              <el-col :span="12">
                <img src="../assets/35.png">
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
        options2: [{
                  value: '一汽大众',
                  label: '一汽大众'
                }, {
                  value: '一汽丰田',
                  label: '一汽丰田'
                }, {
                  value: '一汽马自达',
                  label: '一汽马自达'
                }],
        value: '',
        value2:'',
        value3:'',

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
