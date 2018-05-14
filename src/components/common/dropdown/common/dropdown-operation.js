import React, { PureComponent } from 'react'
import propTypes from 'prop-types'
import FilterDropDownData from '../filter-drop-down/FilterDropDownData'
import componentToReduxForm from '../filter-drop-down/componentToReduxForm'
import translations from '../../../../i18n'

class DropDownOperationComponent extends PureComponent{
    static contextTypes={
        t: propTypes.func
    }
    static propTypes={
        id: propTypes.string.isRequired,
        name: propTypes.string.isRequired,
    }
    render(){
        const {t} = this.context;
        const {id, name, ...rest} = this.props;
        let tt = translations;
        return (<FilterDropDownData {...rest}
                                label={t("Operation")}
                                attrId="cdOperacao"
                                attrLabel="descOperacao"
                                placeHolder={t("Filter operations")}
                                targetKey="operation"
                                id={id}
                                name={name}/>)
    }
}

export const DropDownOperation = componentToReduxForm(DropDownOperationComponent);
export default DropDownOperationComponent;