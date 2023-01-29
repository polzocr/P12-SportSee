import { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import Header from "../../components/Header"

export default function Layout() {
    const [id, setId] = useState(1)
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
                    <main>
                        <Outlet context={id} />
                    </main>
                </> )
            }
        </>
    )
}