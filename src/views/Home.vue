<template>
    <v-app id="Home">
        <v-card class="navMenu rounded-0">
            <v-app-bar :color="user ? '#FFFFFF' : ''" :flat="user">
                <v-app-bar-nav-icon @click="drawer = true" v-if="user"></v-app-bar-nav-icon>
                <v-toolbar-title style="width: 85%;" class="text-h5 font-weight-medium">
                    {{ $t("Text.Home.title") }}
                </v-toolbar-title>

                <v-row no-gutters>
                    <v-col cols="12" sm="8" md="8">
                        <v-text-field
                            class="TopSearch"
                            label="搜索"
                            prepend-inner-icon="search"
                            :background-color="searchColor"
                            @focus="searchColor = '#FFFFFF'; searchOutline = true"
                            @blur.native.capture="searchColor = '#F1F1F1'; searchOutline = false"
                            solo
                            :outlined="searchOutline"
                            flat
                            dense
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-select
                    class="languageSwitcher"
                    v-model="selectLanguage"
                    :items="languages"
                    item-text="language"
                    item-value="lang"
                    append-outer-icon="translate"
                    :label="selectLanguage.language"
                    @change="SwitchLanguage"
                    return-object
                    outlined
                    dense
                ></v-select>
            </v-app-bar>
        </v-card>

        <!--导航抽屉-->
        <v-navigation-drawer v-model="drawer" absolute temporary v-if="user">
            <v-list style="padding: 0">
                <!--头像与标签-->
                <v-list-item>
                    <v-list-item-avatar style="margin-left: 0.05vw" size="80">
                        <v-img
                            :src="user.profile.avatar"
                        ></v-img>
                    </v-list-item-avatar>
                    <!--<el-tag class="UserTag" :type="user.profile.level.type" size="mini" effect="dark">
                        {{ user.profile.level.lv }}
                    </el-tag>-->
                </v-list-item>
                <!--用户名与邮箱-->
                <v-list-item link>
                    <v-list-item-content>
                        <v-list-item-title>
                            <span class="text-h6">{{ user.profile.username }}</span>
                        </v-list-item-title>
                        <v-list-item-subtitle> {{ user.profile.mail }} </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <!--菜单-->
            <v-list nav dense>
                <v-list-item-group
                    active-class="deep-purple--text text--accent-4"
                >
                    <v-list-item v-for="(item, key) in menu" :key="key" @click="$router.push({ path: item.url })">
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{ $t(item.text) }}</v-list-item-title>
                    </v-list-item>

                </v-list-item-group>
            </v-list>
            <template v-slot:append>
                <div class="pa-2">
                    <v-btn block dark href="/logout">
                        {{ $t('Text.Menu.Exit') }}
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>

        <!--未登录的主页-->
        <div class="globalDetailed" v-if="!user">
            <div class="Detailed">
                <span class="Subtitle">{{ $t("Text.Home.Subtitle") }}</span>
                <div style="margin-top: 1.5vw">
                    <router-link to="/login" class="QuickStar" style="color: #fff"
                    >{{ $t("Text.Home.JoinRealFaxCommunity") }}&nbsp;<v-icon
                        style="color: #fff; margin-top: -5px"
                    >mdi-near-me</v-icon
                    ></router-link
                    >
                </div>
            </div>
            <div class="DetailedImages">
                <img src="../assets/banner-img.png" class="SubtitleImages" />
            </div>
        </div>

        <div v-if="user">
            <guide style="width: 15em;"></guide>
            <topic-ground></topic-ground>
        </div>

        <div class="footer" v-if="!user">
            <v-footer padless v-if="!user">
                <v-col class="text-center" cols="12">
                    Copyright © {{ copyrightStart }} - {{ new Date().getFullYear() }}
                    <strong>RealFax</strong>. All Rights Reserved.
                </v-col>
            </v-footer>
        </div>

        <!--cookie声明-->
        <v-dialog v-model="CookieSetting" persistent max-width="350">
            <v-card>
                <v-card-title class="text-h5">
                    {{ $t("Text.Cookie.title") }}
                </v-card-title>
                <v-divider style="margin-left: 20%; width: 60%"></v-divider>
                <v-card-text style="margin-top: 5%; font-size: 20px">
                    {{ $t("Text.Cookie.subtitle") }}
                </v-card-text>
                <v-card-text>
                    {{ $t("Text.Cookie.explain") }}
                    <el-link href="/EULA#cookie" target="_blank">
                        {{ $t("Text.Cookie.subExplain") }}
                    </el-link>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="CookieSetting = false">
                        {{ $t("Text.Cookie.Disagree") }}
                    </v-btn>
                    <v-btn color="green darken-1" text @click="AgreeSetCookie()">
                        {{$t("Text.Cookie.Agree") }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="alert">
            {{ alertText }}
            <template v-slot:action="{ attrs }">
                <v-btn
                    color="blue"
                    text
                    v-bind="attrs"
                    @click="alert = false"
                ><!---{{ $t("Text.Public.Close") }}--><v-icon>mdi-close</v-icon></v-btn></template>
        </v-snackbar>

    </v-app>
</template>

<script>
import { getLanguageList, getRealLanguage } from "@/misc/LanguageTable";
import { copyrightStart } from "@/env";
import { getMenu } from '@/utils/function';
import guide from "@/components/guide";
import topicGround from "@/components/topicGround";
export default {
    name: "Home",
    components: {
        guide,
        topicGround
    },
    data() {
        return {
            searchOutline: false,
            searchColor: '#F1F1F1',
            alertText: '',
            selectLanguage: getRealLanguage(),
            CookieSetting: false,
            drawer: false,
            copyrightStart: copyrightStart,
            alert: false,
            languages: getLanguageList,
            user: JSON.parse(localStorage.getItem('User')),
            menu: null,
        };
    },
    mounted() {
        if (!localStorage.getItem("cookie_policy")) {
            this.CookieSetting = true;
        }
    },
    created() {
        localStorage.setItem('User', JSON.stringify({
            profile: {
                avatar: 'http://dingyue.ws.126.net/2021/0804/5f6bee62p00qxac21004wc000fe00h9c.png',
                username: '窝恁叠',
                uid: 5249100808603045723,
                mail: 'wonendie@gmail.com',
                // level: {
                //     lv: 'Pro',
                //     type: 'success'
                // }
            },
            menu: [101, 103, 104, 105, 107, 108, 102]
        }));
        this.user ? this.menu = getMenu(this.user.profile.uid, this.user.menu) : null;
        // this.menu = getMenu(this.user.profile.uid, this.user.menu);
    },
    methods: {
        AgreeSetCookie() {
            localStorage.setItem("cookie_policy", 'ok');
            this.alertText = this.$t("Text.Cookie.AgreeCookieSet");
            this.CookieSetting = false;
            this.alert = true;
        },
        SwitchLanguage() {
            this.alert = false;
            if (this.selectLanguage.lang !== this.$i18n.locale) {
                localStorage.setItem("language", this.selectLanguage.lang);
                this.$i18n.locale = this.selectLanguage.lang;
                // this.$message({
                //     type: "success",
                //     message:
                //         this.$t("Text.Public.SwitchLanguageDone") +
                //         getRealLanguage().language,
                // });
                this.alertText = this.$t("Text.Public.SwitchLanguageDone") + getRealLanguage().language;
            }else {
                this.alertText = this.$t("Text.Public.NoNeedToModifyLanguage");
            }
            // this.$message({
            //     type: "warning",
            //     message: this.$t("Text.Public.NoNeedToModifyLanguage"),
            // });
            this.alert = true;
        }
    },
};
</script>

<style>
body::-webkit-scrollbar {
    display: none;
}
.navMenu {
    padding: 0;
    background-color: rgba(255, 255, 255, 0);
}
.languageSwitcher {
    transform: translate(0, 25%);
    width: 500px;
}
.globalDetailed {
    margin-top: 1.5%;
    height: 100%;
    width: 100%;
}
/*.UserTag {
    margin-left: 25%;
}*/
.Detailed {
    margin-top: 15%;
    margin-left: 5%;
    height: 30%;
    width: 50%;
}
.TopSearch {
    font-weight: 500;
    transform: translate(3%, 25%);
    width: 50vw;
}
.DetailedImages {
    margin-left: 53%;
    margin-top: -23%;
}
.Subtitle {
    font-size: 5vw;
    font-weight: 300;
    line-height: 1;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.SubtitleImages {
    width: 70%;
    position: absolute;
    bottom: 0;
    right: -15vw;
    user-select: none;
}
.QuickStar {

    user-select: none;
    display: inline-block;
    border-radius: 100vw;
    background: #4b92db;
    font-size: 1.5vw;
    text-decoration: none;
    padding: 0.8vw 2vw;
    margin-left: 0.5%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.12);
}
.footer {
    height: 45px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
}
</style>
