import { useState } from "react"
import { Link, Outlet } from "react-router-dom"

export default function Layout() {
    const [id, setId] = useState()
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
                    <header>
                        <nav>HEADER</nav>
                    </header>
                    <main>
                        <Outlet context={id} />
                    </main>
                </> )
            }
        </>
    )
}