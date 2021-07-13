const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notifySchema = new Schema({
	email: {
		type: String,
		required: true
	},
	date_created: {
		type: Date,
		default: Date.now
	}
})

const Notify = mongoose.model('Notify', notifySchema);
module.exports = Notify;
