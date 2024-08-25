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

export const Symbols = () => {
  const symbolGenerator = d3.symbol()
    .type(d3.symbolStar)
    .size(100)

  useEffect(() => {
    d3.select(".symbols g")
      .selectAll("path")
      .data(points)
      .join("path")
      .attr("transform", (d) => `translate(${d})`)
      .attr("d", symbolGenerator())

  }, [])

  return (
    <>
      <div>
        <p>Symbols</p>
        <svg className="symbols" width="700" height="120">
          <g transform="translate(20, 10)"></g>
        </svg>
      </div>
    </>
  )
}