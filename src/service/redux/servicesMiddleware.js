import { setStore } from "./index";

export default store => next => action => {
  const result = next(action);
  setStore(store);
  return result;
};
