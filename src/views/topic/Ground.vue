<template>
    <v-app>
        <v-row justify="start" >
            <v-card
                class="__topic_background rounded-r-xl"
                style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);"
            >
<!--                <v-img height="65%" class="rounded-0" :src="href.topic.background"></v-img>-->
                <v-list-item three-line>
                    <v-list-item-content class="pt-5 pb-5 pl-2">
                        <!--标题-->
                        <v-list-item-title class="text-h4 mb-1 font-weight-medium">
                            {{ href.title }}
                        </v-list-item-title>
                        <!--副标题-->
                        <v-expand-transition mode="in" hide-on-leave="true">
                            <v-list-item-content v-show="showMoreContent">
                                {{ href.content }}
                            </v-list-item-content>
                        </v-expand-transition>

                        <v-list-item-content v-show="!showMoreContent" style="height: 46px;">
                            {{ href.content }}
                        </v-list-item-content>

                        <!--标签-->
                        <v-list-item-subtitle :class="!showMoreContent ? 'mt-3' : ''">
                            <v-chip
                                color="primary"
                                label
                                text-color="white"
                                small
                                v-for="(v ,k) in href.tag"
                                :key="k"
                                class="text-body-2"
                                style="margin-right: 10px;"
                            >
                                {{ v }}
                            </v-chip>
                        </v-list-item-subtitle>
                        <!--                            {{-->

                        <!--                                formatUnit(href.topic.follow) +-->
                        <!--                                $t('Text.topicGround.subtitle_1') +-->
                        <!--                                getLastUpdate(href.topic.lastUpdate)-->
                        <!--                            }}-->
                    </v-list-item-content>

                </v-list-item>

                <v-card-actions class="mt-n13">
                    <v-spacer></v-spacer>
                    <v-btn icon @click="showMoreContent = !showMoreContent">
                        <v-icon> {{ showMoreContent ? 'expand_less' : 'expand_more' }}</v-icon>
                    </v-btn>
                </v-card-actions>

            </v-card>
        </v-row>

        <!--话题卡片-->
        <v-row justify="end" style="height: 0; position: fixed;margin-top: 4.2%; right: 12.5%; width: 22%;">
            <v-card
                class="__topic_details rounded-l-xl"
                style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);"
            >
                <v-list-item three-line class="flex-wrap justify-space-around">

                    <v-list-item-avatar size="50%" style="transform: translate(0.6vw, 0); padding-top: 5%">
                        <v-img :src="href.avatar"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-title class="text-h5 mb-1 text-center">
                        {{ href.founder }}
                    </v-list-item-title>

                    <v-list-item-subtitle class="text-center mb-5 text-overline">
                        <v-row no-gutters justify="center">
                            <v-col cols="12" md="3" sm="3">
                                {{ formatUnit(href.topic.likeCount) }}
                            </v-col>
                            <v-col cols="12" md="1" sm="1">
                                |
                            </v-col>
                            <v-col cols="12" md="3" sm="3">
                                {{ formatUnit(href.topic.follow) }}
                            </v-col>
                            <v-col cols="12" md="1" sm="1">
                                |
                            </v-col>
                            <v-col cols="12" md="3" sm="3">
                                {{ formatUnit(href.topic.watch) }}
                            </v-col>
                        </v-row>

                        <v-row no-gutters justify="center" class="mt-1">
                            <v-col cols="12" md="4" sm="4">
                                点赞
                            </v-col>

                            <v-col cols="12" md="4" sm="4">
                                关注
                            </v-col>

                            <v-col cols="12" md="4" sm="4">
                                浏览
                            </v-col>
                        </v-row>

                        <v-divider class="mt-4"></v-divider>
                    </v-list-item-subtitle>

                </v-list-item>

                <v-card-actions class="d-flex align-content-start flex-wrap mb-0 pb-0 mt-n2 pt-1" style="width: 100%;">
                    <v-avatar v-for="(avatarId, index) in discussUserIdList" :key="index" class="ml-2 mb-2" size="16.6%">
                        <v-img :src="'https://q1.qlogo.cn/g?b=qq&nk=' + avatarId + '&s=640'"></v-img>
                    </v-avatar>

