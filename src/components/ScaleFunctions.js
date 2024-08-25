/**
 * @TODO visually show one for each type of input/output
 * Continuous -> Continuous
 * Continuous -> Discrete
 * Discrete -> Discrete
 */
import * as d3 from "d3";

/**
 * 
 * @returns {React.FC}
 */
export const ScaleFunctions = () => {
  /**
   * Linearly map domains to ranges
   * y = mx + b
   * (Continuous input -> Continuous output)
   */
  let linearScaler = d3.scaleLinear();
  linearScaler.domain([0, 1]).range([0, 100])
  console.log(
    linearScaler(0), // 0
    linearScaler(0.23), // 23
    linearScaler(0.45), // 45
    linearScaler(0.834), // 83.4
    linearScaler(1), // 100
    linearScaler(2.3) // 229.9
  )

  linearScaler.domain([0, 10]).range(["white", "red"])
  console.log(
    linearScaler(0), // rgb(255, 255, 255)
    linearScaler(3.2), // rgb(255, 173, 173)
    linearScaler(7.5), // rgb(255, 64, 64)
    linearScaler(8), // rgb(255, 51, 51)
    linearScaler(10), // rgb(255, 0, 0)
  )

  /**
   * d3.scaleSqrt().domain([0, 1]).range([0, 100])
   * Creates a square-root based scale that can be used to size circles by area.
   * As apposed to by radius, this is useful for data.
   * 
   * .attr('r', (d) => sqrtScale(d))
   */
  let sqrtScaler = d3.scaleSqrt()
    .domain([0, 100]).range([0, 30])

  console.log(
    sqrtScaler(23), // 14.4
    sqrtScaler(36), // 18
    sqrtScaler(42), // 19.4
    sqrtScaler(59), // 23
    sqrtScaler(73), // 25.6
    sqrtScaler(100), // 30
  )

  /**
   * A more generalized version of d3.scaleSqrt()
   * we can raise an exponent to 0.5 for the same effect
   * d3.scalePow()
   * y = mx^k + b
   * 
   * Same values below will produce the same values as above.
   */
  let powScaler = d3.scalePow()
    .exponent(0.5)
    .domain([0, 100])
    .range([0, 30])

  /**
   * ScaleLog interpolates using a log function.
   * y = m * log(x) + b
   * 
   * can be used for data that is exponention in nature
   */
  let logScalar = d3.scaleLog()
    .domain([10, 100000])
    .range([0, 400])

  console.log(
    logScalar(10), // 0
    logScalar(100), // 100
    logScalar(5000), // 269.9
    logScalar(100000) // 400
  )

  /**
   * ScaleTime is similar to ScaleLinear but domain is time
   * useful for time series data
   */
  let timeScalar = d3.scaleTime()
    .domain([new Date(2020, 0, 1), new Date(2024, 0, 1)])
    .range([0, 700])

  console.log(
    timeScalar(new Date(2022, 0, 1)), // 350.2
    timeScalar(new Date(2023, 5, 28)), // 610.4
    timeScalar(new Date(2024, 0, 1)) // 700
  )

  /**
   * ScaleSequential takes continuous values to an output range
   * or maps it to a custom interpolator
   */
  let sequentialScalar = d3.scaleSequential()
    .domain([0, 100])
    .interpolator(d3.interpolateTurbo)

  console.log(
    sequentialScalar(0), // rgb(35, 23, 27)
    sequentialScalar(25), // rgb(38, 188, 225)
    sequentialScalar(75), // rgb(255, 130, 29)
    sequentialScalar(100) // rgb(144, 12, 0)
  )


  /**
   * You can use .clamp(true) if you pass a value
   * higher or lower than domain it extrapolates the values
   * clamp will stay within the domain
   */
  linearScaler.domain([0, 10]).range([0, 100])
  // 200, 100
  console.log(linearScaler(20), linearScaler(-10))
  linearScaler.clamp(true)
  // 100, 0
  console.log(linearScaler(20), linearScaler(-10))

  /**
   * end and start values from the real data (by using d3.extend)
   * might not be round figures, usually not a prob until you use an axis
   * 
   * .nice() solves this
   */
  let data = [0.243, 0.584, 0.987, 0.153, 0.433];
  let extent = d3.extent(data);

  linearScaler
    .domain(extent)
    .range([0, 100])
    .nice();

  /**
   * if you provide 3 or more values to a domain
   * it will be subdivided into multiple segments
   * could be use for disinguishing -/+ values
   */
  linearScaler = d3.scaleLinear()
    .domain([-10, 0, 10])
    .range(['red', '#ddd', 'blue']);

  console.log(
    linearScaler(-10),
    linearScaler(0),
    linearScaler(5),
  )

  /**
   * invert() given an output you can determine the input
   */
  linearScaler = d3.scaleLinear()
    .domain([0, 10])
    .range([0, 100])
  
  console.log(
    linearScaler.invert(10), // 1
    linearScaler.invert(15), // 1.5
    linearScaler.invert(40), // 4
    linearScaler.invert(100), // 10
    linearScaler.invert(105), // 10.5
  )

  /**
   * NEXT Section continuous input -> discrete output
   */

  /**
   * scaleQuantize simplest example
   * exactly like the section input -> discrete output
   * this clamps!
   */
  let quantizeScalar = d3.scaleQuantize()
    .domain([0, 100])
    .range(["purple", "green", "blue", "pink"])

  console.log(
    quantizeScalar(10), // purple
    quantizeScalar(30), // green
    quantizeScalar(80), // pink
  )

  /**
   * scaleQuantile
   * domain is array of numbers, since we have n equal groups
   * n is the number of range values this is split into 3 groups
   * first 5 pink, next 5 red, last 5 green
   */
  data = [0, 5, 7, 10, 20, 30, 35, 40, 60, 62, 65, 70, 80, 90, 100];
  let quantileScalar = d3.scaleQuantile()
    .domain(data)
    .range(["pink", "red", "green"])

  console.log(
    quantileScalar(26), // pink
    quantileScalar(65), // green
    quantileScalar(30), // red
    // to see where the split points are:
    quantileScalar.quantiles() // [26.66, 63]
  )

  /**
   * scaleThreshold takes n-1 domain split points
   * in this example split 0, 50, 100
   * split: u < 0, 0 <= u < 50, 50 <= u < 100, and u >= 100
   */
  let thresholdScalar = d3.scaleThreshold()
    .domain([0, 50, 100])
    .range(["#eee", "white", "yellow", "black"])
       
  console.log(
    thresholdScalar(-5), // #eee
    thresholdScalar(29), // white
    thresholdScalar(75), // yellow
    thresholdScalar(105), // black
  )

  /**
   * NEXT section discrete -> discrete
   */

  /**
   * scaleOrdinal() takes an array in the domain
   * and maps to the range array, the range will repeat if
   * its shorter than the domain array.
   */
  data = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let ordinalScalar = d3.scaleOrdinal()
    .domain(data)
    .range(['yellow', 'orange', '#eee'])

  console.log(
    ordinalScalar('Jan'), // yellow
    ordinalScalar('Feb'), // orange
    ordinalScalar('Mar'), // #eee
    ordinalScalar('Apr'), // yellow
    // if a value is not in domain implicity get added to domain
    ordinalScalar('Tues'), // yellow
    // ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Tues']
    ordinalScalar.domain()
  )

  // Not the desired result?
  ordinalScalar = d3.scaleOrdinal()
    .domain(data)
    .range(['yellow', 'orange', '#eee'])
  ordinalScalar.unknown("Not a Month")

  console.log(
    ordinalScalar('Tues'), // Not a Month
    // ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    ordinalScalar.domain()
  )

  // preset color schemes
  ordinalScalar = d3.scaleOrdinal()
    .domain(data)
    .range(d3.schemeSpectral)

  /**
   * scaleBand helps with bar charts. With the domain
   * as each bar, the range is the min and max.
   * the output specifies the width and account for padding
   */
  data = ["Mon", "Tue", "Wed", "Thu", "Fri"]
  let bandScalar = d3.scaleBand()
    .domain(data)
    .range([0, 300])

  console.log(
    bandScalar("Mon"), // 0
    bandScalar("Wed"), // 120
    bandScalar("Fri"), // 240
    // width of each band
    bandScalar.bandwidth() // 60
  )
  
  /**
   * We can specify two types of padding:
   * paddingInner and paddingOuter
   * paddingInner: inbetween band
   * paddingOuter: before first and after last band
   */

  // bandScalar.paddingInner(1) matches the range
  bandScalar.paddingInner(0.05)
  console.log(
    bandScalar("Mon"), // 0
    bandScalar("Wed"), // 121.21
    bandScalar("Fri"), // 242.42
    bandScalar.bandwidth() // 57.57
  )

  /**
   * scalePoint just like scaleBand
   * but the data is equally spaced in specified range
   */
  let pointScalar = d3.scalePoint()
    .domain(data)
    .range([0, 650])

  console.log(
    pointScalar("Mon"), // 0
    pointScalar("Wed"), // 325
    pointScalar("Fri"), // 650
    // distance between points
    pointScalar.step() // 162.5
  )

  // outside padding can be applied as a ratio
  pointScalar.padding(0.25)
  console.log(
    pointScalar("Mon"), // 36.1
    pointScalar.step() // 144.4
  )

  return <></>
}