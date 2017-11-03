import { createStore } from 'redux'
import appReducer from './_store'

const reduxTools = process.env.NODE_ENV === 'production' || !window.__REDUX_DEVTOOLS_EXTENSION__ ? 
                    ()=>undefined : window.__REDUX_DEVTOOLS_EXTENSION__

/**This function is just for creating the store. It is good to be a function cos can be used for instance in tests*/
const configureStore = ()=>{
    const store = createStore(appReducer,  reduxTools())
    return store
}

export default configureStore