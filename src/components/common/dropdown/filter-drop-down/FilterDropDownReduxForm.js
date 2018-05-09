import React from 'react';
import FilterDropDown from "./FilterDropDown";
import FilterDropDownDataOperation from "./_data/operation/FilterDropDownDataOperation";
import FilterDropDownDataFleet from "./_data/fleet/FilterDropDownDataFleet";
import FilterDropDownDataState from "./_data/state/FilterDropDownDataState";


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

export const FilterDropDownDataOperationReduxForm = (props) =>{
    const{ input, id, multi} = props;
    return    <FilterDropDownDataOperation {...input}
                                           id={id}
                                           name={input.name}
                                           onChange={input.onChange}
                                           multi={!!multi}/>
};

export const FilterDropDownDataFleetReduxForm = (props) =>{
    const{ input, id, multi} = props;
    return    <FilterDropDownDataFleet {...input}
                                       id={id}
                                       name={input.name}
                                       onChange={input.onChange}
                                       multi={!!multi}/>
};

export const FilterDropDownDataStateReduxForm = (props) =>{
    const{ input, id, multi} = props;
    return    <FilterDropDownDataState {...input}
                                       id={id}
                                       name={input.name}
                                       onChange={input.onChange}
                                       multi={!!multi}/>
};
