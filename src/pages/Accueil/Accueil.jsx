import { useFetcher, useLoaderData, useOutletContext, useParams, defer, Await } from "react-router-dom"
import { useFetch } from "../../utils/hooks/useFetch"
import Title from "../../components/Title"
import Radar from "../../components/Radar"
import Radial from "../../components/Radial"
import Line from "../../components/Line"
import Bar from "../../components/Bar"
import Keydata from "../../components/Keydata"
import Header from "../../components/Header"
import Error from '../../components/Error'

import calories from '../../assets/keydata/energy.svg'
import proteines from '../../assets/keydata/chicken.svg'
import glucides from '../../assets/keydata/apple.svg'
import lipides from '../../assets/keydata/cheeseburger.svg'

import styles from './index.module.css'
import { getUser, getUserPerformance, getUserAverageSessions, getUserActivity, } from "../../service/Api"
import { Suspense, useEffect } from "react"
import FormatAllDatas from '../../utils/FormatAllDatas'
import UserData from "../../utils/dataFormat/UserData"
import ActivityData from "../../utils/dataFormat/ActivityData"
import SessionsData from "../../utils/dataFormat/SessionsData"
import PerformanceData from "../../utils/dataFormat/PerformanceData"

export default function Accueil(){
    
   const data = useLoaderData()
   
    return (
        
        <>  
            <Header />
            <main className={styles.main}>
                {data && <>
                    <Suspense fallback={<p>Toi</p>}>
                        <Await resolve={data.user} errorElement={<p>Toi</p>}>
                            {(dataUser) => {
                                return <Title firstName={new UserData(dataUser).firstName} />
                            }}
                        </Await>
                    </Suspense>
                    

                    <section id={styles.infosContainer}>
                        <section id={styles.graphContainer}>
                            <section id={styles.barChart}>
                                <Suspense fallback={<p>Loading...</p>}>
                                    <Await resolve={data.activity} errorElement={<p>Erreur de chargement</p>}>
                                    {(dataActivity) => {
                                        return <Bar activity={new ActivityData(dataActivity).sessions} />
                                    }}
                                    </Await>
                                </Suspense>

                                 
                            </section>
                            <section id={styles.otherCharts}>
                                <Suspense fallback={<p>Loading...</p>}>
                                    <Await resolve={data.sessions} errorElement={<p>Erreur de chargement</p>}>
                                        {(dataSessions) => {
                                            return <Line sessions={new SessionsData(dataSessions).sessions} />
                                        }}
                                    </Await>
                                    <Await resolve={data.performance} errorElement={<p>Erreur de chargement</p>}>
                                        {(dataPerformance) => {
                                            // console.log(new PerformanceData(dataPerformance).performance)
                                            return <Radar performance={new PerformanceData(dataPerformance).performance} />
                                        }}
                                    </Await>
                                    <Await resolve={data.user} errorElement={<p>Erreur de chargement</p>}>
                                        {(dataUser) => {
                                            return <Radial score={new UserData(dataUser).score} />
                                        }}
                                    </Await>
                                </Suspense>
                            </section>
                        </section>

                        <section id={styles.keyDatas}>
                            <Await resolve={data.user} errorElement={<p>Erreur de chargement</p>}>
                                {(dataUser) => {
                                    const datas = new UserData(dataUser)
                                    return (
                                    <>
                                        <Keydata
                                            key={`calories`}
                                            number={datas.calorie}
                                            name='Calories'
                                            icone={calories}
                                            color="blue"
                                        />
                                        <Keydata
                                            key={`protéines`}
                                            number={datas.protein}
                                            name='Protéines'
                                            icone={proteines}
                                        />
                                        <Keydata
                                            key={`glucides`}
                                            number={datas.carbohydrate}
                                            name='Glucides'
                                            icone={glucides}
                                        />
                                        <Keydata
                                            key={`lipides`}
                                            number={datas.lipid}
                                            name='Lipides'
                                            icone={lipides}
                                        />
                                    </>)
                                }}
                            </Await>
                        </section>
                    </section>
                </>}
            </main>
             
            
            
            
        </>
    )
}


export async function LoadingApi({params}){
    const {id} = params
    return defer({user: getUser(id), performance: getUserPerformance(id), sessions: getUserAverageSessions(id), activity: getUserActivity(id)})
}