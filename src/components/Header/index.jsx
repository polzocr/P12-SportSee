import { NavLink } from 'react-router-dom'
import logo from '../../assets/header/logo.png'
import icon1 from '../../assets/header/nav-1.png'
import icon2 from '../../assets/header/nav-2.png'
import icon3 from '../../assets/header/nav-3.png'
import icon4 from '../../assets/header/nav-4.png'
import styles from './index.module.css'
import Icon from '../Icon'

export default function Header(){
    const icons = [icon1, icon2, icon3, icon4]
    return (
        <header>
            <nav className={styles.nav1}>
                <ul>
                    <li><img src={logo} alt="logo SportSee"/></li>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? styles.active : styles.inactive}>Accueil</NavLink></li>
                    <li><NavLink to="/profil" className={({ isActive }) => isActive ? styles.active : styles.inactive}>Profil</NavLink></li>
                    <li><NavLink to="*" className={({ isActive }) => isActive ? styles.active : styles.inactive}>Réglage</NavLink></li>
                    <li><NavLink to="*" className={({ isActive }) => isActive ? styles.active : styles.inactive}>Communauté</NavLink></li>
                </ul>
            </nav>
            <nav className={styles.nav2}>
                <ul>
                    {icons.map((icon, index) => {
                        return <Icon 
                                    key={index} 
                                    icon={icon}
                                    style="nav"
                                />
                    })}
                </ul>
                <p>Copiryght, SportSee 2020</p>
            </nav>
            {/* <p className={styles.copyright}>Copiryght, SportSee 2020</p> */}
        </header>
    )
}