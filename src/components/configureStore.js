import { createStore, 
    applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { routerMiddleware } from "react-router-redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from "history/createBrowserHistory";
import reducerRegistry from "../service/redux/reducerRegistry";
import "./_duck/reducers";

/**This function is just for creating the store. It is good to be a function cos can be used for instance in tests*/
const configureStore = (initialState, history = createHistory())=>{
    const composeEnhancers = composeWithDevTools({
        name: "sgpa-react",
        maxAge: 5
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
    });
    return store
}

export default configureStore