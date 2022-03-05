import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { languageTable } from './misc/LanguageTable'

Vue.use(VueI18n)

let language;
if(languageTable[localStorage.getItem('language')]){
    language = localStorage.getItem('language');
}else if (navigator.language === 'zh_CN') {
    language = 'zh_CN';
    localStorage.setItem('language', 'zh_CN');
}else if (navigator.language === 'en') {
    language = 'en_US';
    localStorage.setItem('language', 'en_US')
}

const i18n = new VueI18n({
    locale: language,
    messages: {
        'zh_CN': require('./locale/zh_CN.json'),
        'en_US': require('./locale/en_US.json')
    }
});


export default i18n;