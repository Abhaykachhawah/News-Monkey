// Endpoints for News Proxy
export const endpointPath = (country, category) =>
  `/api/news?country=${country}&category=${category}`;

export const endpointSearch = (searchQuery) =>
  `/api/news?q=${searchQuery}`;
