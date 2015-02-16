//How to not make the circles overlap?
//edited the cx/cy math randoms so they do not go off the page too much
//How to put the Organization_Name and Total_Amount inside the circle
//Width and Height are in css file from id tag. They must be set, can't be auto
//How do you make the circle sizes relative to the portion of the total donations received
//We don't want circles too big for popular senators
//Or circles too small for lesser know legislators
function donationCircles(data){

	var svg = d3.select("body").append("svg")
								.style('fill', "#e9656e")
								.attr("id", 'svgBox')
								// .attr("height", 500+"px");

	var circles = svg.selectAll('circle')
						.data(data)
						.enter()
						.append('circle');

	var circlesAttributes = circles
							.data(data, function(amt){
								var donationNum = parseInt(amt.Total_Amount);
								return donationNum; 
							})
								.attr('r', function(d){
									console.log(d)
									return d.Total_Amount/1000 + "px"
								})
								.attr('cx', function(){return (Math.random()*90 + 5) + "%"})
								.attr('cy', function(){return (Math.random()*90 + 5) + "%"})
								.style('fill', "#53e961");

	
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



