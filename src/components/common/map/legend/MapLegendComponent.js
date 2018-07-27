import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import MapLegendEditComponent from './MapLegendEditComponent';
import ReadTableComponent from './table/ReadTableComponent';

class MapLegendComponent extends PureComponent {
    static propTypes = {
        variable: PropTypes.any,
        selectedRangeGroup: PropTypes.object,
        t: PropTypes.func.isRequired,
        onSelectedRangeGroup: PropTypes.func.isRequired
    }

    state = {
        openedLegendEdit: false
    }

    setLegendEdit(opened){
        this.setState({openedLegendEdit: opened});
    }

    render(){
        const {variable, selectedRangeGroup, t, onSelectedRangeGroup} = this.props;
        const {openedLegendEdit} = this.state;
        if (!variable)
            return null;
        return (
            <React.Fragment>
                <ReadTableComponent t={t} variable={variable} selectedRangeGroup={selectedRangeGroup}
                    onBodyClick={()=>this.setLegendEdit(true)}/>                                
                <MapLegendEditComponent open={openedLegendEdit} onClose={()=>this.setLegendEdit(false)} t={t}
                    variable={variable} selectedVariableRange={selectedRangeGroup}
                    onChangeSelectedVariableRange={onSelectedRangeGroup}/>
            </React.Fragment>)
    }
}

export default MapLegendComponent
