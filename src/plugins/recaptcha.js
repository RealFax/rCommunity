import Vue from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import { reCAPTCHASiteKey_v3 } from '@/env'

Vue.use(VueReCaptcha, {
    siteKey: reCAPTCHASiteKey_v3
});