import React from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';
import { withStyles } from '@material-ui/core';

const styles = () => ({
    popover: {
        position: 'absolute',
        zIndex: '2',
    },
    cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    },
});

class ColorPicker extends React.PureComponent {

    render() {

        const { classes, show, onChange, onClose, color } = this.props;

        return (
            <div>
                {show ?
                    <div className={classes.popover}>
                        <div className={classes.cover} onClick={onClose} />
                        <ChromePicker
                            color={color}
                            onChange={color => onChange(color.hex)}
                            disableAlpha={true} />
                    </div>
                    : null
                }
            </div>
        )
    }
}

ColorPicker.propTypes = {
    classes: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
};

export default withStyles(styles)(ColorPicker);