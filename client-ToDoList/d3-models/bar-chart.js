let totalTasks = [13, 11, 7, 12, 10, 15];
let completedTasks = [7, 9, 1, 4, 6, 13]
let svgWidth = 350;
let barHeight = 35;
let barColors = ['red', 'orange', 'yellowgreen', 'green'];

let x = d3.scale.linear()
    .domain([0, d3.max(totalTasks)])
    .range([0, svgWidth]);

let y = 
d3.select(".total-chart")
  .selectAll("div")
    .data(totalTasks)
  .enter().append("div")
    .classed('bar', true)
    .style("width", function(d) { return x(d) + "px"; })
    .style("height", function(){ return `${barHeight}px` ;})
    .style("background", function(){return `grey`;})
    .text(function(d) { return d; });

d3.select(".completed-chart")
    .selectAll("div")
      .data(completedTasks)
    .enter().append("div")
      .classed('new-bar', true)
      .style("width", function(d) { return x(d) + "px"; })
      .style("height", function(){ return `${barHeight}px` ;})
      .style("background", function(d, index){
          let fillIndex =  Math.ceil((d/totalTasks[index])*4) - 1;
          console.log(fillIndex);
          return `${barColors[fillIndex]}`;
      })
      .text(function(d) { return d; });
