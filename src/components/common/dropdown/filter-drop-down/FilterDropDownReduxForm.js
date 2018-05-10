import React from 'react';
import FilterDropDown from "./FilterDropDown";
import FilterDropDownData from "./FilterDropDownData";


export const FilterDropDownReduxForm = (props) =>{
    const{ input, suggestions, id, placeHolder, attrId, attrLabel, multi, label} = props;
    return    <FilterDropDown {...input}
                              label={label}
                              suggestions={suggestions}
                              attrId={attrId}
                              attrLabel={attrLabel}
                              id={id}
                              name={input.name}
                              placeHolder={placeHolder}
                              onChange={input.onChange}
                              multi={!!multi}/>
};

export const FilterDropDownDataReduxForm = (props) =>{
    const{ input, id, multi, targetKey, attrId, attrLabel, label, placeHolder} = props;
    return <FilterDropDownData
                               {...input}
                               label={label}
                               attrId={attrId}
                               attrLabel={attrLabel}
                               onChange={input.onChange}
                               placeHolder={placeHolder}
                               name={input.name}
                               id={id}
                               multi={!!multi}
                               targetKey={targetKey}/>
};

