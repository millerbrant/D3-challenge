// @TODO: YOUR CODE HERE!
console.log('Hello! app.js running')

// Define frame boundaries
var svgWidth = 1000;
var svgHeight = 700;

var margin = {
  top: 35,
  right: 50,
  bottom: 35,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Read in CSV
var data = d3.csv('assets/data/data.csv').then(function(state) {
    state.forEach(function(sdata){

    //Convert numeric-seeming values to numeric
    sdata.poverty = +sdata.poverty;
    sdata.age = +sdata.age;
    sdata.healthcare = +sdata.healthcare;
    sdata.healthcareHigh = +sdata.healthcareHigh;
    sdata.healthcareLow = +sdata.healthcareLow;
    sdata.income = +sdata.income;
    console.log(sdata)
    })
    console.log(d3.max(state, d=>d.income))

    function xScale(state, xParam) {
        var xLinearScale = d3.scaleLinear()
          .domain([d3.min(hairData, d => d[chosenXAxis]) * 0.8,
            d3.max(hairData, d => d[chosenXAxis]) * 1.2
          ])
          .range([0, width]);
        return xLinearScale;
        }
    var xLinearScale = d3.scaleLinear()
    .domain([20, d3.max(state, d => d.income)])
    .range([0, width]);
    console.log("xLinearScale:")
    console.log(xLinearScale)
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(state, d => d.poverty)])
    .range([height, 0]);
    console.log("yLinearScale:")
    console.log(yLinearScale)
});

    

// }
// );
// console.log(data)

// //console.log(data)
// d3.csv("hairData.csv").then(function(hairData) {

// hairData.forEach(function(data) {
//     data.hair_length = +data.hair_length;
//     data.num_hits = +data.num_hits;