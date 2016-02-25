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
    bills: [{
        bill_id: String,
        official_title: String,
        introduced_on: Date,
        active: Boolean,
        enacted: Boolean,
        vetoed: Boolean,
        keywords: Array
    }],
    industries: [{
        industry_name: String,
        industry_code: String,
        money_from_indivs: Number,
        money_from_pacs: Number
    }],
    sectors: [{
        sector_name: String,
        sector_code: String,
        money_from_indivs: Number,
        money_from_pacs: Number
    }],
    contributors: [{
        org_name: String,
        money_from_indivs: Number,
        money_from_pacs: Number
    }],
    monies: {
        total_reciepts: Number,
        total_spent: Number,
        cash_on_hand: Number,
        debt: Number,
        date_last_filed: Date
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Legislator', LegislatorSchema)