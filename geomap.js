

//(function() {
//iife - this wraps the code in a function so it isn't accidentally exposed
//to other javascript in other files. It is not required.

    var width=1500, height=1200

      Promise.all([
          d3.json("./topo.json"),
          d3.json("./States.json")

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
              .range(["#F2D7D5", "red"]);

            var keys = stateDictionary.keys();


          var projection = d3.geoAlbersUsa().scale(1300).translate([600, 250])
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
           .style("opacity", 1);
           // .on("mouseover", mouseOver )
           //  .on("mouseleave", mouseLeave );


        var legend = d3.legendColor()
        .labelFormat(d3.format(".2f"))
        .title("LEGEND")
        .scale(blues);

      svg.append("g")
        .call(legend);
      })

