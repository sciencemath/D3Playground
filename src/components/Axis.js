import { useEffect } from "react";
import * as d3 from "d3";

export const Axis = () => {
  const simpleScale = d3.scaleLinear().domain([0, 100]).range([0, 500])
  const areaScale = d3.scaleLinear().domain([0, 100]).range([0, 400])
  const sqrtScale = d3.scaleSqrt().domain([0, 100]).range([0, 500])
  const logScale = d3.scaleLog().domain([10, 1000]).range([0, 500])
  const timeScale = d3.scaleTime().domain([new Date(2024, 0, 1), new Date(2024, 5, 28)]).range([0, 500])
  const bandScale = d3.scaleBand().domain(["Mon", "Tue", "Wed", "Thu", "Fri"]).range([0, 500])
  const pointScale = d3.scalePoint().domain(["Mon", "Tue", "Wed", "Thu", "Fri"]).range([0, 500])
  const gridScale = d3.scaleLinear().domain([0, 100]).range([0, 300])
  const axis = d3.axisBottom(simpleScale)
  //  .ticks(4, "$.2f") specify label formatting (pass null as second arg its defaulted)
  //  .ticks(20) specify number of ticks
  //  .tickValues([0, 25, 50, 75, 100]) specify tick values
  //  .ticks(4)
  //  .tickFormat((d) => d + "%") specific format
  //  .tickpadding(10) tick size
  //  .tickSize(10) tick size

  const axisLeft = d3.axisLeft(areaScale)
  const axisRight = d3.axisRight(areaScale)
  const axisTop = d3.axisTop(areaScale)
  const axisBottom = d3.axisBottom(areaScale)

  const gridAxis = d3.axisLeft(gridScale)
    .tickSize(500)

  const updateScaleDomain = () => {
    const min = Math.random() * 100
    const max = min + Math.random() * 100

    simpleScale.domain([min, max])
    d3.select(".tansitional-axis g")
      .transition()
      .call(axis)
  }

  useEffect(() => {
    d3.select(".axis g")
      .call(axis)

    d3.select("#left")
      .call(axisLeft)

    d3.select("#right")
      .call(axisRight)

    d3.select("#top")
      .call(axisTop)

    d3.select("#bottom")
      .call(axisBottom)

    d3.select('#sqrt').call(d3.axisBottom().scale(sqrtScale));
    d3.select('#log').call(d3.axisBottom().scale(logScale));
    d3.select('#time').call(d3.axisBottom().scale(timeScale));
    d3.select('#band').call(d3.axisBottom().scale(bandScale));
    d3.select('#point').call(d3.axisBottom().scale(pointScale));

    d3.select(".tansitional-axis g")
      .transition()
      .call(axis)

    d3.select(".grid-svg g.grid-axis")
      .call(gridAxis)
  }, [])

  return (
    <>
      <div>
        <p>Simple Axis</p>
        <svg className="axis" width="600" height="100">
          <g transform="translate(30, 50)">
          </g>
        </svg>
      </div>
      <div>
        <p>Area Axis</p>
        <svg className="area-axis" width="500" height="500">
          <g id="left" transform="translate(30, 40)"></g>
          <g id="right" transform="translate(450, 40)"></g>
          <g id="top" transform="translate(40, 30)"></g>
          <g id="bottom" transform="translate(40, 450)"></g>
        </svg>
      </div>
      <div>
        <p>Multiple Sacled Axis</p>
        <svg width="650" height="300">
          <text x="70" y="80">scaleSqrt</text>
          <g id="sqrt" transform="translate(120, 70)"></g>

          <text x="70" y="130">scaleLog</text>
          <g id="log" transform="translate(120, 120)"></g>

          <text x="70" y="180">scaleTime</text>
          <g id="time" transform="translate(120, 170)"></g>

          <text x="70" y="230">scaleBand</text>
          <g id="band" transform="translate(120, 220)"></g>

          <text x="70" y="280">scalePoint</text>
          <g id="point" transform="translate(120, 270)"></g>
        </svg>
      </div>
      <div>
        <p>Tansitional Axis</p>
        <svg className="tansitional-axis" width="600" height="100">
          <g transform="translate(20, 50)">
          </g>
        </svg>
        <button onClick={updateScaleDomain}>Change scale domain</button>
      </div>
      <div>
        <p>Gird Axis (without the main section)</p>
        <svg className="grid-svg" width="600" height="340">
          <g className="grid-axis" transform="translate(520, 20)"></g>
        </svg>
      </div>
    </>
  )
}