function donationCircles(data){

    var diameter = 960;
    	width = 200;
        height = 400;

    var color = d3.scale.category10();

    var bubble = d3.layout.pack()
    				.size([700,550])
    				.padding(2)
    				.value( function(d){return d.size});

	var svg = d3.select("body")
          .select("#donateBubble")
					.append("svg")
					.style('fill', "black")
					// .attr("id", 'svgBox')
					.attr("width",800)
					.attr("height", 550)
					.attr("class","bubble")
					//This centers the div
					.style({ display: "block",
						"margin-left": 'auto',
						"margin-right": "auto"
					});       

  var node = svg.selectAll(".node")
					  .data(bubble.nodes(data)
    					  .filter(function(d){return !d.children;}))
					  .enter()
					  .append("g")
					  .attr("class","node")
					  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

   node.append("circle")
	       .attr("r", function(d) { return d.r; })
	       .style("fill", function(d) { return color(d.amt) })
	       .style("opacity", ".02")
	       .classed("selected",true)
	       .transition()
	         .duration(2000)
	         .style("fill", function(d) { return color(d.amt)})
	         .style("opacity","05")


   node.append("text")
        .text(function(d) { 
              return d.amt;
        })
        .style("color", "black")
        	// function(d,i) { return color(i)})
        .style("opacity", ".02")
        .style("font-size","0px")



    .transition()
       .duration(2000)
       .style("opacity",1)
       .style("color", "black")
       .style("text-anchor", "middle")
       .style("font-size", function(d) {
            var len = d.name.substring(0, d.r / 3).length;
            var size = d.r/3;
            size *= 8 / len;
            size += 1;
            return Math.round(size)+'px';
        })
         .style({ "font-family":'Arial'})
        .text(function(d) {
            if(d.r >= 10) { return d.amt }
        });


// tool tip example http://bl.ocks.org/ilyabo/1373263
    svg.selectAll("circle")
            .data(data)
            .enter()
            .append("svg:circle")
            .attr("cx", function(d) { console.log("WE ARE IN THE TOOLS SHIT");return x(d.x);})
            .attr("cy", function(d) {return y(d.y)})
            .attr("fill", "red").attr("r", 15)
            .on("mouseover", function() {
              d3.select(this).enter().append("text")
                  .text(function(d) {return d.x;})
                  .attr("x", function(d) {return x(d.x);})
                  .attr("y", function (d) {return y(d.y);}); })
                  .append("svg:title")
                  .text(function(d) { return d.x; });


            //   .data(bubble.nodes(data)
            // .filter(function(d){return !d.children;}))
}

function processData(data) {
   var obj = data
   var newDataSet = [];
   for(var i in obj) {
      newDataSet.push({
      	amt: "$" + obj[i].Total_Amount,
      	name: obj[i].Organization_Name,
      	size: obj[i].Total_Amount 
    });
    }
   return {children: newDataSet};
}
