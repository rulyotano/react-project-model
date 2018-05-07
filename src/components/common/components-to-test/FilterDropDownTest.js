import React, {Component} from 'react';
import FilterDropDown from '../dropdown/filter-drop-down/FilterDropDown';

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


class FilterDropDownTest extends Component{


    onChange(item){
        console.log(item);
    }

    render(){
        return (<FilterDropDown id="id-fd" name="teste-filter-drop-down" suggestions={suggestions} placeHolder="Selecione..." onChange={this.onChange}/>)
    }
}



export default FilterDropDownTest;