const defaultLanguage = 'zh_CN';            //默认语言
const copyrightStart = 2019;                //底部版权年份标志开始
const maxTimeOut = 30;                      //超时时间
const httpRequestTimeOut = 30;              //http请求的超时时间
const aesIvSecretKey = 'ABCDEF1234123412';  // AES加密偏移量
const backgroundUrl = 'https://logincdn.msauth.net/shared/1.0/content/images/backgrounds/2_bc3d32a696895f78c19df6c717586a5d.svg';
const loginOptions = {
    maxLength: 32,
    minLength: 4,
    password: 64,
};
const API = {
    base: 'https://api.realfax.org/community',
    url: {
        login: '/v1/user/login',
        register: '/v1/user/register'
    }
};
const reCAPTCHASiteKey = '6LeLqWMcAAAAAJnKq7H1wIwjL3QYiWjNHCt3XHRo';
const reCAPTCHASiteKey_v3 = '6LfSPXgcAAAAAKc67aF74MiueeMO6K5dsyI2x4wm';
const menu = {
    101: {
        Rendering: false,
        url: '/',
        icon: 'mdi-home',
        text: 'Text.Menu.Home'
    },
    102: {
        Rendering: false,
        url: '/EULA',
        icon: 'mdi-bookmark',
        text: 'Text.Menu.EULA'
    },
    103: {
        Rendering: false,
        url: '/search',
        icon: 'mdi-magnify',
        text: 'Text.Menu.Search'
    },
    104: {
        Rendering: true,
        url: '/user/{userId}',
        icon: 'mdi-account-circle',
        text: 'Text.Menu.User'
    },
    105: {
        Rendering: true,
        url: '/user/{userId}/setting',
        icon: 'mdi-view-dashboard',
        text: 'Text.Menu.Setting'
    },
    107: {
        Rendering: false,
        url: '/author',
        icon: 'mdi-pencil',
        text: 'Text.Menu.Author'
    },
    108: {
        Rendering: false,
        url: '/author/manage',
        icon: 'mdi-gavel',
        text: 'Text.Menu.Manage'
    }
};

export {
    defaultLanguage,
    copyrightStart,
    maxTimeOut,
    aesIvSecretKey,
    backgroundUrl,
    loginOptions,
    reCAPTCHASiteKey,
    httpRequestTimeOut,
    API,
    reCAPTCHASiteKey_v3,
    menu
}