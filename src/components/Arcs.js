import { useEffect } from "react";
import * as d3 from "d3";

const arcData = [
	{label: 'A', startAngle: 0, endAngle: 0.2},
	{label: 'B', startAngle: 0.2, endAngle: 0.6},
	{label: 'C', startAngle: 0.6, endAngle: 1.4},
	{label: 'D', startAngle: 1.4, endAngle: 3},
	{label: 'E', startAngle: 3, endAngle: 2* Math.PI}
];

const fruits = [
	{name: 'Apples', quantity: 20},
	{name: 'Bananas', quantity: 40},
	{name: 'Cherries', quantity: 50},
	{name: 'Damsons', quantity: 10},
	{name: 'Elderberries', quantity: 30},
];

/**
 * 
 * @returns {React.FC}
 */
export const Arcs = () => {
  // also comes with accessor methods .startAngle and .endAngle
  const arcGenerator = d3.arc()
    .cornerRadius(6)

  const centroidGenerator = d3.arc()
    .startAngle(d => d.startAngle) // This line could have been omitted. See further below.
    .endAngle(d => d.endAngle) // This line could have been omitted. See further below.		
    .innerRadius(25)
    .outerRadius(100);	

  const pieGenerator = d3.pie();
  const labeledPieGenerator = d3.pie()
    .value((d) => d.quantity)
    .sort((a, b) => a.name.localeCompare(b.name))

  const pieData = pieGenerator([10, 40, 30, 20, 60, 80])
  const labeledData = labeledPieGenerator(fruits)
  /**
   * startAngle, endAngle goes clockwise (radians)
   */
  var pathData = arcGenerator({
    startAngle: 0,
    endAngle: 0.25 * Math.PI,
    innerRadius: 50,
    outerRadius: 100,
  });

  useEffect(() => {
    d3.select(".arc path")
      .attr("d", pathData)

    d3.select(".full g")
      .selectAll("path")
      .data(arcData)
      .join("path")
      .style("fill", "orange")
      .attr("d", d3.arc()
        .innerRadius(20)
        .outerRadius(100)
        .padAngle(.02)
        .padRadius(100)
        .cornerRadius(4)
    )

    d3.select(".centroid g")
      .selectAll("path")
      .data(arcData)
      .join("path")
      .style("fill", "orange")
      .attr("d", centroidGenerator)

    d3.select(".centroid g")
      .selectAll("text")
      .data(arcData)
      .join("text")
      .each(function(d) {
        const centroid = centroidGenerator.centroid(d)
        d3.select(this)
          .attr("x", centroid[0])
          .attr("y", centroid[1])
          .attr("dx", "-0.3em")
          .attr("dy", "0.23em")
          .text(d.label)
          .style("fill", "white")
      })

    d3.select(".pie g")
      .selectAll("path")
      .data(pieData)
      .join("path")
      .attr("d", centroidGenerator)
      .style("fill", "orange")


    d3.select(".labeled-pie g")
      .selectAll("path")
      .data(labeledData)
      .join("path")
      .attr("d", centroidGenerator)
      .style("fill", "orange")

    d3.select(".labeled-pie g")
      .selectAll("text")
      .data(labeledData)
      .join("text")
      .each(function(d) {
        const centroid = centroidGenerator.centroid(d)
        d3.select(this)
          .attr("x", centroid[0])
          .attr("y", centroid[1])
          .attr("dx", "-0.3em")
          .attr("dy", "0.23em")
          .text(d.data.name)
          .style("fill", "white")
      })
  }, [])

  return (
    <>
      <div>
        <p>Arcs</p>
        <svg className="arc" width="700" height="110">
          <g transform="translate(300, 110)">
            <path style={{fill: "orange"}}></path>
          </g>
        </svg>
      </div>
      <div>
        <p>Arcs (full pie)</p>
        <svg className="full" width="700" height="220">
          <g transform="translate(300, 110)">
          </g>
        </svg>
      </div>
      <div>
        <p>Arcs (centroid)</p>
        <svg className="centroid" width="700" height="220">
  	      <g transform="translate(300, 110)"></g>
        </svg>
      </div>
      <div>
        <p>Arcs (pie)</p>
        <svg className="pie" width="700" height="220">
  	      <g transform="translate(300, 110)"></g>
        </svg>
      </div>
      <div>
        <p>Arcs (labeled pie)</p>
        <svg className="labeled-pie" width="700" height="220">
  	      <g transform="translate(300, 110)"></g>
        </svg>
      </div>
    </>
  )
}