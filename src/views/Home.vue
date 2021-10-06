<template>
  <v-app id="Home">
    <v-card class="navMenu">
      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title style="width: 85%">{{
          $t("Text.Home.title")
        }}</v-toolbar-title>
        <div class="languageSwitcher">
          <v-select
            v-model="selectLanguage"
            :items="languages"
            item-text="language"
            item-value="lang"
            :label="selectLanguage.language"
            @change="SwitchLanguage"
            return-object
            outlined
            dense
          ></v-select>
        </div>
      </v-app-bar>
    </v-card>

    <v-navigation-drawer v-model="drawer" absolute temporary>

      <v-list>
        <v-list-item>
          <v-list-item-avatar style="margin-left: 0.05vw">
            <v-img
              :src="user.material.avatar"
            ></v-img>
          </v-list-item-avatar>
          <el-tag class="Usertag" :type="user.material.level.type" size="mini" effect="dark"> {{ user.material.level.lv }} </el-tag>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>
              <span class="text-h6">{{ user.material.username }}</span>
            </v-list-item-title>
            <v-list-item-subtitle> {{ user.material.mail }} </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-for="(item, key) in menu" :key="key" :href="item.url">
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

    <div class="globalDetailed">
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

    <div class="footer">
      <v-footer padless>
        <v-col class="text-center" cols="12">
          Copyright © {{ copyrightStart }} - {{ new Date().getFullYear() }}
          <strong>RealFax</strong>. All Rights Reserved.
        </v-col>
      </v-footer>
    </div>

    <v-dialog v-model="CookieSetting" persistent max-width="350">
      <v-card>
        <v-card-title class="text-h5">{{
          $t("Text.Cookie.title")
        }}</v-card-title>
        <v-divider style="margin-left: 20%; width: 60%"></v-divider>
        <v-card-text style="margin-top: 5%; font-size: 20px">{{
          $t("Text.Cookie.subtitle")
        }}</v-card-text>
        <v-card-text
          >{{ $t("Text.Cookie.explain") }}
          <el-link href="/EULA#cookie" target="_blank">{{
            $t("Text.Cookie.subExplain")
          }}</el-link></v-card-text
        >
        <v-card-actions v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="CookieSetting = false">{{
            $t("Text.Cookie.Disagree")
          }}</v-btn>
          <v-btn color="green darken-1" text @click="AgreeSetCookie()">{{
            $t("Text.Cookie.Agree")
          }}</v-btn></v-card-actions
        >
      </v-card>
    </v-dialog>

    <v-snackbar v-model="AgreeCookieSetTips">
      {{ $t("Text.Cookie.AgreeCookieSet") }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="AgreeCookieSetTips = false"
          ><!---{{ $t("Text.Public.Close") }}--><v-icon>mdi-close</v-icon></v-btn></template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { getLanguageList, getRealLanguage } from "../misc/LanguageTable";
import { copyrightStart } from "../env";
import { getMenu } from '../utils/function'
export default {
  name: "Home",
  data() {
    return {
      selectLanguage: getRealLanguage(),
      CookieSetting: false,
      drawer: false,
      group: null,
      copyrightStart: copyrightStart,
      AgreeCookieSetTips: false,
      languages: getLanguageList,
      user: null,
      menu: null
    };
  },
  mounted() {
    if (!localStorage.getItem("SetCookie")) {
      this.CookieSetting = true;
    }
  },
  created() {
    localStorage.setItem('User', JSON.stringify({
      material: {
        avatar: 'http://dingyue.ws.126.net/2021/0804/5f6bee62p00qxac21004wc000fe00h9c.png',
        username: '窝恁叠',
        uid: 5249100808603045723,
        mail: 'wonendie@gmail.com',
        level: {
          lv: 'Pro',
          type: 'success'
        }
      },
      menu: [101, 103, 104, 105, 107, 108, 102]
    }));
    if(JSON.parse(localStorage.getItem('User'))){
      this.user = JSON.parse(localStorage.getItem('User'));
    }
    this.menu = getMenu(this.user.material.uid, this.user.menu);
  },
  methods: {
    AgreeSetCookie() {
      localStorage.setItem("SetCookie", true);
      this.CookieSetting = false;
      this.AgreeCookieSetTips = true;
    },
    SwitchLanguage() {
      if (this.selectLanguage.lang !== this.$i18n.locale) {
        localStorage.setItem("language", this.selectLanguage.lang);
        this.$i18n.locale = this.selectLanguage.lang;
        this.$message({
          type: "success",
          message:
            this.$t("Text.Public.SwitchLanguageDone") +
            getRealLanguage().language,
        });
        return;
      }
      this.$message({
        type: "warning",
        message: this.$t("Text.Public.NoNeedToModifyLanguage"),
      });
    }
  },
};
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}
.navMenu {
  height: auto;
  widows: 100%;
  padding: 0;
  background-color: rgba(255, 255, 255, 0);
}
.languageSwitcher {
  margin-top: 1.75%;
  width: 12.5%;
}
.globalDetailed {
  margin-top: 1.5%;
  height: 100%;
  width: 100%;
}
.Usertag {
  margin-left: 50%;
}
.Detailed {
  margin-top: 15%;
  margin-left: 5%;
  height: 30%;
  width: 50%;
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
  height: 6.1%;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>