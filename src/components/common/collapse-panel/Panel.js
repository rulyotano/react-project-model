import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles, ExpansionPanel, ExpansionPanelSummary, 
         ExpansionPanelDetails, Typography } from '@material-ui/core';

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

export class Panel extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.oneOfType([ PropTypes.string, PropTypes.element ]).isRequired,    
  }

  render() {
    const { classes, title, children } = this.props;
    return (
        <ExpansionPanel expanded={true}>
            <ExpansionPanelSummary>
                <Typography className={classes.heading}>{title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails children={children}>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
  }
}

export default withStyles(styles)(Panel);