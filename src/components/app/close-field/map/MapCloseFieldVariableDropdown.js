import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {find} from 'lodash'
import { connect } from 'react-redux'
import Select from '../../../common/select/Select'
import {setVariable} from './_store/actions/closeFieldMapActions'

const MapCloseFieldVariableDropdown = ({items, initialValue, 
                variables, onChange}) => (<Select
    id="map-close-field-variable"
    name="closeFieldMapVariable"
    label="Variables"   /*TODO: i18n*/
    attrId="name"    
    attrLabel="name"
    suggestions={items}
    onChange={(name)=>onChange(find(variables, v=>v.name === name))}
    initialValue={initialValue}
/>)

const mapStateToProps = (state) => ({
    items: state.app.closeField.map.variables,
    initialValue: state.app.closeField.map.selected.variable,
    variables: state.app.closeField.map.variables,
})

const mapDispatchToProps = (dispatch, getState) => ({
    onChange: (value)=> dispatch(setVariable(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(MapCloseFieldVariableDropdown)
