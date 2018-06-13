import configureStore from './configureStore'
import createHistory from "history/createBrowserHistory";

// Create browser history to use in the Redux store
export const history = createHistory();

export default configureStore(undefined, history)