<!--                        <v-col cols="12" md="2" sm="2">-->
<!--                            <v-btn icon large :color="user.isLiked ? 'primary' : ''">-->
<!--                                <v-icon>-->
<!--                                    {{ user.isLiked ? 'thumb_up' : 'thumb_up_off_alt' }}-->
<!--                                </v-icon>-->
<!--                            </v-btn>-->
<!--                        </v-col>-->

<!--                        <v-col cols="12" md="2" sm="2">-->
<!--                            <v-btn icon large :color="user.isFollow ? 'pink darken-1' : ''">-->
<!--                                <v-icon>-->
<!--                                    {{ user.isFollow ? 'favorite' : 'favorite_border' }}-->
<!--                                </v-icon>-->
<!--                            </v-btn>-->
<!--                        </v-col>-->

<!--                        <v-col cols="12" md="2" sm="2">-->
<!--                            <v-btn icon large :color="user.isWatchLater ? 'yellow accent-3' : ''">-->
<!--                                <v-icon>-->
<!--                                    watch_later-->
<!--                                </v-icon>-->
<!--                            </v-btn>-->
<!--                        </v-col>-->

                </v-card-actions>

                <v-card-text>
                    <v-btn block outlined class="text-button">
                        <v-icon>
                            read_more
                        </v-icon>
                        更多
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-row>

        <!--discuss list-->
        <v-row justify="start" >
            <v-list three-line subheader width="50%" style="margin-bottom: 5%; margin-left: 12.5%; margin-top: 2.5%" shaped>
                <v-list-item-group color="primary" v-model="selectItem">
                    <v-list-item v-for="(item, index) in discuss" :key="index" @contextmenu="showSelectMenu($event, index, item)" @click="function (){}">
                        <v-list-item-avatar size="5%">
                            <v-img :src="'https://q1.qlogo.cn/g?b=qq&nk=' + item.avatarId + '&s=640'"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title style="font-weight: 500">
                                {{item.nickname}}
                            </v-list-item-title>

                            <div v-if="item.isReply">
                                <v-card flat color="grey lighten-4">
                                    <v-card-text
                                        style="color: #515151;"
                                        class="font-weight-medium pt-2 pl-2 pb-2 pr-2 mt-2 mb-2"
                                    >
                                        {{
                                            `${item.rawDiscuss.nickname}:
                                             ${item.rawDiscuss.content.slice(0,30)}
                                             ${item.rawDiscuss.content.length > 30 ? '......' : ''}`
                                        }}
                                    </v-card-text>
                                </v-card>
                            </div>
                            <!--@小卡片-->
                            <div v-if="discussHref[index]['mentions'] && discussHref[index]['mentions'].length !== 0">
                                <v-chip
                                    color="primary"
                                    outlined
                                    small
                                    class="mr-2"
                                    v-for="(v, i) in discussHref[index]['mentions']"
                                    :key="i">
                                    <v-icon left>alternate_email</v-icon>
                                    {{ v }}
                                </v-chip>
                                <span class="text-body-2" v-text="discussHref[index]['text']"></span>
                            </div>
                            <!--无@的内容-->
                            <span
                                class="text-body-2"
                                style="width: 50%"
                                v-text="discussHref[index]['text']"
                                v-if="!discussHref[index]['mentions']"
                            >
                            </span>

                        </v-list-item-content>
                        <v-list-item-action-text class="text-caption font-weight-medium pl-2">
                            {{ formatDiscussTimestamp(item.timestamp) }}
                        </v-list-item-action-text>

                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-row>

        <v-menu
            v-model="discussSelectOption.showSelect"
            :position-x="discussSelectOption.selectMenu.x"
            :position-y="discussSelectOption.selectMenu.y"
            absolute
            offset-y
            transition="fade-transition"
        >
            <v-list class="pt-0 pb-0">
                <v-list-item-group>
                    <v-list-item @click="replyThisDiscuss">
                        <v-list-item-title>
                            <v-icon class="pl-0 pr-0 ml-0 mr-1">reply</v-icon>
                            回复
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item v-show="discussSelectOption.isReplyDiscuss">
                        <v-list-item-title>
                            <v-icon class="pl-0 pr-0 ml-0 mr-1">visibility</v-icon>
                            查看原始
                        </v-list-item-title>
                    </v-list-item>
