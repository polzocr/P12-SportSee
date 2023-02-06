import * as d3 from 'd3'

/**
 * creating lineChart with a set of data
 * @param {Object} chartData 
 * @param {Object} svgRef 
 */
export function createLineChart(chartData, svgRef){

    const width = 258
    const height = 263

    // scales //
    const xScale = d3.scalePoint()
        .domain(chartData.map(element => element.day))
        .range([0, width])

    const yScale = d3.scaleLinear()
        .domain([d3.min(chartData, (d) => d.sessionLength), d3.max(chartData, (d) => d.sessionLength)])
        .range([height - 50, 100])


    // draw line //
    const line = d3.line()
        .x((d) => xScale(d.day))
        .y((d) => yScale(d.sessionLength))
        .curve(d3.curveMonotoneX)

    d3.select(svgRef.current)
        .select('path')
        .attr('d', () => line(chartData))
        .style('opacity', 0.7)

    
    // X axis //
    const axisScale = d3.scalePoint()
        .domain(chartData.map(element => element.day))
        .range([10, width - 20])

    const xAxis = d3.axisBottom(axisScale)

    d3.select(svgRef.current)
        .append('g')
        .attr('class', 'xAxis')
        .attr('transform', `translate(0, ${height - 40})`)
        .call(xAxis)
        .style('opacity', 0.7)

    //transform the 'm' in 'M' for 'Mercredi'
    d3.selectAll(".tick:nth-of-type(3) text").style('text-transform', 'capitalize')


    //  Tooltip //
    var focusText = d3.select(svgRef.current)
        .append("g")
        .attr('id', 'infos')
        .style("opacity", 0)
    //rectangle-tooltip
    focusText.append("rect")
        .attr('id', 'rect')
        .attr("width", "65")
        .attr("height", '32px')
        .attr('fill', 'white')

    //text-tooltip
    focusText.append("text")
        .style('fill', 'black')
        .attr('id', 'text')

    //circle of focus
    let focus = d3.select(svgRef.current)
        .append('g')
        .append('circle')
        .style("fill", "white")
        .attr("stroke", "white")
        .attr('stroke-width', '10px')
        .attr('stroke-opacity', '0.5')
        .attr('r', 4)
        .style("opacity", 0)

    //container for background color on mouses events
    d3.select(svgRef.current)
        .append('rect')
        .attr('id', 'mouse-rect')
        .style('fill', 'none')
        .style("opacity", 0.1)
        .style("pointer-events", "all")
        .attr('width', width)
        .attr('height', height);
    
    //container for mouses-events
    d3.select(svgRef.current)
        .append('rect')
        .style('fill', 'none')
        .style("pointer-events", "all")
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);
    

    /**
     * shows focus circle and text on hover
     */
    function mouseover() {
        focus.style("opacity", 1)
        focusText.style("opacity", 1)
    }

    /**
     * does the invert of hover position to get the day and shows every infos
     * @param {event} e 
     */
    function mousemove(e) {

        let linearScale = d3.scaleLinear()
            .domain([0, 6])
            .range([0, width])
            .nice()
        
        let xPos = d3.pointer(e)[0]
        let value = linearScale.invert(xPos)
        let i = Math.round(value)
        const selectedData = chartData[i]
        //showing everything
        focus
            .attr("cx", xScale(selectedData?.day))
            .attr("cy", yScale(selectedData?.sessionLength))
        d3.select('#rect')
            .attr("x", xScale(selectedData?.day) + ((i) > 4 ? -75 : 15))
            .attr("y", yScale(selectedData?.sessionLength) - 45)
        d3.select('#text')
            .text(selectedData?.sessionLength + ' min')
            .attr("x", xScale(selectedData?.day) + ((i) > 4 ? -65 : 25))
            .attr("y", yScale(selectedData?.sessionLength) - 25)
        d3.select('#mouse-rect')
            .style('fill', '')
            .attr("width", width - xScale(selectedData?.day))
            .attr('x', xScale(selectedData?.day))


    }
    /**
     * hides everything
     */
    function mouseout() {
        focus.style("opacity", 0)
        focusText.style("opacity", 0)
        d3.select('#mouse-rect')
            .style('fill', 'none')
    }
}


