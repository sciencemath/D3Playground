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
export const Trees = () => {
  const treeLayout = d3.tree()
    .size([400, 200])
  const root = d3.hierarchy(data)
  // clusterLayout(root) allows for same depth leaf nodes
  treeLayout(root)

  useEffect(() => {
    d3.select(".tree g.nodes")
      .selectAll("circle.node")
      .data(root.descendants())
      .join("circle")
      .classed("node", true)
      .style("fill", "blue")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 4)

    d3.select(".tree g.links")
      .selectAll("line.link")
      .data(root.links())
      .join("line")
      .classed("link", true)
      .style("stroke", "white")
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y)

  }, [])

  return (
    <>
      <div>
        <p>Tree Hierarchy</p>
        <svg className="tree" width="400" height="220">
          <g transform="translate(5, 5)">
            <g className="links"></g>
            <g className="nodes"></g>
          </g>
        </svg>
      </div>
    </>
  )
}