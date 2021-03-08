import { jsonServer } from '../configs'
import { ENDPOINTS } from '../constants';

export const makeRequest = async (
  endpoint,
  requestBody = null,
  params = null,
) => {
  try {
    // Retrieves the information about the request
    const requestInfo = ENDPOINTS[endpoint];

    // Gets the client for the request
    const client = _getRequestFunction[requestInfo.method];

    // Gets the URL
    let url = requestInfo.url;

    // If there's params, add to the url
    if (requestInfo.params && requestInfo.params.length) {
      if (Object.keys(params).length != requestInfo.params.length) {
        throw new Error('Wrong params in the make request call');
      }
      for (const value of requestInfo.params) {
        url = url.replace(`@${value}`, params[value]);
      }
    }

    // Sets custom headers
    let headers = null;
    if (requestInfo.headers) {
      headers = requestInfo.headers;
    }

    // Sets body
    let body = null;
    if (requestInfo.body) {
      body = requestBody;
    }

    // Makes the request
    return await client(url, body, headers);

  } catch (err) {
    const status = err?.response?.status || 'Outro Status';
    const msg = err?.response?.data?.error_description ||
      err?.error ||
      err?.message ||
      err?.response?.data?.error ||
      `Unexpected request error - ${endpoint}`;

    throw new Error(`[${status}] ${msg}`);
  }
}

const _getRequestFunction = {
  get: jsonServer.get,
  post: jsonServer.post,
  put: jsonServer.put,
  delete: jsonServer.delete
}