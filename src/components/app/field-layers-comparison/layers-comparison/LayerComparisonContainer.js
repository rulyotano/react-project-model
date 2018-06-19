import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EmptySegment from '../../../common/segment/EmptySegment'
import HoverWindowContainer from './HoverWindowContainer'
import {getNumberOfMaps} from './_duck/selectors'
import {withStyles, Grid} from '@material-ui/core'
import {range} from 'lodash'
import classNames from 'classnames'

const styles = (theme)=>({
  fullHeight: {
    height: "100%"
  },
  halfHeight: {
    height: "50%"
  }
})

export class LayerComparisonContainer extends PureComponent {
  static propTypes = {
    // prop: PropTypes
  }
  static contextTypes = {
    t: PropTypes.func.isRequired
  }

  renderLayout(items){

  }

  render() {
    const {t} = this.context;
    const {numberOfMaps, classes} = this.props;
    const maps = range(numberOfMaps).map(i=> ({
      id: i, color: `#${(i*5)%10}${(i*9)%10}${(i*20)%10}${(i*7)%10}${(i*8)%10}${(i*12)%10}`
    })) 
    return (
      <EmptySegment  useScroll={false}>
          <Grid container style={{height:"100%"}}>
            {maps.map(it=>
              <Grid key={it.id} 
                item md={numberOfMaps === 1 ? 12 : 6}>
                <div className={classes.fullHeight/*classNames({ [classes.fullHeight]: numberOfMaps <= 2, 
                                [classes.halfHeight]: numberOfMaps >= 3})*/}
                    style={{backgroundColor: it.color}}>
                </div>
              </Grid>)}
          </Grid>
          <HoverWindowContainer/>
      </EmptySegment>
    )
  }
}

const mapStateToProps = (state) => ({
  numberOfMaps: getNumberOfMaps(state)  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(LayerComparisonContainer))
