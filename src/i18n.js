import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { languageTable } from './misc/LanguageTable'

Vue.use(VueI18n)

var language = 'zh_CN';
if(languageTable[localStorage.getItem('language')]){
  language = localStorage.getItem('language');
}

const i18n = new VueI18n({
  locale: language,
  messages: {
    'zh_CN': require('./locale/zh_CN.json'),
    'en_US': require('./locale/en_US.json')
  }
});


export default i18n;