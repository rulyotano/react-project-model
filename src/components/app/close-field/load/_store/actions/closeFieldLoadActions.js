

import {START_LOADING, LOADED, SHOW, CLEAR} from "./closeFieldLoadActions.types";
import httpService from "../../../../../../service/httpService";
import ROUTES from "../../../routesNames";
import MAP_KEY from "../../../map/KEY";
import PROCESS_KEY from "../../../process/KEY";
import {LOAD as MAP_LOAD} from "../../../map/_store/actions/closeFieldMapActions.types";
import {LOAD as PROCESS_LOAD} from "../../../process/_store/actions/closeFieldProcessActions.types";

export const load = (params, source, pushUrl)=> (dispatch, getState)=>{    
    const LOAD_ACTION_TYPE = source === MAP_KEY ? MAP_LOAD : 
                             source === PROCESS_KEY ? PROCESS_LOAD : null;
    if (!LOAD_ACTION_TYPE)
        return;

    const state = getState();
    if (state.app.closeField.load.loading)
        return;
    dispatch({type: START_LOADING});

    console.log(params)

    setTimeout(() => {

        dispatch({
            type: LOAD_ACTION_TYPE,
            data: [ {id: "1", name: "test item"} ]
        });
        pushUrl(source === MAP_KEY ? ROUTES.MAP : source === PROCESS_KEY ? ROUTES.PROCESS : "");
    }, 1000);

    //TODO: make request for load data
    // httpService.get("load-close-field-data", {
    //     ...params,
    //     source
    // }).then(response=>{        
    //     dispatch({type: LOADED, data: response});
    // });    
};

export const show = (show)=>({type: SHOW, show});

export const clear = ()=>({type: CLEAR}) 