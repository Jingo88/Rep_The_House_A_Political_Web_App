$(document).ready(function(){
	onload();
});


function onload(){
	var searchbar = document.createElement('div');
		searchbar.setAttribute('id', 'searchbar');

	var home = document.createElement('div');
		home.setAttribute('id', 'home');

	var findlastName = document.createElement('input');
		findlastName.setAttribute('class', 'bar');
		findlastName.setAttribute('type', 'text');
		findlastName.setAttribute('placeholder', 'Search By Last Name');
		findlastName.setAttribute('id', 'findlastName');

	var searchName = document.createElement('button');
		searchName.setAttribute('class', 'click');
		searchName.setAttribute('id', 'searchName');

	var findStateTwo = document.createElement('input');
		findStateTwo.setAttribute('class', 'bar');
		findStateTwo.setAttribute('type', 'text');
		findStateTwo.setAttribute('placeholder', 'Search By State');
		findStateTwo.setAttribute('id', 'findStateTwo');

	var searchState = document.createElement('button');
		searchState.setAttribute('class', 'click');
		searchState.setAttribute('id', 'searchState');

	searchbar.appendChild(home);
	searchbar.appendChild(findlastName);
	searchbar.appendChild(searchName);
	searchbar.appendChild(findStateTwo);
	searchbar.appendChild(searchState);

	var page = document.createElement('div');
		page.setAttribute('id', 'page');

	var landing = document.createElement('h1');
		landing.setAttribute('id', 'landing');
		landing.innerHTML = "REP THE HOUSE";

	var sublanding = document.createElement('h3');
		sublanding.setAttribute('id', 'sublanding');
		sublanding.innerHTML = "This is a website for you to research the current legislators in the United States House of Representatives. Do yourselves a favor and stay informed!"

	page.appendChild(landing);
	page.appendChild(sublanding);

	body.appendChild(searchbar);
	body.appendChild(page);
}
