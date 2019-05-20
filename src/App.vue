<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="4">订单管理</el-menu-item>
      <el-radio-group v-model="isCollapse" style="margin-top:10px">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
    </el-menu>
    
    <div v-show="headerFixed" style="position: relative;height: 6px;width: 100%;"></div>

    <main>
      <!-- 左侧导航 -->
      <div class="main-left">
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              :collapse="isCollapse">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span slot="title">导航二</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1">选项1</el-menu-item>
                  <el-menu-item index="2-2">选项2</el-menu-item>
                  <el-menu-item index="2-3">选项3</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span slot="title">导航三</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">选项1</el-menu-item>
                  <el-menu-item index="3-2">选项2</el-menu-item>
                  <el-menu-item index="3-3">选项3</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span slot="title">导航四</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1">选项1</el-menu-item>
                  <el-menu-item index="4-2">选项2</el-menu-item>
                  <el-menu-item index="4-3">选项3</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
      </div>

      <!-- 右侧主内容区 -->
      <div  class="main-right" >
        <transition name="fade">
          <router-view class="view"></router-view>
        </transition>
      </div>
    </main>
    
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isCollapse: false
    };
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 6px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
  
/* 主内容区 */
main{display: -webkit-box;display: -ms-flexbox;display: flex;  min-height: 650px;  border: solid 4px #E9ECF1;  background-color: #FCFCFC;  }
main .main-left{text-align: center;-webkit-box-flex: 0;-ms-flex: 0 0 64px;flex: 0 0 64px;border: solid 1px #E9ECF1;}
main .main-right{-webkit-box-flex:1;-ms-flex:1;flex:1; background-color: #fff; padding: 50px 70px; border: solid 1px #E9ECF1;}
main .el-menu{background-color: transparent!important;}
#main .el-submenu .el-menu-item{border: solid 1px #ffffff;}
main .el-menu-item-group__title{padding: 0px 0px 0px 0px;}
main .el-menu{background-color: #545c64}
</style>