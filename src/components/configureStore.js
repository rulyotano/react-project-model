import { createStore, 
    applyMiddleware,
    compose } from 'redux'
import thunk from 'redux-thunk';
import { routerMiddleware } from "react-router-redux";
import appReducer from './_store'
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from "history/createBrowserHistory";

/**This function is just for creating the store. It is good to be a function cos can be used for instance in tests*/
const configureStore = (initialState, history = createHistory())=>{
    const composeEnhancers = composeWithDevTools({
        name: "sgpa-react",
        maxAge: 5
    });
    const store = createStore(appReducer, initialState, composeEnhancers(
        applyMiddleware(thunk, routerMiddleware(history)),
        // other store enhancers if any
      ))
    return store
}

export default configureStore