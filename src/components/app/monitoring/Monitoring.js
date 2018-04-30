import React, { Component } from 'react';
import Segment from "../../common/segment/Segment";
import CollapsePanel from "../../common/collapse-panel/CollapsePanel";
import FilterDropDownTest from "../../common/components-to-test/FilterDropDownTest";
import FilterDropDownAsMultiSelectTest from "../../common/components-to-test/FilterDropDownAsMultiSelectTest";
import LoadingComponent from "../../common/_LoadingComponent";
import ToolHoverWindowTest from "../../common/components-to-test/ToolHoverWindowTest";
import ColorPickerTest from '../../common/components-to-test/ColorPickerTest';
import DateTimePickerTest from "../../common/components-to-test/DateTimePickerTest";
import DateTimeRangeSelectorTest from "../../common/components-to-test/DateTimeRangeSelectorTest";
import LoadingButtonTest from '../../common/components-to-test/LoadingButtonTest';
import WorkAreaSelectorTest from "../../common/components-to-test/WorkAreaSelectorTest";

class Monitoring extends Component {

    render(){
        return(
            <div>
                <Segment title="Monitoring">
                    <div style={{width: '25%'}}>
                        <CollapsePanel/>
                    </div>
                    <div style={{width: '40%'}}>
                        <DateTimeRangeSelectorTest useAs="v"/>
                    </div>
                    <div style={{width: '25%'}}>
                        <CollapsePanel/>
                    </div>
                    <div style={{width: '25%'}}>
                        <CollapsePanel/>
                    </div>
                    <div style={{width: '25%'}}>
                        <CollapsePanel/>
                        <CollapsePanel/>
                        <CollapsePanel/>
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

                    <div style={{width: '25%'}}>
                        <LoadingButtonTest />
                    </div>

                    <div style={{width: '25%'}}>
                        <DateTimePickerTest/>
                    </div>

                    <div style={{width: '25%', position: 'absolute', top: "50px", left:"300px"}}>
                        <ColorPickerTest />
                    </div>

                    <div style={{width: '25%'}}>
                        <DateTimePickerTest/>
                    </div>
                    <div style={{width: '25%'}}>
                        <DateTimePickerTest/>
                    </div>
                    <div style={{width: '25%'}}>
                        <DateTimePickerTest/>
                    </div>
                    <div style={{width: '25%'}}>
                        <DateTimePickerTest/>
                    </div>
                    <div style={{width: '25%'}}>
                        <DateTimePickerTest/>
                    </div>
                    <div style={{width: '25%'}}>
                        <DateTimePickerTest/>
                    </div>
                    <div style={{width: '25%'}}>
                        <DateTimePickerTest/>
                    </div> 
                    <div style={{width: '25%'}}>
                        <DateTimePickerTest/>
                    </div>
                    <div style={{width: '25%'}}>
                        <DateTimePickerTest/>
                    </div>

                    <div style={{width: '25%'}}>
                        <WorkAreaSelectorTest />
                    </div>
                </Segment>
                <ToolHoverWindowTest />
            </div>
        )
    }
}

export default Monitoring;