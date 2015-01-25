//buttons to grab inputs of the name and/or state
var findName = document.querySelector("#searchName");
var findState = document.querySelector('#searchState');
var inputName = document.querySelector("#findlastName");
var inputState = document.querySelector('#findStateTwo');

//div where we will store the info of the politicions search
var bioDiv = document.querySelector('#poliInfo');

//button and div for bill list
var showbills = document.querySelector('#showBills');
var billsDiv = document.querySelector('#billsDiv');

//button and div for donation list
var showDonations = document.querySelector('#showDonate');
var donateDiv = document.querySelector('#donationDiv');

//defined these variables as global so we can use them in multiple functions
var bioguide = '';
var crp = '';

//constructor to create a object of the currently viewed legislator
function currentBio(First_Name,Last_Name,State,Party,Gender,Term_Start,Term_End,Twitter_Handle) {
    this.First_Name = First_Name;
    this.Last_Name = Last_Name;
    this.State = State;
    this.Party = Party;
    this.Gender = Gender;
    this.Term_Start = Term_Start;
    this.Term_End = Term_End;
    this.Twitter_Handle = Twitter_Handle;
}

//creates a list of all the bills sponsored by the currently searched politician
function allBills(bioID) {
    var bills = [];
    var urlB = "https://congress.api.sunlightfoundation.com/bills?&apikey=" + sunKey + "&sponsor_id=" + bioID;
    var xhr = new XMLHttpRequest();

    xhr.open("GET", urlB);

    xhr.addEventListener('load', function(){
    	
    	var billObj = JSON.parse(xhr.responseText)

    	var billsUL = document.createElement('ul');
        billsUL.setAttribute('id', 'billInfo');
        billsUL.innerText = "Bills Sponsored"

        for (var i = 0; i < billObj.results.length; i++) {
    		bills.push(billObj.results[i]);
    	};

    	bills.forEach(function(x){
    		var li = document.createElement('li');
    		li.innerText=x.official_title;
    		billsUL.appendChild(li);
    	})

        billsDiv.appendChild(billsUL)
    })
    xhr.send();
}

//creates a list of donations for the currently viewed politician
function donations(crpID,year){
    var donations = [];

    var donateurl2 = "/donate/"+crpID+"/"+year;

    console.log("YOUR DONATE URL TWO IS " + donateurl2)
    
    var xhr = new XMLHttpRequest();

    xhr.open("GET", donateurl2);

    xhr.addEventListener('load', function(){
        
        var donateObj = JSON.parse(xhr.responseText);

        var contributions = donateObj.response["contributors"]["contributor"];

        var donateUL = document.createElement('ul');
        donateUL.setAttribute('id', 'donationList');
        donateUL.innerText = "Donations Lists"

        for (var i = 0; i < contributions.length; i++) {

            donations.push(contributions[i]["@attributes"]);

            var org = document.createElement('li');
            org.setAttribute('class', 'donate_org');
            org.innerText = contributions[i]["@attributes"]["org_name"];
            donateUL.appendChild(org);

            var total = document.createElement('li');
            total.setAttribute('class', 'donate_total');
            total.innerText = contributions[i]["@attributes"]["total"];
            donateUL.appendChild(total);

        };

        donateDiv.appendChild(donateUL);
    })
    xhr.send();
}

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
    var input = inputName.value;

    var name = input.charAt(0).toUpperCase() + input.slice(1);

    var sunlighturl = "https://congress.api.sunlightfoundation.com/legislators?fields=&apikey="+ sunKey + "&last_name=" + name;
    
    var xhr = new XMLHttpRequest();

    xhr.open("GET", sunlighturl);

    xhr.addEventListener("load", function() {

        //add an if/else statement for this where if senatorObj.results.length is > 1 then make a loop 
        //to show the bios of the legislators


        //gives you the senator you found in a JSON object
        var senatorObj = JSON.parse(xhr.responseText);

        //you will use the bioguide to pass into the function as a parameter and search for bills        
        bioguide = senatorObj.results[0].bioguide_id;
        
        //you will use the crp id to pass into a function to search for donations
        crp = senatorObj.results[0].crp_id;

        console.log(name + " has a crp id of " + crp)

        var firstName = senatorObj.results[0].first_name;
        var lastName = senatorObj.results[0].last_name;
        var stateTwo = senatorObj.results[0].state;
        var partyOne = senatorObj.results[0].party;
        var gender = senatorObj.results[0].gender;
        var termS = senatorObj.results[0].term_start;
        var termE = senatorObj.results[0].term_end;
        var twitter = senatorObj.results[0].twitter_id;

        nowLegislator = new currentBio(firstName, lastName, stateTwo, partyOne, gender, termS, termE, twitter);

        var person = document.createElement('h1');
        person.innerText = nowLegislator.First_Name + " " + nowLegislator.Last_Name;
        bioDiv.appendChild(person);

        var bioUL = document.createElement('ul');
        bioUL.setAttribute('id', 'info');
        
        for (var i in nowLegislator){
            var value = nowLegislator[i];
            var newKey = i.replace(/[_]/g, " ");

            var li = document.createElement('li');
            
            li.setAttribute('class', 'bioInfo');
            li.innerText = newKey + ": " + value;
            bioUL.appendChild(li);
        }

        bioDiv.appendChild(bioUL)
        console.log(nowLegislator);
    })

    xhr.send()
})



showBills.addEventListener('click', function(){
    allBills(bioguide);
})

showDonations.addEventListener('click', function(){
    donations(crp, 2013);
})
    

