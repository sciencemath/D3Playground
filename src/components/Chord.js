import { useEffect } from "react";
import * as d3 from "d3";

const data = [
	[10, 60, 140],
	[140, 60, 85],
	[150, 100, 200]
]

/**
 * NOTE: these only look pretty I would most likely
 * never use this to display any useful data.
 * 
 * @returns {React.FC}
 */
export const Chord = () => {
  const chordGenerator = d3.chord()
    .sortSubgroups(d3.ascending)
    .padAngle(0.04)

  const ribbonGenerator = d3.ribbon().radius(200)
  const chords = chordGenerator(data)

  useEffect(() => {
    d3.select(".chord g")
      .selectAll("path")
      .data(chords)
      .join("path")
      .attr("d", ribbonGenerator)
      .style("fill", "#ddd")
  }, [])

  return (
    <div>
      <p>Chord</p>
      <svg className="chord" width="500" height="500">
        <g transform="translate(250, 250)"></g>
      </svg>
    </div>
  )
}