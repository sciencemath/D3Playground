import { useRef } from "react";
import * as d3 from "d3";

import { useMount } from "../hooks/useMount";

/**
 * 
 * @returns {React.Component}
 */
export const Selections = () => {
  const selectionRef = useRef(null)
  const addRemoveRef = useRef(null)

  useMount(() => {
    const selectCurr = selectionRef?.current
    if (!selectCurr) return
    const width = 800;
    const height = 200;

    const selectSvg = d3.select(selectCurr)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${(width / 2) - 200}, ${height / 2})`)

    const cirlces = selectSvg.selectAll('g')
      .data(d3.range(5)).enter()
      .append("circle")
      .attr("cx", (d, i) => i * 100)

    d3.selectAll(cirlces)
      .style("fill", "grey")
      .attr("r", () => Math.floor(10 + Math.random() * 40))
      // non react events - just to test d3 selections
      .on("click", (e) => d3.select(e.target).style("fill", "green"))
      .on("mouseover", (e) => d3.select(e.target).style("fill", "red"))

    const colorAll = (selection) => {
      selection.style("fill", "red")
    }

    d3.selectAll(cirlces)
      .call(colorAll)

    d3.selectAll(cirlces)
      .filter((d, i) => i % 2 === 0)
      .style("fill", "#663399")

  }, [selectionRef])

  useMount(() => {
    const addRemoveCurr = addRemoveRef?.current
    if (!addRemoveCurr) return
    const width = 500;
    const height = 150;

    const addRemoveSvg = d3.select(addRemoveCurr)
      .append("svg")
      .attr("width", width)
      .attr("height", height)

    const groups = addRemoveSvg.selectAll("g")
      .data(d3.range(3)).enter()
      .append("g")
      .attr("className", "item")
      .attr("transform", (d, i) => `translate(${150}, ${((height / 2))})`)

    groups
      .append("circle")
      .attr("cx", (d, i) => i * 100)
      .attr("r", "40")

    groups
      // .append("text")
      // insert works like append but change which element should come before
      .insert("text", "circle")
      .text("1337")
      .style("fill", "white")

    addRemoveSvg
      .select(':first-child')
      .on("mouseout", (e) => d3.select(e.target).remove())

    groups
      // function block here to scope `this`
      .each(function(d, i) {
        let odd = i % 2 === 1

        d3.select(this)
          .style("fill", odd ? '#663399' : '#ddd')
      })

  }, [addRemoveRef])

  return (
    <>
      <p>Selections:</p>
      <div ref={selectionRef}>
        <p>Select by element / mouse events</p>
      </div>
      <div ref={addRemoveRef}>
        <p>Select by Class / add & remove</p>
      </div>
    </>
  )
}