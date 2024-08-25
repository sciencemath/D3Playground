import { useEffect } from "react"
import * as d3 from "d3";

const data = [
	{day: 1, apricots: 100, bananas: 140, cherries: 105, damsons: 80},
	{day: 2, apricots: 110, bananas: 150, cherries: 105, damsons: 40},
	{day: 3, apricots: 130, bananas: 160, cherries: 115, damsons: 50},
	{day: 4, apricots: 110, bananas: 200, cherries: 110, damsons: 90},
	{day: 5, apricots: 100, bananas: 220, cherries: 105, damsons: 120},
	{day: 6, apricots: 120, bananas: 240, cherries: 105, damsons: 150},
	{day: 7, apricots: 80, bananas: 230, cherries: 105, damsons: 150},
	{day: 8, apricots: 100, bananas: 215, cherries: 110, damsons: 100},
	{day: 9, apricots: 60, bananas: 185, cherries: 105, damsons: 150},
	{day: 10, apricots: 120, bananas: 180, cherries: 130, damsons: 150}
]

const colors = ['#FBB65B', '#FBCF3B', '#de3163', '#4A79A4'];

/**
 * 
 * @returns {React.FC}
 */
export const Stacks = () => {
  const yScale = d3.scaleLinear().domain([0, 800]).range([200, 0])
  const areaGenerator = d3.area()
    .x((d, i) => i * 50)
    .y0((d) => yScale(d[0]))
    .y1((d) => yScale(d[1]))
    .curve(d3.curveCatmullRom);

  const stack = d3.stack()
    .keys(["apricots", "blueberries", "cherries", "damsons"])
    .order(d3.stackOrderInsideOut) // 5 different orders
    .offset(d3.stackOffsetWiggle) // 4 different offsets
  const stackedSeries = stack(data)

  useEffect(() => {
    const g = d3.select(".bar-series g")
      .selectAll("g.series")
      .data(stackedSeries)
      .enter()
      .append("g")
      .classed("series", true)
      .style("fill", (d, i) => colors[i])
    
    g.selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("width", (d) => d[1] - d[0])
      .attr("x", (d) => d[0])
      .attr("y", (d, i) => i * 20)
      .attr("height", 19)

    d3.select(".area-series g")
      .selectAll("path")
      .data(stackedSeries)
      .join("path")
      .style("fill", (d, i) => colors[i])
      .attr("d", areaGenerator)
  }, [])

  return (
    <>
      <div>
        <p>Bar Series</p>
        <svg className="bar-series" width="700" height="200">
          <g></g>
        </svg>
      </div>
      <div>
        <p>Area Series</p>
        <svg className="area-series" width="700" height="200">
          <g transform="translate(20, -50)"></g>
        </svg>
      </div>
    </>
  )
}