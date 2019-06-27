import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles, Button, CircularProgress } from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto"
  },
  buttonProgress: {
    color: theme.palette.primary.light,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class LoadingButton extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    variant: PropTypes.string
  };

  static defaultProps = {
    isLoading: false,
    variant: null
  };

  render() {
    const {
      classes,
      isLoading = false,
      disabled,
      children,
      variant,
      ...restProps
    } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Button
            variant={variant}
            {...restProps}
            disabled={isLoading || disabled}
          >
            {children}
          </Button>
          {isLoading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LoadingButton);
