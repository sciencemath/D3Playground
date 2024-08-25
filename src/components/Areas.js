import { useEffect } from "react";
import * as d3 from "d3";

const points = [
  [0, 80],
  [100, 100],
  [200, 30],
  [300, 50],
  [400, 40],
  [500, 80]
];

const dictPoints = [
  {x: 0, low: 30, high: 80},
  {x: 100, low: 80, high: 100},
  {x: 200, low: 20, high: 30},
  {x: 300, low: 20, high: 50},
  {x: 400, low: 10, high: 40},
  {x: 500, low: 50, high: 80}
]

const radialArea = [
  {angle: 0, r0: 20, r1: 80},
  {angle: Math.PI * 0.25, r0: 20, r1: 40},
  {angle: Math.PI * 0.5, r0: 20, r1: 80},
  {angle: Math.PI * 0.75, r0: 20, r1: 40},
  {angle: Math.PI, r0: 20, r1: 80},
  {angle: Math.PI * 1.25, r0: 20, r1: 40},
  {angle: Math.PI * 1.5, r0: 20, r1: 80},
  {angle: Math.PI * 1.75, r0: 20, r1: 40},
  {angle: Math.PI * 2, r0: 20, r1: 80}
]

/**
 * 
 * @returns {React.FC}
 */
export const Areas = () => {
  const yScale = d3.scaleLinear().domain([0, 100]).range([200, 0])
  const dictAreaGenerator = d3.area()
    .x((d) => d.x)
    .y0((d) => yScale(d.low)) // defines the baseline
    .y1((d) => yScale(d.high)) // defines the top line
  const areaGenerator = d3.area()
    .y0(190)
  const radialAreaGenerator = d3.areaRadial() // uses radius rrather than xy
    .angle((d) => d.angle)
    .innerRadius((d) => d.r0)
    .outerRadius((d) => d.r1)
  const areaPath = areaGenerator(points)
  const dictAreaPath = dictAreaGenerator(dictPoints)
  const radialAreaPath = radialAreaGenerator(radialArea)

  useEffect(() => {
    d3.select(".area path") 
      .attr("d", areaPath)

    d3.select(".area-dict path")
      .attr("d", dictAreaPath)
    
    d3.select(".radial-area path")
      .attr("d", radialAreaPath)
  }, [])

  return (
    <>
      <div>
        <p>Area from array</p>
        <svg className="area" width="700" height="100">
          <g>
            <path style={{fill: "#999"}}></path>
          </g>
        </svg>
      </div>
      <div>
        <p>Area from dict</p>
        <svg className="area-dict" width="700" height="200">
          <g>
            <path style={{fill: "#999"}}></path>
          </g>
        </svg>
      </div>
      <div>
        <p>Radial Area</p>
        <svg className="radial-area" width="700" height="200">
          <g transform="translate(100,100)">
            <path style={{fill: "#999"}}></path>
          </g>
        </svg>
      </div>
    </>
  )
}