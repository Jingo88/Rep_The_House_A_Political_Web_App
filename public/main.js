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

console.log("THIS IS YOUR API KEY " + apikey)

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
    
    var sponsor = "sponsor_id";

    var url = "https://congress.api.sunlightfoundation.com/legislators?fields=&apikey="+ apikey + "&last_name=" + name;
    console.log("THIS IS YOUR URL " + url)
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url);

    xhr.addEventListener("load", function() {

        var senatorObj = JSON.parse(xhr.responseText);
        var bioguide = senatorObj.results[0].bioguide_id;
        

        console.log(senatorObj);
        var h2 = document.querySelector("h2")
        h2.innerText = bioguide;

        allBills(bioguide);

    })

    xhr.send()
})






