const mongoose = require('mongoose');
const url = process.env.MONGODB_URL;

mongoose.set('strictQuery',false);
mongoose.connect(url)
.then(r=>console.log("Connection to DB is successful."))
.catch(err=>console.log("Failed to connect to DB:", err))
const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

personSchema.set('toJSON',{
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id;
		delete returnedObject.__v;
	}
})

const Person = mongoose.model('Person',personSchema);

module.exports = Person;
