<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-col :span="36">
          <div class="container">
            <el-row style="margin-bottom: 35px;">
              <el-col :span="24">
                <el-table v-if="this.reportType == '0' || this.reportType == '1'"
                  :data="heziReportAnalysisList"
                  border
                  row-key="id"
                  style="width: 100%">
                    <el-table-column
                      prop="item"
                      label="项目"
                      width="140">
                    </el-table-column>
                    <el-table-column
                      prop="nowMonth"
                      :label="this.year"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="accumPercent"
                      label="同比变化"
                      :formatter="percentFormatter"
                      width="80">
                    </el-table-column>
                </el-table>
                <el-table v-if="this.reportType == '2' || this.reportType == '3'"
                  :data="heziReportAnalysisList"
                  border
                  row-key="id"
                  style="width: 100%">
                    <el-table-column
                      prop="item"
                      label="项目"
                      width="140">
                    </el-table-column>
                    <el-table-column
                      prop="nowMonth"
                      label="当月"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="accum"
                      label="累计"
                      width="80">
                    </el-table-column>
                    <el-table-column v-if="this.reportType == '2'"
                      prop="nowAccumPercent"
                      label="累计占收入比"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="sameTime"
                      label="同期"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="sameTimeAccum"
                      label="同期累计"
                      width="80">
                    </el-table-column>
                    <el-table-column v-if="this.reportType == '2'"
                      prop="sameAccumPercent"
                      label="累计占收入比"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="monthPercent"
                      label="当月同比变化"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="accumPercent"
                      label="累计同比变化"
                      width="80">
                    </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import {getHeziReportAnalysisDetail} from '@/api/common/reportAnalysis.js';

  export default {
    data(){
      return{
        requestParams: {},
        heziReportAnalysisList: [] ,//结果集
        reportType:'',
        year:''
      }
   },
   created() {
     this.requestParams.reportType = this.$route.query.reportType
     this.requestParams.year = this.$route.query.year
     this.requestParams.month = this.$route.query.month
     this.requestParams.company = this.$route.query.company
     getHeziReportAnalysisDetail(this.requestParams).then(res => {
       this.heziReportAnalysisList = res.data
       this.reportType = this.heziReportAnalysisList[0].reportType
       this.year = this.heziReportAnalysisList[0].year
     }).catch(error => {
       console.log(error)
       reject(error)
     })
   },
   methods:{
     // 数字格式化成百分比
     percentFormatter(row, column, cellValue, index) {
       if (cellValue==0 || cellValue==-0 || isNaN(cellValue) ) {
           return 0
       }
       return cellValue + '%'
     }
   }
 }
</script>

<style scoped>
  .box{width: 100%;margin: 0 auto;border: 1px solid #eee;height: 500px;position: relative;overflow: hidden;}
  .box .title{border-bottom: 1px solid #EEEEEE;background-color: #FFFFFF;width: 100%;text-align: center;padding: 10px 0;}
  .contentmsg {height: 450px;overflow: hidden;width: calc(100% - 17px);}
  .contentmsg:hover {overflow: auto;width: 100%;}
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
  .chartBox {height: 200px;}
</style>
