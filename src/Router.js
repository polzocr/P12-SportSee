// import { getUserPerformance } from './service/MockedApi'
import { getUserPerformance, getUserAverageSessions, getUserActivity, getUser } from './service/Api'
import {useEffect, useState} from 'react'

import AllDatas from './utils/AllDatas'

function Router() {  
    const [data, setData] = useState('')
    useEffect(() => {
        async function getData1(){
            const result = await getUser(18)
            return result 
        }
        async function getData2() {
            const result = await getUserActivity(18)
            return result 
        }
        async function getData3() {
            const result = await getUserAverageSessions(18)
            return result 
        }
        async function getData4() {
            const result = await getUserPerformance(18)
            return result 
        }
        async function perform(){
            const un = await getData1()
            const de = await getData2()
            const tr = await getData3()
            const qu = await getData4()
            setData(new AllDatas([un,de,tr,qu]))
        }
        perform()
        

    }, [])
    console.log(data)
    return (
        <div className="Router">
            
        </div>
    );
}

export default Router;
