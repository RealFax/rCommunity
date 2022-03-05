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
import { maxTimeOut }from './env'
export default {
    data() {
        return {
            showCustomizeLoader: true,
            loadingText: ''
        };
    },
    created() {

        this.showCustomizeLoader = true;
        let this_ = this;
        let timeout = 0;
        let loadingTail = '';

        let loadInterval = setInterval(function(){
            if(this.showCustomizeLoader === false){
                return;
            }
            this_.loadingText = this_.$t('Text.Status.Loading.title');
            if(loadingTail.length === 3){
                loadingTail = '';
            }else {
                loadingTail += '.';
            }
            this_.loadingText += loadingTail;
        }, 300);

        let timeOutInterval = setInterval(function(){
            if(timeout >= maxTimeOut){
                this_.loadingText = this_.$t('Text.Status.TimeOut.guess');
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
        /**
         * SwitchLang() {
         *  SwitchLanguage(this.language.lang);
         * },
         **/
    },
};
</script>

<style>
body {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, 微软雅黑, Arial, sans-serif;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
}

/*::-webkit-scrollbar {
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
}*/

::-webkit-scrollbar-track-piece  {
    background-color:#E5E5E5;
}
::-webkit-scrollbar  {
    width: 4px;
    overflow: hidden;
}

::-webkit-scrollbar-thumb  {
    background-color:#9A9A9A;
    background-clip:padding-box;
    min-height:28px;
}
::-webkit-scrollbar-thumb:hover {
    background-color:#bbb;
}

.Loading {
    color: #909399;
    font-size: 24px;
}

.__basic_shadow {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.__light_projection_shadow {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
