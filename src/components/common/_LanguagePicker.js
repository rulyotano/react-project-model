import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { InputLabel } from 'material-ui-next/Input';
import { MenuItem } from 'material-ui-next/Menu';
import { FormControl } from 'material-ui-next/Form';
import Select from 'material-ui-next/Select';

import languageService from '../../service/language/languageService'
import { connect } from 'react-redux'
import { setLanguage } from 'redux-i18n'
import classNames from 'classnames'

const ALL_LANGUAGES = languageService.availableLanguages()

const styles = {
    flag: { marginLeft: "5px", marginRight: "5px" }
}

class LanguagePicker extends PureComponent {
  render() {
    const { lang, changeLanguage } = this.props;
    const { t } = this.context;
    const selectedLang = ALL_LANGUAGES.find(it=>it.key === lang)
    return (
    <FormControl>
        <InputLabel htmlFor="language">{t("languages.Language")}</InputLabel>
        <Select
          value={lang}
          onChange={e => changeLanguage(e.target.value)}
          inputProps={{
            name: 'language',
            id: 'language',
          }}>
          {ALL_LANGUAGES.map(it => <MenuItem key={it.key} value={it.key}>
                <div style={styles.flag} className={classNames("flag", it.flagClass)}/>
                {t(it.name)}
            </MenuItem>)}          
        </Select>
      </FormControl>
    )
  }
}

LanguagePicker.contextTypes = {
    t: PropTypes.func
}

export default connect(state=>({
    lang: state.i18nState.lang   
}), dispatch=>({
    changeLanguage: lang=>dispatch(setLanguage(lang))
}))(LanguagePicker)
