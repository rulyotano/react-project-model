import React, {Component} from 'react';
import Segment from "../../common/segment/Segment";
import CollapsePanel from "../../common/collapse-panel/CollapsePanel"
import FilterDropDownTest from "../../common/components-to-test/FilterDropDownTest";
import FilterDropDownAsMultiSelectTest from "../../common/components-to-test/FilterDropDownAsMultiSelectTest";
import LoadingComponent from "../../common/_LoadingComponent";
import ToolHoverWindowTest from "../../common/components-to-test/ToolHoverWindowTest";

class Monitoring extends Component{
    onChange(item){
        console.log(item);
    }
    render(){
        return(
            <div>
                <Segment title="Monitoring">
                    <div style={{width: '25%'}}>
                        <CollapsePanel/>
                    </div>
                    <div style={{width: '25%'}}>
                        <FilterDropDownTest/>
                    </div>
                    <div style={{width: '25%'}}>
                        <FilterDropDownAsMultiSelectTest/>
                    </div>
                    <div style={{width: '25%'}}>
                        <LoadingComponent isLoading={true}/>
                    </div>



                </Segment>
                <ToolHoverWindowTest />
            </div>

        )
    }
}


export default Monitoring;