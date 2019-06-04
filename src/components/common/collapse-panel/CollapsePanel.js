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

class CollapsePanel extends React.PureComponent {
    static propTypes = {
      classes: PropTypes.object.isRequired,
      title:PropTypes.string.isRequired,
      expanded:PropTypes.bool,
      onChange: PropTypes.func,
    }

    state = {
      expanded: this.props.expanded !== undefined ? this.props.expanded : true
    }

    componentDidMount(){
      if (this.props.expanded !== undefined)
        this.updateState(this.props);
    }

    componentWillReceiveProps(nextProps){
      if (nextProps.expanded !== undefined)
        this.updateState(nextProps);
    }

    updateState(props){
      this.setState({expanded: props.expanded});
    }

    onChange(expanded){
      if (this.props.onChange !== undefined){
        this.props.onChange(expanded);
      }
      else 
        this.setState({expanded});
    }

    render(){
      const { classes, title, children } = this.props;
      const {expanded} = this.state;
      return (
      // <div className={classes.root}>
    
        <ExpansionPanel expanded={expanded} onChange={(e, exp)=>this.onChange(exp)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails children={children}>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      // </div>
      );
    }
}

export default withStyles(styles)(CollapsePanel);