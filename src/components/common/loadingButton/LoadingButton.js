import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui-next/Progress';
import Button from 'material-ui-next/Button';
import { withStyles } from 'material-ui-next/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    buttonProgress: {
        color: theme.palette.primary.light,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

class LoadingButton extends Component {

    render() {
        const { classes, isLoading, children, ...restProps} = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <Button {...restProps}
                        disabled={isLoading}>
                        {children}
                    </Button>
                    {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
            </div>
        )
    }
}

LoadingButton.propTypes = {
    classes: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(LoadingButton);