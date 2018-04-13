// import en from './en'
// import es from './es'
// import pt from './pt'

export default {
    getLanguages(){
        return [
            // { key: 'pt', name: "Portugués", language: pt },
            // { key: 'en', name: "English", language: en },
            // { key: 'es', name: "Español", language: es }
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