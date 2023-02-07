import styles from './index.module.css'
import { useRouteError } from "react-router-dom";

export default function Error() {
    const error = useRouteError()
    return (
        <section className="error-page">
            <p>{error.status}</p>
            <p><i>{error.statusText || error.message}</i></p>
        </section>
    )
}