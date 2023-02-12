import './index.css'
import { useRef } from 'react'
import { useEffect } from 'react'
import {createBarChart} from '../../utils/charts/barChart'
import PropTypes from 'prop-types'


/**
 * component barChart
 * @param {array} activity 
 * @returns {jsx} barchart
 */
export default function Bar({activity}){
    const svgRef = useRef()

    useEffect(() => {
        
        createBarChart(activity, svgRef)

    }, [])
    
    return (
        <div id='barChart' ref={svgRef}></div>
    )
}

Bar.propTypes = {
    activity: PropTypes.arrayOf(PropTypes.exact({
        day: PropTypes.number.isRequired,
        kilogram: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
    }))
}