<!--                    <v-list-item @click="copyContentToRemoveChild">-->
<!--                        <v-list-item-title>-->
<!--                            <v-icon class="pl-0 pr-0 ml-0 mr-1">content_copy</v-icon>-->
<!--                            复制-->
<!--                        </v-list-item-title>-->
<!--                    </v-list-item>-->
                    <v-list-item>
                        <v-list-item-title style="color: #E53935">
                            <v-icon color="red darken-1" class="pl-0 pr-0 ml-0 mr-1">report</v-icon>
                            举报
                        </v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-menu>

        <v-btn
            fixed
            large
            bottom
            left
            icon
            fab
            color="#222"
            elevation="3"
            @click="replyThisTopic"
        >
            <v-icon large>create</v-icon>
        </v-btn>

        <createDiscuss
            :replyStruct="discussReplyOptions"
            :status="discussEdit"
            @closeDiscussEdit="discussEdit = false"
            @append-discuss="appendDiscuss"
        >

        </createDiscuss>
    </v-app>
</template>

<script>
document.oncontextmenu = function () {
    return false;
}

import { getLastUpdate , formatUnit, formatDiscussTimestamp } from "@/utils/function";
import createDiscuss from "@/components/createDiscuss";
import {RichText, bigText, bigTextW} from "@/utils/richtext";

