import React, { Component } from 'react';
import {TextField} from '@material-ui/core';
import ColorPicker from "../color-picker/ColorPicker";

class ColorPickerTest extends Component {

  constructor(props) {
    super(props);
    this.state = { color: '#ff0000', showPickColor: false };
  }

    onChangeColorPicker = color => {
      this.setState({ color });
    }

    onCloseColorPicker = () => {
      this.setState({ showPickColor: false });
    }

    onClickColorPicker = () => {
      this.setState({ showPickColor: true });
    }

    render() {
      return (
        <div>
          <TextField type="text" value={this.state.color} style={{ color: this.state.color }} readOnly onClick={this.onClickColorPicker} />
          <div style={{ backgroundColor: this.state.color, height: "50px", width: "50px" }} />
          <ColorPicker
            show={this.state.showPickColor}
            color={this.state.color}
            onChange={this.onChangeColorPicker}
            onClose={this.onCloseColorPicker} />
        </div>
      );
    }
}

export default ColorPickerTest;