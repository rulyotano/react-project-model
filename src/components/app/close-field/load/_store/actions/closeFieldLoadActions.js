

import {START_LOADING, LOADED, SHOW} from "./closeFieldLoadActions.types";
import httpService from "../../../../../../service/httpService";
import ROUTES from "../../../routes";

export const load = (params, source, pushUrl)=> (dispatch, getState)=>{
    const state = getState();
    if (state.app.closeField.load.loading)
        return;
    dispatch({type: START_LOADING});

    console.log(params)
    setTimeout(() => {
        dispatch({
            type: LOADED,
            data: [ {id: "1", name: "test item"} ]
        });
        pushUrl(source === 0 ? ROUTES.MAP : source === 1 ? ROUTES.PROCESS : "");
    }, 1000);

    //TODO: make request for load data
    // httpService.get("load-close-field-data", {
    //     ...params,
    //     source
    // }).then(response=>{        
    //     dispatch({type: LOADED, data: response});
    // });    
};

export const show = (show)=>({type: SHOW, show})