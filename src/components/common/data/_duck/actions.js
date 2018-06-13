import createDataActions from '../createDataActions'
import {FLEET} from './types'
import {OPERATION} from './types'
import {STATE} from './types'

export const stateActions = createDataActions(STATE, "/estado")
export const operationActions = createDataActions(OPERATION, "/operacao")
export const equipmentActions = createDataActions(FLEET, "/monitoramento/equipamento")

export const getAction = (actionType) => {
    switch (actionType) {
        case FLEET:
            return equipmentActions;
        case OPERATION:
            return operationActions;
        case STATE:
            return equipmentActions;    
        default:
            break;
    }
}
