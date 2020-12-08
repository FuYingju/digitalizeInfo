<template>
  <div style="height: 100%;">
    <el-container>
      <el-header><h1>合资合作事业管理部数字化信息系统</h1></el-header>
      <el-main>
        <el-menu :default-active="activeIndex" class="el-menu-demo menu" mode="horizontal" @select="handleSelect" router>
          <el-menu-item index="index">主页</el-menu-item>
          <el-menu-item index="partner">合作伙伴</el-menu-item>
          <el-menu-item index="company">合资企业舆情</el-menu-item>
          <el-submenu index="4">
            <template slot="title">产品管理</template>
            <el-menu-item index="newPro">新产品规划</el-menu-item>
            <el-menu-item index="newProlead">新产品导入</el-menu-item>
            <el-menu-item index="proDev">项目开发进度</el-menu-item>
            <el-menu-item index="proReview">项目回顾</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">销售管理</template>
            <el-menu-item index="ranking">厂商排名</el-menu-item>
            <el-menu-item index="brandPerformance">品牌表现</el-menu-item>
            <el-menu-item index="modelPerformance">车型表现</el-menu-item>
            <el-menu-item index="integral">双积分合规</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">财务管理</template>
            <el-menu-item index="budget">预算管理</el-menu-item>
            <el-menu-item index="reportAnalysis">报表分析</el-menu-item>
          </el-submenu>
          <el-menu-item index="companyManage">参股公司管理</el-menu-item>
        </el-menu>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
      data() {
        return {
          activeIndex: '1'
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style>
  .el-container{height: 100%;}
  .el-header, .el-footer {
      background-color: #B3C0D1;
      color: #fff;
      text-align: center;
    }
    .el-header{background-image: url(../assets/top.jpg);background-repeat: no-repeat;background-size: cover;line-height: 60px;}
    .el-header h1{padding: 0;margin: 0;}
    .el-aside {
      background-color: #D3DCE6;
      color: #333;
      text-align: center;
      line-height: 200px;
    }

    .el-main {
      background-color: #e9f5f7;
      color: #333;
      text-align: center;
      line-height: 160px;
      padding: 20px 15%;
    }

    body > .el-container {
      margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }
    .box-card {
      width: 100%;
      line-height: 20px;
      text-align: left;
      margin-top: 10px;
      min-width: 800px;
    }
    .menu{min-width: 800px;}
</style>
