import React, { Component } from 'react';
import LoadingButton from '../../common/loadingButton/LoadingButton';
import Segment from "../../common/segment/Segment";
import CollapsePanel from "../../common/collapse-panel/CollapsePanel";
import FilterDropDownTest from "../../common/components-to-test/FilterDropDownTest";
import FilterDropDownAsMultiSelectTest from "../../common/components-to-test/FilterDropDownAsMultiSelectTest";
import LoadingComponent from "../../common/_LoadingComponent";
import ToolHoverWindowTest from "../../common/components-to-test/ToolHoverWindowTest";
import ColorPicker from '../../common/colorPicker/ColorPicker';

class Monitoring extends Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: false , color: {r: '241', g: '112', b: '19', a: '1'} }
    }

    onChange(item){
        console.log(item);
    }
    onClickLoadingButton = () => {

        this.setState({isLoading : true});

        let teste = () => {
            console.log("Executado");
            this.setState({isLoading : false});
        }

        setTimeout(teste, 2000);
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

                    <LoadingButton
                      variant="raised"
                      color="primary"
                      onClick={this.onClickLoadingButton}
                      isLoading={this.state.isLoading}>
                      Login
                    </LoadingButton>

                    {/* <ColorPicker color={this.state.color}/> */}

                </Segment>
                <ToolHoverWindowTest />
            </div>
        )
    }
}

export default Monitoring;