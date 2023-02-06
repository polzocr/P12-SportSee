import './index.css'
import { useRef } from 'react'
import { useEffect } from 'react'
import {createBarChart} from '../../utils/charts/barChart'

export default function Bar({activity}){

    const svgRef = useRef()

    useEffect(() => {
        
        createBarChart(activity, svgRef)

    }, [])
    
    return (
        <div id='barChart' ref={svgRef}></div>
    )
}
