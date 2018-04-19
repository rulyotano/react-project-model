import React from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';
import { withStyles } from 'material-ui-next/styles';

const styles = {
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
};

class ColorPicker extends React.PureComponent {

    state = {
        show: this.props.show,
        onChange: this.props.onChange,
        onClose: this.props.onClose,
        color: this.props.color
    };

    handleClose = () => {
        this.setState({ show: false });

        if(this.state.onClose)
            this.state.onClose();
    };

    handleChange = (color) => {
        this.setState({ color: color.hex });

        if(this.state.onChange !== null )
            this.state.onChange(color.hex);
    };

    componentWillReceiveProps(newProps){
        this.setState(newProps)
    }

    render() {

        const { show, onClose, color } = this.props;

        return (
            <div>
                <div onClick={this.handleClick} />

                {this.state.show ?
                    <div style={styles.popover}>
                        <div style={styles.cover} onClick={this.handleClose} />
                        <ChromePicker
                            color={this.state.color}
                            onChange={this.handleChange}
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
    color: PropTypes.string.isRequired,
};

export default withStyles(styles)(ColorPicker);