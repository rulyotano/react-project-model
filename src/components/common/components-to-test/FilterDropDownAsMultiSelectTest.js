import React, {Component} from 'react';
import FilterDropDown from "../filter-drop-down/FilterDropDown";


let nextId = 1;
const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Algeria' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
].map(suggestion => ({
    value: nextId++,
    label: suggestion.label,
}));


class FilterDropDownAsMultiSelectTest extends Component{
    constructor(props){
        super(props);
    }

    onChange(item){
        console.log(item);
    }

    render(){
        return (
            <FilterDropDown multi={true} suggestions={suggestions} placeHolder="Selecione Múltiplos..." onChange={this.onChange}/>
        )
    }
}


export default FilterDropDownAsMultiSelectTest;