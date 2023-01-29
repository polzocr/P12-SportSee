import { useState, useEffect } from "react";
import { getUserPerformance, getUserAverageSessions, getUserActivity, getUser } from '../../service/Api'
import FormatAllDatas from '../FormatAllDatas'

export function useFetch(id){
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function fetchData(){
            const userData = await getUser(id)
            const userActivity = await getUserActivity(id)
            const userSessions = await getUserAverageSessions(id)
            const userPerformance = await getUserPerformance(id)
            const datas = new FormatAllDatas([userData, userActivity, userSessions, userPerformance])
            setData(datas)
        }
        fetchData()
    }, [])
    return {data}
}