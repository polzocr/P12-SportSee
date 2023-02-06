import './index.css'
import * as d3 from 'd3'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import {createLineChart} from '../../utils/charts/lineCharts'

export default function Line({ sessions }){

    const svgRef = useRef()

    useEffect(() => {

        createLineChart(sessions, svgRef)
      
    }, [])


    return (
        <div id="lineChart">
            <svg id='chart' viewBox='0 0 258 263' ref={svgRef}>
                <path d='' fill='none' stroke='white' strokeWidth='4' />
            </svg>
        </div>
    )
}

