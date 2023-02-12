import { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "../../components/Header"
import styles from './index.module.css'


/**
 * component Layout where we can choose the user
 * the Layout of all pages (headers) is here
 * we can choose user by id
 * @returns {jsx}
 */
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
                        <Outlet context={[id, setId]} />
                    </main>
                </> )
            }
        </>
    )
}