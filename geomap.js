

(function() {
//iife - this wraps the code in a function so it isn't accidentally exposed
//to other javascript in other files. It is not required.

    var width=1000, height=1200
//
//     d3.json("./topo.json").then((data) => {
//      var projection = d3.geoAlbersUsa().scale(700).translate([487.5, 305])
//      var path = d3.geoPath(projection);
//      const topo = topojson.feature(data, data.objects.states)
//      const svg = d3.select("#canvas").append('g').attr('transform', 'translate(50,50)');
//
//       svg.append("g")
//       .selectAll("path")
//       .data(topo.features)
//       .join("path")
//         .attr("d", path)
//         .attr("fill", 'whitesmoke')
//         .attr("stroke", "black")
//         .attr("stroke-width", "1px");
//
//     })
      Promise.all([
          d3.json("./topo.json"),
          d3.json("./States.json"),
          //d3.csv("./cities.csv")
        ]).then((data) => {
           const topology = data[0];
           //const cities = data[2];
           const states = data[1];

           console.log(states);
           //create a dictionary for states and populations
//           const stateDictionary = new Map();
//           states.forEach((state) =>
//           {
//            stateDictionary.set(state.name, state.ObesityRate) //note: I renamed it in file
//           })
//            console.log(stateDictionary);

//           var blues = d3.scaleSequential()
//              .domain(d3.extent(stateDictionary.values()))
//              .range(["white", "steelblue"]);

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
                       <h1 class="tooltip-title">${data[1].name}</h1>
                       <div>Obesity Rate: ${states.ObesityRate}</div>
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

          .attr("fill", 'BurlyWood')
          .attr("stroke", "black")
          .attr("stroke-width", "1px")
           .style("opacity", 1)
           .on("mouseover", mouseOver )
            .on("mouseleave", mouseLeave );

    })
})();
