//buttons to grab inputs of the name and/or state
var findName = document.querySelector("#searchName");
var findState = document.querySelector('#searchState');
var inputName = document.querySelector("#findlastName");
var inputState = document.querySelector('#findStateTwo');

//div where we will store the info of the politicions search
var bioDiv = document.querySelector('#poliInfo');
var multiDiv = document.querySelector('#multiList');

//button and div for bill list
var showbills = document.querySelector('#showBills');
var billsDiv = document.querySelector('#billsDiv');

//button and div for donation list
var showDonations = document.querySelector('#showDonate');
var donateDiv = document.querySelector('#donationDiv');
var yearDonate = document.querySelector('#donationYear');

//defined these variables as global so we can use them in multiple functions
var bioguide = '';
var crp = '';
var multiCounter = 1;

var legislatorsArr = [];

function clearData(){
    legislatorsArr = [];
    inputName.value = '';
    inputState.value = '';
    bioDiv.innerHTML = '';
    multiDiv.innerHTML = '';
    multiCounter = 1;
    bioguide = '';
    crp = '';
}

//returns a string to clarify party affiliation
function partyInfo(x){
    if (x === 'D'){
        return "Democrat";
    } else if (x === 'R') {
        return "Republican";
    } else if (x === 'I'){
        return "Independent";
    }
}

//returns a string to clarify gender
function genderInfo(x){
    if (x === 'F'){
        return 'Female';
    } else if (x === 'M'){
        return 'Male';
    }
}

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

    var urlB = "/bills/" + bioID;

    var xhr = new XMLHttpRequest();

    xhr.open("GET", urlB);

    xhr.addEventListener('load', function(){
        //Things to include
        //have a link to the pdfs? 
    	
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
    var searchingState = inputState.value;
    var stateInitials = searchingState.toUpperCase();

    if (stateInitials.length>= 3){
        alert("Please enter two letters of a valid state");

    } else {
        clearData();
        searchLegislatorState(stateInitials);
    }
})

inputState.addEventListener('keypress', function(e){
    var searchingState = inputState.value;
    var stateInitials = searchingState.toUpperCase();
    
    if (stateInitials.length>= 3){

        alert("Please enter two letters of a valid state");

    } else {

        if (e.keyCode === 13){

        clearData();
        searchLegislatorState(stateInitials);
        }
    }
})

function searchLegislatorName(name){

    var sunlighturl = "/searchLname/"+name

    var xhr = new XMLHttpRequest();

    xhr.open("GET", sunlighturl);

    xhr.addEventListener("load", function() {

        //gives you the senator you found in a JSON object
        var senatorObj = JSON.parse(xhr.responseText);
        var results = senatorObj.results;

        if (senatorObj.results.length === 1){
            //you will use the bioguide to pass into the function as a parameter and search for bills        
            bioguide = senatorObj.results[0].bioguide_id;
            
            //you will use the crp id to pass into a function to search for donations
            crp = senatorObj.results[0].crp_id;

            console.log(name + " has a crp id of " + crp)

            var firstName = senatorObj.results[0].first_name;
            var lastName = senatorObj.results[0].last_name;
            var stateTwo = senatorObj.results[0].state;
            var partyOne = partyInfo(senatorObj.results[0].party);
            var gender = genderInfo(senatorObj.results[0].gender);
            var termS = senatorObj.results[0].term_start;
            var termE = senatorObj.results[0].term_end;
            var twitter = "@" + senatorObj.results[0].twitter_id;

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
        
        }  else if (results.length > 1) {
                
            //pushes each of the legislators information out to the legislatorsArr
            for (i=0; i<results.length; i++){
                var firstName = results[i].first_name;                
                var lastName = results[i].last_name;
                var stateTwo = results[i].state;
                var partyOne = partyInfo(results[i].party);
                var gender = genderInfo(results[i].gender);
                var termS = results[i].term_start;
                var termE = results[i].term_end;
                var twitter = "@" + results[i].twitter_id;

                addLegislator = new currentBio(firstName, lastName, stateTwo, partyOne, gender, termS, termE, twitter);

                legislatorsArr.push(addLegislator);
            }

            var people = document.createElement('h1');
            people.innerText = "Legislators with the last name " + name;
            bioDiv.appendChild(people);
            
            //this for loop runs for the length of the array
            for (l=0; l<legislatorsArr.length; l++){    

                var bioUL = document.createElement('ul');
                bioUL.setAttribute('id', 'info');
                
                var keys = Object.keys(legislatorsArr[l]);

                //this for loop runs to print out the values of each of the keys
                for (k=0; k<keys.length; k++){

                    var values =  keys[k];
                    console.log('trying to get the value of the keys' + values)
                    
                    var newKey = values.replace(/[_]/g, " ");

                    var li = document.createElement('li');
                    
                    li.setAttribute('class', 'bioInfo');
                    li.innerText = newKey + ": " + legislatorsArr[l][values];

                    bioUL.appendChild(li);
                }
                var heading = document.createElement('h4');
                heading.innerText = multiCounter + ": " +  legislatorsArr[l][keys[0]] + " " + legislatorsArr[l][keys[1]];
                multiDiv.appendChild(heading);
                multiDiv.appendChild(bioUL)
                
                multiCounter++
            }
            console.log(legislatorsArr); 
        }
    })
    xhr.send();
}


