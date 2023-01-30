import * as d3 from "d3"
import { useRef } from "react";
import './index.css'

export default function Radar(){
    const svgRef = useRef()
    
    var wMaior = 258;
    var wMenor = 258;

    var json = [
        [
            { "kind": "Intensité", "value": 240 },
            { "kind": "Vitesse", "value": 80 },
            { "kind": "Force", "value": 100 },
            { "kind": "Endurance", "value": 250 },
            { "kind": "Energie", "value": 70 },
            { "kind": "Cardio", "value": 200 },
        ]
    ];
    

    function drawRadarCharts() {
        drawRadarChart('#chart-radar', wMaior, wMenor);
    };

    function drawRadarChart(divId, w, h) {
        

        var RadarChart = {
            draw: function (id, data, options) {
                var cfg = {
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

                if ('undefined' !== typeof options) {
                    for (var i in options) {
                        if ('undefined' !== typeof options[i]) {
                            console.log()
                            cfg[i] = options[i];
                        }
                    }
                }



                cfg.maxValue = Math.max(400, d3.max(data, function (i) { return d3.max(i.map(function (o) { return o.value; })); }));
                var allAxis = (data[0].map(function (i, j) { return i.kind; }));
                var total = allAxis.length;
                var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
                d3.select(id)
                    .select("svg").remove();

                var g = d3.select(id)
                    .append("svg")
                    .attr("width", '258px')
                    .attr("height", '265px')
                    .attr("class", "graph-svg-component")
                    // .append("g")
                    // .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")")
                var tooltip;

                // Circular segments
                for (var j = 0; j < cfg.levels - 1; j++) {
                    var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
                    g.selectAll(".levels")
                        .data(allAxis)
                        .enter()
                        .append("svg:line")
                        .attr("x1", function (d, i) { return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
                        .attr("y1", function (d, i) { return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
                        .attr("x2", function (d, i) { return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total)); })
                        .attr("y2", function (d, i) { return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total)); })
                        .attr("class", "line")
                        
                        .style("stroke", "white")
                        .attr("transform", "translate(" + (cfg.w / 2 - levelFactor) + ", " + (cfg.h / 2 - levelFactor) + ")");
                }

                // Text indicating at what % each level is


                var axis = g.selectAll(".axis")
                    .data(allAxis)
                    .enter()
                    .append("g")
                    // .attr("class", axis)
                    
                    
                    
                    



                axis.append("text")
                    .attr("class", "legend")
                    .text(function (d) { return d; })
                    .attr("text-anchor", "middle")
                    .attr("dy", "1.6em")
                    .attr("transform", function (d, i) { return "translate(0, -10)"; })
                    .attr("x", function (d, i) { return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total); })
                    .attr("y", function (d, i) { return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total); });

                data.forEach(function (y, x) {
                    const dataValues = [];
                    g.selectAll(".nodes")
                        .data(y, function (j, i) {
                            dataValues.push([
                                cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
                                cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
                            ]);
                        });
                    dataValues.push(dataValues[0]);
                    g.selectAll(".area")
                        .data([dataValues])
                        .enter()
                        .append("polygon")
                        .style('fill', "#FF0101")
                        .attr("points", function (d) {
                            var str = "";
                            for (var pti = 0; pti < d.length; pti++) {
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
            w: w
            , h: h
            , ExtraWidthX: 180
            , labelScale: 0.7
            , levels: 6
            , levelScale: 0.85
            , facetPaddingScale: 1.9
            , maxValue: 0.6
            , showAxes: true
            , showAxesLabels: true
            , showLegend: true
            , showLevels: true
            , showLevelsLabels: false
            , showPolygons: true
            , showVertices: true
        };

        RadarChart.draw(divId, json, myOptions);




    };

   

    drawRadarCharts();

    return (
        <div className="radarChart" id="chart-radar" ref={svgRef}>
            {/* <p className="kind before">Intensité</p>
            <p className="kind after">Endurance</p> */}
        </div>
    )
}