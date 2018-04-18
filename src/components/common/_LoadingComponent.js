import React from 'react'
import { CircularProgress } from 'material-ui-next/Progress';
import { withStyles } from 'material-ui-next/styles';
import { Typography } from 'material-ui-next';
import PropTypes from 'prop-types';


const styles = theme => ({
  progressContainer: {
    display: "flex",
    alignItems: "center"
  },
  progress: {
    marginLeft: "auto",
    marginRight: "auto"
  }      
});

const LoadingComponent = ({isLoading, error, classes, pastDelay, timedOut, ...restProps}) => {  
  // Handle the loading state
  if (isLoading) {
    return <div className={classes.progressContainer} {...restProps}>
      <CircularProgress className={classes.progress}/>
    </div>;
  }
  // Handle the error state
  else if (error) {
    return <div {...restProps}><Typography>Sorry, there was a problem loading the page.</Typography></div>;
  }
  else {
    return null;
  }
};

LoadingComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.bool
};

export default withStyles(styles)(LoadingComponent)