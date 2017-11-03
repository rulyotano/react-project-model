export const setUserConfig = (userOptionsList, userUnitsList, generalParameterList) => ({
  type: 'SET_USER_CONFIG',
  payload: {userOptionsList, userUnitsList, generalParameterList}
})

export const clearUserConfig = () => ({
  type: 'CLEAR_USER_CONFIG'
})

