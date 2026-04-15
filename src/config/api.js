const API_DOMAIN = "https://gnews.io/api/v4/top-headlines?country=";
const API_SEARCH_DOMAIN = "https://gnews.io/api/v4/search?q=";
const API_KEY = process.env.REACT_APP_API_KEY;;
export const endpointPath = (country, category) =>
  `/api/news?country=${country}&category=${category}`;
export const endpointSearch = (searchQuery) =>
  `/api/news?q=${searchQuery}`;
