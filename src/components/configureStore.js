import { createStore, 
    applyMiddleware,
    compose } from 'redux'
import thunk from 'redux-thunk';
import appReducer from './_store'

const reduxTools = process.env.NODE_ENV === 'production' || !window.__REDUX_DEVTOOLS_EXTENSION__ ? 
                    ()=>undefined : window.__REDUX_DEVTOOLS_EXTENSION__

/**This function is just for creating the store. It is good to be a function cos can be used for instance in tests*/
const configureStore = (initialState)=>{
    const store = compose(applyMiddleware(thunk))(createStore)(appReducer, initialState,  reduxTools())
    return store
}

export default configureStore