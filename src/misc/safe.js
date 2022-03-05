import { aesIvSecret } from '@/env'
import cryptoJs  from 'crypto-js';
const cryptoJS = cryptoJs;

class IsSafe {

    static LoginPackageSign (uData, reCAPTCHAToken) {
        if(!reCAPTCHAToken) {
            return null;
        }

        return cryptoJS.HmacSHA256(uData, reCAPTCHAToken).toString();
    }

    static PasswordEncrypt (password) {
        //let rawPassword = cryptoJS.MD5(password).toString();
        //return rawPassword;
        return cryptoJS.MD5(password).toString();
    }

    static AESEncrypt (data, secretKey) {
        return cryptoJS.AES.encrypt(
            data, cryptoJS.enc.Utf8.parse(secretKey), {
                iv: cryptoJS.enc.Utf8.parse(aesIvSecret),
                mode: cryptoJS.mode.CBC,
                padding: cryptoJS.pad.Pkcs7
            }).toString();
    }

    static AESDecrypt (data, secretKey) {
        return cryptoJS.enc.Utf8.stringify(cryptoJS.AES.decrypt(data, cryptoJS.enc.Utf8.parse(secretKey), {
            iv: cryptoJS.enc.Utf8.parse(aesIvSecret),
            mode: cryptoJS.mode.CBC,
            padding: cryptoJS.pad.Pkcs7
        }));
    }

    static SaveJsonWebToken (token) {
        localStorage.setItem('auth_token', token);
        return;
    }

    /**
     *
     * @param {Object} uData
     * @author Hum!
     * @description input object must include {token, username, password}
     * @returns {Object}
     * {
     *      data: ""
     * }
     **/

    static LoginPackage (uData) {
        if(!uData.token || !uData.username || !uData.password){
            return null;
        }
        let loginObject       = {
            username: uData.username,
            password: IsSafe.PasswordEncrypt(uData.password),
            token: uData.token
        };
        loginObject.sign      = IsSafe.LoginPackageSign(JSON.stringify(loginObject), uData.token);
        // 注入生成的签名
        let loginPacket       = {
            timestamp: Math.round(new Date().getTime() / 1000)
        };
        let encryptSecretKey   = loginPacket.timestamp << 0x000003;
        // 生成一个AES加密密钥
        loginPacket.data      = IsSafe.AESEncrypt(JSON.stringify(loginObject), encryptSecretKey);
        // 加密原始数据
        return loginPacket;
    }

}

export{
    IsSafe
}
