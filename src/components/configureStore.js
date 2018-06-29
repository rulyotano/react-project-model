import { createStore, 
    applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { routerMiddleware } from "react-router-redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from "history/createBrowserHistory";
import reducerRegistry from "../service/redux/reducerRegistry";
import {setWith} from "lodash";
import "./_duck/reducers";

/**This function is just for creating the store. It is good to be a function cos can be used for instance in tests*/
const configureStore = (initialState, history = createHistory())=>{
    const composeEnhancers = composeWithDevTools({
        name: "sgpa-react",
        maxAge: 6,
        shouldCatchErrors: true,
        serialize: false,
        // actionSanitizer: (action)=>{
        //     switch (action.type) {
        //         case "MAP_JSON_LOADED":
        //             return {...action, geoJson:"<<LONG_MAP_GEOJSON>>"}                     
        //         case "CLOSE_FIELD_MAP_LOAD":
        //             return {...action, data:"<<LONG_CLOSE_FIELD_DATA>>"}             
        //         case "CLOSE_FIELD_PAINT_MAP":
        //             return {...action, mapData:"<<LONG_CLOSE_FIELD_PAINT_DATA>>"}             
        //         case "LAYERS_COMPARISON_COMPARISON_DATA_LOADED":
        //             return {...action, data:"<<LONG_DATA>>"}             
        //         default:
        //             break;
        //     }
        //     return action;
        // },
        // stateSanitizer: (state) => {
        //     var result = {
        //         ...state,
        //         map: {
        //             ...state.map,
        //             mapGeoJson: "<<LONG JSON>>",
        //             mapMappedGeoJson: "<<LONG JSON>>"
        //         },
        //         app: !state.app ? undefined : {
        //             ...state.app,
        //             closeField:{
        //                 ...state.app.closeField,
        //                 map:{
        //                     ...state.app.closeField.map,
        //                     data: "<<LONG JSON>>",
        //                     mapData: "<<LONG JSON>>"
        //                 }
        //             },
        //             layersComparison:{
        //                 ...state.app.layersComparison,
        //                 layersComparison:{
        //                     ...state.app.layersComparison.layersComparison,
        //                     data: "<<LONG JSON>>"
        //                 }
        //             }
        //         }
        //     };
        //     return result;
        // } 
    });

    // Preserve initial state for not-yet-loaded reducers
    const combine = (reducers) => {
        const reducerNames = Object.keys(reducers);
        if (initialState){
            Object.keys(initialState).forEach(item => {
                if (reducerNames.indexOf(item) === -1) {
                    reducers[item] = (state = null) => state;
                }
            });
        }
        return combineReducers(reducers);
    };
    // const reducer = combine(reducerRegistry.getReducers());
    const reducer = combine(reducerRegistry.getReducers());

    const store = createStore(reducer, initialState, composeEnhancers(
        applyMiddleware(thunk, routerMiddleware(history)),
        // other store enhancers if any
      ))

    // Replace the store's reducer whenever a new reducer is registered.
    reducerRegistry.setChangeListener(reducers => {
        store.replaceReducer(combine(reducers));
        store.dispatch({ type: '' });
    });
    return store
}

export default configureStore