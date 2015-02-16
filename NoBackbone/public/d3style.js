function donationCircles(data){
	console.log(data);
	console.log(data.Total_Amount)
	var svg = d3.select('svg');

	var circles = svg.selectAll('circle')
						.data(data)
						.enter()
						.append('circle');

	var circlesAttributes = circles
						// .data(data.Total_Amount)
							.data(data)
							.attr('r', 100 + "px")
							.attr('cx', function(){return Math.random()*100 + "%"})
							.attr('cy', function(){return Math.random()*100 + "%"})
							.style('fill', '#cc5a62');

	
	// svg.selectAll('circle')
	// 	.data(data)
	// 	.exit()
	// 	.remove();														
}

//donationArr is a array of hashes with the name of the organization and the donation amount

// function donationCircles(data){
// 	var svg = d3.select('svg');

// 	var nodes = svg.append("g")
//            .attr("class", "nodes")
//            .selectAll("circle")
//            .data(data)
//            .enter()
//            // Add one g element for each data node here.
//            .append("g");
//            // Position the g element like the circle element used to be.
				
				

//            // Add a circle element to the previously added g element.
// 	nodes.append("circle")
// 		.attr("class", "node")
// 		.style("fill", "#cc5a62")
// 		.attr('r', function(d){return d*10 + "px"})
// 		.attr('cx', function(){return Math.random()*100 + "%"})
// 		.attr('cy', function(){return Math.random()*100 + "%"});

// // Add a text element to the previously added g element.
// 	nodes.append("text")
// 		.attr("text-anchor", "middle")
// 		.text(function(d) {
// 		return d.Organization_Name;
// 		});

// 	svg.selectAll('circle')
// 		.data(data)
// 		.exit()
// 		.remove();
// };


