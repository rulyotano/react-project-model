import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {getSelectedVariable, getSelectedVariableRange} from './_duck/selectors';
import ReadTableComponent from '../../../common/map/legend/table/ReadTableComponent';


class MapCloseFieldRangeTableContainer extends PureComponent {
    static contextTypes = {
        t: PropTypes.func.isRequired
    }

    render(){
        const {variable, rangeGroup} = this.props;
        const {t} = this.context;
        return (
            <ReadTableComponent variable={variable}
                selectedRangeGroup={rangeGroup}
                t={t}/>)
    }
}

const mapStateToProps = (state) => ({
    variable: getSelectedVariable(state),
    rangeGroup: getSelectedVariableRange(state),
})

const mapDispatchToProps = (dispatch, getState) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(MapCloseFieldRangeTableContainer)
