import styles from './index.module.css'
import PropTypes from 'prop-types'

export default function Icon({icon, style}){
    return (
        <li className={styles[`${style}`]}><img src={icon} alt='' /></li>
    )
}

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired
}