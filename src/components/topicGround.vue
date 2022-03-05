<template>
    <v-app style="position: absolute;top: 4em; left: 15em; bottom: 0;">
        <v-container fluid style="padding-bottom: 5em; padding-top: 0.5em;" class="overHandler">
            <v-row>
                <v-col
                    style="padding-top: 0;"
                    cols="12"
                    md="6"
                    sm="6"
                    v-for="(topics, index) in topic" :key="index"
                >
                    <v-hover v-slot="{ hover }">
                        <v-card style="width: 50vw; margin-top: 15px;" :flat="!hover" class="cards">
                            <!--背景图-->
                            <v-img :src="topics.topic.background" style="height: 10vw">
                                <v-row justify="end" style="color: white; margin-top: 10px; padding-right: 30px;">
                                    <b>
                                        <v-icon color="white">loyalty</v-icon>
                                        {{formatUnit(topics.topic.follow)}}
                                    </b>
<!--                                        {{$t('Text.topicGround.subtitle_1')}}-->
                                </v-row>
                            </v-img>
                            <!--标题-->
                            <v-card-title>
                                <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 1.5rem;">
                                    {{ topics.name }}
                                </span>
                            </v-card-title>
                            <!--基础信息-->

                            <v-card-subtitle style="padding-top: 15px;padding-bottom: 18px;padding-left: 28px;">
<!--                                <v-row justify="start">-->
<!--                                    <v-chip color="pink" label small text-color="white">-->
<!--                                        <v-icon left>mdi-label</v-icon>Tags-->
<!--                                    </v-chip>-->
<!--                                </v-row>-->
                                <v-row justify="start">
                                    <v-chip
                                        color="primary"
                                        label
                                        text-color="white"
                                        small
                                        v-for="(v ,k) in topics.tag"
                                        :key="k"
                                        class="text-body-2"
                                        style="margin-right: 10px;"
                                    >
                                        {{ v }}
                                    </v-chip>
<!--                                    <v-col align-self="end" style="padding: 0; margin-left: 10px;">-->
<!--                                        {{-->
<!--                                            formatUnit(topics.topic.follow) +-->
<!--                                            $t('Text.topicGround.subtitle_1') +-->
<!--                                            getLastUpdate(topics.topic.lastUpdate)-->
<!--                                        }}-->
<!--                                    </v-col>-->
                                </v-row>
                            </v-card-subtitle>
                            <v-card-actions style="padding-bottom: 0">
                                <v-list-item style="margin-left: -7.5px; margin-top: -15px;">
<!--                                    <v-list-item-avatar>-->
<!--                                        &lt;!&ndash;头像&ndash;&gt;-->
<!--                                        <v-img class="elevation-6" :src="topics.avatar"></v-img>-->
<!--                                    </v-list-item-avatar>-->
                                    <v-list-item-content class="text-subtitle-1">
                                        <v-list-item-title>
                                            {{ topics.founder }}
                                            ·
                                            {{getLastUpdate(topics.topic.lastUpdate)}}
                                        </v-list-item-title>
                                    </v-list-item-content>

                                    <v-row
                                        class="text-button"
                                        justify="end"
                                    >
                                        <v-icon class="mr-1">
                                            mdi-heart
                                        </v-icon>
                                        <span class="subheading mr-2">{{ formatUnit(topics.topic.likeCount) }}</span>
                                        <span class="mr-1">·</span>
                                        <v-icon class="mr-1">
                                            visibility
                                        </v-icon>
                                        <span class="subheading">{{ formatUnit(topics.topic.watch) }}</span>
                                    </v-row>

                                </v-list-item>

                            </v-card-actions>
                        </v-card>
                    </v-hover>
                </v-col>
            </v-row>

        </v-container>
    </v-app>
</template>

<script>
import {getLastUpdate , formatUnit } from "@/utils/function";

export default {
    name: "topicGround",
    data() {
        return {
            getLastUpdate: getLastUpdate,
            formatUnit: formatUnit,
            topic: [
                {
                    name: 'RealFax v0.000.129 alpha更新发布, 这个版本更新了',
                    tag: ["#RealFax", "#版本更新", "#alpha"],
                    topic: {
                        Id: 10000,
                        lastUpdate: 1642054259,
                        background: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXiZB8xY38nKNBGmgDzuz197khOIxIipfv0g&usqp=CAU',
                        // 点赞
                        likeCount: 114514,
                        // 订阅
                        follow: 1919810,
                        // 浏览
                        watch: 191981000
                    },
                    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=1849004341&s=640',
                    founder: 'Hum!!!',
                }, {
                    name: 'ByteTack Group. 2022 Q1财务报告公示',
                    tag: [],
                    topic: {
                        Id: 10001,
                        lastUpdate: 1642054246,
                        background: '/assets/byte.png',
                        likeCount: 3,
                        follow: 3,
                        watch: 3
                    },
                    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=1720471077&s=640',
                    founder: 'DEW',
                }, {
                    name: '全面关注乌克兰 & 俄罗斯局势🍻',
                    tag: ["#时要新闻", "#乌克兰", "#俄罗斯", "#战争"],
                    topic: {
                        Id: 10001,
                        lastUpdate: 1645879213,
                        background: 'https://t8.baidu.com/it/u=1708415702,3915975738&fm=167',
                        likeCount: 0,
                        follow: 0,
                        watch: 0
                    },
                    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=2570323424&s=640',
                    founder: 'KMew',
                }
            ]
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.overHandler {
    overflow-y: auto;
}

.cards {
    opacity: 0.8;
    transition: opacity .4s ease-in-out;
}
.cards:hover {
    opacity: 1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>