findName.addEventListener("click", function() {
    
    var input = inputName.value;

    var name = input.charAt(0).toUpperCase() + input.slice(1);
    clearData();
    searchLegislatorName(name);
})

inputName.addEventListener('keypress', function(e){
    
    if (e.keyCode === 13){
        
        var input = inputName.value;

        var name = input.charAt(0).toUpperCase() + input.slice(1);

        clearData();
        searchLegislatorName(name);
    }
})

function searchLegislatorState(state){

    var sunlighturl = "/searchState/"+ state

    var xhr = new XMLHttpRequest();

    xhr.open("GET", sunlighturl);

    xhr.addEventListener("load", function() {

        //gives you the senator you found in a JSON object
        var stateObj = JSON.parse(xhr.responseText);
        var results = stateObj.results;

        if (results.length === 1){
            //you will use the bioguide to pass into the function as a parameter and search for bills        
            bioguide = results[0].bioguide_id;
            
            //you will use the crp id to pass into a function to search for donations
            crp = results[0].crp_id;

            var firstName = results[0].first_name;
            var lastName = results[0].last_name;
            var stateTwo = results[0].state;
            var partyOne = partyInfo(results[0].party);
            var gender = genderInfo(results[0].gender);
            var termS = results[0].term_start;
            var termE = results[0].term_end;
            var twitter = "@" + results[0].twitter_id;

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
        
        }  else if (results.length > 1) {
                
            //pushes each of the legislators information out to the legislatorsArr
            for (i=0; i<results.length; i++){
                var firstName = results[i].first_name;                
                var lastName = results[i].last_name;
                var stateTwo = results[i].state;
                var partyOne = partyInfo(results[i].party);
                var gender = genderInfo(results[i].gender);
                var termS = results[i].term_start;
                var termE = results[i].term_end;
                var twitter = "@" + results[i].twitter_id;

                addLegislator = new currentBio(firstName, lastName, stateTwo, partyOne, gender, termS, termE, twitter);

                legislatorsArr.push(addLegislator);
            }

            var people = document.createElement('h1');
            people.innerText = "Legislators with the last name " + name;
            bioDiv.appendChild(people);
            
            //this for loop runs for the length of the array
            for (l=0; l<legislatorsArr.length; l++){    

                var bioUL = document.createElement('ul');
                bioUL.setAttribute('id', 'info');
                
                var keys = Object.keys(legislatorsArr[l]);

                //this for loop runs to print out the values of each of the keys
                for (k=0; k<keys.length; k++){

                    var values =  keys[k];
                    
                    var newKey = values.replace(/[_]/g, " ");

                    var li = document.createElement('li');
                    
                    li.setAttribute('class', 'bioInfo');
                    li.innerText = newKey + ": " + legislatorsArr[l][values];

                    bioUL.appendChild(li);
                }
                var heading = document.createElement('h4');
                heading.innerText = multiCounter + ": " +  legislatorsArr[l][keys[0]] + " " + legislatorsArr[l][keys[1]];
                multiDiv.appendChild(heading);
                multiDiv.appendChild(bioUL);
                multiCounter ++ 
            }
        }
    })
    xhr.send()
}

showBills.addEventListener('click', function(){
    if (bioguide != ''){
        allBills(bioguide);
        console.log(bioguide);
    } else {
        alert("Sorry you have not chosen a legislator to view the bills of")
    }
})

showDonations.addEventListener('click', function(){
    var year = yearDonate.value

    if (year.length != 4){
        alert("please enter a valid year");
    } else {
        donations(crp,year);
    }    
})
    
//how to store the legislators information when there is more than one whether it's by state, or by same last name?
//keep in mind crp_id and bioguide_id > both being used for bill and donation lists. 

//have to clear the array when the search bar is run again, clear the legislator div box, clear the input box

//http://services.sunlightlabs.com/docs/congressapi/legislators.get%28List%29/
//Look at this, need to bring out the bio data better
//gender, party, title, state, etc. 
//split up the state function
//allow users to click on the multi list div
//add more data for politicians
//make sure to make the data more appealing


//things to include for the bio information
//chamber: house or senate
//title: Sen or Rep
//Party: change if I to independent

//What to add to bill information?
//include the pdf or html file link? HTML seems faster
//target Active and if active === true then active at to find date, if false then there is no date
//give the bills a count just like the multiple legislators list
//move them all into an object




//constructor, constructor, view more buttons, bio, pictures
//bills in a constructor with more information/
//donations in a contructor with company, and prices
//view more buttons for the multiLists
//find an api with bios and pictures of each person? 
//number the lists
//include legislator title