import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {find} from 'lodash'
import { connect } from 'react-redux'
import Select from '../../../common/select/Select'
import {setVariable} from './_store/actions/closeFieldMapActions'

const MapCloseFieldVariableDropdown = ({value, 
                variables, onChange}) => (<Select
    id="map-close-field-variable"
    name="closeFieldMapVariable"
    label="Variables"   /*TODO: i18n*/
    attrId="name"    
    attrLabel="name"
    suggestions={variables}
    onChange={(name)=>onChange(find(variables, v=>v.name === name))}
    value={value ? value.name : undefined}
/>)

const mapStateToProps = (state) => ({
    value: state.app.closeField.map.selected.variable,
    variables: state.app.closeField.map.variables,
})

const mapDispatchToProps = (dispatch, getState) => ({
    onChange: (value)=> dispatch(setVariable(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(MapCloseFieldVariableDropdown)
