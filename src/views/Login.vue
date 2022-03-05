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
                        v-if="step === 0"
                        class="loginInput"
                        v-model="username"
                        :rules="usernameRules"
                        :counter="maxLength"
                        :label="$t('Text.Login.LoginLabelOption')"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-if="step === 1"
                        class="loginInput"
                        v-model="password"
                        :rules="passwordRules"
                        :counter="passwordMaxLength"
                        :label="$t('Text.Login.LoginLabelOption_1')"
                        required
                    ></v-text-field>

                    <div style="font-size: 6px" v-if="step === 0">
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

                    <div style="font-size: 6px" v-if="step === 1">
                        <span> {{ $t("Text.Login.ForgetPassword_1") }} </span>
                        <el-link type="primary" style="margin-top: -1%" :underline="false">
                            {{ $t("Text.Login.ForgetPassword_2") }}
                        </el-link>
                    </div>

                    <v-btn
                        depressed
                        color="primary"
                        class="loginButton"
                        v-if="step === 0"
                        @click="NextStep"
                    >
                        {{ $t("Text.Public.Next") }}
                    </v-btn>

                    <v-btn
                        depressed
                        color="primary"
                        style="margin-left: 80%; margin-top: 10%"
                        v-if="step === 1"
                        @click="Login(false)"
                    >
                        {{ $t("Text.Login.Login") }}
                    </v-btn>
                </v-form>
            </div>

            <v-dialog v-model="captcha" persistent max-width="350">
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
            </v-dialog>

            <v-snackbar v-model="loginFatal.status">
                {{ loginFatal.message }}
                <template v-slot:action="{ attrs }">
                    <v-btn
                        color="blue"
                        text
                        v-bind="attrs"
                        @click="loginFatal.status = false"
                    ><!---{{ $t("Text.Public.Close") }}--><v-icon>mdi-close</v-icon></v-btn></template>
            </v-snackbar>

        </div>
    </v-app>
</template>

<script>
import { backgroundUrl, loginOptions, reCAPTCHASiteKey_v2 } from "../env";
//import { IsSafe } from '../misc/safe';
import { Login } from "@/utils/action";
import {SetWebToken} from "@/SDK/User";
export default {
    data() {
        return {
            bg: {
                backgroundImage: "url(" + backgroundUrl + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            },
            loading: false,
            captcha: false,
            maxLength: loginOptions.maxLength,
            passwordMaxLength: loginOptions.password,
            step: 0,
            username: "",
            password: "",
            loginFatal: {
                message: '',
                status: false,
            },
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
        //this.$recaptchaLoaded();

    },
    methods: {
        NextStep() {
            this.loading = true;
            let this_ = this;
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
                this_.step++;
                this_.loading = false;
            }, 2000);
        },
        async Login(captcha) {
            if (!this.username || !this.password) {
                return;
            }
            await this.$recaptchaLoaded();
            let token = await this.$recaptcha('login');
            let this_ = this;
            await Login(this.username, this.password, token, captcha).then(await function (resp) {
                if (resp.status && resp.data.status) {
                    if (resp.data.captcha) {
                        SetWebToken(
                            resp.data.access.token,
                            resp.data.access.path,
                            resp.data.access.expires,
                        );
                    }else {
                        this_.captcha = true;
                        this_.loaded();
                    }
                }
            });
        },
        async submit (token) {
            let this_ = this;
            await Login(this.username, this.password, token, true).then(await function (resp){
               if (resp.status && resp.data.status) {
                   SetWebToken(
                       resp.data.access.token,
                       resp.data.access.path,
                       resp.data.access.expires,
                   );
               }else {
                   this_.loginFatal.status = true;
                   this_.loginFatal.message = this_.$t("Text.Login.loginFatal");
               }
            });
        },
        loaded() {
            setTimeout(() => {
                window.grecaptcha.render("grecaptcha", {
                    sitekey: reCAPTCHASiteKey_v2,
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
/*
.loginInput {
  margin-top: -10%;
}
 */
.loginButton {
    margin-top: 10%;
    margin-left: 75%;
}
</style>
