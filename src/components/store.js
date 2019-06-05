import { createBrowserHistory } from "history";
import configureStore from './configureStore';

// Create browser history to use in the Redux store
export const history = createBrowserHistory();

export default configureStore(undefined, history);