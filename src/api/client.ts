import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://api.mediastack.com/v1/";
axios.defaults.params = {
  access_key: "3a1962564d25575fdecc2e6e265b0e6a",
  languages: "en",
  countries: "us,gb",
  sort: "published_desc",
};

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, options?: {}) =>
    axios.get(url, options).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const News = {
  news: (options: {}) => requests.get("news", { params: options }),
};

const client = {
  News,
};

export default client;
