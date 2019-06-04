import createHistory from "history/createBrowserHistory";
import configureStore from './configureStore';

// Create browser history to use in the Redux store
export const history = createHistory();

export default configureStore(undefined, history);