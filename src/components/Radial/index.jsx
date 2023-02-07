
import './index.css'
import { useRef } from 'react'
import { useEffect } from 'react'
import {createRadialChart} from '../../utils/charts/radialChart'
import PropTypes from 'prop-types'

export default function Radial({score}){
    
    const svgRef = useRef()
    
    useEffect(() => {

        createRadialChart(score, svgRef)

    }, [])
    
    
    
    return (
        <div id='radial' ref={svgRef}>
            <p className='percent'>{score}%</p>
            <p className='objectif'>de votre objectif</p>
        </div>
    )
}

Radial.propTypes = {
    score: PropTypes.number.isRequired,
}























