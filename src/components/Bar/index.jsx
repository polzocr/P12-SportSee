import './index.css'
import * as d3 from 'd3'

export default function Bar(){

    // var models = [
    //     {
    //         "model_name": "f1",
    //         "field1": 19,
    //         "field2": 83
    //     },
    //     {
    //         "model_name": "f2",
    //         "field1": 67,
    //         "field2": 93
    //     },
    //     {
    //         "model_name": "f3",
    //         "field1": 10,
    //         "field2": 56
    //     },
    //     {
    //         "model_name": "f4",
    //         "field1": 98,
    //         "field2": 43
    //     }
    // ];

const data = [
    { day: 1, kilogram: 80, calories: 240 },
    { day: 2, kilogram: 80, calories: 220 },
    { day: 3, kilogram: 81, calories: 280 },
    { day: 4, kilogram: 81, calories: 290 },
    { day: 5, kilogram: 80, calories: 160 },
    { day: 6, kilogram: 78, calories: 162 },
    { day: 7, kilogram: 76, calories: 390 },
]

// models = models.map(i => {
//     i.model_name = i.model_name;
//     return i;
// });

var container = d3.select('#barChart'),
    width = 835,
    height = 320,
    margin = { top: 30, right: 20, bottom: 30, left: 50 },
    barPadding = .2

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

// svg
//     .append('rect')
//     .attr('id','mouse-rect')
//     .style('fill', 'none')
//     .style("opacity", 0.1)
//     .style("pointer-events", "all")
//     .attr("x", 40)
//     .attr("y", 60)
//     .attr('width', 70)
//     .attr('height', 190);

svg.append('line')
    .style("stroke", "#DEDEDE")
    .style("stroke-width", 1)
    .attr("x1", 56)
    .attr("x2", width - margin.left - margin.right-56)
    .attr("y1", height - margin.top - margin.bottom -10)
    .attr("y2", height - margin.top - margin.bottom -10)


svg.append('line')
    .style("stroke-dasharray", ("3, 3"))
    .style("stroke", "#DEDEDE")
    .style("stroke-width", 1)
    .attr("x1", 56)
    .attr("x2", width - margin.left - margin.right-56)
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
    .attr("y", d => yScale(d.kilogram)-10)
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
    

// Add the X Axis
svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(0, 265)`)
    .call(xAxis);

svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(810,10)`)
    
    .call(yAxis);
    





    d3.selectAll('.data_name')
        .append('rect')
        .attr('class','mouse-rect')
        .style('fill', 'none')
        .style("opacity", 0.1)
        .style("pointer-events", "all")
        .attr("x", -7)
        .attr("y", 60)
        .attr('width', 70)
        .attr('height', 190)
        .on('mouseover', (e,d) => mouseover(e, d) )
        .on('mouseout', mouseout);

    d3.selectAll('.data_name')
        .append('rect')
        .attr('class', 'info-rect')
        .style('opacity', 0)
        .style('fill', '#E60000')
        .attr("x", 70)
        .attr("y", 30)
        .attr('width', 39)
        .attr('height', 63)

    d3.selectAll('.data_name')
        .append('text')
        .attr('class', 'info-text')
        .text((d, i) => data[i]?.kilogram + 'Kg')
        .attr('fill', 'white')
        .attr('x', 80)
        .attr('y', 50)
        
    
        d3.selectAll('.data_name')
        .append('text')
        .attr('class', 'info-text')
        .text((d, i) => data[i]?.calories + 'Kcal')
        .attr('fill', 'white')
        .attr('x', 75)
        .attr('y', 80)
        
    

    function mouseover(e,index) {
        d3.select(e.target).style('fill', '')
        d3.selectAll('.info-rect').style("opacity", (d, i) => i === index.day - 1 ? 1 : 0)
    }
    
    function mousemove(e) {

        // let xPos = d3.pointer(e, clickArea)[0]
        // let value = linearScale.invert(xPos)
        // let i = Math.floor(value)
        // const selectedData = data[i - 5]
        // focus
        //     .attr("cx", xScale(selectedData.day))
        //     .attr("cy", yScale(selectedData.sessionLength))
        // d3.select('#rect')
        //     .attr("x", xScale(selectedData.day) + ((i - 5) > 4 ? -75 : 15))
        //     .attr("y", yScale(selectedData.sessionLength) - 45)
        // d3.select('#text')
        //     .text(selectedData.sessionLength + ' min')
        //     .attr("x", xScale(selectedData.day) + ((i - 5) > 4 ? -65 : 25))
        //     .attr("y", yScale(selectedData.sessionLength) - 25)
        // d3.select('#mouse-rect')
        //     .style('fill', '')
        //     .attr("width", width - xScale(selectedData.day))
        //     .attr('x', xScale(selectedData.day))


    }
    function mouseout() {
        d3.select(this).style('fill', 'none')
        d3.selectAll('.info-rect').style('opacity', 0)
    }

    // Add the Y Axis
    // svg.append("g")
    //     .attr("class", "y axis")
    //     .call(yAxis);
    // const rx = 12;
    // const ry = 12;
    // svg
    //     .selectAll("bar")
    //     .data(data)
    //     .enter().append("path")
    //     .style("fill", "#c51b8a")
    //     .attr("d", item => `
    //     M${x(item.name)},${y(item.value) + ry}
    //     a${rx},${ry} 0 0 1 ${rx},${-ry}
    //     h${x.bandwidth() - 2 * rx}
    //     a${rx},${ry} 0 0 1 ${rx},${ry}
    //     v${height - y(item.value) - ry}
    //     h${-(x.bandwidth())}Z
    //   `);



  


  
    return (
        <div id='barChart'></div>
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