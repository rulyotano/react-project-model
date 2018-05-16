import React from 'react'
import SelectData from '../SelectData'
import componentToReduxForm from "../../../../service/redux-form/componentToReduxForm";

const OperationSelectComponent = (props)=> 
    <SelectData {...props}
            attrId="cdOperacao"
            attrLabel="descOperacao"
            targetKey="operation"/>
export const OperationSelect = componentToReduxForm(OperationSelectComponent);
export default OperationSelectComponent;