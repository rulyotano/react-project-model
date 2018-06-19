import { CHANGE_NUMBER_OF_MAPS } from './types'

export const changeNumberOfMaps = (numberOfMaps)=>({
    type: CHANGE_NUMBER_OF_MAPS,
    numberOfMaps
})