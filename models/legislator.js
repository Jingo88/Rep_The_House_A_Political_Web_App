var mongoose = require('mongoose');
var LegislatorSchema = new mongoose.Schema({
	bioguide_id: String,
	crp_id: String,
	first_name: String,
	last_name: String,
	state_name: String,
	state: String,
	party: String,
	chamber: String,
	gender: String,
	twitter_id: String,
	term_start: Date,
	term_end: Date,
	website: String,
	in_office: Boolean,
	bills: {
		enacted_true: Number,
		enacted_false: Number,
		active_count: Number,
		vetoed_count: Number,
		topics: Array
	},
	industries: [ {
		industry_name: String,
		industry_code: String,
		money_from_indivs: Number,
		money_from_pacs: Number 
	} ],
	sectors: [ {
		sector_name: String,
		sectorid: String,
		money_from_indivs: Number,
		money_from_pacs: Number 
	} ],
	moneys: [ {
		total_reciepts: Number,
        total_spent: Number,
        cash_on_hand: Number,
        debt: Number
	} ],
	updated_at: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('Legislator', LegislatorSchema)