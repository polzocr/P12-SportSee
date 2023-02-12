import { useOutletContext } from "react-router-dom"
import { useFetch } from "../../utils/hooks/useFetch"
import Title from "../../components/Title"
import Radar from "../../components/Radar"
import Radial from "../../components/Radial"
import Line from "../../components/Line"
import Bar from "../../components/Bar"
import Keydata from "../../components/Keydata"

import calories from '../../assets/keydata/energy.svg'
import proteines from '../../assets/keydata/chicken.svg'
import glucides from '../../assets/keydata/apple.svg'
import lipides from '../../assets/keydata/cheeseburger.svg'

import styles from './index.module.css'


/**
 * component Accueil where all datas are shown
 * @returns {jsx} for the dashboad page
 */
export default function Accueil(){
    const [id] = useOutletContext()
    const {data, error} = useFetch(id)
    
    //throwing an error that will be catch by router
    if(error){
        throw error
    }
    return (
        
        <>  
            
             
            {data &&
            (<>
                <Title firstName={data.firstName} />

                <section id={styles.infosContainer}>
                    <section id={styles.graphContainer}>
                        <section id={styles.barChart}>
                            <Bar activity={data.activity} />
                        </section>
                        <section id={styles.otherCharts}>
                            <Line sessions={data.sessions}/>
                            <Radar performance={data.performance}/>
                            <Radial score={data.score}/>
                        </section>
                    </section>

                    <section id={styles.keyDatas}>
                        <Keydata
                            key={`calories`}
                            number={data.keyData.calorieCount}
                            name='Calories'
                            icone={calories}
                            color="blue"
                        />
                        <Keydata
                            key={`protéines`}
                            number={data.keyData.proteinCount}
                            name='Protéines'
                            icone={proteines}
                        />
                        <Keydata
                            key={`glucides`}
                            number={data.keyData.carbohydrateCount}
                            name='Glucides'
                            icone={glucides}
                        />
                        <Keydata
                            key={`lipides`}
                            number={data.keyData.lipidCount}
                            name='Lipides'
                            icone={lipides}
                        />
                    </section>
                </section>
            </>)
            }
            
            
        </>
    )
}