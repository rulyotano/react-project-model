import React, { PureComponent } from 'react';
import {withStyles, Grid} from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = (theme)=>({    
  container: {
    height:"100%"
  },
  component: {
    border: `solid 1px ${theme.palette.primary.light}`
  }
});

class MapsLayoutComponent extends PureComponent {
    static propTypes = {
      maps: PropTypes.arrayOf(PropTypes.element)
    }

    render() {
      const {classes, maps = []} = this.props;
      const numberOfMaps = maps.length;
      return (
        <Grid container className={classes.container}>
          {
            maps.map((it, i)=>
              <Grid key={i} 
                item md={numberOfMaps === 1 ? 12 :
                  numberOfMaps === 3 ? 4 : 6}
                className={classes.component}>
                {it}
              </Grid>)
          }
        </Grid>
      );
    }
}

export default withStyles(styles)(MapsLayoutComponent);