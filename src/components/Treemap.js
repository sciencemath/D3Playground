import { useEffect } from "react";
import * as d3 from "d3";

const data = {
	"name": "A1",
	"children": [
		{
			"name": "B1",
			"children": [
				{
					"name": "C1",
					"value": 100,
          "children": [
            {
              "name": "C4",
					    "value": 100,
            }
          ]
				},
				{
					"name": "C2",
					"value": 300
				},
				{
					"name": "C3",
					"value": 200
				}
			]
		},
		{
			"name": "B2",
			"value": 200
		},
    {
			"name": "B3",
			"value": 200
		}
	]
}
/**
 * 
 * @returns {React.FC}
 */
export const Treemap = () => {
  const treemapLayout = d3.treemap()
    .size([400, 200])
    .paddingTop(20)
    .paddingInner(2)
    // .tile(d3.treemapSliceDice) you can use different tiling strategies

  const root = d3.hierarchy(data)
  root.sum((d) => d.value)
  treemapLayout(root)

  useEffect(() => {
    const nodes = d3.select(".tree-map g")
      .selectAll("g")
      .data(root.descendants())
      .join("g")
      .attr("transform", (d) => `translate(${[d.x0, d.y0]})`)

    nodes
      .append("rect")
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .style("fill", "cadetblue")
      .style("stroke", "white")
      .style("opacity", 0.3)
    
    nodes
      .append("text")
      .attr("dx", 4)
      .attr("dy", 14)
      .text((d) => d.data.name)
      .style("fill", "white")

  }, [])

  return (
    <div>
      <p>TreeMap Hierarchy</p>
      <svg className="tree-map" width="420" height="220">
        <g></g>
      </svg>
    </div>
  )
}