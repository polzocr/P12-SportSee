import { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import Header from "../../components/Header"
import styles from './index.module.css'

export default function Layout() {
    const [id, setId] = useState(12)
    console.log(id === undefined)
    return (
        <>
            {id === undefined ?
                (<section>
                    <button onClick={() => setId(18)}>CECILIA</button>
                    <br />
                    <button onClick={() => setId(12)}>KARL</button>
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