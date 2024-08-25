import { useEffect } from "react";
import * as d3 from "d3";

const points = [
  [0, 80],
  [100, 100],
  [200, 30],
  [300, 50],
  [400, 40],
  [500, 80]
]

const data = [
  {value: 10}, 
	{value: 50}, 
	{value: 30}, 
	{value: 40}, 
	{value: 20}, 
	{value: 70},
	{value: 50}
]

// can also come in the form of a dictionary
// [{a: Math.PI * 0.25, r: 80} ...]
// radialLineGenerator.angle, radialLineGenerator.radius
const radialPoints = [
  [0, 80],
  [Math.PI * 0.25, 80],
  [Math.PI * 0.5, 30],
  [Math.PI * 0.75, 80],
  [Math.PI, 80],
  [Math.PI * 1.25, 80],
  [Math.PI * 1.5, 80],
  [Math.PI * 1.75, 80],
  [Math.PI * 2, 80]
]

/**
 * 
 * @returns {React.FC}
 */
export const Lines = () => {
  const lineGenerator = d3.line()
  // NOTE: There are many types of curve types
  const curveGenerator = d3.line()
    .curve(d3.curveCardinal)
  const canvasGenerator = d3.line()
  const radialGenerator = d3.lineRadial()
  // use .defined if you have missing data points (null)
  const path = lineGenerator(points)
  const curvedPath = curveGenerator(points)

  const xScale = d3.scaleLinear().domain([0, 6]).range([0, 600])
  const yScale = d3.scaleLinear().domain([0, 80]).range([150, 0])
  const lineGeneratorByCoordinate = d3.line()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d.value))
  const line = lineGeneratorByCoordinate(data)
  const radial = radialGenerator(radialPoints)

  useEffect(() => {
    d3.select(".line-array")
      .select("path")
      .attr("d", path)

    d3.select(".line-data")
      .select("g")
      .select("path")
      .attr("d", line)

    d3.select(".curve-data")
      .select("path")
      .attr("d", curvedPath)

    d3.select('.radial')
      .select("g")
      .select("path")
      .attr("d", radial)

    const context = d3.select("canvas")
      .node()
      .getContext("2d")
    canvasGenerator.context(context)

    context.strokeStyle = '#999';
    context.beginPath();
    canvasGenerator(points);
    context.stroke();
  }, [])

  return (
    <>
      <div>
        <p>Line Generator from array</p>
        <svg className="line-array" width="700" height="110">
          <path></path>
        </svg>
      </div>
      <div>
        <p>Line Generator from data</p>
        <svg className="line-data" width="700" height="160">
          <g transform="translate(20, 0)">
            <path></path>
          </g>
        </svg>
      </div>
      <div>
        <p>Curve Generator</p>
        <svg className="curve-data" width="700" height="110">
          <path></path>
       </svg>
      </div>
      <div>
        <p>Canvas Generator</p>
        <canvas></canvas>
      </div>
      <div>
        <p>Radial Generator</p>
        <svg className="radial" width="700" height="200">
          <g transform="translate(100,100)">
            <path></path>
          </g>
        </svg>
      </div>
    </>
  )
}