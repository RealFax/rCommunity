import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
//import { getLanguage } from '../misc/LanguageTable'

//let vuetifyLanguageSetting = getLanguage();

//import languageI18n from (`${vuetifyLanguageSetting.path}`);


Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        //locales: { languageI18n }
    }
});
