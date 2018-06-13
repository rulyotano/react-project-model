import React, { Component } from 'react';
import Segment from "../../common/segment/Segment";
import CollapsePanel from "../../common/collapse-panel/CollapsePanel";
import LoadingComponent from "../../common/_LoadingComponent";
import ToolHoverWindowTest from "../../common/components-to-test/ToolHoverWindowTest";
import ColorPickerTest from '../../common/components-to-test/ColorPickerTest';
import DateTimePickerTest from "../../common/components-to-test/DateTimePickerTest";
import DateTimeRangeSelectorTest from "../../common/components-to-test/DateTimeRangeSelectorTest";
import LoadingButtonTest from '../../common/components-to-test/LoadingButtonTest';
import WorkAreaSelectorTest from "../../common/components-to-test/WorkAreaSelectorTest";
import {Typography} from '@material-ui/core';

class Monitoring extends Component {

    render(){
        return(
            <div>
                <Segment title="Monitoring">
                    <div style={{width: '25%'}}>
                        <CollapsePanel title="Weather Map"/>
                    </div>
                    <div style={{width: '40%'}}>
                        <DateTimeRangeSelectorTest useAs="v"/>
                    </div>
                    <div style={{width: '25%'}}>
                        <CollapsePanel title="Operation Analysis"/>
                    </div>
                    <div style={{width: '25%'}}>
                        <CollapsePanel title="Test of Component"/>
                    </div>
                    <div style={{width: '25%'}}>
                        <CollapsePanel title="Step A">
                            <Typography>aspodkpaosd aspok dpoaskdpoask podkapo skpas kd pokaspodk aspo dpoaskpodaspo kpdaspo pask</Typography>

                        </CollapsePanel>
                        <CollapsePanel title="Step B"/>
                        <CollapsePanel title="Step C"/>
                        <CollapsePanel title="Step D"/>
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