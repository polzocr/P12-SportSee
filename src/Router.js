// import { getUser } from './service/MockedApi'
import { getUser } from './service/Api'
import {useEffect} from 'react'

import UserData from './utils/dataFormat/UserData'

function Router() {  
    useEffect(() => {
        async function getData(){
            const result = await getUser(18)
            const user = new UserData(result)
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
