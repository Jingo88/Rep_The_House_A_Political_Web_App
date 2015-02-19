//creates a list of all the bills sponsored by the currently searched politician
function theSearch(results){
    if (results.length === 1){
        console.log("we have reached the search")
        var crp_id = results[0].crp_id;
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

        nowLegislator = new currentBio(crp_id,firstName,lastName,stateTwo,partyOne,gender,termS,termE,chamber,title,twitter);

    } else if (results.length > 1){
        for (i=0; i<results.length; i++){

            var crp_id = results[i].crp_id;
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

            addLegislator = new currentBio(crp_id, firstName, lastName, stateTwo, partyOne, gender, termS, termE, chamber, title, twitter);

            legislatorsArr.push(addLegislator);
        }
    }
}

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
            var billURL = "<a href=" + billLink + " target='_blank'>" + billLink + "</a>";
            var billactive = billResults[i].history.active;
            //make a var bill link array and have that loop through the urls. It can then push all the 
            //urls (url[j] etc etc) into an array and at the end push that array into the newBill hash
            if (billactive === true){
                var billactiveDate = billResults[i].history.active_at;
            } else {
                var billactiveDate = 'This bill is not active';
            }
            
            newBill = new currentBills(official_title,billURL, billactive, billactiveDate);
    		billsArr.push(newBill);
    	};

        for (l=0; l<billsArr.length; l++){
            var billsUL = document.createElement('ul');
            billsUL.setAttribute('class', 'wholeBill');

            var keys = Object.keys(billsArr[l]);
            console.log("These are the bills keys" + keys);

            for (k=0; k<keys.length; k++){
                var values = keys[k];
                    
                var newKey = values.replace(/[_]/g, " ");

                var li = document.createElement('li');
                
                li.setAttribute('class', 'billInfo');
                li.innerHTML = newKey + ": " + billsArr[l][values];

                billsUL.appendChild(li);
            }
            var billNum = document.createElement('h4');
            billNum.innerText = "Bill: " + billCounter;
            billsInfo.appendChild(billNum);
            billsInfo.appendChild(billsUL);
            infoBox.appendChild(billsInfo);
            page.appendChild(infoBox);
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

        donateList.appendChild(donateToggle2);
        for (var i = 0; i < contributions.length; i++) {
            console.log("WE ARE IN THE FIRST FOR LOOP")
            var org_name = contributions[i]["@attributes"]["org_name"];
            var total = parseInt(contributions[i]["@attributes"]["total"]);

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
            donateNum.innerText = "Donation: " + donationArr[l].Organization_Name;
            donateList.appendChild(donateNum);
            donateList.appendChild(donateUL);
            infoBox.appendChild(donateList);
            donateCounter++;
            console.log("DONATION LIST WAS CREATED");
        }
            donateBubble.appendChild(donateToggle1);
            infoBox.appendChild(donateBubble);
            page.appendChild(infoBox);

            donationCircles(processData(donationArr));
            console.log("THE BUBBLES WERE MADE!!!!");


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
            console.log(bioguide);
            
            //you will use the crp id to pass into a function to search for donations
            crp = senatorObj.results[0].crp_id;

            console.log(name + " has a crp id of " + crp)

            theSearch(results);

            var person = document.createElement('h1');
            person.innerText = nowLegislator.First_Name + " " + nowLegislator.Last_Name;
            poliInfo.appendChild(person);

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

            poliInfo.appendChild(bioUL);
            poliInfo.appendChild(billsButton);
            poliInfo.appendChild(donateInput);
            poliInfo.appendChild(donateButton); 
            page.appendChild(poliInfo);   
        
        }  else if (results.length > 1) {
            
            theSearch(results);
            
                var bioUL = document.createElement('ul');
                bioUL.setAttribute('id', 'info');

            for (l=0; l<legislatorsArr.length; l++){ 
                var solo = legislatorsArr[l];

                var li = document.createElement('li');
                    li.setAttribute('class', 'multiList');
                    li.innerText = solo.Last_Name+", "+solo.First_Name+" - "+solo.State+ " - "+solo.Party;
                    bioUL.appendChild(li)
                }

                multiInfo.appendChild(bioUL);
                page.appendChild(multiInfo);
                multiCounter++;
                //the below code will be used to expand the multilist to choose a single legislator
                $(".multiList").click(function(){
                    console.log("does this work?")
                })
            
        } else {
            alert("Sorry there does not seem to be a legislator with that last name in the House of Representatives");
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

            theSearch(results);

            var person = document.createElement('h1');
            person.innerText = nowLegislator.First_Name + " " + nowLegislator.Last_Name;
            poliInfo.appendChild(person);

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
            
            poliInfo.appendChild(bioUL);

            poliInfo.appendChild(billsButton);
            poliInfo.appendChild(donateInput);
            poliInfo.appendChild(donateButton);

            page.appendChild(poliInfo);
        
        }  else if (results.length > 1) {
                
            theSearch(results);

            var bioUL = document.createElement('ul');
                bioUL.setAttribute('id', 'info');

            for (l=0; l<legislatorsArr.length; l++){ 
                var solo = legislatorsArr[l];

                var li = document.createElement('li');
                    li.setAttribute('class', 'multiList');
                    li.innerText = solo.Last_Name+", "+solo.First_Name+" - "+solo.State+ " - "+solo.Party; 
                    bioUL.appendChild(li)
                }
                multiInfo.appendChild(bioUL);
                page.appendChild(multiInfo);
                multiCounter ++;

                //use the below function to target slide down and slide up effects
                $(".multiList").click(function(){
                    console.log("does this work?")
                })

        } else {
            alert("Please enter valid two letter initials for a state")
        }
    })
    xhr.send()
}

billsButton.addEventListener('click', function(){
    if (bioguide != ''){
        allBills(bioguide);
    } else {
        alert("Sorry you have not chosen a legislator to view the bills of")
    }
})

donateButton.addEventListener('click', function(){
    var year = donateInput.value;
    $("#donateBubble").remove();
    console.log(crp);
    console.log(year);
    if (year.length != 4){
        alert("please enter a valid year");
    } else {
        donationFunc(crp, year);
    }    
})
    
donateToggle1.addEventListener('click', function(){
    $( "#donateBubble").toggle();  
    $('#donateList').toggle();  
})
donateToggle2.addEventListener('click', function(){
    $( "#donateBubble").toggle();  
    $('#donateList').toggle();  
})


    