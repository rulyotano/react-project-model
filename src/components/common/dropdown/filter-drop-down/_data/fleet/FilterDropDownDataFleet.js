import React, {Component} from 'react';
import FilterDropDownData from "../FilterDropDownData";


class FilterDropDownDataFleet extends Component{
    render(){
        const {name, id, onChange} = this.props;
        return(
            <FilterDropDownData attrId="cdEquipamento"
                                attrLabel="descEquipamento"
                                onChange={(event)=>{onChange(event)}}
                                placeHolder="Filter fleets"
                                name={name}
                                id={id}
                                targetKey="fleet"/>
        )
    }
}


export default FilterDropDownDataFleet;