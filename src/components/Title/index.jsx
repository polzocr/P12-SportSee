import styles from './index.module.css'

export default function Title({firstName}){
    return (
        <section className={styles.title}>
            <h1>Bonjour <span>{firstName}</span></h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </section>
    )
}