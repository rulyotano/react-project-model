import React, {Component} from 'react';
import ToolHoverWindow from "../tool-hover-window/ToolHoverWindow";
import LoadingButton from "../loading-button/LoadingButton";
import CollapsePanel from "../collapse-panel/CollapsePanel";
import LoadingComponent from "../_LoadingComponent";
import DateTimeRangeSelectorTest from "./DateTimeRangeSelectorTest";

class ToolHoverWindowTest extends Component{
  constructor(props){
    super(props);
    this.state = {isLoading:false};
  }

    onClickLoadingButton = () => {

      this.setState({isLoading : true});

      const teste = () => {
        console.log("Executado");
        this.setState({isLoading : false});
      };

      setTimeout(teste, 2000);
    }

    render(){
      const footer = (<div>
        <LoadingButton
          variant="contained"
          color="primary"
          onClick={this.onClickLoadingButton}
          isLoading={this.state.isLoading}>
                    Login
        </LoadingButton>
      </div>);
      return (
        <ToolHoverWindow isOpen={false} labelHeader="Mapa do Tempo" footer={footer}>
          <DateTimeRangeSelectorTest useAs="v"/>

          <CollapsePanel title="Weather Map"/>
          <LoadingComponent isLoading/>
          <LoadingButton
            color="primary"
            onClick={this.onClickLoadingButton}
            isLoading={this.state.isLoading}>
                    Login
          </LoadingButton>
          <LoadingButton
            color="primary"
            onClick={this.onClickLoadingButton}
            isLoading={this.state.isLoading}>
                    Login
          </LoadingButton>
          <LoadingButton
            color="primary"
            onClick={this.onClickLoadingButton}
            isLoading={this.state.isLoading}>
                    Login
          </LoadingButton>
          <LoadingButton
            color="primary"
            onClick={this.onClickLoadingButton}
            isLoading={this.state.isLoading}>
                    Login
          </LoadingButton>
          <LoadingButton
            color="primary"
            onClick={this.onClickLoadingButton}
            isLoading={this.state.isLoading}>
                    Login
          </LoadingButton>
          <LoadingButton
            color="primary"
            onClick={this.onClickLoadingButton}
            isLoading={this.state.isLoading}>
                    Login
          </LoadingButton>

        </ToolHoverWindow>
      );
    }

}

export default ToolHoverWindowTest;