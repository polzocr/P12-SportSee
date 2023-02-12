import styles from './index.module.css'
import PropTypes from 'prop-types'


/**
 * component title of dashboard
 * with first name
 * @param {String} firstName 
 * @returns {jsx} for the title
 */
export default function Title({firstName}){
    return (
        <section className={styles.title}>
            <h1>Bonjour <span>{firstName}</span></h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </section>
    )
}

Title.propTypes = {
    firstName: PropTypes.string.isRequired,
}
