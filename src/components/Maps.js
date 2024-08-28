import { useCallback, useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

const geojson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Africa"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-6, 36], [33, 30], [43, 11], [51, 12], [29, -33], [18, -35], [7, 5], [-17, 14], [-6, 36]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Australia"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[143, -11], [153, -28], [144, -38], [131, -31], [116, -35], [114, -22], [136, -12], [140, -17], [143, -11]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Timbuktu"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-3.0026, 16.7666]
      }
    }
  ]
};

const getJSONData = async () => {
  try {
    // Normally this would come from an env file
    const response = await fetch("http://localhost:5173/data/africa.json")
    return await response.json();
  } catch (error) {
    console.error(error)
  } finally {
    // do any cleanup
  }
}
/**
 * 
 * @returns {React.FC}
 */
export const Maps = () => {
  const ref = useRef(null)
  const canvasref = useRef(null)
  const interactiveRef = useRef(null)
  const mercatorProjection = d3.geoMercator()
    .scale(400)
    .translate([200, 280])
    .center([0, 5])
  const projection = d3.geoEquirectangular()
    .scale(200)
    .translate([200, 150])
  const geoMercatorGenerator = d3.geoPath()
    .projection(mercatorProjection)
  const geoGenerator = d3.geoPath()
    // .pointRadius(20) vary the point radius
    .projection(projection)

  /**
   * @TODO make this more optimized
   */
  const handleMouseOver = useCallback((e, d) => {
    const pixelArea = geoMercatorGenerator.area(d)
    const bounds = geoMercatorGenerator.bounds(d)
    const centroid = geoMercatorGenerator.centroid(d)
    const measure = geoMercatorGenerator.measure(d)

    d3.select(".info")
      .text(`${d.properties.name} (path.area = ${pixelArea.toFixed(1)} path.measure = ${measure.toFixed(1)})`)

    d3.select(".bounding-box rect")
      .attr("x", bounds[0][0])
      .attr("y", bounds[0][1])
      .attr("width", bounds[1][0] - bounds[0][0])
      .attr("height", bounds[1][1] - bounds[0][1])

    d3.select(".centroid")
      .style("display", "inline")
      .attr("transform", `translate(${centroid})`)
  }, [])

  useEffect(() => {
    if(!ref.current) return;
    const svg = d3.select(ref.current)
    svg
      .select("g.map")
      .selectAll("path")
      .data(geojson.features)
      .enter()
      .append("path")
      .attr("d", geoGenerator)

  }, [ref.current])

  useEffect(() => {
    if (!canvasref.current) return
    const context = d3.select(canvasref.current)
      .node()
      .getContext("2d")
    const geoCanvasGenerator = d3.geoPath()
      .projection(projection)
      .context(context)

    context.lineWidth = 0.5;
    context.strokeStyle = "#fff"

    context.beginPath();
    geoCanvasGenerator({type: 'FeatureCollection', features: geojson.features})
    context.stroke()

  }, [canvasref.current])

  useEffect(() => {
    (async () => {
      const data = await getJSONData()
      const svg = d3.select(interactiveRef.current)
        .select("g.map")
        .selectAll("path")
        .data(data.features)

        svg
          .enter()
          .append("path")
          .attr("d", geoMercatorGenerator)
          .on("mouseover", handleMouseOver)
    })()
  }, [interactiveRef.current])

  return (
    <>
      <div>
        <p>SVG Map</p>
        <svg ref={ref} width="800px" height="400px">
          <g className="map"></g>
        </svg>
      </div>
      <div>
        <p>Canvas Map</p>
        <canvas ref={canvasref} width="800" height="400"></canvas>
      </div>
      <div>
        <p>Interactive Map</p>
        <p className="info">Rollover to see more info</p>
        <svg ref={interactiveRef} width="620px" height="600px">
          <g className="map"></g>
          <g className="bounding-box"><rect></rect></g>
          <g className="centroid"><circle r="4"></circle></g>
        </svg>
      </div>
    </>
  )
}