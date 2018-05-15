import React ,{Component} from 'react';
import Segment from "../../common/segment/Segment";
import { Field, reduxForm } from 'redux-form';
import {FilterDropDownData} from '../../common/dropdown/filter-drop-down/FilterDropDownData'
import {FilterDropDown} from '../../common/dropdown/filter-drop-down/FilterDropDown'
import {DropDownOperation} from '../../common/dropdown/common/dropdown-operation'
import Select, {SelectRF} from "../../common/select/Select";
import {SelectDataRF} from "../../common/select/SelectData";

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
                       id="select-simple-rf-id"
                       name="select-simple-rf--name"
                       component={SelectRF}
                       suggestions={suggestions}
                       label="Options"
                       error={true}
                       helperText="Operation Error"/>
                   <br/>
                   <br/>
                   <Field
                       component={SelectDataRF}
                       attrId="cdEquipamento"
                       attrLabel="descEquipamento"
                       id="select-data-fleet-id"
                       name="select-data-fleet-name"
                       targetKey="fleet"
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