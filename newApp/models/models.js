//models are like constructors - pass in information from the JSON api
//You will need multiple models and an equal number of collections
//currently thinking three models - organize how you want your code to be divded

var Legislator = Backbone.Model.extend({

})

var userSearch = new Legislator({

    // firstName: senatorObj.results[0].first_name;
    // lastName: senatorObj.results[0].last_name;
    // stateTwo: senatorObj.results[0].state;
    // partyOne: partyInfo(senatorObj.results[0].party);
    // gender: genderInfo(senatorObj.results[0].gender);
    // termS: senatorObj.results[0].term_start;
    // termE: senatorObj.results[0].term_end;
    // chamber: chamberInfo(results[0].chamber);
    // title: titleInfo(results[0].title);
    // twitter:"@" + senatorObj.results[0].twitter_id;
})

// var Pet = Backbone.Model.extend({
// 	//sets defaults - used for validation
// 	defaults: {
// 		name: "T-1000",
// 		type: "Terminator"
// 	}, //this makes the pet
// 	initialize: function(){
// 		console.log("your pet has been created");
// 		this.on("change", function(){
// 			console.log("something is afoot"); 
// 		}); this.on("change:name", function(){
// 			console.log("thats better than Ochocinqo");
// 		}); this.on("invalid", function(model, error){
// 			console.log(error);
// 		})
// 	}, //this validates that all manditory areas have setting(fixed when added the defaults)
// 	validate: function(attr){
// 		// makes sure pet has a name and a type
// 		if(attr.name === undefined){
// 			return "NO NAME!";
// 		} if(attr.type === undefined){
// 			return "NO TYPE!";
// 		}
// 	}
// });
// function searchLegislatorName(name){
//     var sunlighturl = "/searchLname/"+name
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", sunlighturl);
//     xhr.addEventListener("load", function() {
//         //gives you the senator you found in a JSON object
//         var senatorObj = JSON.parse(xhr.responseText);
//         var results = senatorObj.results;

//         if (senatorObj.results.length === 1){
//             //you will use the bioguide to pass into the function as a parameter and search for bills        
//             bioguide = senatorObj.results[0].bioguide_id;
            
//             //you will use the crp id to pass into a function to search for donations
//             crp = senatorObj.results[0].crp_id;

//             console.log(name + " has a crp id of " + crp)

//             var firstName = senatorObj.results[0].first_name;
//             var lastName = senatorObj.results[0].last_name;
//             var stateTwo = senatorObj.results[0].state;
//             var partyOne = partyInfo(senatorObj.results[0].party);
//             var gender = genderInfo(senatorObj.results[0].gender);
//             var termS = senatorObj.results[0].term_start;
//             var termE = senatorObj.results[0].term_end;
//             var chamber = chamberInfo(results[0].chamber);
//             var title = titleInfo(results[0].title);
//             var twitter = "@" + senatorObj.results[0].twitter_id;

//             nowLegislator = new currentBio(firstName,lastName,stateTwo,partyOne,gender,termS,termE,chamber,title,twitter);

//             var person = document.createElement('h1');
//             person.innerText = nowLegislator.First_Name + " " + nowLegislator.Last_Name;
//             bioDiv.appendChild(person);

//             var bioUL = document.createElement('ul');
//             bioUL.setAttribute('id', 'info');
            
//             for (var i in nowLegislator){   
//                 var value = nowLegislator[i];
//                 var newKey = i.replace(/[_]/g, " ");

//                 var li = document.createElement('li');
                
//                 li.setAttribute('class', 'bioInfo');
//                 li.innerText = newKey + ": " + value;
//                 bioUL.appendChild(li);

//             }

//             bioDiv.appendChild(bioUL)       
        
//         }  else if (results.length > 1) {
                
//             //pushes each of the legislators information out to the legislatorsArr
//             for (i=0; i<results.length; i++){
//                 var firstName = results[i].first_name;                
//                 var lastName = results[i].last_name;
//                 var stateTwo = results[i].state;
//                 var partyOne = partyInfo(results[i].party);
//                 var gender = genderInfo(results[i].gender);
//                 var termS = results[i].term_start;
//                 var termE = results[i].term_end;
//                 var chamber = chamberInfo(results[i].chamber);
//                 var title = titleInfo(results[i].title);
//                 var twitter = "@" + results[i].twitter_id;

//                 addLegislator = new currentBio(firstName, lastName, stateTwo, partyOne, gender, termS, termE, chamber, title, twitter);

//                 legislatorsArr.push(addLegislator);
//             }

//             var people = document.createElement('h1');
//             people.innerText = "Legislators with the last name " + name;
//             bioDiv.appendChild(people);
            
//             //this for loop runs for the length of the array
//             for (l=0; l<legislatorsArr.length; l++){    

//                 var bioUL = document.createElement('ul');
//                 bioUL.setAttribute('id', 'info');
                
//                 var keys = Object.keys(legislatorsArr[l]);

//                 //this for loop runs to print out the values of each of the keys
//                 for (k=0; k<keys.length; k++){

//                     var values =  keys[k];
//                     console.log('trying to get the value of the keys' + values)
                    
//                     var newKey = values.replace(/[_]/g, " ");

//                     var li = document.createElement('li');
                    
//                     li.setAttribute('class', 'bioInfo');
//                     li.innerText = newKey + ": " + legislatorsArr[l][values];

//                     bioUL.appendChild(li);
//                 }
//                 var heading = document.createElement('h4');
//                 heading.innerText = multiCounter + ": " +  legislatorsArr[l][keys[0]] + " " + legislatorsArr[l][keys[1]];
//                 multiDiv.appendChild(heading);
//                 multiDiv.appendChild(bioUL)
                
//                 multiCounter++
//             }
//         }
//     })
//     xhr.send();
// }




// var Pet = Backbone.Model.extend({
// 	//sets defaults - used for validation
// 	defaults: {
// 		name: "T-1000",
// 		type: "Terminator"
// 	}, //this makes the pet
// 	initialize: function(){
// 		console.log("your pet has been created");
// 		this.on("change", function(){
// 			console.log("something is afoot"); 
// 		}); this.on("change:name", function(){
// 			console.log("thats better than Ochocinqo");
// 		}); this.on("invalid", function(model, error){
// 			console.log(error);
// 		})
// 	}, //this validates that all manditory areas have setting(fixed when added the defaults)
// 	validate: function(attr){
// 		// makes sure pet has a name and a type
// 		if(attr.name === undefined){
// 			return "NO NAME!";
// 		} if(attr.type === undefined){
// 			return "NO TYPE!";
// 		}
// 	}
// });

// var pet1 = new Pet()

// var pet2 = new Pet({
// 	name: "Salty",
// 	type: "Cat",
// 	id: 2
// })


// pet2.set({name: "Pepper"})

// pet1.set({name: "fluffy", type: "hampster", id: 1});
// console.log(pet1)
// console.log(JSON.stringify(pet1));
// console.log(pet1.toJSON());
// console.log(pet1.get("name"));
// console.log(pet1.attributes);
// console.log(pet1.attributes.name);

// //logs a string about the pet
// console.log(pet1.get("name") + " is a " + pet1.get("type"))
// console.log(pet2.attributes.name + " is a " + pet2.attributes.name)


// //if defaults arn't set above in the Pet pet3 will end up being an 
// //empty object and return NO NAME or NO TYPE, but if you do include the
// //
// var pet3 = new Pet();
// //if defaults was not here validate would make this an empty object
// //with defaults the type will return "terminator"
// pet3.set({ name: "Big Moe", id: 3}, {validate: true})
// console.log(pet3.attributes)
// // console.log(pet3);








