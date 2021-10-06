<template>
  <v-app :style="bg">
    <div class="login" v-loading="loading">
      <div class="prvLogin">
        <v-img src="../assets/logo.png" style="margin-top: 2.5%"></v-img>

        <h2 style="margin-top: 2.5%">
          {{ $t("Text.Login.LoginTitle") }}
        </h2>
        <v-form class="loginForm">
          <v-text-field
            v-if="step == 0"
            class="loginInput"
            v-model="username"
            :rules="usernameRules"
            :counter="maxLength"
            :label="$t('Text.Login.LoginLableOption')"
            required
          ></v-text-field>

          <v-text-field
            v-if="step == 1"
            class="loginInput"
            v-model="password"
            :rules="passwordRules"
            :counter="passwordMaxLength"
            :label="$t('Text.Login.LoginLableOption_1')"
            required
          ></v-text-field>

          <div style="font-size: 6px" v-if="step == 0">
            <span> {{ $t("Text.Login.NoneAccount_1") }} </span>
            <el-link
              type="primary"
              style="margin-top: -1%"
              :underline="false"
              href="/register"
            >
              {{ $t("Text.Login.NoneAccount_2") }}
            </el-link>
            <span> {{ $t("Text.Login.NoneAccount_3") }} </span>
          </div>

          <div style="font-size: 6px" v-if="step == 1">
            <span> {{ $t("Text.Login.ForgetPassword_1") }} </span>
            <el-link type="primary" style="margin-top: -1%" :underline="false">
              {{ $t("Text.Login.ForgetPassword_2") }}
            </el-link>
          </div>

          <v-btn
            depressed
            color="primary"
            class="loginButton"
            v-if="step == 0"
            @click="NextStep"
          >
            {{ $t("Text.Public.Next") }}
          </v-btn>

          <v-btn
            depressed
            color="primary"
            style="margin-left: 80%; margin-top: 10%"
            v-if="step == 1"
            @click="Login"
          >
            {{ $t("Text.Login.Login") }}
          </v-btn>
        </v-form>
      </div>

      <!--<v-dialog v-model="captcha" persistent max-width="350">
        <v-card>
          <v-card-title class="text-h5"
            >{{ $t("Text.Login.NeedCaptcha") }}</v-card-title
          >
          <div id="grecaptcha" style="margin-left: 7%"></div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="captcha = false">
              {{ $t("Text.Login.StopLogin") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>-->
    </div>
  </v-app>
</template>

<script>
import { backgroundUrl, loginOptions, reCAPTCHASiteKey } from "../env";
//import { IsSafe } from '../misc/safe';
import { Login } from "../utils/login";
export default {
  data() {
    return {
      bg: {
        backgroundImage: "url(" + backgroundUrl + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      },
      loading: false,
      siteKey: reCAPTCHASiteKey,
      captcha: true,
      maxLength: loginOptions.maxLength,
      passwordMaxLength: loginOptions.password,
      step: 0,
      username: "",
      password: "",
      usernameRules: [
        (v) => !!v || this.$t("Text.Login.alert_1"),
        (v) =>
          (v.length <= loginOptions.maxLength &&
            v.length >= loginOptions.minLength) ||
          this.$t("Text.Login.alert_2"),
      ],
      passwordRules: [
        (v) => !!v || this.$t("Text.Login.alert_3"),
        (v) =>
          (v.length <= loginOptions.maxLength &&
            v.length >= loginOptions.minLength) ||
          this.$t("Text.Login.alert_4"),
      ],
    };
  },
  created() {
    //this.loaded();
    this.$recaptchaLoaded();
    const token = this.$recaptcha("login");
    console.log(token);
  },
  methods: {
    NextStep() {
      this.loading = true;
      let thisvue = this;
      if (
        this.username.length < loginOptions.minLength ||
        this.username.length > loginOptions.maxLength
      ) {
        this.$notify({
          title: this.$t("Text.Public.Alert"),
          message: this.$t("Text.Login.alert_2"),
          type: "warning",
        });
        this.loading = false;
        return;
      }
      setTimeout(() => {
        thisvue.step++;
        thisvue.loading = false;
      }, 2000);
    },
    async Login() {
      if (!this.username || !this.password) {
        return;
      }
      await this.$recaptchaLoaded();
      let token = await this.$recaptcha();
      let response = Login(this.username, this.password, token);
      if (!response.status) {
        this.$message.error(response.data);
      }
      switch (response.code) {
        case 0:// 登录失败
          this.$message({
            message: response.msg,
            type: "warning",
          });
          return;
        case 1:// 登录成功 储存token
          this.$message({
            message: response.msg,
            type: "success"
          });
          return;
        case 10:// 未验证用户,延迟跳转到验证页面
          this.$message({
            message: response.msg,
            type: "warning",
          });
          return;  
        case 100:// 需要进行v2验证的用户
          this.$message({
            message: response.msg,
            type: 'info'
          });
          return;
        default:
          break;
      }
    },
    submit: function (token) {
      console.log(token);
    },
    loaded() {
      setTimeout(() => {
        window.grecaptcha.render("grecaptcha", {
          sitekey: this.siteKey,
          callback: this.submit,
        });
      }, 200);
    },
  },
};
</script>

<style>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 440px;
  height: 275px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.1);
}
.prvLogin {
  margin-top: 5%;
  width: 70%;
  margin-left: 15%;
}
.loginForm {
  margin-top: -3%;
}
.loginInput {
  margin-top: -10%;
}
.loginButton {
  margin-top: 10%;
  margin-left: 75%;
}
</style>