import * as d3 from "d3";
import { useMount } from "../hooks/useMount";

const data = [55, 15, 20, 30, 45]
const cities = [
  { name: 'London', population: 8674000},
  { name: 'New York', population: 8406000},
  { name: 'Sydney', population: 4293000},
  { name: 'Paris', population: 2244000},
  { name: 'Beijing', population: 11510000}
];

/**
 * To debug select item in dev tool type:
 * $0.__data__
 * This will display the item data
 * 
 * Key functions: if the order of array elements changes 
 * (due to sorting, inserting or removing elements) the array 
 * elements can get joined to different DOM elements.
 * 
 * if your array elements can change position within the 
 * array you should probably use a key function.
 * 
 * Example:
 * .data(array, (d) => d)
 * 
 * @returns {React.Component}
 */
export const DataJoins = () => {

  /**
   * Randomly populates an Array length 1-5
   * from that length fill in a value 1-60
   * 
   * @returns {[]}
   */
  const getData = () =>
    Array.from({ length: Math.ceil(Math.random() * 5) }, () => Math.floor(Math.random() * 60));
  
  /**
   * You can use enter/update/exit on the join
   * method but it is rarely needed if using transitions()
   * 
   * Example:
   * .join((enter) => enter.append('circle').style('opacity', 0),
   *      (update) => update.style('opacity', 1),
   *      (exit) => exit.remove()
   *  )
   */
  const update = () => {
    d3.select(".update")
      .selectAll("circle")
      .data(getData())
      .join("circle")
      .attr("cx", (d, i) => i * 100 + 100)
      .attr("cy", 50)
      .attr("r", (d) => 0.5 * d)
      .style("fill", (d) => d > 30 ? "#663399" : "white")
  }

  /**
   * 
   */
  useMount(() => {
    d3.select('.circles')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr("cx", (d, i) => (i * 100) + 50)
      .attr("cy", 50)
      .attr("r", (d) => 0.5 * d)
      .style("fill", (d) => d > 30 ? "red" : "green")

    d3.select('.cities')
      .selectAll('circle')
      .data(cities)
      .join('circle')
      .attr("cx", (d, i) => (i * 100) + 50)
      .attr("cy", 50)
      .attr("r", (d) => {
        let scaleFactor = 0.000004
        return scaleFactor * d.population
      })
      .style("fill", (d) => d > 30 ? "gray" : "white")

    d3.select(".bars")
      .selectAll("rect")
      .data(cities)
      .join("rect")
      .attr("height", 19)
      .attr("width", (d) => {
        let scaleFactor = 0.00004;
        return d.population * scaleFactor;
      })
      .attr("y", (d, i) => i * 20)
    
    d3.select(".labels")
      .selectAll("text")
      .data(cities)
      .join("text")
      .attr("y", (d, i) => i * 20 + 13)
      .text((d) => d.name)
      .style("fill", "white")

    // non react event, using d3 method
    d3.select("button")
      .on("click", update)

    update()

  }, [])

  return (
    <>
      <div>
        <p>Flat Array Data Joins</p>
        <svg width="500">
          <g className="circles">
          </g>
        </svg>
      </div>
      <div>
        <p>Dictionary Data Joins</p>
        <svg width="500">
          <g className="cities">
          </g>
        </svg>
      </div>
      <div>
        <p>Bar Chart Data Joins</p>
        <svg width="760" height="140">
          <g className="bars" transform="translate(70, 30)"></g>
          <g className="labels" transform="translate(66, 30)"></g>
        </svg>
      </div>
      <div>
        <p>Flat Array w/ update Data Joins</p>
        <svg width="550">
          <g className="update">
          </g>
        </svg>
        <button role="button">Update</button>
      </div>
    </>
  )
}