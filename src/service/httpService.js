import axios from "axios";
import settings from "../config/config";
import loginAuthDataService from "./login/loginAuthDataService";
import loginService from "./login/loginService";

class GenericHttpRequest {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  get(uri, params, config = {}) {
    return this.axios.get(uri, { params, ...config }).then(this.success);
  }

  post(uri, data, config = {}) {
    return this.axios.post(uri, data, { ...config }).then(this.success);
  }

  put(uri, data, config = {}) {
    return this.axios.put(uri, data, { ...config }).then(this.success);
  }

  delete(uri, params, config = {}) {
    return this.axios.delete(uri, { params, ...config }).then(this.success);
  }

  success(response) {
    return response.data;
  }

  fail(error) {
    return error;
  }
}

const createAxiosInstance = baseUrl => {
  const axiosInstance = axios.create({
    baseURL: baseUrl
  });
  configureAxios(axiosInstance);
  return axiosInstance;
};

const configureAxios = axiosInstance => {
  AddRequestInterceptorToAxio(axiosInstance);
  AddResponseInterceptorToAxio(axiosInstance);
};

const AddRequestInterceptorToAxio = axiosInstance => {
  axiosInstance.interceptors.request.use(
    config => {
      const authData = loginAuthDataService.getAuthData();
      if (authData && authData.token)
        config.headers["X-Auth-Token"] = authData.token;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
};

const AddResponseInterceptorToAxio = axiosInstance => {
  axiosInstance.interceptors.response.use(
    response => {
      switch (response.status) {
      case 401:
        loginService.logout(true);
        break;
      default:
        break;
      }
      return response;
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
        case 401:
          loginService.logout(true);
          break;
        default:
          break;
        }
      }
      return Promise.reject(error);
    }
  );
};

class HttpService extends GenericHttpRequest {
  useSgpaApiUrl = () => {
    if (!this.SGPA_API_HTTP_SERVICE) {
      this.SGPA_API_HTTP_SERVICE = new GenericHttpRequest(
        createAxiosInstance(settings.SGPA_API_URL)
      );
    }
    return this.SGPA_API_HTTP_SERVICE;
  };

  useSgpaMapApiUrl = () => {
    if (!this.SGPA_MAP_API_URL_HTTP_SERVICE) {
      this.SGPA_MAP_API_URL_HTTP_SERVICE = new GenericHttpRequest(
        createAxiosInstance(settings.SGPA_MAP_API_URL)
      );
    }
    return this.SGPA_MAP_API_URL_HTTP_SERVICE;
  };

  useSgpaJourneyServiceUrl = () => {
    if (!this.SGPA_JOURNEY_SERVICE_URL_HTTP_SERVICE) {
      this.SGPA_JOURNEY_SERVICE_URL_HTTP_SERVICE = new GenericHttpRequest(
        createAxiosInstance(settings.SGPA_JOURNEY_SERVICE_URL)
      );
    }
    return this.SGPA_JOURNEY_SERVICE_URL_HTTP_SERVICE;
  };

  useSgpaIntegrationServiceUrl = () => {
    if (!this.SGPA_INTEGRATION_SERVICE_URL_HTTP_SERVICE) {
      this.SGPA_INTEGRATION_SERVICE_URL_HTTP_SERVICE = new GenericHttpRequest(
        createAxiosInstance(settings.SGPA_INTEGRATION_SERVICE_URL)
      );
    }
    return this.SGPA_INTEGRATION_SERVICE_URL_HTTP_SERVICE;
  };

  useRawUrl = () => {
    if (!this.RAW_URL_HTTP_SERVICE) {
      this.RAW_URL_HTTP_SERVICE = new GenericHttpRequest(createAxiosInstance());
    }
    return this.RAW_URL_HTTP_SERVICE;
  };
}
export default new HttpService(createAxiosInstance(settings.SGPA_API_URL));
