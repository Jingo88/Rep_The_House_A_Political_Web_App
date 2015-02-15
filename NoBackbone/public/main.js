//creates a list of all the bills sponsored by the currently searched politician
function allBills(bioID) {
    var urlB = "/bills/" + bioID;
    var xhr = new XMLHttpRequest();
    console.log(urlB)
    xhr.open("GET", urlB);
    xhr.addEventListener('load', function(){
    	var billObj = JSON.parse(xhr.responseText);
        var billResults = billObj.results;

        
        for (var i = 0; i < billObj.results.length; i++) {

            var official_title = billResults[i].official_title;
            var billLink = billResults[i].urls.congress;
            var billactive = billResults[i].history.active;
            //make a var bill link array and have that loop through the urls. It can then push all the 
            //urls (url[j] etc etc) into an array and at the end push that array into the newBill hash
            if (billactive === true){

                var billactiveDate = billResults[i].history.active_at;

            } else {
                var billactiveDate = 'This bill is not active';
            }
            
            newBill = new currentBills(official_title,billLink, billactive, billactiveDate);

    		billsArr.push(newBill);
    	};

        for (l=0; l<billsArr.length; l++){
            var billsUL = document.createElement('ul');
            billsUL.setAttribute('id', 'billInfo');

            var keys = Object.keys(billsArr[l]);
            console.log("These are the bills keys" + keys);

            for (k=0; k<keys.length; k++){
                var values = keys[k];
                    
                var newKey = values.replace(/[_]/g, " ");

                var li = document.createElement('li');
                
                li.setAttribute('class', 'bills');
                li.innerText = newKey + ": " + billsArr[l][values];

                billsUL.appendChild(li);
            }
            var billNum = document.createElement('h4');
            billNum.innerText = "Bill: " + billCounter;
            billsDiv.appendChild(billNum);
            billsDiv.appendChild(billsUL);
            billCounter++;
        }
    })
    xhr.send();
}


//creates a list of donations for the currently viewed politician
function donationFunc(crpID,year){
    var donateurl2 = "/donate/"+crpID+"/"+year;
    var xhr = new XMLHttpRequest();

    console.log(crpID + year)

    xhr.open("GET", donateurl2);
    xhr.addEventListener('load', function(){
        
        var donateObj = JSON.parse(xhr.responseText);
        var contributions = donateObj.response["contributors"]["contributor"];

        for (var i = 0; i < contributions.length; i++) {
            console.log("WE ARE IN THE FIRST FOR LOOP")
            var org_name = contributions[i]["@attributes"]["org_name"];
            var total = contributions[i]["@attributes"]["total"];

            newDonate = new currentDonation(org_name, total);

            donationArr.push(newDonate);

        }

        for (l=0; l<donationArr.length; l++){
            var donateUL = document.createElement('ul');
            donateUL.setAttribute('id', 'donationList');

            var keys = Object.keys(donationArr[l]);

            for (k=0; k<keys.length; k++){
                var values = keys[k];

                var newKey = values.replace(/[_]/g, " ");

                var li = document.createElement('li');
                li.setAttribute('class', 'donations');
                li.innerText = newKey + ": " +donationArr[l][values];
                donateUL.appendChild(li);
            }   
            var donateNum = document.createElement('h4');
            donateNum.innerText = "Donation: " + donateNum;
            donateDiv.appendChild(donateNum);
            donateDiv.appendChild(donateUL);
            donateCounter++;
        }
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
            var chamber = chamberInfo(results[0].chamber);
            var title = titleInfo(results[0].title);
            var twitter = "@" + senatorObj.results[0].twitter_id;

            nowLegislator = new currentBio(firstName,lastName,stateTwo,partyOne,gender,termS,termE,chamber,title,twitter);

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
                var chamber = chamberInfo(results[i].chamber);
                var title = titleInfo(results[i].title);
                var twitter = "@" + results[i].twitter_id;

                addLegislator = new currentBio(firstName, lastName, stateTwo, partyOne, gender, termS, termE, chamber, title, twitter);

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
            var chamber = chamberInfo(results[0].chamber);
            var title = titleInfo(results[0].title);
            var twitter = "@" + results[0].twitter_id;

            nowLegislator = new currentBio(firstName, lastName, stateTwo, partyOne, gender, termS, termE, chamber, title, twitter);

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
                var chamber = chamberInfo(results[i].chamber);
                var title = titleInfo(results[i].title);
                var twitter = "@" + results[i].twitter_id;

                addLegislator = new currentBio(firstName, lastName, stateTwo, partyOne, gender, termS, termE, chamber, title, twitter);

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
    } else {
        alert("Sorry you have not chosen a legislator to view the bills of")
    }
})

showDonations.addEventListener('click', function(){
    var year = yearDonate.value
    console.log(crp);
    console.log(year);
    if (year.length != 4){
        alert("please enter a valid year");
    } else {
        donationFunc(crp, year);
        // donationFunc("N00033492", "2014");
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


//idea for bolding the keys of the list items when they are produced
//var dateSpan = document.createElement('span')
// dateSpan.innerHTML = dateString;
// var li = document.createElement('li');
// li.appendChild(dateSpan);

//maybe add the show bills button into the bioDiv and multiDiv? does that mean the multiDiv has to encapsulate the bioDivs?

//look into "this.parentNode" if you want to target a specific div
// var li = this.parentNode

//constructor, constructor, view more buttons, bio, pictures
//bills in a constructor with more information/
//donations in a contructor with company, and prices
//view more buttons for the multiLists
//find an api with bios and pictures of each person? 
//number the lists
//include legislator title