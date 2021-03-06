import React, { Component } from 'react';
import LoadingButton from "../loading-button/LoadingButton";

class LoadingButtonTest extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

    onClickLoadingButton = () => {

      this.setState({ isLoading: true });

      const teste = () => {
        console.log("Executado");
        this.setState({ isLoading: false });
      };

      setTimeout(teste, 2000);
    }

    render() {
      return (
        <LoadingButton
          variant="contained"
          color="primary"
          onClick={this.onClickLoadingButton}
          isLoading={this.state.isLoading}>
                Login
        </LoadingButton>
      );
    }
}


export default LoadingButtonTest;