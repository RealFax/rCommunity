import { defaultLanguage } from '../env'

const languageTable = {
    'zh_CN': 'zhHans',  //简体中文
    'zh_TW': 'zhHant',  //繁体中文
    'en_US': 'en',      //英语
    'ru_RU': 'ru',      //俄语
    'es_ES': 'es',      //西班牙语
    'ar_AR': 'ar',      //阿拉伯语
    'pt_PT': 'pt',      //葡萄牙语
    'ja_JP': 'ja'       //日语
};

const language = {
    'zh_CN': '简体中文',       //简体中文
    'zh_TW': '繁體中文',       //繁体中文
    'en_US': 'English',      //英语
    'ru_RU': 'русский',      //俄语
    'es_ES': 'Español',      //西班牙语
    'ar_AR': 'للغة العربية', //阿拉伯语
    'pt_PT': 'Português',    //葡萄牙语
    'ja_JP': '日本語'         //日语
};

const getLanguageList = [
    {
        language: "简体中文",
        lang: "zh_CN"
    },{
        language: "繁體中文",
        lang: "zh_TW"
    },{
        language: "English",
        lang: "en_US"
    },{
        language: "русский",
        lang: "ru_RU"
    },{
        language: "Español",
        lang: "es_ES"
    },{
        language: "للغة العربية",
        lang: "ar_AR"
    },{
        language: "Português",
        lang: "pt_PT"
    },{
        language: "日本語",
        lang: "ja_JP"
    }
];

const vuetifyLanguagePath = {
    'zh_CN': 'vuetify/lib/locale/zh-Hans',
    'zh_TW': 'vuetify/lib/locale/zh-Hant',
    'en_US': 'vuetify/lib/locale/en',
    'ru_RU': 'vuetify/lib/locale/ru',
    'es_ES': 'vuetify/lib/locale/es',
    'ar_AR': 'vuetify/lib/locale/ar',
    'pt_PT': 'vuetify/lib/locale/pt',
    'ja_JP': 'vuetify/lib/locale/ja'
}

const getRealLanguage = () => {
    let localelanguage = localStorage.getItem('language');
    let RealLanguage = language[localelanguage];
    if(!RealLanguage){
        localStorage.setItem('language', defaultLanguage);
        return {
            language: language[defaultLanguage],
            lang: defaultLanguage
        };
    }
    return {
        language: RealLanguage,
        lang: localelanguage
    };
}

const getLanguage = () => {
    let language = localStorage.getItem('language');
    let vuetifyLanguage = languageTable[language];
    if (!vuetifyLanguage) {
        return {
            'language': languageTable['en_US'],
            'path': vuetifyLanguagePath['en_US']
        }
    }
    return {
        'language': languageTable[language],
        'path': vuetifyLanguagePath[language]
    }
}

export {
    languageTable,
    language,
    vuetifyLanguagePath,
    getLanguageList,
    getRealLanguage,
    getLanguage
}