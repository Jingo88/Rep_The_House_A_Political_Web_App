//How to not make the circles overlap?
//edited the cx/cy math randoms so they do not go off the page too much
//How to put the Organization_Name and Total_Amount inside the circle
//Width and Height are in css file from id tag. They must be set, can't be auto
//How do you make the circle sizes relative to the portion of the total donations received
//We don't want circles too big for popular senators
//Or circles too small for lesser know legislators
// function donationCircles(data){

// 	var svg = d3.select("body").append("svg")
// 								.style('fill', "#e9656e")
// 								.attr("id", 'svgBox')
// 								// .attr("height", 500+"px");

// 	var circles = svg.selectAll('circle')
// 						.data(data)
// 						.enter()
// 						.append('circle');

// 	var circlesAttributes = circles
// 							.data(data, function(amt){
// 								var donationNum = parseInt(amt.Total_Amount);
// 								return donationNum; 
// 							})
// 								.attr('r', function(d){
// 									console.log(d)
// 									return d.Total_Amount/1000 + "px"
// 								})
// 								.attr('cx', function(){return (Math.random()*90 + 5) + "%"})
// 								.attr('cy', function(){return (Math.random()*90 + 5) + "%"})
// 								.style('fill', "#53e961");

	
// 	// svg.selectAll('circle')
// 	// 	.data(data)
// 	// 	.exit()
// 	// 	.remove();														
// }

//donationArr is a array of hashes with the name of the organization and the donation amount

//d3.format will help to standardize the numbers being brought in
//d3.scale.category20c() constructs a new ordinal scale with a range of 20 different colors
//d3.scale.ordinal() creates a new ordinal scale with an empty domain and range. 
//d3.layout.pack() - create a new pack with default settings. what the fuck does that mean?
//do they use layout pack to create a new bubble with default settings everytime?


function donationCircles(data){

//diameter / format / color are all different variables, you don't need to use "var" everywhere in d3
	var diameter = 960,
	    format = d3.format("$"),
	    color = d3.scale.category20c();

	var bubble = d3.layout.pack()
	    .sort(null)
	    .size([diameter, diameter])
	    .padding(1.5);

	// Create the svg box and append it to the body
	var svg = d3.select("body").append("svg")
	    .attr("width", diameter)
	    .attr("height", diameter)
	    .attr("class", "bubble");

	//we do not need a .json because we are not making a GET request to a url or a file
	// d3.json("flare.json", function(error, root) {

	  var node = svg.selectAll(".node")

						.data(bubble.nodes(classes(root)) // what is classes(root)
						.filter(function(d) { return !d.children; }))
				// Filters the selection, returning a new selection that contains 
				// only the elements for which the specified selector is true. 
				// The .data and .filter are chained together
	
	// "g" is not specific to d3. it is an SVG element 
	//<g> is used to group SVG shapes together
	    .enter().append("g")
	      .attr("class", "node")
	      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

	  node.append("title")
	      .text(function(d) { return d.className + ": " + format(d.value); });

	  node.append("circle")
	      .attr("r", function(d) { return d.r; })
	      .style("fill", function(d) { return color(d.packageName); });

	  node.append("text")
	      .attr("dy", ".3em")
	      .style("text-anchor", "middle")
	      .text(function(d) { return d.className.substring(0, d.r / 3); });
	// });

	// Returns a flattened hierarchy containing all leaf nodes under the root.
	function classes(root) {
	  var classes = [];

	  function recurse(name, node) {
	    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
	    else classes.push({packageName: name, className: node.name, value: node.size});
	  }

	  recurse(null, root);
	  return {children: classes};
	}

	d3.select(self.frameElement).style("height", diameter + "px");
}