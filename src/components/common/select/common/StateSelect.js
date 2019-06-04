import React from 'react';
import SelectData from '../SelectData';
import componentToReduxForm from "../../../../service/redux-form/componentToReduxForm";

const StateSelectComponent = (props)=>
  <SelectData {...props}
    attrId="cdEstado"
    attrLabel="descEstado"
    targetKey="state"
    hasSearchInput/>;
export const StateSelect = componentToReduxForm(StateSelectComponent);
export default StateSelectComponent;