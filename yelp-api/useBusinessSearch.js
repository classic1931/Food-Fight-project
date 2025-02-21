import { useEffect, useState } from "react";
import * as api from './api'
export function useBusinessSearch(term, location){
    const [businesses, setBusinesses] = useState([]);
    const [amountResults, setAmountResults] = useState();
    const [searchParams, setSearchParams] = useState({term,location});


    useEffect(() =>{
        setBusinesses([]);
        
        const fetchData = async() =>
        {
            try{
                //const rawData = await api.get('/businesses/search', searchParams);
                const rawData = await api.get('/businesses/search', searchParams);
                const resp = await rawData.json();
                setBusinesses(resp.businesses);
                setAmountResults(resp.total)
                
            }catch(e)
            {
                console.error(e)
            }
            //console.log("in getBusinesses",businesses,searchParams);
        }
        fetchData();
    },[searchParams]);
    return [businesses, amountResults, searchParams, setSearchParams];
}