import {getLanguageFunction} from '../../../service/language/languageService'

export default (values) => {
    if (!values)
        return undefined;
    const t = getLanguageFunction();
    if (values.field) {
        if (!values.sector)
            return t('workAreaSelector.SectorRequired');
        if (!values.farm)
            return t('workAreaSelector.FarmRequired');
    }

    if (values.sector) {
        if (!values.farm)
           return t('workAreaSelector.FarmRequired');
    }

    return undefined;
}