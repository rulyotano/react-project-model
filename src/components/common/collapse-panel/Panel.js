import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles, ExpansionPanel, ExpansionPanelSummary, 
         ExpansionPanelDetails, Typography } from '@material-ui/core';

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    panel:{
        border:'1px solid #ddd'
    }
});

export class Panel extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.oneOfType([ PropTypes.string, PropTypes.element ]),    
  }

  render() {
    const { classes, title = null, children } = this.props;
    return (
        <ExpansionPanel className={classes.panel} expanded={true}>
            {title ? <ExpansionPanelSummary>
                <Typography className={classes.heading}>{title}</Typography>
            </ExpansionPanelSummary> : null}
            <ExpansionPanelDetails children={children}>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
  }
}

export default withStyles(styles)(Panel);