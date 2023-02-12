import { Link } from "react-router-dom";
import styles from './index.module.css'

/**
 * component Error 404 page when url is not found 
 * @returns {jsx}
 */
export default function ErrorPage(){
    return (
        <section id={styles.errorPage}>
            <h1>Erreur 404</h1>
            <Link to='/'>Retourner sur la page d'accueil</Link>
        </section>
    )
}