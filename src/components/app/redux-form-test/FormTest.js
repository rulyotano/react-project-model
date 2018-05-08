import React ,{Component} from 'react';
import Segment from "../../common/segment/Segment";
import { Field, reduxForm } from 'redux-form';
import {
    FilterDropDownReduxForm
} from "../../common/dropdown/filter-drop-down/FilterDropDownReduxForm";

let nextId = 1;
const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Algeria' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
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
                       component={FilterDropDownReduxForm}
                       suggestions={suggestions}
                       placeHolder="Selecione..."
                       />
                   <Field
                       attrId="id"
                       attrLabel="desc"
                       id="redux-form-multi-filter-dropdown-id"
                       name="redux-form-multi-filter-dropdown-name"
                       component={FilterDropDownReduxForm}
                       suggestions={suggestions}
                       multi={true}
                       placeHolder="Selecione..."
                   />
               </form>
           </Segment>
        )
    }
}
FormTest = reduxForm({
    form: 'form-test-filter-dropdown'  // a unique identifier for this form
})(FormTest)

export default FormTest