//grab our canvas
    let svg = d3.select("#canvas1");

    //set the width and height
    svg.attr('width',1000)
        .attr('height',1200)





//    / === Scrollytelling boilerplate === //
    function scroll(n, offset, func1, func2){
       const el = document.getElementById(n)
       return new Waypoint({
           element: document.getElementById(n),
           handler: function(direction) {
               direction == 'down' ? func1() : func2();
           },
           //start 75% from the top of the div
           offset: offset
       });
       };
