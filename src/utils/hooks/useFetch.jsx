import { useState, useEffect } from "react";
import { getUserPerformance, getUserAverageSessions, getUserActivity, getUser } from '../../service/Api'
import FormatAllDatas from '../FormatAllDatas'

export function useFetch(id){
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function fetchData(){
            Promise.allSettled([getUser(id), getUserActivity(id), getUserAverageSessions(id), getUserPerformance(id)])
            .then(result => {
                const datas = new FormatAllDatas([result[0].value, result[1].value, result[2].value, result[3].value])
                setData(datas)
            })
            .catch(err => err)
            
            // const datas = new FormatAllDatas([userData, userActivity, userSessions, userPerformance])
            // setData(datas)
        }
        fetchData()
    }, [])
    return {data}
}