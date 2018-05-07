import React, {Component} from 'react';
import FilterDropDown from "../dropdown/filter-drop-down/FilterDropDown";


let nextId = 1;
const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Algeria' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
].map(suggestion => ({
    caiqueId: nextId++,
    label: suggestion.label,
}));


class FilterDropDownAsMultiSelectTest extends Component{
    onChange(item){
        console.log(item);
    }

    render(){
        return (
            <FilterDropDown attrLabel="label" attrId="caiqueId" id="test-mult-id" name="test-mult-name" multi={true} suggestions={suggestions} placeHolder="Selecione Múltiplos..." onChange={this.onChange}/>
        )
    }
}


export default FilterDropDownAsMultiSelectTest;