import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch  } from 'react-router-dom'
import layerComparisonUrl from './routesNames'
import previewModalUrl from './preview-modal/routeNames'
import previewTableUrl, {PreloadKey as PREVIEW_TABLE_KEY} from './preview-table/routesNames'
import layersUrl, {PreloadKey as LAYERS_COMPARISON_KEY} from './layers-comparison/routesNames'
import loadable from '../../common/loadable'
import {urlJoin} from '../../../service/helperService'

const PreviewTableAsync = loadable(() => import('./preview-table/PreviewTableContainer'))
const LayerComparisonAsync = loadable(() => import('./layers-comparison/LayerComparisonContainer'))
const PreviewModalToTableAsync = loadable(() => import('./preview-modal/PreviewModalToTableContainer'))
const PreviewModalToComparisonAsync = loadable(() => import('./preview-modal/PreviewModalToComparisonContainer'))

export class FieldLayersComparisonContainer extends PureComponent {
  static propTypes = {
    // prop: PropTypes
  }

  render() {
    let {match} = this.props;
    const base = urlJoin(match.url);
    const previewModal = urlJoin(base);
    const previewTable = urlJoin(base,previewTableUrl);
    const layersComparison = urlJoin(base,layersUrl);

    const previewModalToTable = urlJoin(previewModal, PREVIEW_TABLE_KEY);
    const previewModalToLayersComp = urlJoin(previewModal, LAYERS_COMPARISON_KEY);

    return (
        <Switch>
            <Route exact path={previewModalToTable} component={PreviewModalToTableAsync}/>
            <Route exact path={previewModalToLayersComp} component={PreviewModalToComparisonAsync}/>
            <Route exact path={previewTable} component={PreviewTableAsync}/>
            <Route path={layersComparison} component={LayerComparisonAsync}/>
        </Switch>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldLayersComparisonContainer)
