<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <div class="box">
            <div class="title"><h4>设置区</h4></div>
            <div class="selectBox">
              <span>品牌</span>
              <el-select v-model="value" placeholder="请选择" size="mini" class="select">
                <el-option
                  v-for="item in options"
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
            <div v-for="item in linkGroup" :key="item" class="linkItem">
                <el-link href="item.link">{{item.title}}</el-link>
            </div>
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
                  value: '大众',
                  label: '大众'
                }, {
                  value: '丰田',
                  label: '丰田'
                }, {
                  value: '奥迪',
                  label: '奥迪'
                }, {
                  value: '捷达',
                  label: '捷达'
                }],
        value: '',
        linkGroup:[
          {
            title:"1.大众停止土耳其新工厂计划大众停止土耳其新工厂计划大众停止土耳其新工厂计划",
            link:'#'
           },
          {
            title:"2.大众停止土耳其新工厂计划大众停止土耳其新工厂计划大众停止土耳其新工厂计划",
            link:'#'
          },
          {
            title:"3.大众停止土耳其新工厂计划大众停止土耳其新工厂计划大众停止土耳其新工厂计划",
            link:'#'
          },
          {
            title:"4.大众停止土耳其新工厂计划大众停止土耳其新工厂计划大众停止土耳其新工厂计划",
            link:'#'
          },
          {
            title:"5.大众停止土耳其新工厂计划大众停止土耳其新工厂计划大众停止土耳其新工厂计划",
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
</style>
