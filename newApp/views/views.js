var BillsView = Backbone.View.extend({

  // Compile a template for this view. In this case '...'
  // is a placeholder for a template such as 
  // $("#list_template").html() 
  el: '#billsDiv',
  template = _.template($(bills-template)),

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});