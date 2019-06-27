let store = null;

export const getState = () => store && store.getState();

export const getDispatch = () => store && store.dispatch;

export const setStore = newStore => {
  store = newStore;
};
