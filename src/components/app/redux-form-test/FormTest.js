import React ,{Component} from 'react';
import Segment from "../../common/segment/Segment";
import { Field, reduxForm } from 'redux-form';
import {FilterDropDownData} from '../../common/dropdown/filter-drop-down/FilterDropDownData'
import {FilterDropDown} from '../../common/dropdown/filter-drop-down/FilterDropDown'
import {DropDownOperation} from '../../common/dropdown/common/dropdown-operation'
import Select, {SelectRF} from "../../common/select/Select";

let nextId = 1;
const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Algeria' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
    { label: 'Brunei Darussalam' },
    { label: 'Brunei Darussalam' },
    { label: 'Brunei Darussalam' },
    { label: 'Brunei Darussalam' },
    { label: 'Brunei Darussalam' },
    { label: 'Brunei Darussalam' },
    { label: 'Brunei Darussalam' },
    { label: 'Brunei Darussalam' },
    { label: 'Brunei Darussalam' },
].map(suggestion => ({
    id: nextId++,
    desc: suggestion.label,
}));




class FormTest extends Component{

    render(){
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return(

           <Segment title="Redux Form Test">
               <form onSubmit={handleSubmit}>
                   <Field
                       attrId="id"
                       attrLabel="desc"
                       id="redux-form-filter-dropdown-id"
                       name="redux-form-filter-dropdown-name"
                       component={FilterDropDown}
                       suggestions={suggestions}
                       placeHolder="Selecione..."/>
                   <Field
                       attrId="id"
                       attrLabel="desc"
                       id="redux-form-multi-filter-dropdown-id"
                       name="redux-form-multi-filter-dropdown-name"
                       component={FilterDropDown}
                       suggestions={suggestions}
                       multi={true}
                       placeHolder="Selecione..."/>
                   <Field
                       component={FilterDropDownData}
                       label="States"
                       attrId="cdEstado"
                       attrLabel="descEstado"
                       placeHolder="Filter states"
                       targetKey="state"
                       id="dropdown-state-id"
                       name="dropdown-state-name"/>
                   <Field
                       component={FilterDropDownData}
                       label="Fleets"
                       attrId="cdEquipamento"
                       attrLabel="descEquipamento"
                       placeHolder="Filter fleets"
                       targetKey="fleet"
                       id="dropdown-fleet-id"
                       name="dropdown-fleet-name"/>
                       Modification
                   <Field
                       component={DropDownOperation}
                       id="dropdown-operation-id"
                       name="dropdown-operation-name"/>
                   <Field
                       component={SelectRF}
                       suggestions={suggestions}
                       attrId="id"
                       id="select-country-id"
                       name="select-country-name"
                       label="Options"/>

               </form>
           </Segment>
        )
    }
}
FormTest = reduxForm({
    form: 'form-test-filter-dropdown'  // a unique identifier for this form
})(FormTest);

export default FormTest