import React, { Component } from 'react';
import LoadingButton from '../../common/loadingButton/LoadingButton';
import Segment from "../../common/segment/Segment";
import CollapsePanel from "../../common/collapse-panel/CollapsePanel";
import FilterDropDownTest from "../../common/components-to-test/FilterDropDownTest";
import FilterDropDownAsMultiSelectTest from "../../common/components-to-test/FilterDropDownAsMultiSelectTest";
import LoadingComponent from "../../common/_LoadingComponent";
import ToolHoverWindowTest from "../../common/components-to-test/ToolHoverWindowTest";
import ColorPicker from '../../common/colorPicker/ColorPicker';
import DateTimePickerTest from "../../common/components-to-test/DateTimePickerTest";
import TextField from 'material-ui-next/TextField';

class Monitoring extends Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: false , color: '#ff0000', showPickColor: false }
    }

    onClickLoadingButton = () => {

        this.setState({isLoading : true});

        let teste = () => {
            console.log("Executado");
            this.setState({isLoading : false});
        }

        setTimeout(teste, 2000);
    }  

    onChangeColorPicker = color => {
        this.setState({color});
    }

    onCloseColorPicker = () => {
        this.setState({showPickColor : false});
    }

    onClickColorPicker = () => {
        this.setState({showPickColor : true});
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

                    <div style={{width: '25%'}}>
                        <LoadingButton
                            variant="raised"
                            color="primary"
                            onClick={this.onClickLoadingButton}
                            isLoading={this.state.isLoading}>
                            Login
                        </LoadingButton>
                    </div>

                    <div style={{width: '25%'}}>
                        <DateTimePickerTest/>
                    </div>

                    <div style={{width: '25%'}}>
                        <TextField type="text" value={this.state.color} readOnly={true} onClick={this.onClickColorPicker}/>  
                        <ColorPicker 
                            show={this.state.showPickColor} 
                            color='#ff00ff'
                            onChange={this.onChangeColorPicker} 
                            onClose={this.onCloseColorPicker}/>
                    </div>

                </Segment>
                <ToolHoverWindowTest />
            </div>
        )
    }
}

export default Monitoring;