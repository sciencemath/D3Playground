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
					"value": 100
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
		}
	]
};

/**
 * 
 * @returns {React.FC}
 */
export const PackCircles = () => {
  const packedLayout = d3.pack()
    .size([300, 300])
    .padding(10)

  const root = d3.hierarchy(data)
  root.sum((d) => d.value)
  packedLayout(root)

  useEffect(() => {
    const nodes = d3.select(".packed-layout g")
      .selectAll("g")
      .data(root.descendants())
      .join("g")
      .attr("transform", (d) => `translate(${[d.x, d.y]})`)

    nodes
      .append("circle")
      .attr("r", (d) => d.r)
      .style("fill", "rebeccapurple")
      .style("opacity", 0.3)
      .style("stroke", "white")

    nodes
      .append("text")
      .attr("dy", 4)
      .text((d) => !d.children ? d.data.name : '' )

  }, [])

  return (
    <div>
      <p>Packed Layout</p>
      <svg className="packed-layout" width="320" height="320">
        <g></g>
      </svg>
    </div>
  )
}