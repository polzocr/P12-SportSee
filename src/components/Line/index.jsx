import './index.css'
import * as d3 from 'd3'
import { useState } from 'react'
import { useEffect } from 'react'
import { element } from 'prop-types'
import { useRef } from 'react'

export default function Line(){
    const data = [
        { day: 'L', sessionLength: 30 },
        { day: 'M', sessionLength: 23 },
        { day: 'm', sessionLength: 45 },
        { day: 'J', sessionLength: 20 },
        { day: 'V', sessionLength: 40 },
        { day: 'S', sessionLength: 100 },
        { day: 'D', sessionLength: 60 },
    ]
    
    const width = 258 
    const height = 263 
    const padding = 20;
    const maxValue = 100; //max data value
   
    const [chartData, setChartData] = useState(data)
    const svgRef = useRef()

    useEffect(() => {
        const xScale = d3.scalePoint()
            .domain(chartData.map(element => element.day))
            .range([0,width])
        
        const yScale = d3.scaleLinear()
            // .domain([0, d3.max(chartData, (d) => d.sessionLength)])
            .domain([0, 120])
            .range([height, 0])

        const line = d3.line()
            .x((d) => xScale(d.day))
            .y((d) => yScale(d.sessionLength))
            .curve(d3.curveBasis)

        d3.select(svgRef.current)
            .select('path')
            .attr('d', () => line(chartData))

            
        const xAxis = d3.axisBottom(xScale)
        
            

        d3.select(svgRef.current)
            .append('g')
            .attr('class', 'xAxis')
            .attr('transform', `translate(0, ${height - 40})`)
            // .attr('letter-spacing', '-15px')
            .call(xAxis)
            

        d3.select('text').attr('letter-spacing', '-15px')
        d3.selectAll(".tick:last-of-type text").attr('letter-spacing', '20px')
            
    }, [])





    return (
        <div id="lineChart">
            <svg id='chart' viewBox='0 0 258 263' ref={svgRef}>
                <rect width="258" height='263' fill='red'></rect>
                <path d='' fill='none' stroke='white' strokeWidth='4' />
            </svg>
        </div>
    )
}

// append the svg object to the body of the page
// var svg = d3.select("#lineChart")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .append("g")
        // .attr("transform",
        //     "translate(" + margin.left + "," + margin.top + ")");

    //Read the data


// var x = d3.scalePoint()
//     .domain(data.map((d) => d.day))
//     .range([0, width]);
// svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x));

// // Add Y axis
// var y = d3.scaleLinear()
//     .domain([0, d3.max(data, (d) => d.sessionLength)])
//     .range([height, 0]);


// // This allows to find the closest X index of the mouse:
// var bisect = d3.bisector(function (d) { return d.x; }).left;

// // Create the circle that travels along the curve of chart
// var focus = svg
//     .append('g')
//     .append('circle')
//     .style("fill", "none")
//     .attr("stroke", "black")
//     .attr('r', 8.5)
//     .style("opacity", 0)

// // Create the text that travels along the curve of chart
// var focusText = svg
//     .append('g')
//     .append('text')
//     .style("opacity", 0)
//     .attr("text-anchor", "left")
//     .attr("alignment-baseline", "middle")

// // Add the line
// svg
//     .append("path")
//     .datum(data)
//     .attr("fill", "none")
//     .attr("stroke", "black")
//     .attr("stroke-width", 1.5)
//     .attr("d", d3.line()
//         .x(function (d, i) { return x(i) })
//         .y(function (d) { return -1 * y(d.sessionLength) })
//     )

// // Create a rect on top of the svg area: this rectangle recovers mouse position
// svg
//     .append('rect')
//     .style("fill", "none")
//     .style("pointer-events", "all")
//     .attr('width', width)
//     .attr('height', height)
//     .on('mouseover', mouseover)
//     .on('mousemove', mousemove)
//     .on('mouseout', mouseout);


// // What happens when the mouse move -> show the annotations at the right positions.
// function mouseover() {
//     focus.style("opacity", 1)
//     focusText.style("opacity", 1)
// }

// function mousemove() {
//     // recover coordinate we need
//     var x0 = x.invert(d3.pointer(this)[0]);
//     var i = bisect(data, x0, 1);
//     const selectedData = data[i]
//     focus
//         .attr("cx", x(selectedData.x))
//         .attr("cy", y(selectedData.y))
//     focusText
//         .html("x:" + selectedData.x + "  -  " + "y:" + selectedData.y)
//         .attr("x", x(selectedData.x) + 15)
//         .attr("y", y(selectedData.y))
// }
// function mouseout() {
//     focus.style("opacity", 0)
//     focusText.style("opacity", 0)
// }