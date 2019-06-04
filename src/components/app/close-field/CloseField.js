import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Switch  } from 'react-router-dom';
import {clear} from './_duck/actions';
import {urlJoin} from '../../../service/helperService';
import mapUrl, {PreloadKey as MAP_KEY} from './map/routesNames';
import processUrl, {PreloadKey as PROCESS_KEY} from './process/routesNames';
import loadable from '../../common/loadable';

const LoadCloseFieldAsync = loadable(() => import('./load/LoadCloseField'));
const MapCloseFieldAsync = loadable(() => import('./map/MapCloseField'));
const ProcessCloseFieldAsync = loadable(() => import('./process/ProcessCloseFieldContainer'));

export class CloseField extends PureComponent {
  static propTypes = {
  }

  componentWillUnmount(){
    this.props.clear();
  }
  
  render() {
    const {match} = this.props;
    const base = match.path;
    const maps = urlJoin(base, mapUrl);
    const process = urlJoin(base, processUrl);
    return (
      <Switch>
        <Route exact path={`${base}/:source(${MAP_KEY}|${PROCESS_KEY})`} component={LoadCloseFieldAsync}/>
        <Route path={maps} component={MapCloseFieldAsync}/>
        <Route path={process} component={ProcessCloseFieldAsync}/>
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch) => ({
  clear: ()=>dispatch(clear())  
});

export default connect(mapStateToProps, mapDispatchToProps)(CloseField);
