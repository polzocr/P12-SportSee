import styles from './index.module.css'

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