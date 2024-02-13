import { useState, useEffect } from "react";
// import { getUserPerformance, getUserAverageSessions, getUserActivity, getUser } from '../../service/Api'
import { getUserPerformance, getUserAverageSessions, getUserActivity, getUser } from '../../service/MockedApi'
import FormatAllDatas from '../FormatAllDatas'


/**
 * custom hook to fetch data and format them
 * @param {Number} id of the user
 * @returns {Object, Error } all the datas / error if error happens
 */
export function useFetch(id){
    const [data, setData] = useState()
    const [error, setError] = useState()
    
    useEffect(() => {
        async function fetchData(){
            //trying to resolve all promises
            Promise.allSettled([getUser(id), getUserActivity(id), getUserAverageSessions(id), getUserPerformance(id)])
            
            .then(results => {
                if(results.some((result) => result.status === 'rejected')){
                    throw (results.find((result) => result.status === 'rejected').reason)
                } else {
                    //format the data with constructor class
                    const datas = new FormatAllDatas([results[0].value, results[1].value, results[2].value, results[3].value])
                    setData(datas)
                }  
            })
            .catch(err => {
                setError(err)
            })
            
        }
        fetchData()
        //mocked api
        // const datas = new FormatAllDatas([getUser(id), getUserActivity(id), getUserAverageSessions(id), getUserPerformance(id)])
        // setData(datas)
    }, [id])
    return { data, error }
}