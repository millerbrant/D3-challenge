var svgWidth = 1000;
var svgHeight = 600;

var margin = {
  top: 15,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//Svg wrapper
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .classed("del",true);

// SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var myXaxis = d3.select("#xVal").node().value;
var myYaxis = d3.select("#yVal").node().value;
console.log('X axis value = '+myXaxis)
console.log('Y axis value = '+myYaxis)

// x scale function
function xScaler(state, myXaxis) {
  var xScale = d3.scaleLinear()
    .domain([d3.min(state, d => d[myXaxis]) * 0.9,
      d3.max(state, d => d[myXaxis]) * 1.2
    ])
    .range([0, width]);

  return xScale;}

// y Scale function
function yScaler(state, myYaxis) {
  var yScale = d3.scaleLinear()
    .domain([d3.min(state, d => d[myYaxis]) * 0.9,
      d3.max(state, d => d[myYaxis]) * 1.2
    ])
    .range([height,0]);

  return yScale;

}

// function used for updating circles group with new tooltip
function updateToolTip(myXAxis, circlesGroup) {

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.abbr}<br>${label} ${d[myXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}



// Update chart on parameter change
function updateChart () {d3.csv("../assets/data/data.csv").then(function(state) {
  var myXaxis = d3.select("#xVal").node().value;
  var myYaxis = d3.select("#yVal").node().value;

  d3.selectAll("circle").remove()
  d3.selectAll("g").remove();
  

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  state.forEach(function(sdata){
  // parse data
      //Convert numeric-seeming values to numeric
      sdata.poverty = +sdata.poverty;
      sdata.age = +sdata.age;
      sdata.healthcare = +sdata.healthcare;
      sdata.smokes = +sdata.smokes;
      sdata.obesity = +sdata.obesity;
      sdata.income = +sdata.income;
      console.log(sdata)
      })

  // xLinearScale function above csv import
  var xLinearScale = xScaler(state, myXaxis);

  // Create y scale function
  var yLinearScale = yScaler(state,myYaxis)

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  chartGroup.selectAll("circle").delete
  var circlesGroup = chartGroup.selectAll("circle")
    .data(state)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[myXaxis]))
    .attr("cy", d => yLinearScale(d[myYaxis]))
    .attr("r", 20)
    .attr("fill", "green")
    .attr("opacity", ".5");

    var circleText = chartGroup.append("g")
    .selectAll("text")
    .data(state)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d[myXaxis]))
    .attr("y", d => yLinearScale(d[myYaxis]))
    .attr("fill", "white")
    .attr("font-size", "10px");
    console.log(state[myXaxis])

          // Step 1: Append tooltip div
    var toolTip = d3.select("body")
    .append("div")
    .classed("tooltip", true);

  // Step 2: Create "mouseover" event listener to display tooltip, this is where I stalled out
  // the tool tip html exists, I just couldn't make it act right
  circlesGroup.on("mouseover", function(d) {
    toolTip.style("display", "block")
        .html(
          `<strong>${d.abbr}<strong>`)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px");
  })
    // Step 3: Create "mouseout" event listener to hide tooltip
    .on("mouseout", function() {
      toolTip.style("display", "none");
    });

})}

d3.select("#xVal").on("change",updateChart)
d3.select("#yVal").on("change",updateChart)

updateChart();

