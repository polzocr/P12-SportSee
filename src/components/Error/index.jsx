import { useNavigate, useOutletContext, useRouteError } from "react-router-dom";
import styles from './index.module.css'

export default function Error() {
    const [id, setId] = useOutletContext()
    const error = useRouteError()
    const navigate = useNavigate()
    
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