

import {SET_SIZE_TO_NORMAL} from "./appActions.types";
import {SET_SIZE_TO_MAX} from "./appActions.types";
import {SET_SIZE_TO_MIN} from "./appActions.types";

export const setSizeToMax = ()=>({
    type:SET_SIZE_TO_MAX
});

export const setSizeToMin = ()=>({
    type:SET_SIZE_TO_MIN
});

export const setSizeToNormal = ()=>({
    type:SET_SIZE_TO_NORMAL
});