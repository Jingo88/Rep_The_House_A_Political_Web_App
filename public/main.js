var findName = document.querySelector("#searchName");
var findState = document.querySelector('#searchState');
var billList = document.querySelector('#sponsoredBills');
var donateList = document.querySelector('#donationAmts');

var inputName = document.querySelector("#findlastName");
var inputState = document.querySelector('#findStateTwo');

var fName = document.querySelector('#first');
var lName = document.querySelector('#last');
var party = document.querySelector('#party');
var termStart = document.querySelector('#startT');
var termEnd = document.querySelector('#endT');
var state = document.querySelector('#state');

console.log("Your sunlight key is " + sunKey);
// console.log("Your open secret key is " + openKey);

function allBills(bioID) {
    var bills = [];
    var urlB = "https://congress.api.sunlightfoundation.com/bills?&apikey=" + sunKey + "&sponsor_id=" + bioID;
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

function donations(crpID,year){
    var donations = [];

    var donateurl2 = "/donate/"+crpID+"/"+year;

    console.log("YOUR DONATE URL TWO IS " + donateurl2)
    // var donateurl = "http://www.opensecrets.org/api/?method=candContrib&cid="+ crpID + "&cycle=" + year + "&output=json&apikey=" + openKey
    var xhr = new XMLHttpRequest();

    xhr.open("GET", donateurl2);

    xhr.addEventListener('load', function(){
        
        var donateObj = JSON.parse(xhr.responseText);

        var contributions = donateObj.response["contributors"]["contributor"]

        for (var i = 0; i < contributions.length; i++) {

            donations.push(contributions[i]["@attributes"]);

            var org = document.createElement('li');
            org.setAttribute('class', 'donate_org');
            org.innerText = contributions[i]["@attributes"]["org_name"];
            donateList.appendChild(org);

            var total = document.createElement('li');
            total.setAttribute('class', 'donate_total');
            total.innerText = contributions[i]["@attributes"]["total"];
            donateList.appendChild(total);

        };

    console.log(donations)

        // bills.forEach(function(x){
        //     var li = document.createElement('li');
        //     li.innerText=x.official_title;
        //     billList.appendChild(li);
        // })
    })
    xhr.send();
}

//search by state two letters
//

findState.addEventListener('click', function(){
    var stateInitials = inputState.value;

    var sunStateURL = "https://congress.api.sunlightfoundation.com/legislators?fields=&apikey=" + sunKey+ "&state="+ stateInitials;

    var xhr = new XMLHttpRequest();

    xhr.open('GET', sunStateURL);

    xhr.addEventListener('load', function(){
        var stateObj = JSON.parse(xhr.responseText);

        var stateLegislators = stateObj.results
    })

    xhr.send();
})


findName.addEventListener("click", function() {
    var name = inputName.value;

    var sunlighturl = "https://congress.api.sunlightfoundation.com/legislators?fields=&apikey="+ sunKey + "&last_name=" + name;
    
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
        donations(crp, 2013);
    })

    xhr.send()
})






