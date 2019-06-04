import React from 'react';
import {find} from 'lodash';
import { connect } from 'react-redux';
import Select from '../../../common/select/Select';
import {setVariable} from './_duck/actions';
import {getSelectedVariable, getVariables} from './_duck/selectors';

const MapCloseFieldVariableDropdown = ({value, 
  variables, onChange}) => (<Select
  id="map-close-field-variable"
  name="closeFieldMapVariable"
  label="Variables"   /* TODO: i18n */
  attrId="name"    
  attrLabel="name"
  suggestions={variables}
  onChange={(name)=>onChange(find(variables, v=>v.name === name))}
  value={value ? value.name : undefined}
/>);

const mapStateToProps = (state) => ({
  value: getSelectedVariable(state),
  variables: getVariables(state)
});

const mapDispatchToProps = (dispatch, getState) => ({
  onChange: (value)=> dispatch(setVariable(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapCloseFieldVariableDropdown);
