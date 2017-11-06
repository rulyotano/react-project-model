const initialState = {
    dialogs:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "":
        return { ...state }

    default:
        return state
  }
}
