import React, { Component } from 'react';
import LoadingButton from '../loadingButton/LoadingButton';
import Segment from "../../common/segment/Segment";
import CollapsePanel from "../../common/collapse-panel/CollapsePanel"
import FilterDropDownTest from "../../common/components-to-test/FilterDropDownTest";
import FilterDropDownAsMultiSelectTest from "../../common/components-to-test/FilterDropDownAsMultiSelectTest";
import LoadingComponent from "../../common/_LoadingComponent";

class Monitoring extends Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: false }
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

    render() {
        return (
            <Segment title="Monitoring">
                <CollapsePanel/>
                <div style={{width: '25%'}}>
                    <FilterDropDownTest/>
                </div>
                <div style={{width: '25%'}}>
                    <FilterDropDownAsMultiSelectTest/>
                </div>
                <LoadingComponent isLoading={true}/>

                <LoadingButton
                    variant="raised"
                    color="primary"
                    onClick={this.onClickLoadingButton}
                    isLoading={this.state.isLoading}>
                    Login
                </LoadingButton>
            </ Segment>
        )
    }
}

export default Monitoring;