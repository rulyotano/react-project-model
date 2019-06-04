import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Scrollbar from 'react-perfect-scrollbar';
import MapLegendEditComponent from './MapLegendEditComponent';
import ReadTableComponent from './table/ReadTableComponent';

class MapLegendComponent extends PureComponent {
    static propTypes = {
      variable: PropTypes.any,
      selectedRangeGroup: PropTypes.object,
      t: PropTypes.func.isRequired,
      onSelectedRangeGroup: PropTypes.func.isRequired,
      onOpacityChange: PropTypes.func,
      opacity: PropTypes.number
    }

    state = {
      openedLegendEdit: false
    }

    setLegendEdit(opened){
      this.setState({openedLegendEdit: opened});
    }

    componentDidUpdate(){
      if (!this._scrollbarContainer || !this._scrollbar)
        return;
      this._scrollbarContainer.removeAttribute("style");
      if (this._scrollbarContainer.clientHeight > 200){
        this._scrollbarContainer.setAttribute("style","height:200px");
      }
      this._scrollbar.updateScroll();
    }

    render(){
      const {variable, selectedRangeGroup, t, onSelectedRangeGroup, 
        opacity, onOpacityChange} = this.props;
      const {openedLegendEdit} = this.state;
      if (!variable)
        return null;
      return (
        <React.Fragment>
          <div ref={ref=>this._scrollbarContainer = ref}>
            <Scrollbar ref={ref=>this._scrollbar = ref}>                        
              <ReadTableComponent t={t} variable={variable} selectedRangeGroup={selectedRangeGroup}
                onBodyClick={()=>this.setLegendEdit(true)}/>
            </Scrollbar>
          </div>
                
          <MapLegendEditComponent open={openedLegendEdit} onClose={()=>this.setLegendEdit(false)} t={t}
            variable={variable} selectedVariableRange={selectedRangeGroup}
            onChangeSelectedVariableRange={onSelectedRangeGroup}
            opacity={opacity} onOpacityChange={onOpacityChange}/>
        </React.Fragment>);
    }
}

export default MapLegendComponent;
