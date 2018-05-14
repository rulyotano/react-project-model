import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    Route,
    Switch
  } from 'react-router-dom'
import Loadable from 'react-loadable'
import LoadingComponent from '../../common/_LoadingComponent'

const LoadCloseFieldAsync = Loadable({
    loader: () => import('./load/LoadCloseField'),
    loading: LoadingComponent,
});

const MapCloseFieldAsync = Loadable({
    loader: () => import('./map/MapCloseField'),
    loading: LoadingComponent,
});

const ProcessCloseFieldAsync = Loadable({
    loader: () => import('./process/ProcessCloseField'),
    loading: LoadingComponent,
});

export class CloseField extends PureComponent {
  static propTypes = {
  }

  render() {
    let {match} = this.props;
    return (
        <Switch>
            <Route exact path={match.url} component={LoadCloseFieldAsync}/>
            <Route path={`${match.url}/map`} component={MapCloseFieldAsync}/>
            <Route path={`${match.url}/process`} component={ProcessCloseFieldAsync}/>
        </Switch>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CloseField)