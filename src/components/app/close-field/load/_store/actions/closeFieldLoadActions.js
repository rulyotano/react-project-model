import {START_LOADING, LOAD_ERROR, SHOW, CLEAR} from "./closeFieldLoadActions.types";
import httpService from "../../../../../../service/httpService";
import {getFormat, DATE_FORMATS_KEYS} from "../../../../../../service/dateService";
import dialogService from "../../../../../../service/dialog/dialogService";
import ROUTES from "../../../routesNames";
import MAP_KEY from "../../../map/KEY";
import PROCESS_KEY from "../../../process/KEY";
import {LOAD as MAP_LOAD} from "../../../map/_store/actions/closeFieldMapActions.types";
import {LOAD as PROCESS_LOAD} from "../../../process/_store/actions/closeFieldProcessActions.types";
import {setLoadedFilters} from "../../../_store/actions/closeFieldActions";
import moment from 'moment'
import {isEmpty} from 'lodash'

const processMapData = (data)=>{
    const count = data.length;
    for (let i = 0; i < count; i++) {
        const item = data[i];

        item.vlLatitudeInicial = parseFloat(item.vlLatitudeInicial);
        item.vlLongitudeInicial = parseFloat(item.vlLongitudeInicial);
        item.vlLatitudeFinal = parseFloat(item.vlLatitudeFinal);
        item.vlLongitudeFinal = parseFloat(item.vlLongitudeFinal);

        //convert date from the new format
        const SERVER_DATA_FORMAT = getFormat(DATE_FORMATS_KEYS.SERVER_DATE);
        item.dtHrLocalInicial = moment(item.dtHrLocalInicial, SERVER_DATA_FORMAT).valueOf();
        item.dtHrLocalFinal = moment(item.dtHrLocalFinal, SERVER_DATA_FORMAT).valueOf();        
    }
    return data;
}

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

    const {dateRange, farm, sector, field, ...restData} = data;
    const params = {
        parametrosPaginacao:{paginaAtual: 1},
        tipoDeMapa: 1,
        fazenda: farm || undefined,
        zona: sector || undefined,
        talhao: field || undefined,
        // source,
        // ...restData
    }
    const DATE_SERVER_FORMAT = getFormat(DATE_FORMATS_KEYS.SERVER_DATE);
    if (dateRange){
        if (dateRange.initialDateTime){ params.dataHoraInicial = moment(dateRange.initialDateTime).format(DATE_SERVER_FORMAT) }
        if (dateRange.finalDateTime){params.dataHoraFinal = moment(dateRange.finalDateTime).format(DATE_SERVER_FORMAT) }
    }

    //TODO: make request for load data
    httpService.useSgpaMapApiUrl().post("mapaAnalitico", params).then(response=>{
        if (isEmpty(response.listaDeRetorno))
        {
            dialogService.notification("", "Response with no data.") //TODO: i18n
            dispatch({type: LOAD_ERROR});
            return;
        }      
        //set loaded data
        dispatch({type: LOAD_ACTION_TYPE, data: processMapData(response.listaDeRetorno)});
        //set loaded filters

        dispatch(setLoadedFilters({
            initialDate: moment(dateRange.initialDateTime), 
            finalDate: moment(dateRange.finalDateTime), 
            farm, sector, field,
            process: data.process, 
            operations: data.operation
        }));

        //redirect to route
        pushUrl(source === MAP_KEY ? ROUTES.MAP : source === PROCESS_KEY ? ROUTES.PROCESS : "");
    }, e=> dispatch({type: LOAD_ERROR}));
};

export const show = (show)=>({type: SHOW, show});

export const clear = ()=>({type: CLEAR}) 