import { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "../../components/Header"
import styles from './index.module.css'

export default function Layout() {
    const [id, setId] = useState()

    return (
        <>
            {id === undefined ?
                (<section id={styles.layout}>
                    <button onClick={() => setId(18)} className={styles.buttonLayout}>CECILIA</button>
                    <br />
                    <button onClick={() => setId(12)} className={styles.buttonLayout}>KARL</button>
                </section>) :
                (<>
                    <Header />
                    <main className={styles.main}>
                        <Outlet context={id} />
                    </main>
                </> )
            }
        </>
    )
}