import { useEffect, useState } from "react";
import * as api from './api'
export function getBusiness(businessId){
    const [business, setBusiness] = useState();
    
    useEffect(() =>{
        const fetchData = async() =>
        {
            try{
                //const rawData = await api.get('/businesses/search', searchParams);
                const rawData = await api.getID('/businesses/', businessId);
                const resp = await rawData.json();
                setBusiness(resp);
            }catch(e)
            {
                console.error(e)
            }
            
        }
        fetchData();
    },[setBusiness]);    
        
    return business;
}