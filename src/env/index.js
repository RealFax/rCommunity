import { API } from "./interface";
import { menu } from "./menu";

const defaultLanguage = 'zh_CN';            //默认语言
const copyrightStart = 2019;                //底部版权年份起始
const maxTimeOut = 3;                       //超时时间
const httpRequestTimeOut = 30;              //http请求的超时时间
const aesIvSecret = 'ABCDEF1234123412';     // AES加密偏移量
const backgroundUrl = 'https://logincdn.msauth.net/shared/1.0/content/images/backgrounds/2_bc3d32a696895f78c19df6c717586a5d.svg';
const loginOptions = {  // 登录的安全选项
    maxLength: 32,
    minLength: 4,
    password: 64,
};
const CookieSecret = 0x75;
const CookieName = {
    login: {
        token: '__USER_TOKEN',
        tokenSign: '__TOKEN_SIGN_'
    }
};
const reCAPTCHASiteKey_v2 = '6LeLqWMcAAAAAJnKq7H1wIwjL3QYiWjNHCt3XHRo';
const reCAPTCHASiteKey_v3 = '6LfSPXgcAAAAAKc67aF74MiueeMO6K5dsyI2x4wm';

export {
    defaultLanguage,
    copyrightStart,
    maxTimeOut,
    aesIvSecret,
    backgroundUrl,
    loginOptions,
    reCAPTCHASiteKey_v2,
    httpRequestTimeOut,
    API,
    reCAPTCHASiteKey_v3,
    CookieSecret,
    CookieName,
    menu
}
