import React, {Component} from 'react';
import ToolHoverWindow from "../tool-hover-window/ToolHoverWindow";
import LoadingButton from "../loading-button/LoadingButton";
import CollapsePanel from "../collapse-panel/CollapsePanel";
import LoadingComponent from "../../common/_LoadingComponent";
import DateTimeRangeSelectorTest from "./DateTimeRangeSelectorTest";

class ToolHoverWindowTest extends Component{
    constructor(props){
        super(props);
        this.state = {isLoading:false}
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
            <ToolHoverWindow isOpen={false} labelHeader="Mapa do Tempo">
                <DateTimeRangeSelectorTest useAs="v"/>

                <CollapsePanel title="Weather Map"/>
                <LoadingComponent isLoading={true}/>
                <LoadingButton
                    variant="raised"
                    color="primary"
                    onClick={this.onClickLoadingButton}
                    isLoading={this.state.isLoading}>
                    Login
                </LoadingButton>
                <LoadingButton
                    variant="raised"
                    color="primary"
                    onClick={this.onClickLoadingButton}
                    isLoading={this.state.isLoading}>
                    Login
                </LoadingButton>
                <LoadingButton
                    variant="raised"
                    color="primary"
                    onClick={this.onClickLoadingButton}
                    isLoading={this.state.isLoading}>
                    Login
                </LoadingButton>
                <LoadingButton
                    variant="raised"
                    color="primary"
                    onClick={this.onClickLoadingButton}
                    isLoading={this.state.isLoading}>
                    Login
                </LoadingButton>
                <LoadingButton
                    variant="raised"
                    color="primary"
                    onClick={this.onClickLoadingButton}
                    isLoading={this.state.isLoading}>
                    Login
                </LoadingButton>
                <LoadingButton
                    variant="raised"
                    color="primary"
                    onClick={this.onClickLoadingButton}
                    isLoading={this.state.isLoading}>
                    Login
                </LoadingButton>

            </ToolHoverWindow>
        )
    }

}

export default ToolHoverWindowTest;