export default {
    name: "Topic",
    props: [
        'topicId'
    ],
    components: {
        createDiscuss,
    },
    data() {
        return {
            discussEdit: false,
            selectItem: -1,
            getLastUpdate: getLastUpdate,
            formatUnit: formatUnit,
            formatDiscussTimestamp: formatDiscussTimestamp,
            showMoreContent: false,
            href: {
                name: 'whyRUAttackUK',
                title: '俄罗斯到底为什么要打乌克兰？🍻',
                content: "华春莹表示，中国理解无核武器国家在推进核裁军进程方面的愿望和诉求。从拥有核武器的第一天起，中国就积极倡导全面禁止和彻底销毁核武器，始终恪守在任何时候、任何情况下都不首先使用核武器，郑重承诺无条件不对无核武器国家和无核武器区使用或威胁使用核武器，并一直将核力量维持在国家安全所需的最低水平。这是中国政府一以贯之的基本政策。就全面彻底销毁核武器的最终目标而言，中方立场与“条约”并不相悖，中方正在以实际行动为维护全球战略稳定、不断推进国际军控和裁军进程作出自己的贡献。\n" +
                    "\n" +
                    "华春莹指出，与此同时，中方认为，核裁军进程不能脱离国际安全现实，必须遵循“维护全球战略稳定”和“各国安全不受减损”原则，循序渐进加以推进。相关进程必须坚持协商一致原则，在现有国际裁军和防扩散机制下处理。你刚才提到的“禁止核武器条约”，违背了上述原则，有损以《不扩散核武器条约》为基石的国际核裁军与核不扩散体系。中方不认可、也无意签署或批准该条约。中方强调，“条约”不反映、也不构成习惯国际法，对非缔约国不具有法律约束力。\n" +
                    "\n" +
                    "华春莹强调，中方将继续在联大一委、裁谈会、《不扩散核武器条约》审议进程及五核国合作等框架下，参加核裁军及相关问题的讨论，以理性、务实、有效的方式推动核裁军进程，为维护全球战略平衡与稳定、建立无核武器世界做出不懈努力。我们愿继续同无核武器国家就此保持建设性沟通。",
                tag: ["#时要新闻", "#乌克兰", "#俄罗斯", "#战争"],
                topic: {
                    Id: 10000,
                    lastUpdate: 1642054259,
                    background: 'https://t8.baidu.com/it/u=1708415702,3915975738&fm=167',
                    // 点赞
                    likeCount: 114514,
                    // 订阅
                    follow: 1919810,
                    // 浏览
                    watch: 191981000
                },
                avatar: 'https://q1.qlogo.cn/g?b=qq&nk=1849004341&s=640',
                founder: 'Hum!!!',
            },
            user: {
                isLiked: true,
                isFollow: true,
                isDontLiked: true,
                isWatchLater: true
            },
            discussReplyOptions: {
                replyUser: false,
                topicId: 0,
                userId: 0,
                // user nickname or topic name
                name: '',
                raw: {
                    avatarId: '2570323424',
                    nickname: 'KMew',
                    content: `😅`,
                    timestamp: 1646468282,
                },
                discussId: 0
            },
            discussSelectOption: {
                showSelect: false,
                selectMenu: {
                    x: 0,
                    y: 0
                },
                isReplyDiscuss: false,
                discussId: 0,
                userId: 0,
            },
            discussUserIdList: [],
            discussHref: [],
            discuss: [
                {
                    isReply: true,
                    rawDiscuss: {
                        avatarId: '2570323424',
                        nickname: 'KMew',
                        content: `😅`,
                        timestamp: 1646468282,
                    },
                    avatarId: '2635918064',
                    nickname: 'GOGO',
                    content: '😅😅😅',
                    timestamp: 1646067661
                },
                {
                    isReply: false,
                    avatarId: '2570323424',
                    nickname: 'KMew',
                    content: `😅`,
                    timestamp: 1646468282,
                },
                {
                    isReply: false,
                    avatarId: '1849004341',
                    nickname: 'Hum!!!',
                    content: `<!@10001>??????🤔`,
                    timestamp: 1646468282
                },
                {
                    isReply: false,
                    avatarId: '838472865',
                    nickname: 'Nil',
                    content: '你就是歌姬吧',
                    timestamp: 1646468282
                },
                {
                    isReply: false,
                    avatarId: '1720471077',
                    nickname: 'Dew',
                    content: bigText,
                    timestamp: 1646469972
                },
                {
                    isReply: false,
                    avatarId: '2635918064',
                    nickname: 'GOGO',
                    content: '不做评价',
                    timestamp: 1646468282
                },{
                    isReply: false,
                    avatarId: '2635918064',
                    nickname: 'GOGO',
                    content: '你是不是🐕罕见',
                    timestamp: 1646067661
                },{
                    isReply: false,
                    avatarId: '2635918064',
                    nickname: 'GOGO',
                    content: bigTextW,
                    timestamp: 1614704461
                },
            ],
        }
    },
    created() {
        document.title = this.href.title;
        let list = [];
        let rich = new RichText('');
        for (let i = 0; i < this.discuss.length; i++) {
            list.push(this.discuss[i].avatarId);
            rich.cover(this.discuss[i].content);
            this.discussHref[i] = rich.compile();
            // this.discussUserIdList.push(this.discuss[i].avatarId);
        }
        this.discussUserIdList = [...new Set(list)];

        //console.log(this.readId);
    },
    methods: {
        toRichText(content) {
            let rich = new RichText(content);
            return rich.compile();
        },
        showSelectMenu (e, index, item) {
            e.preventDefault();
            this.discussSelectOption = {
                showSelect: false,
                selectMenu: {
                    x: e.clientX,
                    y: e.clientY
                },
                discussId: index,
                userId: item.avatarId,
                isReplyDiscuss: item.isReply
            };
            // this.$nextTick(() => {
            //     this.showMenu = true
            // })
            this.selectItem = index;
            this.discussSelectOption.showSelect = true
        },
        replyThisDiscuss() {
            this.discussReplyOptions = {
                replyUser: true,
                topicId: this.href.topic.Id,
                userId: this.discussSelectOption.userId,
                name: this.discuss[this.discussSelectOption.discussId].nickname,
                raw: this.discuss[this.discussSelectOption.discussId],
                discussId: this.discussSelectOption.discussId,
            };
            this.$nextTick(() => {
                this.discussEdit = true;
            })
        },
        replyThisTopic() {
            this.discussReplyOptions = {
                replyUser: false,
                topicId: this.href.topic.Id,
                name: this.href.name,
            };
            this.$nextTick(() => {
                this.discussEdit = true;
            })
        },
        appendDiscuss(context) {
            this.discussHref = [this.toRichText(context.content), ...this.discussHref]
            this.discuss = [context, ...this.discuss];
        },
        // copyContentToRemoveChild() {
        //     let content = this.discuss[this.discussSelectOption.discussId].content;
        //     console.log(content);
        //     copyToClipboard()
        // }
    }
}

</script>

<style>
.__topic_background {
    margin-top: 5%;
    margin-left: 12.5%;
    /*width: 75%;*/
    width: 50%;

}
.__topic_details {
    /*margin-right: 12.5%;*/
    width: 100%;
}
.v-list-item__content{
    justify-content: center;
    text-align: left;
    display: grid;
}
.v-list-item__avatar {
    justify-content: center;
    display: grid;
}
</style>
