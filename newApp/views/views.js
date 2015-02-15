var PoliView = Backbone.View.extend({
	el: '#poliInfo',
	template = _.template($(polis-template)),
	events: {"click #"}
})

var BillsView = Backbone.View.extend({

  // Compile a template for this view. In this case '...'
  // is a placeholder for a template such as 
  // $("#list_template").html() 
  el: '#billsDiv',
  template = _.template($(bills-template)),
  events: {"click #showBills": "allBills"} //what if allBills takes a parameter? (allBills(bioID))

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});



function allBills(bioID) {
    var urlB = "/bills/" + bioID;
    var xhr = new XMLHttpRequest();

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