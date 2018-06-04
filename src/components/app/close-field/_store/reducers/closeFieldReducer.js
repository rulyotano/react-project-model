import {CLEAR, SET_LOADED_FILTERS} from '../actions/closeFieldActions.types'
import config, {CLIENT_TYPE_CANE, CLIENT_TYPE_GRAIN} from '../../../../../config/config'
import * as processTypes from '../../../../../service/close-field/processTypes'

const process = {
    cane: [
        { id: 0, desc: "closeField.process.Mechanized cane cut", type: processTypes.CANE_CUT }
    ],
    grain: [
        { id: 0, desc: "closeField.process.Ground preparation", type: processTypes.GRAIN_GROUND_PREPARATION },
        { id: 1, desc: "closeField.process.Ground preparation: fertilizers and correctives", type: processTypes.GRAIN_GROUND_PREPARATION },
        { id: 2, desc: "closeField.process.Application of Fertilizer", type: processTypes.GRAIN_APPLICATION },
        { id: 3, desc: "closeField.process.Application of Herbicide (desiccant)", type: processTypes.GRAIN_APPLICATION },
        { id: 4, desc: "closeField.process.Application of Insecticide", type: processTypes.GRAIN_APPLICATION },
        { id: 5, desc: "closeField.process.Application of Fungicide", type: processTypes.GRAIN_APPLICATION },
        { id: 6, desc: "closeField.process.Application of Growth Regulator", type: processTypes.GRAIN_APPLICATION },
        { id: 7, desc: "closeField.process.General applications (includes more than one of the application items)", type: processTypes.GRAIN_APPLICATION },
        { id: 8, desc: "closeField.process.Planting", type: processTypes.GRAIN_PLANTING },
        { id: 9, desc: "closeField.process.Harvest", type: processTypes.GRAIN_HARVEST },
    ]
}

const cultures = {
    cane: [
        { id: 0, desc: "closeField.cultures.Cane" }
    ],
    grain: [
        { id: 0, desc: "closeField.cultures.Soy" },
        { id: 1, desc: "closeField.cultures.Corn" },
        { id: 2, desc: "closeField.cultures.Cotton" }
    ]
}

const initialState = {
    process: config.CLIENT_TYPE === CLIENT_TYPE_CANE ? process.cane :
             config.CLIENT_TYPE === CLIENT_TYPE_GRAIN ? process.grain : [],
    cultures: config.CLIENT_TYPE === CLIENT_TYPE_CANE ? cultures.cane :
             config.CLIENT_TYPE === CLIENT_TYPE_GRAIN ? cultures.grain : [],
    loadedFilters: {
        initialDate: null, finalDate: null, process: null, operations: null,
        farm: null, sector: null, field: null
    }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR:
      return initialState;
    case SET_LOADED_FILTERS:
        return {...state, loadedFilters: action.filters};
    default:
        return state
  }
}
