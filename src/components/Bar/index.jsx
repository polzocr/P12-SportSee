import './index.css'
import * as d3 from 'd3'
import { useRef } from 'react'
import { useEffect } from 'react'

export default function Bar({activity}){
  
// const data = [
//     { day: 1, kilogram: 80, calories: 240 },
//     { day: 2, kilogram: 80, calories: 220 },
//     { day: 3, kilogram: 81, calories: 280 },
//     { day: 4, kilogram: 81, calories: 290 },
//     { day: 5, kilogram: 80, calories: 160 },
//     { day: 6, kilogram: 78, calories: 162 },
//     { day: 7, kilogram: 76, calories: 390 },
// ]

const data = activity


// const svgRef = useRef()

useEffect(() => {
    var container = d3.select('#barChart'),
        width = 820,
        height = 320,
        margin = { top: 30, right: 20, bottom: 30, left: 50 }

    var svg = container
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(0,${margin.top})`);



    var xScale0 = d3.scaleBand()
        .range([0, width - margin.left - margin.right])
        .domain(data.map(d => d.day))
        .padding(0.45)

    var xScale1 = d3.scaleBand()
        .domain(['kilogram', 'calories'])
        .range([0, xScale0.bandwidth()])


    var yScale = d3.scaleLinear()
        .range([height - margin.top - margin.bottom, 50])
        .domain([d3.min(data, d => d.kilogram) - 2, d3.max(data, d => d.kilogram) + 4]);

    var yScale2 = d3.scaleLinear()
        .range([height - margin.top - margin.bottom, 50])
        .domain([0, 400]);



    var xAxis = d3.axisBottom(xScale0).tickSizeOuter(0);
    var yAxis = d3.axisLeft(yScale).ticks(3).tickSizeOuter(0);



    svg.append('line')
        .style("stroke", "#DEDEDE")
        .style("stroke-width", 1)
        .attr("x1", 56)
        .attr("x2", width - margin.left - margin.right - 56)
        .attr("y1", height - margin.top - margin.bottom - 10)
        .attr("y2", height - margin.top - margin.bottom - 10)


    svg.append('line')
        .style("stroke-dasharray", ("3, 3"))
        .style("stroke", "#DEDEDE")
        .style("stroke-width", 1)
        .attr("x1", 56)
        .attr("x2", width - margin.left - margin.right - 56)
        .attr("y1", 155)
        .attr("y2", 155)

    svg.append('line')
        .style("stroke-dasharray", ("3, 3"))
        .style("stroke", "#DEDEDE")
        .style("stroke-width", 1)
        .attr("x1", 56)
        .attr("x2", width - margin.left - margin.right - 56)
        .attr("y1", 60)
        .attr("y2", 60)


    var data_name = svg.selectAll(".data_name")
        .data(data)
        .enter().append("g")
        .attr("class", "data_name")
        .attr("transform", d => `translate(${xScale0(d.day)},0)`);

    /* Add field1 bars */
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

    /* Add field2 bars */
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

    //////// ROUNDED /////////
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


    // Add the X Axis
    svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", `translate(0, 265)`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "yAxis")
        .attr("transform", `translate(780,10)`)

        .call(yAxis);






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

    data_name
        .append('rect')
        .attr('class', 'info-rect')
        .style('opacity', 0)
        .style('fill', '#E60000')
        .attr("x", 70)
        .attr("y", 30)
        .attr('width', 39)
        .attr('height', 63)

    data_name
        .append('text')
        .attr('class', 'info-text')
        .text((d, i) => data[i]?.kilogram + 'Kg')
        .attr('fill', 'white')
        .attr('x', 80)
        .attr('y', 50)


    data_name
        .append('text')
        .attr('class', 'info-text')
        .text((d, i) => data[i]?.calories + 'Kcal')
        .attr('fill', 'white')
        .attr('x', 75)
        .attr('y', 80)



    function mouseover(e, index) {
        d3.select(e.target).style('fill', '')
        d3.selectAll('.info-rect').style("opacity", (d, i) => i === index.day - 1 ? 1 : 0)
    }

    function mouseout() {
        d3.select(this).style('fill', 'none')
        d3.selectAll('.info-rect').style('opacity', 0)
    }

    //// LEGEND /////

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

    //////TITLE///////////  

    svg.append("text")
        .text('Activité quotidienne')
        .attr('class', 'title-legend')
        .attr('x', 50)
        .attr('y', 10)

}, [])
 

  
    return (
        <div id='barChart' ></div>
    )
}









/////////////////////////////////////////////////////////////////////
  // const margin = { top: 20, right: 20, bottom: 40, left: 45 }
    // const svgWidth = 835;
    // const svgHeight = 320;
    // const width = svgWidth - margin.left - margin.right
    // const height = svgHeight - margin.top - margin.bottom

    // const svg = d3
    //     .select('#barChart')
    //     .append('svg')
    //     .attr('width', svgWidth)
    //     .attr('height', svgHeight);

    // const graphArea = svg
    //     .append('g')
    //     .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // const x = d3.scaleBand()
    //     .rangeRound([0, width])
    //     .domain(data.map(d => d.day))
    //     .padding(0.4);

    // const y = d3.scaleLinear()
    //     .range([height, 0])
    //     .domain([
    //         d3.min(data, d => d.calories) - 5,
    //         d3.max(data, d => d.calories) + 5
    //     ])
    //     .nice();

    // const y2 = d3.scaleLinear()
    //     .range([height, 0])
    //     .domain([
    //         d3.min(data, d => d.kilogram) - 5,
    //         d3.max(data, d => d.kilogram) + 5
    //     ])
    //     .nice();

    // const xAxis = d3.axisBottom(x);
    // const yAxis = d3.axisRight(y).ticks(3);;

    // graphArea
    //     .append('g')
    //     .attr('class', 'axis')
    //     .attr('transform', `translate(0, ${height})`)
    //     .call(xAxis);

    // graphArea
    //     .append('g')
    //     .attr('class', 'axis')
    //     .call(yAxis);

    // const rx = 25;
    // const ry = 25;

    // graphArea
    //     .selectAll("bar")
    //     .data(data)
    //     .enter().append("path")
    //     .style("fill", "#c51b8a")
    //     .attr("d", item => `
    //     M${x(item.day)},${y(item.calories) + ry}
    //     a${rx},${ry} 0 0 1 ${rx},${-ry}
    //     h${x.bandwidth() - 2 * rx}
    //     a${rx},${ry} 0 0 1 ${rx},${ry}
    //     v${height - y(item.calories) - ry}
    //     h${-(x.bandwidth())}Z
    //   `).attr("transform", "scale(0.2,1)")

    // // graphArea
    // //     .selectAll("bars")
    // //     .data(data)
    // //     .enter().append("path")
    // //     .style("fill", "blue")
    // //     .attr("d", item => `
    // //     M${x(item.day)},${y2(item.kilogram) + ry}
    // //     a${rx},${ry} 0 0 1 ${rx},${-ry}
    // //     h${x.bandwidth() - 2 * rx}
    // //     a${rx},${ry} 0 0 1 ${rx},${ry}
    // //     v${height - y2(item.kilogram) - ry}
    // //     h${-(x.bandwidth())}Z
    // //   `);