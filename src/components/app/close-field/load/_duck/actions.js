import {START_LOADING, LOAD_ERROR, SHOW, CLEAR} from "./types";
import httpService from "../../../../../service/httpService";
import {getFormat, DATE_FORMATS_KEYS, fromServerArray} from "../../../../../service/dateService";
import dialogService from "../../../../../service/dialog/dialogService";
import closeFieldUrl from "../../routesNames";
import closeFieldMapUrl from "../../map/routesNames";
import closeFieldProcessUrl from "../../process/routesNames";
import {urlJoin} from "../../../../../service/helperService";
import {PreloadKey as MAP_KEY} from "../../map/routesNames";
import {PreloadKey as PROCESS_KEY} from "../../process/routesNames";
import {LOAD as MAP_LOAD} from "../../map/_duck/types";
import {LOAD as PROCESS_LOAD} from "../../process/_duck/types";
import {setLoadedFilters} from "../../_duck/actions";
import moment from 'moment'
import {isEmpty, random, chain, round} from 'lodash'
import { routerActions } from "react-router-redux";

/**TODO: remove or change on production */
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

/**TODO: Change to right server data mapping */
const processProcessData = (data)=>{
    const groupFn = (it)=>`${it.process}.${it.farm}.${it.sector}.${it.field}`;
    const groupRowValues = (items, groupFn) => 
                                chain(items).map(groupFn)
                                .groupBy().keys().join(', ').value();
                                
    const DATE_FORMAT = getFormat(DATE_FORMATS_KEYS.SHORT_DATE_TIME_FORMAT);

    return chain(data).groupBy(groupFn).map((items, key)=>({
        key,
        process: items[0].process,      
        operations: groupRowValues(items, it=>it.operation),
        fieldText: `${items[0].farm}.${items[0].sector}.${items[0].field}`,
        farm: items[0].farm,
        sector: items[0].sector,
        field: items[0].field,
        fieldArea:  round(items[0].fieldArea, 2),
        machineArea: chain(items).sumBy(it=>it.machineArea).round(2).value(),
        date: groupRowValues(items, it=>fromServerArray(it.date).format(DATE_FORMAT)),
        state: "Active"
    })).value();
}

export const load = (data, source)=> (dispatch, getState)=>{
    const state = getState();
    if (state.app.closeField.load.loading)
        return;
    dispatch({type: START_LOADING});

    const {dateRange, farm, sector, field} = data;
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

    if (source === MAP_KEY){
        loadMap(params, data, dispatch);                
    } else if (source === PROCESS_KEY){
        loadProcess(params, data, dispatch);
    }
};

export const loadMap = (params, data, dispatch) => {
    const {dateRange, farm, sector, field} = data;
    httpService.useSgpaMapApiUrl().post("mapaAnalitico", params)
        .then(response=>{
            if (isEmpty(response.listaDeRetorno))
            {
                dialogService.notification("", "Response with no data.") //TODO: i18n
                dispatch({type: LOAD_ERROR});
                return;
            }      
            //set loaded data
            dispatch({type: MAP_LOAD, data: processMapData(response.listaDeRetorno)});
            //set loaded filters

            dispatch(setLoadedFilters({
                initialDate: moment(dateRange.initialDateTime), 
                finalDate: moment(dateRange.finalDateTime), 
                farm, sector, field,
                process: data.process, 
                operations: data.operation
            }));

            //redirect to route
            dispatch(routerActions.push(urlJoin("/", closeFieldUrl, closeFieldMapUrl)));
        }, e=> dispatch({type: LOAD_ERROR}));
}

export const loadProcess = (params, data, dispatch) => {
    const {dateRange, farm, sector, field} = data;
    
    setTimeout(() => {
        const resultData = getMockProcessData();
        dispatch({
            type: PROCESS_LOAD,
            data: processProcessData(resultData)
        });

        dispatch(setLoadedFilters({
            initialDate: moment(dateRange.initialDateTime), 
            finalDate: moment(dateRange.finalDateTime), 
            farm, sector, field,
            process: data.process, 
            operations: data.operation
        }));

        dispatch(routerActions.push(urlJoin("/", closeFieldUrl, closeFieldProcessUrl)));
    }, 1000);
}

/**TODO: remove on production */
const getMockProcessData = ()=> {
    const result = [];
    const now = moment().valueOf();
    const startOfYear = moment().startOf('year').valueOf();
    for (let i = 0; i < 150; i++) {
        const dateArray = moment(random(startOfYear, now)).toArray();
        dateArray[1]++;
        result.push({
            process: random(0, 10),                        
            operation: random(0, 100),                        
            farm: random(1, 2),                        
            sector: random(1, 10),                        
            field: random(1, 20),                        
            fieldArea: random(50, 300, true),                        
            machineArea: random(5, 20, true),                        
            date: dateArray,
        });
    }
    return result;
}

export const show = (show)=>({type: SHOW, show});

export const clear = ()=>({type: CLEAR}) 