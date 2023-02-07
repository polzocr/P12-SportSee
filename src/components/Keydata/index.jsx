import styles from './index.module.css'
import PropTypes from 'prop-types'

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