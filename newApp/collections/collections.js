var LegislatorsCollection = Backbone.Collection.extend({
	model : Legislator
})


//use set to empty current collection/legislators and set it equal to the parameter you're passing in.


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

// // var PetsCollection = Backbone.Collection.extend({
// // 	model : Pet

// // });

// // var pets = new PetsCollection(pet1);
// // pets.add(pet2);
// // console.log(pets);

// // //the .set method will remove and replace all of your collections
// // // pets.set(pet3);

// // //removes a pet
// // pets.remove(pet2);

// // //quick and easy way to remove all pets from your collection
// // pets.reset();

// // //add multiple pets at once
// // pets.add([pet2, pet3]);
// // console.log(pets)
// // console.log(pets.length);

// // //you can also add manually
// // //however it is not defined as a variable, there is no "pet4". 
// // pets.add({name:"little Moe", type:"frog", id:4})

// // console.log(pets.get(2));
// // console.log(pets.get(2).attributes.name);
// // console.log(pets.get(2)['cid']);

// // pets.on("add", function(pet){
// // 	console.log("there's a new " + pet.get('type') + ' in town named ' + pet.get('name'));
// // });

// // pets.add({name:"frick", type:"fish", id:5});

// // //add an event listener to log "name changed" whenever a name is changed

// // // pets.on("change:name", function(pet){
// // // 	console.log("Pets has changed their name")
// // // 	console.log("HELLO")
// // // })

// // // pet1.set({name: "Ralph"});

// // // console.log("GOODBYE");
// // console.log("BLAH BLAH BLAH")
// // //
// // pets.on("change:name", function(){
// //     console.log("Your pet has been changed to ")
// // })

// // pet1.set({name: "Ralph"})
// // pet1.set({type: "Dog"})



// var PetsCollection = Backbone.Collection.extend({
//     model: Pet
// })

// var pets = new PetsCollection(pet1);
// pets.add(pet2)
// console.log(pets)
// pets.remove(pet2)
// console.log(pets.length)

// pets.add([pet2, pet3])
// console.log(pets)

// //this adds a pet but will not set it to a variable name
// pets.add({name:"Little Moe", type: "frog", id: 4})
// console.log(pets)


// console.log(pets.get(4))
// console.log(pets.get(2)['attributes'].name)
// console.log(pets.get(2).attributes.name)

// //cid = client id
// // a client id is assigned by backbone as they are created.
// console.log(pets.get(2)['cid'])
// console.log(pets.get(2).cid)

// // // removes all pets
// // pets.reset()
// // console.log(pets)

// //this replaces everything with pet 3
// //pets.set(pet3)


// pets.on("add", function(pet){
//     console.log("There's a new " + pet.get('type') + " in town named " + pet.get('name'))
// })
// pets.add({name: "Frick", type: "Goldfish", id: 5})


// pets.on("change:name", function(pet){
//     console.log("Your pet has been changed to " + pet.get('name'))
// })

// pet1.set({name: "Ralph"})
// pet1.set({type: "Dog"})

// console.log(pets)


// console.log("ahahhahahahhahahahhah")

// console.log(pets)
// console.log(_.map(pets.models, function(pet){  return pet.attributes}))
// console.log(_.pluck(pets.models, "attributes"))
// console.log(_.each(pets.models, function(each){ console.log(each.attributes)}))
// console.log(_.indexOf(["Tiffany", "Jason", "Karl"], "Jason"))
// console.log(_.some([pet1.location, pet2.location]))