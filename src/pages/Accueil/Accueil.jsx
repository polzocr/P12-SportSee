import { useOutletContext } from "react-router-dom"

export default function Accueil(){
    const id = useOutletContext()
    return (
        
        <>
            <div>ACCUEIL {id}</div>
            <div>ACCUEIL</div>
            <div>ACCUEIL</div>
            <div>ACCUEIL</div>
            <div>ACCUEIL</div>
        </>
    )
}