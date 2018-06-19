import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EmptySegment from '../../../common/segment/EmptySegment'
import HoverWindowContainer from './HoverWindowContainer'

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
    return (
      <EmptySegment>
          <HoverWindowContainer/>
      </EmptySegment>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(LayerComparisonContainer)
