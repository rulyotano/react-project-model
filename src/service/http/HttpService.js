import UrlSource from '../../config/UrlSource';

/**
 * Abstraction of the ~GenericHttpRequest~ for each existing url
 */
class HttpService {
    static useSgpaApiUrl = () =>{
        if(!this.SGPA_API_HTTP_SERVICE)
        {
            this.SGPA_API_HTTP_SERVICE = new GenericHttpRequest(UrlSource.get().SGPA_API_URL);
        }
        return this.SGPA_API_HTTP_SERVICE;
    };

    static useSgpaMapApiUrl = () =>{
        if(!this.SGPA_MAP_API_URL_HTTP_SERVICE)
        {
            this.SGPA_MAP_API_URL_HTTP_SERVICE = new GenericHttpRequest(UrlSource.get().SGPA_MAP_API_URL);
        }
        return this.SGPA_MAP_API_URL_HTTP_SERVICE;
    };

    static useSgpaJourneyServiceUrl = () =>{

        if(!this.SGPA_JOURNEY_SERVICE_URL_HTTP_SERVICE)
        {
            this.SGPA_JOURNEY_SERVICE_URL_HTTP_SERVICE = new GenericHttpRequest(UrlSource.get().SGPA_JOURNEY_SERVICE_URL);
        }
        return this.SGPA_JOURNEY_SERVICE_URL_HTTP_SERVICE;
    };

    static useSgpaIntegrationServiceUrl = () =>{
        if(!this.SGPA_INTEGRATION_SERVICE_URL_HTTP_SERVICE)
        {
            this.SGPA_INTEGRATION_SERVICE_URL_HTTP_SERVICE = new GenericHttpRequest(UrlSource.get().SGPA_INTEGRATION_SERVICE_URL);
        }
        return this.SGPA_INTEGRATION_SERVICE_URL_HTTP_SERVICE;
    };

}
export default HttpService;

/**
 * Generic class to make requests
 */
class GenericHttpRequest {

    constructor(url)
    {
        this.URL = url;
    }

    get(uri)
    {
        return this.makeRequest('GET', uri);
    }

    post(uri, data)
    {
        return this.makeRequest('POST', uri, data);
    }

    put(uri, data) {
        return this.makeRequest('PUT', uri, data);
    }

    delete(uri, data) {
        return this.makeRequest('DELETE', uri, data);
    }

    makeRequest(method, uri, data)
    {
        let requestInfo = this.makeRequestInfo(method,data);
        return fetch(this.URL + uri, requestInfo)
        .then(response =>
        {
            if (response.status === 200)
            {
                return response.json();
            }
            if (response.status === 401)
            {
                throw new Error("unauthorized");
            }
            if (response.status === 404)
            {
                throw new Error("not found");
            }
            throw new Error();

        });
    }

    makeRequestInfo(method,data)
    {
        let info =
        {
            method: method,
            body: JSON.stringify(data),
            headers:this.makeHeaders()
        };
        return info
    }

    makeHeaders()
    {
        let token = localStorage.getItem('key-token');
        return new Headers({
            'Content-type': 'application/json;charset=UTF-8',
            'X-Auth-Token': token === undefined ? '-' : token
        });
    }
}

