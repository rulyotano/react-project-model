export default (name = "")=>{
    const NAME = name.toUpperCase();
    return {
        START_LOADING: `DATA_START_LOADING_${NAME}`, 
        LOADED: `DATA_LOADED_${NAME}`,  
        CLEAR: `DATA_CLEAR_${NAME}`,
        ERROR: `DATA_ERROR_${NAME}`,
    }
}