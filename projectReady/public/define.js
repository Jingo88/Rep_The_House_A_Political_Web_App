//This file holds all the elements that will be created and used, along with constructors, and variables that will hold information as the functions are called


//buttons to grab inputs of the name and/or state
var findName = document.querySelector("#searchName");
var findState = document.querySelector('#searchState');
var inputName = document.querySelector("#findlastName");
var inputState = document.querySelector('#findStateTwo');
var home = document.querySelector('#home');

//variables grabbing the landing headings
var landing = document.querySelector('#landing');
var sublanding = document.querySelector('#sublanding');

//Going to append things to the body
var page = document.querySelector('#page');

//these two are for users searching for legislators by last name or state
var poliInfo = document.createElement('div');
    poliInfo.setAttribute('id', 'poliInfo');

var multiInfo = document.createElement('div');
    multiInfo.setAttribute('id', 'multiInfo');

//These variables will be appended into a single legislator box so the user can click from there
var billsButton = document.createElement('button');
	billsButton.setAttribute('id', 'showbills');
	billsButton.setAttribute('class', 'click2');
	billsButton.innerText = "Show Bills Sponsored";

var donateInput = document.createElement('input');
	donateInput.setAttribute('id', 'donationYear');
	donateInput.setAttribute('type', 'text');
	donateInput.setAttribute('placeholder', 'Enter Year');

var donateButton = document.createElement('button');
	donateButton.setAttribute('id', 'showDonate');
	donateButton.setAttribute('class', 'click2');
	donateButton.innerText = "Show Donations per Year"

//the giant div that will hold the other divs for DOM manipulation
var infoBox = document.createElement('div');
    infoBox.setAttribute('id', 'holdInfo');

//the divs created to hold the donation and bills information
var donateList = document.createElement('div');
	donateList.setAttribute('id', 'donateList');

var donateBubble = document.createElement('div');
    donateBubble.setAttribute('id', 'donateBubble');

var billsInfo = document.createElement('div');
	billsInfo.setAttribute('id', 'billsInfo');

var donateToggle1 = document.createElement('button');
    donateToggle1.setAttribute('class', 'click');
    donateToggle1.innerText = "List View";

var donateToggle2 = document.createElement('button');
    donateToggle2.setAttribute('class', 'click');
    donateToggle2.innerText = "Bubble View";

var donateTotal = document.createElement('h3');
    donateTotal.setAttribute('id', 'donateTotal');

//defined these variables as global so we can use them in multiple functions
var bioguide = '';
var crp = '';
var multiCounter = 1;
var billCounter = 1;
var donateCounter = 1;
var totalDonate = 0;

//these are the arrays that store the data as objects
var legislatorsArr = [];
var billsArr = [];
var donationArr = [];

//the function that is used to clear the data at every search
function clearData(){
    inputName.value = '';
    inputState.value = '';
    page.innerHTML = '';
    poliInfo.innerHTML = '';
    multiInfo.innerHTML = '';
    billsInfo.innerHTML = '';
    donateList.innerHTML = '';
    donateBubble.innerHTML = '';
    multiCounter = 1;
    billCounter = 1;
    donateCounter = 1;
    bioguide = '';
    crp = '';
    legislatorsArr = [];
    billsArr = [];
    donationArr = [];
}

//below functions grabs the data from the JSON file and returns a more user friendly string
function chamberInfo(x){
    if (x === 'senate'){
        return "The Senate";

    } else if (x === 'house'){
        return "The House";
    }
}

function titleInfo(x){
    if (x === 'Rep'){
        return "Representative";
    } else if (x === 'Sen'){
        return "Senator";
    }
}

function partyInfo(x){
    if (x === 'D'){
        return "Democrat";
    } else if (x === 'R') {
        return "Republican";
    } else if (x === 'I'){
        return "Independent";
    }
}

function genderInfo(x){
    if (x === 'F'){
        return 'Female';
    } else if (x === 'M'){
        return 'Male';
    }
}

//constructor to create a object of the currently viewed legislator
function currentBio(crp_id,First_Name,Last_Name,State,Party,Gender,Term_Start,Term_End,Chamber,Title,Twitter_Handle,bioguide_id) {
    this.crp_ID = crp_id;
    this.First_Name = First_Name;
    this.Last_Name = Last_Name;
    this.State = State;
    this.Party = Party;
    this.Gender = Gender;
    this.Term_Start = Term_Start;
    this.Term_End = Term_End;
    this.Chamber = Chamber;
    this.Title = Title;
    this.Twitter_Handle = Twitter_Handle;
    this.Bioguide_ID = bioguide_id;
}

//constructor to create an object of the bills being sponsored by the current legislator
function currentBills(Official_Title, Bill_HTML, Bill_Active, Bill_Active_Date){
    this.Official_Title = Official_Title;
    this.Bill_HTML = Bill_HTML;
    this.Bill_Active = Bill_Active;
    this.Bill_Active_Date = Bill_Active_Date;
}

function currentDonation(Organization_Name, Total_Amount){
    this.Organization_Name = Organization_Name;
    this.Total_Amount = Total_Amount;
}
