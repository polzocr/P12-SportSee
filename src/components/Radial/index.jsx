
import './index.css'
import * as d3 from 'd3'
import { useRef } from 'react'


export default function Radial(){

    const width = 258;
    const height = 263;

    const data = [ {
        "count": 30
    }];

    const futurValue = 0.5



    let svg = d3.select("#hello").append("svg")
        .attr("width", width)
        .attr("height", height);




    svg.selectAll(".outerPath")
        .data(data).enter()
        .append("path")
        .each(drawGreyArc)
        .attr('fill', '#f7f7f7')

    function drawGreyArc(d, i) {
        let arc = d3.arc()
            .startAngle(0)
            .endAngle(9)
            .innerRadius(100)
            .outerRadius(88)
            .cornerRadius(5)

        d3.select(this)
            .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
            .attr("d", arc)
    }



    

    svg.selectAll(".outerPath")
        .data(data).enter()
        .append("path")
        .each(drawArc)
        .attr('fill', '#FF0101')


    function drawArc(d, i) {
        let arc = d3.arc()
            .startAngle(0)
            .endAngle(-(futurValue*6.3))
            .innerRadius(100)
            .outerRadius(88)
            .cornerRadius(5)

        d3.select(this)
            .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
            .attr("d", arc)
    }

    
    
    
    return (
        <div id='hello'>
            <p className='percent'>{futurValue*100}%</p>
            <p className='objectif'>de votre objectif</p>
        </div>
    )
}






















