import React from 'react';
import DateTime from 'react-datetime'
import CalendarContainer from 'react-datetime/src/CalendarContainer'
import TetherComponent from 'react-tether'
import classNames from 'classnames'
import {isString} from 'lodash'
import {withStyles} from '@material-ui/core'

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
}

class TetheredDateTime extends DateTime {
    render() {
        let className = isString(this.props.className) ?
                            classNames('rdt', this.props.className):
                            classNames('rdt', ...this.props.className),
            children = [];

        if (this.props.input) {
            const props = {
                key: 'i',
                type: 'text',
                className: 'form-control',
                onFocus: this.openCalendar,
                onChange: this.onInputChange,
                onKeyDown: this.onInputKey,
                value: this.state.inputValue,
                ...this.props.inputProps
            };

            children = [
                <input {...props} />
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

export default withStyles(styles)(TetheredDateTime)