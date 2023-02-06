import * as d3 from 'd3'

/**
 * creating a barChart with a set of data
 * @param {Object} data 
 * @param {Object} svgRef 
 */
export function createBarChart(data, svgRef){

    //container with dimensions
    let container = d3.select(svgRef.current),
        width = 820,
        height = 320,
        margin = { top: 30, right: 20, bottom: 30, left: 50 }

    //creates svg
    let svg = container
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(0,${margin.top})`);



    //scales
    var xScale0 = d3.scaleBand()
        .range([0, width - margin.left - margin.right])
        .domain(data.map(d => d.day))
        .padding(0.45)

    var xScale1 = d3.scaleBand()
        .domain(['kilogram', 'calories'])
        .range([0, xScale0.bandwidth()])

    //kilogram scale
    var yScale = d3.scaleLinear()
        .range([height - margin.top - margin.bottom, 50])
        .domain([d3.min(data, d => d.kilogram) - 2, d3.max(data, d => d.kilogram) + 4]);
    //calories scale
    var yScale2 = d3.scaleLinear() 
        .range([height - margin.top - margin.bottom, 50])
        .domain([0, 400]);



    // xAxis and yAxis
    var xAxis = d3.axisBottom(xScale0).tickSizeOuter(0);
    var yAxis = d3.axisLeft(yScale).ticks(3).tickSizeOuter(0);


    //bottom line
    svg.append('line')
        .style("stroke", "#DEDEDE")
        .style("stroke-width", 1)
        .attr("x1", 56)
        .attr("x2", width - margin.left - margin.right - 56)
        .attr("y1", height - margin.top - margin.bottom - 10)
        .attr("y2", height - margin.top - margin.bottom - 10)

    //middle dot-line
    svg.append('line')
        .style("stroke-dasharray", ("3, 3"))
        .style("stroke", "#DEDEDE")
        .style("stroke-width", 1)
        .attr("x1", 56)
        .attr("x2", width - margin.left - margin.right - 56)
        .attr("y1", 155)
        .attr("y2", 155)

    //top dot-line
    svg.append('line')
        .style("stroke-dasharray", ("3, 3"))
        .style("stroke", "#DEDEDE")
        .style("stroke-width", 1)
        .attr("x1", 56)
        .attr("x2", width - margin.left - margin.right - 56)
        .attr("y1", 60)
        .attr("y2", 60)


    // creates g's for bars with x translate
    let data_name = svg.selectAll(".data_name")
        .data(data)
        .enter().append("g")
        .attr("class", "data_name")
        .attr("transform", d => `translate(${xScale0(d.day)},0)`);

    //creates bars 1
    data_name.selectAll(".bar.kilogram")
        .data(d => [d])
        .enter()
        .append("rect")
        .attr("class", "bar kilogram")
        .style("fill", "#282D30")
        .attr("x", d => xScale1('kilogram') + 10)
        .attr("y", d => yScale(d.kilogram) - 10)
        .attr("width", xScale1.bandwidth() - 15)
        .attr("height", d => {
            return height - margin.top - margin.bottom - yScale(d.kilogram)
        });

    //creates bars 2
    data_name.selectAll(".bar.calories")
        .data(d => [d])
        .enter()
        .append("rect")
        .attr("class", "bar calories")
        .style("fill", "#E60000")
        .attr("x", d => xScale1('calories') + 5)
        .attr("y", d => yScale2(d.calories) + 20)
        .attr("width", xScale1.bandwidth() - 15)
        .attr("height", d => {
            return height - margin.top - margin.bottom - yScale2(d.calories) - 30
        })

   


    // add xAxis and yAxis
    svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", `translate(0, 265)`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "yAxis")
        .attr("transform", `translate(780,10)`)
        .call(yAxis);


    //grey rectangle on hover
    data_name
        .append('rect')
        .attr('class', 'mouse-rect')
        .style('fill', 'none')
        .style("opacity", 0.1)
        .style("pointer-events", "all")
        .attr("x", -7)
        .attr("y", 60)
        .attr('width', 70)
        .attr('height', 190)
        .on('mouseover', (e, d) => mouseover(e, d))
        .on('mouseout', mouseout);

    //infos red rectangle on hover
    data_name
        .append('rect')
        .attr('class', 'info-rect')
        .style('opacity', 0)
        .style('fill', '#E60000')
        .attr("x", 70)
        .attr("y", 30)
        .attr('width', 39)
        .attr('height', 63)

    //infos text Kilogram on hover
    data_name
        .append('text')
        .attr('class', 'info-text')
        .text((d, i) => data[i]?.kilogram + 'Kg')
        .attr('fill', 'white')
        .attr('x', 80)
        .attr('y', 50)

    //infos text Calories on hover
    data_name
        .append('text')
        .attr('class', 'info-text')
        .text((d, i) => data[i]?.calories + 'Kcal')
        .attr('fill', 'white')
        .attr('x', 75)
        .attr('y', 80)


    /**
     * shows all infos and rectangles on hover
     * @param {event} e 
     * @param {Object} index getting index from 'd' object
     */
    function mouseover(e, index) {
        d3.select(e.target).style('fill', '')
        d3.selectAll('.info-rect').style("opacity", (d, i) => i === index.day - 1 ? 1 : 0)
    }

    /**
     * hides every infos on mouseout
     */
    function mouseout() {
        d3.select(this).style('fill', 'none')
        d3.selectAll('.info-rect').style('opacity', 0)
    }

    //creates rounded bars
    data_name
        .append('rect')
        .attr('rx', 5)
        .style('fill', '#282D30')
        .attr('x', 10.2)
        .attr('y', (d) => yScale(d.kilogram) - 15)
        .attr('width', 12.3)
        .attr('height', 10)
    data_name
        .append('rect')
        .attr('rx', 5)
        .style('fill', '#E60000')
        .attr('x', 32.8)
        .attr('y', (d) => yScale2(d.calories) + 15)
        .attr('width', 12.3)
        .attr('height', 10)

    //creates legend
    svg.append("circle")
        .attr("cx", 497)
        .attr("cy", 6)
        .attr("r", 4)
        .style("fill", "#282D30")
    svg.append("text")
        .attr("x", 510)
        .attr("y", 10)
        .text("Poids (kg)")
        .attr('class', 'text-legend')

    svg.append("circle")
        .attr("cx", 607)
        .attr("cy", 6)
        .attr("r", 4)
        .style("fill", "#E60000")
    svg.append("text")
        .attr("x", 620)
        .attr("y", 10)
        .text("Calories brûlées (kCal)")
        .attr('class', 'text-legend')

    //creates title
    svg.append("text")
        .text('Activité quotidienne')
        .attr('class', 'title-legend')
        .attr('x', 50)
        .attr('y', 10)

}
