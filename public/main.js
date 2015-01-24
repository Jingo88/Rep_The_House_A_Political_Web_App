// var button = document.querySelector("button")
// button.addEventListener("click", function(){
// var input = document.querySelector("input")
// var name = input.value
// console.log(name);
// var url = "https://congress.api.sunlightfoundation.com/legislators?apikey=YOUR API KEY&last_name=" + name
// var xhr = new XMLHttpRequest();
// xhr.open("GET", url);
// xhr.addEventListener("load", function(){
//     var senatorObj = JSON.parse(xhr.responseText)
//     console.log(senatorObj);
//     var h2 = document.querySelector("h2")
// // h2.innerText = senatorObj.results[0].first_name +" "+ senatorObj.results[0].last_name
//     h2.innerText = senatorObj.results[0].twitter_id
// })
// xhr.send();
// })
// //Part 2
//     var button = document.querySelector("button")
//     button.addEventListener("click", function(){
//      var input = document.querySelector("input")
//      var name = input.value
//      console.log(name);
//      var url = "https://congress.api.sunlightfoundation.com/legislators?fields=twitter_id&apikey=YOUR API KEY&last_name=" + name
//      var xhr = new XMLHttpRequest();
//      console.log('this is the url  ' + url)
//      xhr.open("GET", url);
//      xhr.addEventListener("load", function(){
//      	console.log('now we are in the load')
//          var senatorObj = JSON.parse(xhr.responseText)
//          console.log(senatorObj);
//          var h2 = document.querySelector("h2")
//          h2.innerText = senatorObj.results[0].twitter_id;
//      })
//      xhr.send()
// })









//all senators have one bioguide_id
//the bills have a sponsor_id
//the sponsor_id is the bioguide_id of the senator that sponsored it
//take the short_title of the bill and link it to the senator that sponsored it

//Part 3
var button = document.querySelector("button");
var billList = document.querySelector('#sponsoredBills');
var input = document.querySelector("input");
var fName = document.querySelector('#first');
var lName = document.querySelector('#last');
var party = document.querySelector('#party');
var termStart = document.querySelector('#startT');
var termEnd = document.querySelector('#endT');
var state = document.querySelector('#state');

// var apikeys = JSON.parse(apikey);


console.log("Your sunlight key is " + sunKey);
console.log("Your open secret key is " + openKey);

// var working = Object.keys(apikeys);
// console.log(apikeys)
// console.log("THIS IS YOUR API KEY " + apikeys)

function allBills(bioID) {
    var bills = [];
    var urlB = "https://congress.api.sunlightfoundation.com/bills?&apikey=" + apikey + "&sponsor_id=" + bioID;
    var xhr = new XMLHttpRequest();

    xhr.open("GET", urlB);

    xhr.addEventListener('load', function(){
    	
    	var billObj = JSON.parse(xhr.responseText)

    	for (var i = 0; i < billObj.results.length; i++) {
    		bills.push(billObj.results[i]);
    	};

    	bills.forEach(function(x){
    		var li = document.createElement('li');
    		li.innerText=x.official_title;
    		billList.appendChild(li);
    	})
    })
    xhr.send();
}


button.addEventListener("click", function() {
    var name = input.value;
    console.log("this is the person's name " + name)

    var sunlighturl = "https://congress.api.sunlightfoundation.com/legislators?fields=&apikey="+ apikey + "&last_name=" + name;
    
    console.log("THIS IS YOUR URL " + sunlighturl)
    
    var xhr = new XMLHttpRequest();

    xhr.open("GET", sunlighturl);

    xhr.addEventListener("load", function() {

        //gives you the senator you found in a JSON object
        var senatorObj = JSON.parse(xhr.responseText);

        //you will use the bioguide to pass into the function as a parameter and search for bills        
        var bioguide = senatorObj.results[0].bioguide_id;
        
        //you will use the crp id to pass into a function to search for donations
        var crp = senatorObj.results[0].crp_id;

        console.log(name + " has a crp id of " + crp)

        var firstName = senatorObj.results[0].first_name;
        var lastName = senatorObj.results[0].last_name;
        var stateTwo = senatorObj.results[0].state;
        var partyOne = senatorObj.results[0].party;
        var gender = senatorObj.results[0].gender;
        var termS = senatorObj.results[0].term_start;
        var termE = senatorObj.results[0].term_end;
        var twitter = senatorObj.results[0].twitter_id;

        fName.innerText = firstName;
        lName.innerText = lastName;
        party.innerText = partyOne;
        termStart.innerText = termS;
        termEnd.innerText = termE;
        state.innerText = stateTwo;

        allBills(bioguide);

    })

    xhr.send()
})






