import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    Route,
    Switch
  } from 'react-router-dom'
import Loadable from 'react-loadable'
import LoadingComponent from '../../common/_LoadingComponent'
import {clear} from './_store/actions/closeFieldActions'
import urlJoin from 'url-join'
import ROUTES from './routesNames'
import MAP_KEY from './map/KEY'
import PROCESS_KEY from './process/KEY'

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

  componentWillUnmount(){
    this.props.clear();
  }
  
  render() {
    let {match} = this.props;
    ROUTES.BASE = match.url;
    ROUTES.MAP = urlJoin(match.url,"map");
    ROUTES.PROCESS = urlJoin(match.url,"process");
    return (
        <Switch>
            <Route exact path={urlJoin(ROUTES.BASE, `/:source(${MAP_KEY}|${PROCESS_KEY})`)} component={LoadCloseFieldAsync}/>
            <Route path={ROUTES.MAP} component={MapCloseFieldAsync}/>
            <Route path={ROUTES.PROCESS} component={ProcessCloseFieldAsync}/>
        </Switch>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => ({
    clear: ()=>dispatch(clear())  
})

export default connect(mapStateToProps, mapDispatchToProps)(CloseField)
