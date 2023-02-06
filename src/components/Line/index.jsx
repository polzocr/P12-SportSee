import './index.css'
import * as d3 from 'd3'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

export default function Line({ sessions }){

    const data = sessions
    
    const width = 258 
    const height = 263 
   
    const [chartData, setChartData] = useState(data)
    const svgRef = useRef()

    useEffect(() => {
        const xScale = d3.scalePoint()
            .domain(chartData.map(element => element.day))
            .range([0,width])
        
        const yScale = d3.scaleLinear()
            // .domain([0, d3.max(chartData, (d) => d.sessionLength)])
            .domain([d3.min(chartData, (d) => d.sessionLength), d3.max(chartData, (d) => d.sessionLength)])
            .range([height-50, 100])

        const line = d3.line()
            .x((d) => xScale(d.day))
            .y((d) => yScale(d.sessionLength))
            .curve(d3.curveMonotoneX)

        d3.select(svgRef.current)
            .select('path')
            .attr('d', () => line(chartData))
            .style('opacity', 0.7)

        //// AXIS X   ////

        const axisScale = d3.scalePoint()
            .domain(chartData.map(element => element.day))
            .range([10, width-20])    

        const xAxis = d3.axisBottom(axisScale)
        
        d3.select(svgRef.current)
            .append('g')
            .attr('class', 'xAxis')
            .attr('transform', `translate(0, ${height - 40})`)
            .call(xAxis)
            .style('opacity', 0.7)
            
        //transform the 'm' in 'M' for 'Mercredi'
        d3.selectAll(".tick:nth-of-type(3) text").style('text-transform', 'capitalize')


        ////////:  TOOLTIP ///////////////
        
    

        var focusText = d3.select(svgRef.current)
        .append("g")
        .attr('id', 'infos')
        .style("opacity", 0)

        focusText.append("rect")
            .attr('id', 'rect')
            .attr("width", "65")
            .attr("height", '32px')
            .attr('fill', 'white')

        focusText.append("text")
            .style('fill', 'black')
            .attr('id', 'text')
        
        // var focusText = d3.select('#infos')

        let focus = d3.select(svgRef.current)
            .append('g')
            .append('circle')
            .style("fill", "white")
            .attr("stroke", "white")
            .attr('stroke-width','10px')
            .attr('stroke-opacity','0.5')
            .attr('r', 4)
            .style("opacity", 0)


        d3.select(svgRef.current)
            .append('rect')
            .attr('id', 'mouse-rect')
            .style('fill', 'none')
            .style("opacity", 0.1)
            .style("pointer-events", "all")
            .attr('width', width)
            .attr('height', height);


        d3.select(svgRef.current)
            .append('rect')
            .style('fill', 'none')
            // .style("opacity", 0.1)
            .style("pointer-events", "all")
            .attr('width', width)
            .attr('height', height)
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseout', mouseout);

            // What happens when the mouse move -> show the annotations at the right positions.
            function mouseover() {
                focus.style("opacity", 1)
                focusText.style("opacity", 1)
            }

            let clickArea = d3.select(svgRef).node()

            let linearScale = d3.scaleLinear()
                .domain([0, 6])
                .range([0, width])
                .nice()

            function mousemove(e) {
                const screenSize = window.screen.width

                let xPos = d3.pointer(e, d3.select(svgRef))[0]
                // console.log("xPos: ", xPos)
                let value = linearScale.invert(xPos)
                let i = Math.floor(value)
                console.log(i)
                // const selectedData = screenSize > 1599 ? data[i-7] : data[i-4]
                const selectedData = data[i-4]
                focus
                    .attr("cx", xScale(selectedData?.day))
                    .attr("cy", yScale(selectedData?.sessionLength))
                d3.select('#rect')
                    .attr("x", xScale(selectedData?.day) + ((i - 5) > 4 ? -75 : 15) )
                    .attr("y", yScale(selectedData?.sessionLength) - 45)
                d3.select('#text')
                    .text(selectedData?.sessionLength + ' min')
                    .attr("x", xScale(selectedData?.day) + ((i-5) > 4 ? -65 : 25) )
                    .attr("y", yScale(selectedData?.sessionLength) - 25)
                d3.select('#mouse-rect')
                    .style('fill', '')
                    .attr("width",  width - xScale(selectedData?.day))
                    .attr('x', xScale(selectedData?.day))

                
            }
            function mouseout() {
                focus.style("opacity", 0)
                focusText.style("opacity", 0)
                d3.select('#mouse-rect')
                    
                    .style('fill', 'none')
            }


       

            
    }, [])





    return (
        <div id="lineChart">
            <svg id='chart' viewBox='0 0 258 263' ref={svgRef}>
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