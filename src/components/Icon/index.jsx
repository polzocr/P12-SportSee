import styles from './index.module.css'
import PropTypes from 'prop-types'

/**
 * component for creating icons
 * @param {String} style color
 * @param {String} icon url
 * @returns {jsx} icon
 */
export default function Icon({icon, style}){
    return (
        <li className={styles[`${style}`]}><img src={icon} alt='' /></li>
    )
}

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired
}