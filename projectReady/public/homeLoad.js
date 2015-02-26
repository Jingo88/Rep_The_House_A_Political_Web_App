$(document).ready(function(){
	onload();
});

var body = document.querySelector('body');

	var searchbar = document.createElement('div');
		searchbar.setAttribute('id', 'searchbar');

	var home = document.createElement('div');
		home.setAttribute('id', 'home');
		home.innerHTML = "RTH";

	var findlastName = document.createElement('input');
		findlastName.setAttribute('class', 'bar');
		findlastName.setAttribute('type', 'text');
		findlastName.setAttribute('placeholder', 'Search By Last Name');
		findlastName.setAttribute('id', 'findlastName');

	var searchName = document.createElement('button');
		searchName.setAttribute('class', 'click');
		searchName.setAttribute('id', 'searchName');
		searchName.innerHTML = "Search Last Name";

	var findStateTwo = document.createElement('input');
		findStateTwo.setAttribute('class', 'bar');
		findStateTwo.setAttribute('type', 'text');
		findStateTwo.setAttribute('placeholder', 'Search By State');
		findStateTwo.setAttribute('id', 'findStateTwo');

	var searchState = document.createElement('button');
		searchState.setAttribute('class', 'click');
		searchState.setAttribute('id', 'searchState');
		searchState.innerHTML = "Search State";

	var page = document.createElement('div');
		page.setAttribute('id', 'page');

	var landing = document.createElement('h1');
		landing.setAttribute('id', 'landing');
		landing.innerHTML = "REP THE HOUSE";

	var sublanding = document.createElement('h3');
		sublanding.setAttribute('id', 'sublanding');
		sublanding.innerHTML = "This is a website for you to research the current legislators in the United States House of Representatives. Do yourselves a favor and stay informed!"


function onload(){
	searchbar.appendChild(home);
	searchbar.appendChild(findlastName);
	searchbar.appendChild(searchName);
	searchbar.appendChild(findStateTwo);
	searchbar.appendChild(searchState);
	page.appendChild(landing);
	page.appendChild(sublanding);
	body.appendChild(searchbar);
	body.appendChild(page);
}
