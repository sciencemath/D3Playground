import { useEffect, useRef } from "react";
import { select, forceSimulation, forceManyBody, forceCenter, range, forceCollide, forceLink } from "d3";

const width = 600
const height = 300

const numNodes = 100
const nodes = [
  {
    id: 'node 1',
    added: false,
    x: width / 2,
    y: height / 2,
  },
  {
    id: 'node 2',
    added: false,
    x: width / 2,
    y: height / 2,
  },
  {
    id: 'node 3',
    added: false,
    x: width / 2,
    y: height / 2,
  },
  {
    id: 'node 4',
    added: false,
    x: width / 2,
    y: height / 2,
  },
  {
    id: 'node 5',
    added: false,
    x: width / 2,
    y: height / 2,
  },
]

var linkedNodes = [
	{id: 0, name: 'A'},
	{id: 1, name: 'B'},
	{id: 2, name: 'C'},
	{id: 3, name: 'D'},
	{id: 4, name: 'E'},
	{id: 5, name: 'F'},
	{id: 6, name: 'G'},
	{id: 7, name: 'H'},
]

const links = [
  {source: 0, target: 1},
  {source: 0, target: 2},
  {source: 0, target: 3},
  {source: 1, target: 6},
  {source: 3, target: 4},
  {source: 3, target: 7},
  {source: 4, target: 5},
  {source: 4, target: 7}
]
/**
 * 
 * @returns {React.FC}
 */
export const PhysicsLayout = () => {
  const ref = useRef(null)
  const collision = useRef(null)
  const linked = useRef(null)
  
  var collisionNodes = range(numNodes).map(function(d) {
    return {radius: Math.random() * 25}
  })
  
  /**
   * Simple Physics
   */
  useEffect(() => {
    if (!ref.current) return
    const svg = select(ref.current)

    const forceManySimulation = forceSimulation(nodes)
    .force('center', forceCenter(width / 2, height / 2))
    .force('charge', forceManyBody().strength(-20))
    .on("tick", () => {
        svg
        .selectAll("circle")
        .data(nodes)
        .join("circle")
          .attr("r", 5)
          .style("fill", "white")
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y)
    })
  }, [ref.current])

  /**
   * Collision physics
   */
  useEffect(() => {
    if (!collision.current) return
    const svg = select(collision.current)

    const simulation = forceSimulation(collisionNodes)
      .force("charge", forceManyBody().strength(5))
      .force("center", forceCenter(width / 2, height / 2 + 50))
      .force("collision", forceCollide().radius((d) => d.radius))
      .on("tick", () => {
        svg
          .selectAll("circle")
          .data(collisionNodes)
          .join("circle")
          .style("fill", "orange")
          .attr("r", (d) => d.radius)
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y)
      })


  }, [collision.current])

  useEffect(() => {
    if (!linked.current) return
    const svg = select(linked.current)

    const simulation = forceSimulation()
      .force("charge", forceManyBody().strength(-100))
      .force("center", forceCenter(400 / 2, 300 / 2))
      .force("link", forceLink().id((d, i) => i).distance(50))
      .on("tick", () => {
        
          // update links
          svg
            .select('.links')
            .selectAll('line')
            .data(links)
            .join('line')
            .attr("class", "link")
            .style("fill", "white")
            .attr('x1', (d) => d.source.x)
            .attr('y1', (d) => d.source.y)
            .attr('x2', (d) => d.target.x)
            .attr('y2', (d) => d.target.y)

          // update nodes
          svg
            .select('.nodes')
            .selectAll('text')
            .data(linkedNodes)
            .attr("class", "node")
            .join('text')
            .text((d) => d.name)
            .style("fill", "white")
            .attr('x', (d) => d.x)
            .attr('y', (d) => d.y)
            // .attr('dy', (d) => 5)
      })

  }, [linked.current])

  return (
    <>
      <div>
        <p>Simple Physics</p>
        <svg ref={ref} width="600" height="300"></svg>
      </div>
      <div>
        <p>Collision Physics</p>
        <svg ref={collision} width="600" height="500"></svg>
      </div>
      <div>
        <p>Linked Physics</p>
        <svg ref={linked} width="400" height="300">
          <g className="links"></g>
          <g className="nodes"></g>
        </svg>
      </div>
    </>
  )
}