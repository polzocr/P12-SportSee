import * as d3 from 'd3'

/**
 * draws RadarChart with pentagon form
 * @param {Array} performance 
 * @param {Object} svgRef 
 */
export function createRadarChart(performance, svgRef){

    const widthMax = 258
    const widthMin = 258

    const data = [performance]


    /**
     * draws chart 
     * @param {Object} divId svgRef
     * @param {Number} w width
     * @param {Number} h heigh
     */
    function drawRadarChart(divId, w, h) {

        const RadarChart = {
            /**
             * 
             * @param {Object} id where the svg is build
             * @param {Array} data 
             * @param {Object} options all options for the chart
             */
            draw: function (id, data, options) {
                const config = {
                    w: 200,
                    h: 100,
                    factor: 1,
                    factorLegend: 0.45,
                    levels: 3,
                    maxValue: 0,
                    radians: 2 * Math.PI,
                    opacityArea: 0.001,
                    ToRight: 5,
                    TranslateX: 80,
                    TranslateY: 30,
                    ExtraWidthX: 10,
                    ExtraWidthY: 100,
                };

                //take default values if option === undefined
                if ('undefined' !== typeof options) {
                    for (let i in options) {
                        if ('undefined' !== typeof options[i]) {
                            config[i] = options[i];
                        }
                    }
                }


                //max value
                config.maxValue = Math.max(300, d3.max(data, (i) => d3.max(i.map((o) => o.value))))

                const allAxis = (data[0].map((i, j) => i.kind))
                const total = allAxis.length
                const radius = config.factor * Math.min(config.w / 2, config.h / 2)
               
                // remove possible svg
                d3.select(id)
                    .select("svg").remove()

                // add svg
                let g = d3.select(id)
                    .append("svg")
                    .attr("width", '258px')
                    .attr("height", '265px')
                    .attr("class", "graph-svg-component")

                // circular segments (pentagons)
                for (let j = 0; j < config.levels - 1; j++) {
                    let levelFactor = config.factor * radius * ((j + 1) / config.levels)
                    g.selectAll(".levels")
                        .data(allAxis)
                        .enter()
                        .append("svg:line")
                        .attr("x1", (d, i)  => levelFactor * (1 - config.factor * Math.sin(i * config.radians / total)))
                        .attr("y1", (d, i)  => levelFactor * (1 - config.factor * Math.cos(i * config.radians / total)))
                        .attr("x2", (d, i)  => levelFactor * (1 - config.factor * Math.sin((i + 1) * config.radians / total)))
                        .attr("y2", (d, i)  => levelFactor * (1 - config.factor * Math.cos((i + 1) * config.radians / total))) 
                        .attr("class", "line")
                        .style("stroke", "white")
                        .attr("transform", "translate(" + (config.w / 2 - levelFactor) + ", " + (config.h / 2 - levelFactor) + ")")
                }


                //creates group g for axis
                var axis = g.selectAll(".axis")
                    .data(allAxis)
                    .enter()
                    .append("g")

                // adding text for every corner
                axis.append("text")
                    .attr("class", "legend")
                    .text((d) =>  d)
                    .attr("text-anchor", "middle")
                    .attr("dy", "1.6em")
                    .attr("transform", (d, i) => "translate(0, -10)" )
                    .attr("x", (d, i) => config.w / 2 * (1 - config.factorLegend * Math.sin(i * config.radians / total)) - 60 * Math.sin(i * config.radians / total))
                    .attr("y", (d, i) => config.h / 2 * (1 - Math.cos(i * config.radians / total)) - 20 * Math.cos(i * config.radians / total))

                //creating the chart with the values of data
                data.forEach((y, x) => {
                    const dataValues = [];
                    //getting data scaled value
                    g.selectAll(".nodes")
                        .data(y, (j, i) => {
                            dataValues.push([
                                config.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / config.maxValue) * config.factor * Math.sin(i * config.radians / total)),
                                config.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / config.maxValue) * config.factor * Math.cos(i * config.radians / total))
                            ]);
                        });
                    dataValues.push(dataValues[0]);

                    //creating the form according to values
                    g.selectAll(".area")
                        .data([dataValues])
                        .enter()
                        .append("polygon")
                        .style('fill', "#FF0101")
                        .attr("points", (d) => {
                            let str = "";
                            for (let pti = 0; pti < d.length; pti++) {
                                str = str + d[pti][0] + "," + d[pti][1] + " ";
                            }
                            return str;
                        })
                        .style("fill-opacity", 0.7)
                });






            }
        };

        // Options for the Radar chart, other than default
        var myOptions = {
            w: w,
            h: h,
            ExtraWidthX: 180,
            labelScale: 0.7,
            levels: 6,
            levelScale: 0.85,
            facetPaddingScale: 1.9,
            maxValue: 0.6,
            showAxes: true,
            showAxesLabels: true,
            showLegend: true,
            showLevels: true,
            showLevelsLabels: false,
            showPolygons: true,
            showVertices: true,
        };

        //drawing
        RadarChart.draw(divId, data, myOptions);




    };


    //draws chart
    drawRadarChart(svgRef.current, widthMax, widthMin);
}