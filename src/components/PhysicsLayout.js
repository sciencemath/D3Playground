import { useEffect, useRef } from "react";
import { select, forceSimulation, forceManyBody, forceCenter } from "d3";

const nodes = Array(5).fill({})

const width = 300
const height = 300
/**
 * 
 * @returns {React.FC}
 */
export const PhysicsLayout = () => {
  const ref = useRef(null)
  const svg = select(ref.current)

  useEffect(() => {
    const forceManySimulation = forceSimulation(nodes)
      .force("charge", forceManyBody().strength(-20))
      .force("center", forceCenter(width / 2, height / 2))
      .on("tick", function() {
        // console.log('tick', svg)
        svg
        .selectAll("g")
        // .selectAll("circle")
        .data(nodes)
        .join("g")
        // .join("circle")
        //   // .style("fill", "white")
        //   .attr("cx", (d) => d.x)
        //   .attr("cy", (d) => d.y)
        //   .attr("r", 5)
    })
  }, [])

  return (
    <div>
      <p>Physics Force Many Body</p>
      <svg ref={ref} width="300" height="300"></svg>
    </div>
  )
}