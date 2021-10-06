
const SwitchLanguage = (lang) => {
    if (this.$i18n.locale !== lang) {
        this.$i18n.locale = lang;
        localStorage.setItem('language', lang);
        this.$message({
            type: 'success',
            message: this.$t('Text.Public.SwitchLanguageDone') + this.$t('language')
        });
        return;
    }
    this.$message({
        type: 'warning',
        message: this.$t('Text.Public.NoNeedToModifyLanguage')
    });
    return;
}

export{
    SwitchLanguage
}