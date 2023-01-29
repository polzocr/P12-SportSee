import { getUserPerformance } from './service/MockedApi'
// import { getUserPerformance } from './service/Api'
import {useEffect} from 'react'

import PerformanceData from './utils/dataFormat/PerformanceData'

function Router() {  
    useEffect(() => {
        async function getData(){
            const result = await getUserPerformance(18)
            const user = new PerformanceData(result)
            console.log(user)
        }
        getData()
    }, [])

    return (
        <div className="Router">
            
        </div>
    );
}

export default Router;
