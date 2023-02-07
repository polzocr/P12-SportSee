import { useRouteError } from "react-router-dom";
import './index.module.css'

export default function Error() {
    const error = useRouteError()
    return (
        <section className="error-page">
            <p>{error.status}</p>
            <p>{error.statusText || error.message}</p>
        </section>
    )
}