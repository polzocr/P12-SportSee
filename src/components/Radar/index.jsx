import { useEffect } from "react";
import { useRef } from "react";
import './index.css'
import {createRadarChart} from '../../utils/charts/radarChart'
import PropTypes from 'prop-types'

/**
 * radarchart component
 * @param {Array} performance [{value: number , kind: 'string'}]
 * @returns {jsx} for radarChart
 */
export default function Radar({performance}){
    const svgRef = useRef()
    
    useEffect(() => {

        createRadarChart(performance, svgRef)

    }, [])

    return (
        <div className="radarChart" id="chart-radar" ref={svgRef}></div>
    )
}

Radar.propTypes = {
    activity: PropTypes.arrayOf(PropTypes.exact({
        value: PropTypes.number.isRequired,
        kind: PropTypes.string.isRequired,
    }))
}