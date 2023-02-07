import { useNavigate } from 'react-router'
import styles from './index.module.css'

export default function Layout() {
    const navigate = useNavigate()

    function navigationTo(number){
        navigate('/' + number)
    }
        
    

    return (
           
        <section id={styles.layout}>
            <button onClick={() => navigationTo(18)} className={styles.buttonLayout}>CECILIA</button>
            <br />
            <button onClick={() => navigationTo(12)} className={styles.buttonLayout}>KARL</button>
        </section>
        
    )
}