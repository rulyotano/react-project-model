import { createStore } from 'redux'
import appReducer from './_store'

/**This function is just for creating the store. It is good to be a function cos can be used for instance in tests*/
const configureStore = ()=>{
    const store = createStore(appReducer)
    return store
}

export default configureStore