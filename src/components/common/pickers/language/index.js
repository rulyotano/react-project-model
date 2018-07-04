import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { InputLabel, MenuItem, Select, FormControl } from '@material-ui/core';

import languageService from '../../../../service/language/languageService'
import {changeLanguage} from '../../config/_duck/actions'
import { connect } from 'react-redux'
import classNames from 'classnames'

const ALL_LANGUAGES = languageService.availableLanguages()

const styles = {
    flag: { marginLeft: "5px", marginRight: "5px" }
}

class LanguagePicker extends PureComponent {
  render() {
    const { lang, changeLanguage, showLabel=true, ...restProps } = this.props;
    const { t } = this.context;
    return (
    <FormControl {...restProps}>
        {showLabel ? <InputLabel htmlFor="language">{t("languages.Language")}</InputLabel> : null} 
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

LanguagePicker.propTypes = {
    showLabel: PropTypes.bool
}

export default connect(state=>({
    lang: state.i18nState.lang   
}), dispatch=>({
    changeLanguage: lang=> dispatch(changeLanguage(lang))
}))(LanguagePicker)
