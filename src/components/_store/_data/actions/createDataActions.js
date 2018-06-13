import createDataActionsTypes from './createDataActions.types'
import httpService from '../../../../service/httpService'
export default (name="", loadUrl="")=> {
    const { START_LOADING, LOADED, CLEAR, ERROR } = createDataActionsTypes(name);
    return {
        load: () => (dispatch, getState) =>{
            const state = getState();
            if (state.d[name].loading)
                return;
            dispatch({ type: START_LOADING })
            httpService.get(loadUrl).then(response=>dispatch({ type: LOADED, data: response}),
                                            e=>dispatch({ type: ERROR, error: e}))
        },
        clear(){
            return { type: CLEAR }
        }
    }
}