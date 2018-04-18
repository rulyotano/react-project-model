import config from '../config/config'
import loginAuthDataService from './login/loginAuthDataService'
import loginService from './login/loginService'
import axios from 'axios'


/**
 * Generic class to make requests
 */
class GenericHttpRequest {
    
        constructor(axiosInstance)
        {
            this.axios = axiosInstance;
        }
    
        get(uri, params, config = {})
        {
            return this.axios.get(uri, {params, ...config}).then(this.success)
        }
    
        post(uri, data)
        {
            return this.axios.post(uri, data, {...config}).then(this.success)
        }
    
        put(uri, data) {
            return this.axios.put(uri, data, {...config}).then(this.success)
        }
    
        delete(uri, params) {
            return this.axios.delete(uri, {params, ...config}).then(this.success)
        }

        success(response){
            return response.data
        }

        fail(error){
            //do basic things in errors
            return error
        }    
    }
    
/**Cerates a axions instance with a base url */
const createAxiosInstance = (baseUrl)=>{
    let axiosInstance = axios.create({
        baseURL: baseUrl
      })
    configureAxios(axiosInstance)
    return axiosInstance
}

/**Configures the axios, set tha axios auth token and creates the interceptors*/
const configureAxios = (axiosInstance)=> {
    //TODO: check if is better inject the token here, or in each request (bcos it can change)    
    // const setAuthData = ()=>{        
    //     let authData = loginAuthDataService.getAuthData()
    //     if (authToken && authData.token)
    //         axios.defaults.headers.common['X-Auth-Token'] = authData.token;  
    // }

    // setAuthData()
        
    // Add a request interceptor
    axiosInstance.interceptors.request.use(config => {
        console.log("req")

        let authData = loginAuthDataService.getAuthData()
        if (authData && authData.token)
            config.headers['X-Auth-Token'] = authData.token;  

        // Do something before request is sent
        return config;
    }, error => {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axiosInstance.interceptors.response.use(response => {
        console.log("res")

        switch (response.status){
            case 401:
                loginService.logout()
                break
            default:
                break
        }
        // Do something with response data
        return response;
    }, error => {
        // Do something with response error
        return Promise.reject(error);
    });
}

/**
 * Abstraction of the ~GenericHttpRequest~ for each existing url
 */
class HttpService extends GenericHttpRequest {
    constructor(defaultAxiosInstance) {
        super(defaultAxiosInstance);
    }

    useSgpaApiUrl = () =>{
        if(!this.SGPA_API_HTTP_SERVICE)
        {
            this.SGPA_API_HTTP_SERVICE = new GenericHttpRequest(createAxiosInstance(config.SGPA_API_URL));
        }
        return this.SGPA_API_HTTP_SERVICE;
    };

    useSgpaMapApiUrl = () =>{
        if(!this.SGPA_MAP_API_URL_HTTP_SERVICE)
        {
            this.SGPA_MAP_API_URL_HTTP_SERVICE = new GenericHttpRequest(createAxiosInstance(config.SGPA_MAP_API_URL));
        }
        return this.SGPA_MAP_API_URL_HTTP_SERVICE;
    };

    useSgpaJourneyServiceUrl = () =>{

        if(!this.SGPA_JOURNEY_SERVICE_URL_HTTP_SERVICE)
        {
            this.SGPA_JOURNEY_SERVICE_URL_HTTP_SERVICE = new GenericHttpRequest(createAxiosInstance(config.SGPA_JOURNEY_SERVICE_URL));
        }
        return this.SGPA_JOURNEY_SERVICE_URL_HTTP_SERVICE;
    };

    useSgpaIntegrationServiceUrl = () =>{
        if(!this.SGPA_INTEGRATION_SERVICE_URL_HTTP_SERVICE)
        {
            this.SGPA_INTEGRATION_SERVICE_URL_HTTP_SERVICE = new GenericHttpRequest(createAxiosInstance(config.SGPA_INTEGRATION_SERVICE_URL));
        }
        return this.SGPA_INTEGRATION_SERVICE_URL_HTTP_SERVICE;
    };

    useRawUrl = () =>{
        if(!this.RAW_URL_HTTP_SERVICE)
        {
            this.RAW_URL_HTTP_SERVICE = new GenericHttpRequest(createAxiosInstance());
        }
        return this.RAW_URL_HTTP_SERVICE;
    }

}
export default new HttpService(createAxiosInstance(config.SGPA_API_URL));

