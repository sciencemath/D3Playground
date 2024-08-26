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
					"size": 100
				},
				{
					"name": "C2",
					"size": 300
				},
				{
					"name": "C3",
					"size": 200
				}
			]
		},
		{
			"name": "B2",
			"size": 200
		}
	]
};

/**
 * 
 * @returns {React.FC}
 */
export const Partitions = () => {
  const partitionLayout = d3.partition()
    .size([400, 200])
    .padding(2)

  const partitionLayoutOrientation = d3.partition()
    .size([200, 400])
    .padding(2)

  const partitionLayoutSunburst = d3.partition()
    .size([2 * Math.PI, 150])

  const arcGenerator = d3.arc()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .innerRadius((d) => d.y0)
    .outerRadius((d) => d.y1)

  const root = d3.hierarchy(data)
  root.sum((d) => d.size)

  const rootOrientation = d3.hierarchy(data)
  rootOrientation.sum((d) => d.size)

  const rootSunburst = d3.hierarchy(data)
  rootSunburst.sum((d) => d.size)

  partitionLayout(root)
  partitionLayoutOrientation(rootOrientation)
  partitionLayoutSunburst(rootSunburst)

  useEffect(() => {
    d3.select(".partition-squares g")
      .selectAll("rect")
      .data(root.descendants())
      .join("rect")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .style("opacity", 0.3)
      .style("fill", "darksalmon")

    d3.select(".partition-swapped g")
      .selectAll("rect")
      .data(rootOrientation.descendants())
      .join("rect")
      .attr("x", (d) => d.y0)
      .attr("y", (d) => d.x0)
      .attr("width", (d) => d.y1 - d.y0)
      .attr("height", (d) => d.x1 - d.x0)
      .style("opacity", 0.3)
      .style("fill", "darksalmon")

    d3.select(".partition-sunburst g")
      .selectAll("path")
      .data(rootSunburst.descendants())
      .join("path")
      .attr("d", arcGenerator)
      .style("stroke", "white")

  }, [])

  return (
    <>
      <div>
        <p>Partition Layout</p>
        <svg className="partition-squares" width="420" height="220">
          <g></g>
        </svg>
      </div>
      <div>
        <p>Partition Oientation swapped</p>
        <svg className="partition-swapped" width="420" height="220">
          <g></g>
        </svg>
      </div>
      <div>
        <p>Partition Sunburst</p>
          <svg className="partition-sunburst" width="320" height="320">
            <g transform="translate(160, 160)"></g>
          </svg>
      </div>
    </>
  )
}