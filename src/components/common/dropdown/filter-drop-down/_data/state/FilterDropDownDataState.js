import React, {Component} from 'react';
import FilterDropDownData from "../FilterDropDownData";


class FilterDropDownDataState extends Component{
    render(){
        const {name, id, onChange} = this.props;
        return(
            <FilterDropDownData attrId="cdEstado"
                                attrLabel="descEstado"
                                onChange={(event)=>{onChange(event)}}
                                placeHolder="Filter states"
                                name={name}
                                id={id}
                                targetKey="state"/>
        )
    }
}


export default FilterDropDownDataState;