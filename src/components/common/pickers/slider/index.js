import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, FormControl, Typography, FormHelperText , MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';

import defaultTheme from '../../../defaultTheme';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  slider: {
    color: theme.palette.primary.main
  }
});

const theme = createMuiTheme(defaultTheme);

export class SliderPicker extends PureComponent {
  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
  }

  render() {
    const {classes, value, onChange, label, helperText, ...rest} = this.props;
    return (
      <FormControl className={classes.formControl}>
        {label ? <Typography>{label}</Typography> : null}
        <MuiThemeProvider theme={theme}>            
          <Slider {...rest} value={value} aria-labelledby="label" onChange={(e, value)=>onChange(value)}/>
        </MuiThemeProvider>
        {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
      </FormControl>
    );
  }
}

export default withStyles(styles)(SliderPicker);
