(function() {
//grab our canvas
//    let svg = d3.select("#canvas1");

    //set the width and height

var svg = d3.select('svg')

    svg.attr('width',1000)
        .attr('height',1200)
//
 let grid = () => {
        rects
            .transition()
            .delay((d, i) => 10 * i)
            .duration(400)
            //.style("fill", "black");
        }

    let grid2 = () => {
        rects
            var myimage = svg.append('image')
            .attr('xlink:href', 'https://gbsciences.com/wp-content/uploads/2018/04/Alaska_edited-1.jpg')
            .attr('width', 200)
            .attr('height', 200)

        }
//    let grid3 = () => {
//        rects
//            .transition()
//            .delay((d, i) => 10 * i)
//            .duration(400)
//            .style("fill", (d, i) => (i < 13 && i != 0 ? "blue" : "grey"));
//        }
//
//    let grid4 = () => {
//        rects
//            .transition()
//            .delay((d, i) => 10 * i)
//            .duration(400)
//            .style("fill", (d, i) => (i < 1 ? "green" : "grey"));
//        }
//

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
//
//       //trigger these functions on page scroll
    new scroll('div1', '75%', grid2, grid);  //create a grid for div2
//    new scroll('div3', '75%', grid3, grid2); //create a grid for div3
//    new scroll('div4', '75%', grid4, grid3); //create a grid for div4
//
//    grid();

})();