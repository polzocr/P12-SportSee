import { useOutletContext } from "react-router-dom"
import { useFetch } from "../../utils/hooks/useFetch"
import Title from "../../components/Title"
import Radar from "../../components/Radar"

export default function Accueil(){
    const id = useOutletContext()
    const {data} = useFetch(id)
    console.log(data)
    return (
        
        <>
            <Title firstName={data.firstName}/>
            <Radar />
        </>
    )
}