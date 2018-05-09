import React, {Component} from 'react';
import FilterDropDownData from "../FilterDropDownData";


class FilterDropDownDataOperation extends Component{
    render(){
        const {name, id, onChange} = this.props;
        return(
            <FilterDropDownData attrId="cdOperacao"
                                attrLabel="descOperacao"
                                onChange={(event)=>{onChange(event)}}
                                placeHolder="Filter operations"
                                name={name}
                                id={id}
                                targetKey="operation"/>
        )
    }
}


export default FilterDropDownDataOperation;