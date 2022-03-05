import {GetCookie, SetCookie} from "@/utils/cookie";
import {CookieName, CookieSecret} from "@/env";
import cryptoJs  from 'crypto-js';
const cryptoJS = cryptoJs;

function XOREncrypt (raw) {
    let temp = null;
    for (let i = 0; i < raw.length; i++) {
        temp += String.fromCharCode(raw.charCodeAt(i) ^ CookieSecret)
    }
    return temp;
}

function XORDeCrypt (raw) {
    let temp = null
    for (let i = 0; i < raw.length; i++) {
        temp += String.fromCharCode(raw.charCodeAt(i) ^ CookieSecret);
    }
    return temp;
}

const SetWebToken = (token, path, expires) => {
    // 将拿到的用户token异或加密后存cookie里
    SetCookie(CookieName.login.token, XOREncrypt(token), path, expires);
    // 把原始的用户token HMAC SHA256提取出来存cookie里
    SetCookie(CookieName.login.tokenSign, cryptoJS.HmacSHA256(token, CookieSecret).toString(), path, expires);
}

const GetWebToken = () => {
    let rawToken = GetCookie(CookieName.login.token);
    if (!rawToken) {
        return null;
    }
    // 把cookie中异或加密后的token进行异或解密
    let token = XORDeCrypt(rawToken);
    // 校验现在的token HMAC SHA256签名
    if (cryptoJs.HmacSHA256(token, CookieSecret).toString() !== GetCookie(CookieName.login.tokenSign)) {
        return null;
    }
    return token;
}

export {
    SetWebToken,
    GetWebToken
}