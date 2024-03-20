import { API_BASE_URL, BEARER_TOKEN } from "./config";
import queryString from 'query-string'

export function get(path, queryParams)
{
    //QUERY STRING {term: 'burgers, location:'berlin'}
    //term=burgers&location=new%20york
    const query = queryString.stringify(queryParams);
    return fetch(`${API_BASE_URL}${path}?${query}`,
        {
             headers:{
                 Authorization:`Bearer ${BEARER_TOKEN}`,
                 Origin: 'localhost',
                 withCredentials: true,
             }
        });
}

export function getID(path,bID)
{
    //QUERY STRING {term: 'burgers, location:'berlin'}
    //term=burgers&location=new%20york
    const query = queryString.stringify({bID});
    return fetch(`${API_BASE_URL}${path}${bID}`,
        {
             headers:{
                 Authorization:`Bearer ${BEARER_TOKEN}`,
                 Origin: 'localhost',
                 withCredentials: true,
             }
        });
}