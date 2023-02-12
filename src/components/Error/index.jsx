import { useNavigate, useOutletContext, useRouteError } from "react-router-dom";
import styles from './index.module.css'


/**
 * error componant
 * @returns {jsx} 
 */
export default function Error() {
    const [id, setId] = useOutletContext()
    const error = useRouteError()
    const navigate = useNavigate()
    
    /**
     * click on the button to reload the page
     * and try to reach datas
     */
    function reloading(){
        setId()
        navigate('/')
    }

    return (
        <section className={styles.error}>
            <h1>{error.status}</h1>
            <h2>{error.statusText || error.message}</h2>
            <button onClick={reloading}>Relancer la machine</button>
        </section>
    )
}