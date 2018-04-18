import React, { Component } from 'react';
import Segment from "../segment/Segment";
import LoadingButton from '../loadingButton/LoadingButton';

class Monitoring extends Component {

    constructor(props) {
        super(props);
        this.state = { isLoading: false }
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