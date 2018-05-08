import React from 'react';
import FilterDropDown from "./FilterDropDown";


export const FilterDropDownReduxForm = (props) =>{
    const{ input, suggestions, id, placeHolder, attrId, attrLabel, multi} = props;
    return    <FilterDropDown {...input}
                              suggestions={suggestions}
                              attrId={attrId}
                              attrLabel={attrLabel}
                              id={id}
                              name={input.name}
                              placeHolder={placeHolder}
                              onChange={input.onChange}
                              multi={!!multi}/>
};

