import React ,{Component} from 'react';
import Segment from "../../common/segment/Segment";
import { Field, reduxForm } from 'redux-form';
import FilterDropDown from "../../common/dropdown/filter-drop-down/FilterDropDown";

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

const renderFilterDropDown = (props) =>{
        const{ input, suggestions, id, placeHolder, attrId, attrLabel} = props;
        return    <FilterDropDown {...input}
                  suggestions={suggestions}
                  attrId={attrId}
                  attrLabel={attrLabel}
                  id={id}
                  name={input.name}
                  placeHolder={placeHolder}
                  onChange={input.onChange} />
};


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
                       component={renderFilterDropDown}
                       suggestions={suggestions}
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