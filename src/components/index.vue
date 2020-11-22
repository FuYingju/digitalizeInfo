<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>合作伙伴动态</span>
      </div>
      <template>
        <el-carousel :interval="5000" indicator-position='outside'>
          <el-carousel-item v-for="item in infoList" :key="index">
            <div class="title">{{item.name}}</div>
            <div v-for="(item2,index) in item.content" :key="item2.index" class="linkItem">
                <el-link>{{index+1}} 、 {{item2.title}}</el-link>
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>合资公司舆情</span>
      </div>
      <div class="cardTitle"><h3>合资公司舆情（2020.08）</h3></div>
      <el-row>
        <el-col :span="16">
          <div id="chart1" class="chartBox"></div>
        </el-col>
        <el-col :span="8" class="hotNewsbox">
          <div><h4>热门关键事件</h4></div>
          <div v-for="(item,index) in hotNews" :key="index" class="linkItem2">
            <el-link>{{index+1}} 、{{item.name}}</el-link>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div id="chart2" class="chartBox"></div>
        </el-col>
        <el-col :span="8">
          <div id="chart3" class="chartBox"></div>
        </el-col>
        <el-col :span="8">
          <div id="chart4" class="chartBox"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div id="chart5" class="chartBox"></div>
        </el-col>
        <el-col :span="8">
          <div id="chart6" class="chartBox"></div>
        </el-col>
        <el-col :span="8" class="hotNewsbox">
          <div><h4>热门关键事件</h4></div>
          <div v-for="(item,index) in hotNews" :key="index" class="linkItem2">
            <el-link>{{index+1}} 、{{item.name}}</el-link>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div id="chart7" class="chartBox"></div>
        </el-col>
        <el-col :span="8">
          <div id="chart8" class="chartBox"></div>
        </el-col>
        <el-col :span="8" class="hotNewsbox">
          <div><h4>热门关键事件</h4></div>
          <div v-for="(item,index) in hotNews" :key="index" class="linkItem2">
            <el-link>{{index+1}} 、{{item.name}}</el-link>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>产品管理</span>
      </div>
      <template>
        <el-carousel :interval="5000" indicator-position='outside' height="650px">
          <el-carousel-item>
            <div class="cardTitle"><h3>合资品牌新产品规划（2020.H1）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>合资品牌燃油车细分市场覆盖度</h4>
              </el-col>
            </el-row>
            <el-row class="img-box">
              <el-col :span="6">
                <img src="../assets/01.jpg" style="height: 200px;">
              </el-col>
              <el-col :span="6">
                <img src="../assets/01.jpg" style="height: 200px;">
              </el-col>
              <el-col :span="6">
                <img src="../assets/01.jpg" style="height: 200px;">
              </el-col>
              <el-col :span="6">
                <img src="../assets/01.jpg" style="height: 200px;">
              </el-col>
            </el-row>
            <el-row class="img-box">
              <el-col :span="6">
                <img src="../assets/01.jpg" style="height: 200px;">
              </el-col>
              <el-col :span="6">
                <img src="../assets/01.jpg" style="height: 200px;">
              </el-col>
              <el-col :span="6">
                <img src="../assets/01.jpg" style="height: 200px;">
              </el-col>
              <el-col :span="6">
                <img src="../assets/01.jpg" style="height: 200px;">
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>合资品牌新产品规划（2020.H1）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>合资品牌新导入产品（可研）销量和利润率</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/02.jpg">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/02.jpg">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/02.jpg">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/02.jpg">
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>合资品牌新产品规划（2020.H1）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>合资品牌新导入产品（可研）销量和利润率</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/03.jpg">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/03.jpg">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/03.jpg">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/03.jpg">
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>合资品牌新产品规划（2020.H1）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>合资品牌新导入产品（可研）销量和利润率</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/04.jpg">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/04.jpg">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/04.jpg">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/04.jpg">
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售管理</span>
      </div>
      <template>
        <el-carousel :interval="5000" indicator-position='outside' height="1100px">
          <el-carousel-item>
            <div class="cardTitle"><h3>新车销售厂商排名（2020.08）</h3></div>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/05.jpg" style="height: 800px;">
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>合资品牌表现（2020.08）</h3></div>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/06.jpg">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/07.jpg">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/08.jpg">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/09.jpg">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/10.jpg">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/11.jpg">
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>合资车型表现（2020.08）</h3></div>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/12.jpg" style="height: 1000px;">
              </el-col>
            </el-row>

          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>合资双积分合规情况（2020.6）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>行业积分供需关系（6+6）预测</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18" class="img-box">
                <img src="../assets/13.jpg">
              </el-col>
              <el-col :span="6" class="img-box">
                <img src="../assets/14.jpg">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <h4>合资企业双积分年度计划</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/15.jpg">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/15.jpg">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <h4>合资企业新能源销售完成情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/16.jpg">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/16.jpg">
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
      </template>

    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>财务管理</span>
      </div>
      <template>
        <el-carousel :interval="5000" indicator-position='outside' height="1100px">
          <el-carousel-item>
            <div class="cardTitle"><h3>合资公司财务报表重点关注项（2020.08）</h3></div>
            <el-row>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <h4>一汽大众</h4>
                  </el-col>
               </el-row>
               <el-row>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/17.png">
                 </el-col>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/18.png">
                 </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <h4>一汽大众</h4>
                  </el-col>
               </el-row>
               <el-row>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/17.png">
                 </el-col>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/18.png">
                 </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <h4>一汽大众</h4>
                  </el-col>
               </el-row>
               <el-row>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/17.png">
                 </el-col>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/18.png">
                 </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <h4>一汽大众</h4>
                  </el-col>
               </el-row>
               <el-row>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/17.png">
                 </el-col>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/18.png">
                 </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <h4>一汽大众</h4>
                  </el-col>
               </el-row>
               <el-row>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/17.png">
                 </el-col>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/18.png">
                 </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="24">
                    <h4>一汽大众</h4>
                  </el-col>
               </el-row>
               <el-row>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/17.png">
                 </el-col>
                 <el-col :span="12" class="img-box">
                   <img src="../assets/18.png">
                 </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>合资公司年度滚动预算（2020.08）</h3></div>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/19.png">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/19.png">
              </el-col>
            </el-row>
          </el-carousel-item>

        </el-carousel>
      </template>

    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>财务管理</span>
      </div>
      <template>
        <el-carousel :interval="5000" indicator-position='outside' height="670px">
          <el-carousel-item>
            <div class="cardTitle"><h3>开迈斯科技有限公司（2020.08）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>核心运营指标</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/20.png">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/21.png">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/22.png">
              </el-col>
            </el-row>

          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>摩斯智行有限公司（2020.06）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>核心运营指标</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="img-box">
                <img src="../assets/23.png">
              </el-col>
              <el-col :span="12" class="img-box">
                <img src="../assets/24.png">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/25.png">
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>摩斯智联科技有限公司（2020.06）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>核心运营指标</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" class="img-box">
                <img src="../assets/26.png">
              </el-col>
              <el-col :span="8" class="img-box">
                <img src="../assets/27.png">
              </el-col>
              <el-col :span="8" class="img-box">
                <img src="../assets/28.png">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/25.png">
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>大连一汽发动机公司（2020.06）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>核心产销完成情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/29.png">
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/25.png">
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>成都丰田纺（2020.06）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/30.png" style="height: 400px;">
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>天津艾达（2020.06）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/30.png" style="height: 400px;">
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>同方环球物流（2020.06）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/30.png" style="height: 400px;">
              </el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <div class="cardTitle"><h3>同方环球物流（2020.06）</h3></div>
            <el-row>
              <el-col :span="24">
                <h4>财务情况</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="img-box">
                <img src="../assets/30.png" style="height: 400px;">
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
      </template>

    </el-card>
  </div>
