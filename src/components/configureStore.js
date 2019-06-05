import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createMainReducer from "./_duck/reducers";

/** This function is just for creating the store. It is good to be a function cos can be used for instance in tests */
const configureStore = (initialState, history = createBrowserHistory()) => {
  const composeEnhancers = composeWithDevTools({
    name: "react-project-model",
    maxAge: 6,
    shouldCatchErrors: true,
    serialize: false
  });

  const store = createStore(
    createMainReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
  );

  return store;
};

export default configureStore;
