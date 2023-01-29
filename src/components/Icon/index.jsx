import styles from './index.module.css'

export default function Icon({icon, style}){
    return (
        <li className={styles[`${style}`]}><img src={icon} alt='' /></li>
    )
}