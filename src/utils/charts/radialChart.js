import * as d3 from 'd3'

/**
 * creates radial chart with the right score
 * @param {Number} score 
 * @param {Object} svgRef 
 */
export function createRadialChart(score, svgRef){
    const width = 258;
    const height = 263;

    // creates svg with dimensions
    let svg = d3.select(svgRef.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    //const for the grey circle 
    const colorGrey = '#f7f7f7'
    const angleGrey = 9

    //const for the red circle(the real one)
    const colorRed = '#FF0101'
    const angleRed = -(score / 100 * 6.3)

    //call function for drawing circles
    drawArc(colorGrey, angleGrey)
    drawArc(colorRed, angleRed)

    /**
     * draws circle by color and size
     * @param {String} color of circle
     * @param {Number} endAngle size of circle
     */
    function drawArc(color, endAngle) {
        //creates arc
        let arc = d3.arc()
            .startAngle(0)
            .endAngle(endAngle)
            .innerRadius(100)
            .outerRadius(88)
            .cornerRadius(5)
        //calling the arc in the path
        svg.append("path")
            .attr('fill', color)
            .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
            .attr("d", arc)
    }
}