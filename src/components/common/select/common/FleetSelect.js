import React from 'react'
import SelectData from '../SelectData'
import componentToReduxForm from "../../../../service/redux-form/componentToReduxForm";

const FleetSelectComponent = (props)=>
    <SelectData {...props}
                attrId="cdEquipamento"
                attrLabel="descEquipamento"
                targetKey="fleet"
                hasSearchInput={true}/>
export const FleetSelect = componentToReduxForm(FleetSelectComponent);
export default FleetSelectComponent;