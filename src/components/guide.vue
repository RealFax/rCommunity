<template>
    <v-card rounded="0" class="topic" flat>
        <!--:expand-on-hover="!isFullScreen()"-->
        <v-navigation-drawer width="100%" permanent>
            <v-list style="padding: 0;" :outlined="false">
                <!--主菜单-->
                <v-list-item link v-for="(mn) in defaultMenu" :key="mn.id">
                    <v-list-item-icon>
                        <v-icon>{{ mn.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>
                        {{ mn.title }}
                    </v-list-item-title>
                </v-list-item>
                <v-divider inset></v-divider>
                <!--副菜单-->
                <v-list-item link v-for="(mn) in subMenu" :key="mn.id">
                    <v-list-item-icon>
                        <v-icon>{{ mn.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                        {{ mn.title }}
                    </v-list-item-title>
                </v-list-item>
                <v-divider inset></v-divider>
                <!--订阅列表-->
                <span class="subTitle">
                    {{ $t('Text.Guide.subtitle_1') }}
                </span>
                <v-list-item link v-for="sub in subscription" :key="sub.topic.subId">
                    <v-list-item-avatar size="30">
                        <v-img :src="sub.topic.avatar"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-title style="margin-left: 10px;">
                        {{ sub.topic.name }}
                    </v-list-item-title>
                    <v-list-item-action>
                        <v-badge
                            style="margin-top: 4px;"
                            :color="sub.activate ? 'primary' : 'grey'"
                            dot
                        ></v-badge>
                    </v-list-item-action>
                </v-list-item>
                <v-divider inset></v-divider>
                <!--无用功能-->
                <v-list-item link v-for="(mn) in bottomMenu" :key="mn.id">
                    <v-list-item-icon>
                        <v-icon>{{ mn.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                        {{ mn.title }}
                    </v-list-item-title>
                </v-list-item>
                <v-divider inset></v-divider>
                <!--快速链接-->
                <v-list-item>
                    <v-row align="start" justify="start" style="margin-top: 10px;">
                        <v-btn text :ripple="false" plain>{{ $t('Text.Guide.about') }}</v-btn>
                        <v-btn text :ripple="false" plain>{{ $t('Text.Guide.privacy') }}</v-btn>
                        <v-btn text :ripple="false" plain>{{ $t('Text.Guide.copyright') }}</v-btn>
                        <v-btn text :ripple="false" plain>{{ $t('Text.Guide.eula') }}</v-btn>
                    </v-row>
                </v-list-item>
                <!--版权说明-->
                <v-list-item three-line style="font-size: 12px; margin-left: 5px; padding-top: 6.25vw;">
                    <span style="font-style: oblique">
                        RealFax community<br/>
                        version: 0.0.1<br>
                        <v-btn text :ripple="false" plain href style="font-size: 8px; padding: 0" color="yellow darken-3">
                            <v-icon>code</v-icon>
                            OpenSource
                        </v-btn>
                    </span>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-card>
</template>

<script>
export default {
    name: "guide",
    data() {
        return {
            // 主菜单
            defaultMenu: [
                {
                    id: 0,
                    // 首页
                    title: this.$t('Text.Guide.defaultMenu.home'),
                    icon: 'home',
                    link: '/',
                }, {
                    id: 1,
                    // 搜索
                    title: this.$t('Text.Guide.defaultMenu.search'),
                    icon: 'explore',
                    link: '/'
                }, {
                    id: 2,
                    // 关注的话题
                    title: this.$t('Text.Guide.defaultMenu.watch'),
                    icon: 'visibility',
                    link: ''
                }
            ],
            // 副菜单
            subMenu: [
                {
                    id: 3,
                    // 历史记录
                    title: this.$t('Text.Guide.subMenu.history'),
                    icon: 'history',
                    link: ''
                }, {
                    id: 4,
                    // 我的话题
                    title: this.$t('Text.Guide.subMenu.myTopic'),
                    icon: 'description',
                    link: ''
                }, {
                    id: 5,
                    // 顶过的话题
                    title: this.$t('Text.Guide.subMenu.likedTopic'),
                    icon: 'thumb_up',
                    link: ''
                }, {
                    id: 6,
                    // 稍后再看
                    title: this.$t('Text.Guide.subMenu.watchLater'),
                    icon: 'watch_later',
                    link: ''
                }
            ],
            bottomMenu: [
                {
                    id: 7,
                    // 发送反馈
                    title: this.$t('Text.Guide.bottomMenu.feedback'),
                    icon: 'announcement',
                    link: ''
                }, {
                    id: 8,
                    // 喜欢RealFax
                    title: this.$t('Text.Guide.bottomMenu.likedRealFax'),
                    icon: 'favorite',
                    link: ''
                }, {
                    id: 9,
                    // 服务状态
                    title: this.$t('Text.Guide.bottomMenu.serverStatus'),
                    icon: 'dns',
                    link: ''
                }
            ],
            subscription: [
                {
                    topic: {
                        name: 'RealFax',
                        avatar: 'https://s3.bmp.ovh/imgs/2022/01/22bd147f56cd017d.png',
                        subId: 10000,
                    },
                    activate: true
                }, {
                    topic: {
                        name: 'ByteTack',
                        avatar: 'https://s3.bmp.ovh/imgs/2022/01/5f9fd29c9d8edb09.png',
                        subId: 10001,
                    },
                    activate: false
                }
            ]
        }
    },
    methods: {
        isFullScreen (){
            return window.outerHeight === screen.availHeight && window.outerWidth === screen.availWidth;
        }
    }
}
</script>

<style scoped>
.topic {
    margin-top: -8px;
    position: absolute;
    top: 4em;
    bottom: 0;
    overflow-y: hidden;
}
.subTitle {
    margin-left: 15px;
    margin-top: 5px;
    display: block;
    font-weight: bold;
    color: #515151;
    font-size: 15px;
}
</style>
