
(function() { 
//iife - this wraps the code in a function so it isn't accidentally exposed 
//to other javascript in other files. It is not required.

    var width=800, height=600

    //read in our csv file 
    //read in our json file

    //Part 1:
    //read in our json file
    d3.json("./topo.json").then((data) => { //I renamed the topojson file
      var projection = d3.geoAlbersUsa().scale(700).translate([487.5, 305])
      var path = d3.geoPath(projection);
      const topo = topojson.feature(data, data.objects.states)
      const svg = d3.select("#canvas").append('g').attr('transform', 'translate(50,50)');

       svg.append("g")
       .selectAll("path")
       .data(topo.features)
       .join("path")
         .attr("d", path)
         .attr("fill", 'whitesmoke')
         .attr("stroke", "black")
         .attr("stroke-width", "1px");

     })
})();
