<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-col :span="4">
          <div class="box">
            <div class="title"><h4>信息列表</h4></div>
            <div class="selectBox">
              <span>年度</span>
              <el-select v-model="yearSelect" placeholder="请选择" size="mini" class="select" @change='yearChange'>
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
              <el-select v-model="monthSelect" placeholder="请选择" size="mini" class="select" @change='monthChange'>
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
            <el-row style="margin-bottom: 35px;">
              <el-col :span="24">
                <p><h5>{{this.brandName}}分车型销售情况</h5></p>
                <el-table
                  :data="heziSalesPlanRespListSTD"
                  row-key="id"
                  :header-cell-style="{'text-align':'center'}"
                  :row-style="{height:'20px'}"
                  :cell-style="{padding:'0px'}"
                  style="font-size: 10px;width: 100%;">
                  <el-table-column
                    prop="vehicleMode"
                    label="STD"
                    align="right"
                    min-width="70">
                  </el-table-column>
                  <el-table-column
                    prop="yearPlanNo"
                    label="年度计划"
                    align="right"
                    min-width="80">
                  </el-table-column>
                  <el-table-column :label="String(monthSelect)+'月'">
                    <el-table-column
                      prop="monthSalesNo"
                      label="销量"
                      align="right"
                      min-width="60">
                    </el-table-column>
                    <el-table-column
                      prop="monthYoychange"
                      label="同比变化"
                      :formatter="percentFormatter"
                      align="right"
                      min-width="70">
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="'1-'+String(monthSelect)+'月'">
                    <el-table-column
                      prop="salesNoSubtotal"
                      label="销量"
                      align="right"
                      min-width="60">
                    </el-table-column>
                    <el-table-column
                      prop="yearCompletionRate"
                      label="年计完成率"
                      align="right"
                      min-width="70">
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="String(monthSelect+1)+'月'">
                    <el-table-column
                      prop="monthPlanNo"
                      label="计划"
                      align="right"
                      min-width="70">
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="String(monthSelect)+'月末'">
                    <el-table-column
                      prop="stockJv"
                      label="厂家库存"
                      align="right"
                      min-width="60">
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="String(monthSelect)+'月末'">
                    <el-table-column
                      prop="stockJvDepth"
                      label="库存深度"
                      align="right"
                      min-width="60">
                    </el-table-column>
                    <el-table-column
                      prop="stockDepth"
                      label="Δ深度"
                      align="right"
                      min-width="60">
                    </el-table-column>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 35px;">
              <el-col :span="24">
                <el-table
                  :data="heziSalesPlanRespListAaK"
                  row-key="id"
                  :header-cell-style="{'text-align':'center'}"
                  :row-style="{height:'20px'}"
                  :cell-style="{padding:'0px'}"
                  style="font-size: 10px;width: 100%;">
                  <el-table-column
                    prop="vehicleMode"
                    label="AaK"
                    align="right"
                    min-width="70">
                  </el-table-column>
                  <el-table-column
                    prop="yearPlanNo"
                    label="年度计划"
                    align="right"
                    min-width="80">
                  </el-table-column>
                    <el-table-column :label="String(monthSelect)+'月'">
                      <el-table-column
                        prop="monthSalesNo"
                        label="销量"
                        align="right"
                        min-width="60">
                      </el-table-column>
                      <el-table-column
                        prop="monthYoychange"
                        label="同比变化"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="60">
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="'1-'+String(monthSelect)+'月'">
                      <el-table-column
                        prop="salesNoSubtotal"
                        label="销量"
                        width="60">
                      </el-table-column>
                      <el-table-column
                        prop="yearCompletionRate"
                        label="年计完成率"
                        :formatter="percentFormatter"
                        align="right"
                        min-width="60">
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="String(monthSelect+1)+'月'">
                      <el-table-column
                        prop="stockJv"
                        label="计划"
                        min-width="60">
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="String(monthSelect)+'月末'">
                      <el-table-column
                        prop="stockJv"
                        label="厂家库存"
                        align="right"
                        min-width="60">
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="String(monthSelect)+'月末'">
                      <el-table-column
                        prop="stockJvDepth"
                        label="库存深度"
                        align="right"
                        min-width="60">
                      </el-table-column>
                      <el-table-column
                        prop="stockJvDepth"
                        label="Δ深度"
                        align="right"
                        min-width="60">
                      </el-table-column>
                    </el-table-column>
                  </el-table>
              </el-col>
            </el-row>
            <el-row>
              <el-input
                type="textarea"
                placeholder="请输入留言内容"
                v-model="content"
                maxlength="100"
                show-word-limit
              >
              </el-input>
              <el-button type="text" @click="submitMessage">提交留言</el-button>
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
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>

  import {getHeziSalesPlan, getHeziSalesPlanParams} from '@/api/common/modelPerformance.js';
  import {addComments,getHeziComments} from '@/api/common/comments.js';

  export default {
    data(){
      return{
        nfOptions: [],
        businessSelect: '', //选中品牌的id
        businessNameArr: [], //品牌列表
        brandName: '', //当前选择的品牌名称
        yearSelect: new Date().getFullYear(),
        monthSelect: new Date().getMonth()+1,
        heziSalesPlanRespList: [], //品牌表现_市场排名对象
        heziSalesPlanRespListSTD: [], //品牌表现_市场排名对象STD
        heziSalesPlanRespListAaK: [], //品牌表现_市场排名对象AaK
        requestParams: {} , //请求参数
        messageRequestParams: {}, // 留言请求参数
        content: '', // 留言内容
        contentList: [] //留言内容列表
      }

   },
   created() {
     this.getNf()
     this.initBussinessSel()
     this.getMessage()
   },
    methods:{
      //初始化车型表现
      initHeziSalesPlan(){
        this.requestParams.year = this.yearSelect
        this.requestParams.month = this.monthSelect
        this.requestParams.brandId = this.businessSelect
        getHeziSalesPlan(this.requestParams).then(res => {
          this.heziSalesPlanRespList = res.data
          if(this.heziSalesPlanRespList !=  null){
            this.heziSalesPlanRespListSTD = this.heziSalesPlanRespList.filter(item => item.tag.toUpperCase() === 'STD');
            this.heziSalesPlanRespListAaK = this.heziSalesPlanRespList.filter(item => item.tag.toUpperCase() === 'AAK');
          }else{
            this.heziSalesPlanRespListSTD = []
            this.heziSalesPlanRespListAaK = []
          }
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
        this.initHeziSalesPlan()
      },
      // 选择月份
      monthChange(e){
        this.monthSelect = e
        this.initHeziSalesPlan()
      },
      //选择品牌
      businessChange(e){
        let obj = {}
        obj = this.businessNameArr.find((item) => {
         return item.brandId === e;
        });
        //获取当前选择的品牌名称
        this.brandName = obj.brandName
        this.initHeziSalesPlan()
      },
      //初始化品牌下拉
      initBussinessSel(){
        getHeziSalesPlanParams().then(res => {
          this.businessNameArr = res.data
          if(this.businessNameArr != null){
            this.businessSelect = this.businessNameArr[0].brandId // 预选中第一项
            this.brandName = this.businessNameArr[0].brandName
            this.initHeziSalesPlan()
          }
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      },
      // 获取页面留言
      getMessage(){
        this.messageRequestParams.belongModule = '车型表现'
        this.messageRequestParams = getHeziComments(this.messageRequestParams).then(res => {
          this.contentList = res.data
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      },
      // 数字格式化成百分比
      percentFormatter(row, column, cellValue, index) {
        if (cellValue==0 || cellValue==-0 || isNaN(cellValue) ) {
            return 0
        }
        var str = ( cellValue * 100 ).toFixed(2) + "%";
        return str
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
  img{width: 100%;}
  .el-table .show-row {
    display: block;
  }
  .el-table .hide-row {
    display: none;
  }
</style>
