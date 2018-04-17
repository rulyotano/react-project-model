import React, {Component} from 'react';
import Segment from "../../common/segment/Segment";
import CollapsePanel from "../../common/collapse-panel/CollapsePanel"
import FilterDropDownTest from "../../common/components-to-test/FilterDropDownTest";
import FilterDropDownAsMultiSelectTest from "../../common/components-to-test/FilterDropDownAsMultiSelectTest";

class Monitoring extends Component{
    onChange(item){
        console.log(item);
    }
    render(){
        return(
            <Segment title="Monitoring">
                <CollapsePanel/>
                <div style={{width: '25%'}}>
                    <FilterDropDownTest/>
                </div>
                <div style={{width: '25%'}}>
                    <FilterDropDownAsMultiSelectTest/>
                </div>
            </Segment>
        )
    }
}


export default Monitoring;