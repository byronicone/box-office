const API_QUERY_ROOT = 'https://api.tvmaze.com';
export async function apiGet(queryString) {
  return fetch(API_QUERY_ROOT + queryString).then(r => r.json());
}
