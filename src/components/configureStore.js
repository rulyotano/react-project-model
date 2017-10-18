import { createStore } from 'redux'
import appReducer from './_store'

const configureStore = ()=>{
    const store = createStore(appReducer)
    return store
}

export default configureStore