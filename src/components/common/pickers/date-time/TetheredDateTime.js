import React from 'react';
import DateTime from 'react-datetime';
import CalendarContainer from 'react-datetime/src/CalendarContainer';
import TetherComponent from 'react-tether';
import classNames from 'classnames';
import {isString, isObject} from 'lodash';
import {withStyles, TextField} from '@material-ui/core';


const styles = {
  '@global':{
    ".rdtPicker": {
      display: "block",
      position: "static",
    },
    ".tether-element.tether-enabled":{
      zIndex: "1301"
    }
  }
};

class TetheredDateTime extends DateTime {

  render() {
    let className = isString(this.props.className) ?
      classNames('rdt', this.props.className):
      classNames('rdt', ...this.props.className);
    let children = [];

    if (this.props.input) {
      const inputProps = {
        onFocus: this.openCalendar,
        onKeyDown: this.onInputKey,
        ...this.props.inputProps
      };

      const iValue = this.state.inputValue;
      const textFieldProps = {
        onChange: this.onInputChange,
        label: this.props.label,
        fullWidth: true,
        helperText: this.props.helperText,
        error: this.props.error,
        value: !iValue ? "" : isObject(iValue) ? iValue.toString() : iValue,
      };

      children = [
        <TextField key='i' {...textFieldProps} InputProps={
          {
            inputProps: {...inputProps}
          }}/>
      ];
    } else {
      className += ' rdtStatic';
    }

    return (
      <div className={className}>
        <TetherComponent
          attachment="top left"
          targetAttachment="bottom left"
          constraints={[
            {
              to: 'scrollParent',
            },
            {
              to: 'window',
              pin: ['bottom']
            }
          ]}
        >
          {children}
          { this.state.open &&
                        <div className='rdtPicker' >
                          <CalendarContainer
                            view={this.state.currentView}
                            viewProps={this.getComponentProps()}
                            onClickOutside={this.handleClickOutside}
                          />
                        </div>
          }
        </TetherComponent>
      </div>
    );
  }
}

export default withStyles(styles)(TetheredDateTime);