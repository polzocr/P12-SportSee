import styles from './index.module.css'
import PropTypes from 'prop-types'


/**
 * keydata component
 * @param {String} number how many 
 * @param {String} number name 
 * @param {String} number url 
 * @returns {jsx} for a keydata element with icon and numbers
 */
export default function Keydata({number,name, icone}){
    return (
        <div className={styles.container}>
            <div className={`${styles.imageContainer} ${styles[`${name}`]}`} >
                <img src={icone} alt='' />
            </div>
            <div className={styles.infosContainer}>
                <p>{number}</p>
                <p>{name}</p>
            </div>            
        </div>
    )
}

Keydata.propTypes = {
    number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icone: PropTypes.string.isRequired,
}