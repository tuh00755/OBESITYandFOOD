

//(function() {
//iife - this wraps the code in a function so it isn't accidentally exposed
//to other javascript in other files. It is not required.

    var width=1000, height=1200

      Promise.all([
          d3.json("./topo.json"),
          d3.json("./States.json")
          //d3.csv("./cities.csv")
        ]).then((data) => {
           const topology = data[0];

           const states = data[1];

           console.log(states);

//           create a dictionary for states and populations
           const stateDictionary = new Map();
           states.forEach((data) =>
           {
            stateDictionary.set(data.name, data.ObesityRate) //note: I renamed it in file
           })
            console.log(stateDictionary);

            var blues = d3.scaleSequential()
              .domain(d3.extent(stateDictionary.values()))
              .range(["white", "steelblue"]);

            var keys = stateDictionary.keys();


          var projection = d3.geoAlbersUsa().scale(700).translate([487.5, 305])
          var path = d3.geoPath(projection);
          const topo = topojson.feature(topology, topology.objects.states)

          const svg = d3.select("#canvas").append('g').attr('transform', 'translate(50,50)');


              let mouseOver = function(d) {
                d3.select(".state")
                .style("opacity", 1)
                d3.select('#tooltip') // add text inside the tooltip div
                   .style('display', 'block') //make it visible
                   .html(`
                       <h1 class="tooltip-title">${stateDictionary.get(d)}</h1>
                       <div>Obesity Rate: ${stateDictionary.get(d)}</div>
               `);

                d3.select(this)
                  .style("opacity", .5)
                  .style("stroke", "black")
              }

              let mouseLeave = function(d) {
                d3.select(".state")
                  .style("opacity", 1)
                  d3.select('#tooltip').style('display', 'none'); // hide tooltip
                d3.select(this)
                    .style("opacity", 1)
                  .style("stroke", "black")
              }

          svg.append("g")
          .selectAll("path")
          .data(topo.features)
          .join("path")
          .attr("d", path)

           .attr("fill", function(d) {
           return blues(stateDictionary.get(d.properties.name));

           })

          .attr("stroke", "black")
          .attr("stroke-width", "1px")
           .style("opacity", 1)
           .on("mouseover", mouseOver )
            .on("mouseleave", mouseLeave );




        // Add one dot in the legend for each name.
        var size = 20
        svg.selectAll("mydots").append("g")
          .data(keys)
          .enter()
          .append("rect")
            .attr("x", 100)
            .attr("y", function(d,i){ return 100 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("width", size)
            .attr("height", size)
            .style("fill", function(d){ console.log(d)
            return blues(stateDictionary.get(d))}
            )


        // Add one dot in the legend for each name.
        svg.selectAll("legend")
          .data(keys)
          .enter()
          .append("text")
//            .attr("x", 100 + size*1.2)
//            .attr("y", function(d,i){ return 100 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return "black"})
            .text(function(d, i){ console.log(d)
            return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");

     })

//
//    //    / === Scrollytelling boilerplate === //
//    function scroll(n, offset, func1, func2){
//       const el = document.getElementById(n)
//       return new Waypoint({
//           element: document.getElementById(n),
//           handler: function(direction) {
//               direction == 'down' ? func1() : func2();
//           },
//           //start 75% from the top of the div
//           offset: offset
//       });
//       };
//})();
