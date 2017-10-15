export default {
    getLanguages(){
        return [
            { key: 'pt', name: "Portugués" },
            { key: 'en', name: "English" },
            { key: 'es', name: "Español" }
        ];
    },
    getWord(key){
        return key
    },
    selectLanguage(language) {
        // $rootScope.currentLanguage = language;

        // //update user configuration
        // let languageConfig = userConfigService.getUserLanguage();
        // languageConfig.vlConfiguracao = language.key;
        // userConfigService.updateUserConfig([languageConfig]).then(()=>location.reload());   //Reload the page when language changed
        // userConfigService.saveUserProfile();

        // tmhDynamicLocale.set(language.key);

        // Language.getLang(language.key,data=>{
        //     $rootScope.lang = data;
        // });
    }
};