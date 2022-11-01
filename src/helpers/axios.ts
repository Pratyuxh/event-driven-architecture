import axios, { AxiosRequestConfig } from 'axios';
import Logger from '../core/Logger';

interface ApiResponse {
  httpStatus: boolean;
  httpCode: number;
  httpHeaders: any;
  httpData: any;
}

const httpRequest = async (config: AxiosRequestConfig): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        const { status, headers, data } = response;
        resolve({
          httpStatus: true,
          httpCode: status,
          httpHeaders: headers,
          httpData: data,
        });
      })
      .catch(({ response = {} }) => {
        const { status, headers, data } = response;
        Logger.error(`[API] ${status} ${config.method} ${config.url} ${JSON.stringify(data)}`);
        resolve({
          httpStatus: false,
          httpCode: status,
          httpHeaders: headers,
          httpData: data,
        });
      });
  });
};

export default httpRequest;
export { httpRequest, ApiResponse };
