import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
        Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    root: {
        alignLeft:true
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        alignLeft:true

    },
});

function CollapsePanel(props) {
    const { classes, title, children } = props;
    return (
        <div className={classes.root}>

            <ExpansionPanel >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>{title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails children={children}>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}

CollapsePanel.propTypes = {
    classes: PropTypes.object.isRequired,
    title:PropTypes.string.isRequired
};

export default withStyles(styles)(CollapsePanel);