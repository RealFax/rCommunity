<template>
  <div>
    <vue-element-loading :active="showCustomizeLoader">
      <img src="../src/assets/load.gif"/>
      <br/>
      <v-expand-transition>
        <span class="Loading">{{ loadingText }}</span>
      </v-expand-transition>
    </vue-element-loading>
    <router-view></router-view>
  </div>
</template>

<script>
import { SwitchLanguage } from "./locale/LanguageSwitch";
import { maxTimeOut }from './env'
export default {
  data() {
    return {
      showCustomizeLoader: false,
      loadingText: ''
    };
  },
  created() {

    this.showCustomizeLoader = true;
    var thisvue = this;
    var timeout = 0;
    var loadingTail = '';

    var loadInterval = setInterval(function(){
      if(this.showCustomizeLoader === false){
        return;
      }
      thisvue.loadingText = thisvue.$t('Text.Status.Loading.title');
      if(loadingTail.length === 3){
        loadingTail = '';
      }else {
        loadingTail += '.';
      }
      thisvue.loadingText += loadingTail;
    }, 300);

    var timeOutInterval = setInterval(function(){
      if(timeout >= maxTimeOut){
        thisvue.loadingText = thisvue.$t('Text.Status.TimeOut.guess');
        clearInterval(timeOutInterval);
        clearInterval(loadInterval);
      }
      timeout++;
    }, 1000);//1000ms = 1 second

  },
  updated: function () {
    this.$nextTick(function () {
      this.showCustomizeLoader = false;
    });
  },
  methods: {
    SwitchLang() {
      SwitchLanguage(this.language.lang);
    },
  },
};
</script>

<style>
body,
html {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, 微软雅黑, Arial, sans-serif;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #c8c8c8;
}

.Loading {
  color: #909399;
  font-size: 24px;
}
</style>