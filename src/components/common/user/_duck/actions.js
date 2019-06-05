import { SET_USER_TYPE, CLEAR_USER_TYPE } from "./types";
import httpService from "../../../../service/httpService";
import { getUserLogin } from "../../auth/_duck/selectors";

const USER_REQUEST_URL = userLogin => `/user/details/${userLogin}`;

export const loadUser = () => (dispatch, getState) => {
  const userLogin = getUserLogin(getState());
  if (!userLogin) return;
  httpService.get(USER_REQUEST_URL(userLogin)).then(response => {
    dispatch(setUser(response.id, response.userName, response.name));
  });
};

export const setUser = (id, username, name) => ({
  type: SET_USER_TYPE,
  payload: { id, username, name }
});

export const clearUser = () => ({
  type: CLEAR_USER_TYPE
});
