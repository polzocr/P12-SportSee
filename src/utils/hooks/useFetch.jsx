import { useState, useEffect } from "react";
import { getUserPerformance, getUserAverageSessions, getUserActivity, getUser } from '../../service/Api'
import FormatAllDatas from '../FormatAllDatas'

export function useFetch(id){
    const [data, setData] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        async function fetchData(){
            Promise.allSettled([getUser(id), getUserActivity(id), getUserAverageSessions(id), getUserPerformance(id)])
            
            .then(results => {
                if(results.some((result) => result.status === 'rejected')){
                    throw (results.find((result) => result.status === 'rejected').reason)
                } else {
                    const datas = new FormatAllDatas([results[0].value, results[1].value, results[2].value, results[3].value])
                    setData(datas)
                }  
            })
            .catch(err => {
                setError(err)
            })
            
        }
        fetchData()
    }, [])
    return {data, error }
}