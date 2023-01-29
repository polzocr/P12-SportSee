import { useOutletContext } from "react-router-dom"

import Title from "../../components/Title"
import { useFetch } from "../../utils/hooks/useFetch"

export default function Accueil(){
    const id = useOutletContext()
    const {data} = useFetch(id)
    console.log(data)
    return (
        
        <>
            <Title firstName={data.firstName}/>
            <div>ACCUEIL</div>
            <div>ACCUEIL</div>
            <div>ACCUEIL</div>
            <div>ACCUEIL</div>
        </>
    )
}