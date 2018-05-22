import {START_LOADING, LOAD_ERROR, SHOW, CLEAR} from "./closeFieldLoadActions.types";
import httpService from "../../../../../../service/httpService";
import {getFormat, DATE_FORMATS_KEYS} from "../../../../../../service/dateService";
import ROUTES from "../../../routesNames";
import MAP_KEY from "../../../map/KEY";
import PROCESS_KEY from "../../../process/KEY";
import {LOAD as MAP_LOAD} from "../../../map/_store/actions/closeFieldMapActions.types";
import {LOAD as PROCESS_LOAD} from "../../../process/_store/actions/closeFieldProcessActions.types";
import moment from 'moment'

export const load = (data, source, pushUrl)=> (dispatch, getState)=>{    
    const LOAD_ACTION_TYPE = source === MAP_KEY ? MAP_LOAD : 
                             source === PROCESS_KEY ? PROCESS_LOAD : null;
    if (!LOAD_ACTION_TYPE)
        return;

    const state = getState();
    if (state.app.closeField.load.loading)
        return;
    dispatch({type: START_LOADING});

    // console.log(params)

    // setTimeout(() => {

    //     dispatch({
    //         type: LOAD_ACTION_TYPE,
    //         data: [ {id: "1", name: "test item"} ]
    //     });
    //     pushUrl(source === MAP_KEY ? ROUTES.MAP : source === PROCESS_KEY ? ROUTES.PROCESS : "");
    // }, 1000);

    const {dateRange, cdFazenda: fazenda, cdSetor: zona, cdTalhao: talhao, ...restData} = data;
    const params = {
        parametrosPaginacao:{paginaAtual: 1},
        tipoDeMapa: 1,
        fazenda,
        zona,
        talhao,
        // source,
        // ...restData
    }
    const DATE_SERVER_FORMAT = getFormat(DATE_FORMATS_KEYS.SERVER_DATE);
    if (dateRange){
        if (dateRange.initialDateTime){ params.dataHoraInicial = moment(dateRange.initialDateTime).format(DATE_SERVER_FORMAT) }
        if (dateRange.finalDateTime){params.dataHoraFinal = moment(dateRange.finalDateTime).format(DATE_SERVER_FORMAT) }
    }

    httpService.useSgpaMapApiUrl().post("mapaAnalitico", params).then(response=>{        
        dispatch({type: LOAD_ACTION_TYPE, data: response.listaDeRetorno});
        pushUrl(source === MAP_KEY ? ROUTES.MAP : source === PROCESS_KEY ? ROUTES.PROCESS : "");
    }, e=> dispatch({type: LOAD_ERROR}));

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