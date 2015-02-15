// function donationCircles(data){
// 	var svg = d3.select('svg');
// 	console.log("We are in donationCircles");
// 	console.log(data);

// 	d3.json('data.json', function(json){
// 		var organization = svg.selectAll('g')
// 								.data(json.Organization_Name)
// 		console.log(organization);
// 	})

	

// 	var circles = svg.selectAll('circle')
// 						.data(data)
// 						.enter()
// 						.append('circle');

// 	var circles = svg.selectAll('circle')
// 						.data(data)
						
// 						.transition()
// 						.ease("bounce")
// 						//attr adds on per circle because .data iterates through the object's length
// 							.attr('r', function(d){return d*10 + "px"})
// 							.attr('cx', function(){return Math.random()*100 + "%"})
// 							.attr('cy', function(){return Math.random()*100 + "%"})
// 							.style('fill', function(){ return crayola.sample().hex})


// 	svg.selectAll('circle')
// 	.data(data)
// 		.exit()
// 		.remove();
// };

//donationArr is a array of hashes with the name of the organization and the donation amount
function donationCircles(data){
	var svg = d3.select('svg');

	var nodes = svg.append("g")
    
           .attr("class", "nodes")
           .selectAll("circle")
           .data(data)
           .enter()
           // Add one g element for each data node here.
           .append("g")
           // Position the g element like the circle element used to be.
           .attr("transform", function(d, i) {
             // Set d.x and d.y here so that other elements can use it. d is 
             // expected to be an object here.
             d.x = i * 70 + 50,
             d.y = 400 / 2;
             return "translate(" + d.x + "," + d.y + ")"; 
           });

           // Add a circle element to the previously added g element.
	nodes.append("circle")
      .attr("class", "node")
      .attr("r", 20);

// Add a text element to the previously added g element.
	nodes.append("text")
     .attr("text-anchor", "middle")
     .text(function(d) {
       return d.name;
      });
}



