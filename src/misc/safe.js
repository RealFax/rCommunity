import { aesIvSecretKey } from '../env'
import cryptoJs from 'crypto-js';
let cryptoJS = cryptoJs;

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
                iv: cryptoJS.enc.Utf8.parse(aesIvSecretKey),
                mode: cryptoJS.mode.CBC,
                padding: cryptoJS.pad.Pkcs7
        }).toString();
    }
    
    static AESDecrypt (data, secretKey) {
        return cryptoJS.enc.Utf8.stringify(cryptoJS.AES.decrypt(data, cryptoJS.enc.Utf8.parse(secretKey), {
            iv: cryptoJS.enc.Utf8.parse(aesIvSecretKey),
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
     * @description inpurt object must include {token, username, password}
     * @returns {Object}
     * {
     *      data: ""
     * }
     **/

    static LoginPackage (uData) {
        if(!uData.token || !uData.username || !uData.password){
            return null;
        }
        let loginObject        = {};  
        loginObject.username   = uData.username;
        // 注入用户名
        loginObject.password   = IsSafe.PasswordEncrypt(uData.password); 
        // md5加密基础密码
        loginObject.token      = uData.token;
        // 注入回调token
        loginObject.sign       = IsSafe.LoginPackageSign(JSON.stringify(loginObject), uData.token);
        // 根据用户登录对象和reCAPTCHAToken生成签名
        let loginPacakge       = {}; 
        loginPacakge.timestamp = Math.round(new Date().getTime() / 1000);
        // UNIX时间戳
        let encryptSecretKey   = loginPacakge.timestamp << 0xf010203;
        // 生成一个AES加密密钥
        loginPacakge.data      = IsSafe.AESEncrypt(JSON.stringify(loginObject), encryptSecretKey);
        // 加密原始数据 
        return loginPacakge;
    }

}

export{
    IsSafe
}