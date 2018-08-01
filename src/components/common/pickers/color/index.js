import React from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';
import { withStyles } from '@material-ui/core';
import TetherComponent from 'react-tether';

const styles = () => ({
    popover: {
        position: 'absolute',
        zIndex: '2',
    },
    cover: {
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: "100%",
        height: "100%",
    },
    '@global':{
        ".tether-element.tether-enabled":{
            zIndex: "1301"
        }
    }
});

class ColorPicker extends React.PureComponent {

    render() {

        const { classes, show, onChange, onClose, color, children } = this.props;

        return (
            <React.Fragment>
                {show ?
                    <React.Fragment>
                        <div className={classes.cover} onClick={onClose} />
                        <TetherComponent attachment="top left"
                                            targetAttachment="bottom left"
                                            constraints={[
                                                {
                                                    to: 'scrollParent',
                                                },
                                                {
                                                    to: 'window',
                                                    pin: ['bottom']
                                                }
                                            ]}>
                            {children}
                                <ChromePicker
                                    color={color}
                                    onChange={color => onChange(color.hex)}
                                    disableAlpha={true} />      
                        </TetherComponent>             
                    </React.Fragment>
                    : children
                }
            </React.Fragment>
        )
    }
}

ColorPicker.propTypes = {
    show: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
};

export default withStyles(styles)(ColorPicker);