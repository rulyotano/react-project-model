import {CLEAR, SET_VARIABLE, SET_VARIABLE_RANGE, SET_VARIABLES,
    PAINT_MAP} from './types'
import TimeRangeVariable from '../../../../../service/maps/variables/vars/TimeRangeVariable'
import FleetVariable from '../../../../../service/maps/variables/vars/FleetVariable'

export const clear = ()=>({type: CLEAR}) 

export const setVariable = (variable)=>({type: SET_VARIABLE, variable})

export const setVariableRange = (range)=>({type: SET_VARIABLE_RANGE, range})

export const initializeVariables = () => (dispatch, getState)=>{
    var data = getState().app.closeField.map.data;
    const variables = [
        new TimeRangeVariable(data, setVariableRange, "app.closeField.map.selected.variableRange"),
        new FleetVariable(data, setVariableRange, "app.closeField.map.selected.variableRange")
    ];      
    dispatch({
        type: SET_VARIABLES,
        variables
    });
}

/**Filter the data */
export const filterData = (filters, data)=>{
    let result = data;
    if (filters !== undefined){
        if (filters.workArea !== undefined){
            const wa = filters.workArea;
            let filterFn = (item)=> (wa.farm ? item.cdFazendaInicial === wa.farm : true) &&
                                    (wa.sector ? item.cdZonaInicial === wa.sector : true) &&
                                    (wa.field ? item.cdTalhaoInicial === wa.field : true);
            result = data.filter(filterFn);
        }
    }
    return result;
}

export const paintMap = (filters) => (dispatch, getState) => {
    let mapData = [];
    const state = getState();
    const variable = state.app.closeField.map.selected.variable;
    const data = filterData(filters, state.app.closeField.map.data);
    if (!variable)
        return;
    mapData = variable.selectedRangeGroup.groupedElements(data);
    dispatch({
        type: PAINT_MAP,
        mapData
    })
}