</template>

<script>
  var echarts = require('echarts');
  export default {
    data(){
      return{
        infoList:[
          {
           name:'大众',
           content:[
              {
                title:"大众停止土耳其新工厂计划大众停止土耳其新工厂计划大众停止土耳其新工厂计划",
                link:'#'
               },
              {
                title:"大众停止土耳其新工厂计划大众停止土耳其新工厂计划大众停止土耳其新工厂计划",
                link:'#'
              },
              {
                title:"大众停止土耳其新工厂计划大众停止土耳其新工厂计划大众停止土耳其新工厂计划",
                link:'#'
              },
              {
                title:"大众停止土耳其新工厂计划大众停止土耳其新工厂计划大众停止土耳其新工厂计划",
                link:'#'
              },
              {
                title:"大众停止土耳其新工厂计划大众停止土耳其新工厂计划大众停止土耳其新工厂计划",
                link:'#'
              }
            ]
          },
          {
           name:'红旗',
           content:[
              {
                title:"大众停止土耳其新工厂计划大众停止土耳其新工厂计划大众停止土耳其新工厂计划",
                link:'#'
               },
              {
                title:"大众停止土耳其新工厂计划大众停止土耳其新工厂计划大众停止土耳其新工厂计划",
                link:'#'
              },
              {
                title:"大众停止土耳其新工厂计划大众停止土耳其新工厂计划大众停止土耳其新工厂计划",
                link:'#'
              },
              {
                title:"大众停止土耳其新工厂计划大众停止土耳其新工厂计划大众停止土耳其新工厂计划",
                link:'#'
              },
              {
                title:"大众停止土耳其新工厂计划大众停止土耳其新工厂计划大众停止土耳其新工厂计划",
                link:'#'
              }
            ]
          },
          {
           name:'奥迪',
           content:[
              {
                title:"大众停止土耳其新工厂计划大众停止土耳其新工厂计划大众停止土耳其新工厂计划",
                link:'#'
               },
              {
                title:"大众停止土耳其新工厂计划大众停止土耳其新工厂计划大众停止土耳其新工厂计划",
                link:'#'
              },
              {
                title:"大众停止土耳其新工厂计划大众停止土耳其新工厂计划大众停止土耳其新工厂计划",
                link:'#'
              },
              {
                title:"大众停止土耳其新工厂计划大众停止土耳其新工厂计划大众停止土耳其新工厂计划",
                link:'#'
              },
              {
                title:"大众停止土耳其新工厂计划大众停止土耳其新工厂计划大众停止土耳其新工厂计划",
                link:'#'
              }
            ]
          }
        ],
        echartsOption1:{
          title: {
                  text: '一汽大众企业搜索指数'
          },
          grid:{
            height:'50%',
            width:'80%'
          },
          // tooltip: {
          //   show:true,
          //   trigger:'axis',

          // },
         legend: {
                 orient: 'horizontal',
                 right: '10%',
                 width:'500'
                 // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
             },
          xAxis: {
              data: ['2020-01-01', '2020-01-01', '2020-01-01', '2020-01-01', '2020-01-01', '2020-01-01']
          },
          yAxis: {},
          series: [{
              name: '头条',
              type: 'line',
              data: [1, 5, 10, 9, 8, 10],
              itemStyle:{
                color: '#82d1ec'
              },
              areaStyle:{
                color:'rgb(157, 228, 251,0.5)'
              },
            },
            {
                name: '平均值',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20],
                itemStyle:{
                  color: '#82d1ec'
                },
                areaStyle:{
                  color:'rgb(157, 228, 251,0.5)'
                },
            },
          ]
        },
        echartsOption2:{
          title: {
                  text: '大众品牌车型搜索指数'
          },
          grid:{
            height:'50%',
            width:'80%'
          },
          // tooltip: {
          //   show:true,
          //   trigger:'axis',

          // },
         legend: {
                 orient: 'horizontal',
                 right: '10%',
                 width:'500'
                 // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
             },
          xAxis: {
              data: ['2020-01-01', '2020-01-01', '2020-01-01', '2020-01-01', '2020-01-01', '2020-01-01']
          },
          yAxis: {},
          series: [{
              name: '头条',
              type: 'line',
              data: [1, 5, 10, 9, 8, 10],
              itemStyle:{
                color: '#82d1ec'
              },
              areaStyle:{
                color:'rgb(157, 228, 251,0.5)'
              },
            },
            {
                name: '平均值',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20],
                itemStyle:{
                  color: '#82d1ec'
                },
                areaStyle:{
                  color:'rgb(157, 228, 251,0.5)'
                },
            },
          ]
        },

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
        ],

      }
    },
    methods:{
      draw(){
        var myChart = echarts.init(document.getElementById('chart1'));
        myChart.setOption(this.echartsOption1)
        var myChart2 = echarts.init(document.getElementById('chart2'));
        myChart2.setOption(this.echartsOption2)
        var myChart3 = echarts.init(document.getElementById('chart3'));
        myChart3.setOption(this.echartsOption2)
        var myChart4 = echarts.init(document.getElementById('chart4'));
        myChart4.setOption(this.echartsOption2)
        var myChart5 = echarts.init(document.getElementById('chart5'));
        myChart5.setOption(this.echartsOption2)
        var myChart6 = echarts.init(document.getElementById('chart6'));
        myChart6.setOption(this.echartsOption2)
        var myChart7 = echarts.init(document.getElementById('chart7'));
        myChart7.setOption(this.echartsOption2)
        var myChart8 = echarts.init(document.getElementById('chart8'));
        myChart8.setOption(this.echartsOption2)

      }
    },
    mounted () {
      const that = this
      setTimeout(function () {
        that.draw()
      }, 200)
    }
  }
</script>

<style scoped>
  .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }



      .el-carousel__item:nth-child(2n) {
        background-color: #fff;
      }

      .el-carousel__item:nth-child(2n+1) {
        background-color: #fff;
      }
      .title{padding: 5px 0;background-color: #c8dbf6;width: 100px;text-align: center;}
      .linkItem{line-height: 40px;margin: 10px;}
      .el-divider__text, .el-link{font-size: 16px;}
      .cardTitle{width: 100%;line-height: 25px; text-align: center;}
      .el-row {
          margin-bottom: 20px;
          &:last-child {
            margin-bottom: 0;
          }
        }
        .el-col {
          border-radius: 4px;
        }
        .chartBox{height: 300px;}
        .linkItem2{line-height: 25px;margin: 10px;}
        h4{padding: 0;margin: 0;}
        .hotNewsbox{border: #c6effd 1px solid;padding: 5px;height: 225px; background-color: #dcf5fe;}
        .img-box{text-align: center;}
        img{width: 100%;height: 260px;}
        .el-carousel__button{background-color: #2C3E50;}
</style>
