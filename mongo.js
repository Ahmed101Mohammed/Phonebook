const mongoose = require('mongoose');

if(process.argv.length < 3)
{
	console.log('Un expected arguments')
	process.exit(1)
}

const password = process.argv[2];
const url = `mongodb+srv://ahmedmohamedal3adl:${password}@cluster0.zepo2bb.mongodb.net/PhoneBook?retryWrites=true&w=majority`;
mongoose.set('strictQuery',false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person',personSchema);

const getAllPersons = ()=>
{
	Person.find({})
	.then(result=>{
		result.forEach(person=>console.log(person))
		mongoose.connection.close();
	})
}

const saveNewPerson = ()=>
{
	const name = process.argv[3];
	const number = process.argv[4];
	const newPerson = new Person({name,number});
	newPerson.save()
	.then(data => {
		console.log('Data Saved!')
		mongoose.connection.close();
	})
	.catch(err => {
		console.log('Error in saving process',{err})
		mongoose.connection.close();
	})
}

if (process.argv.length === 3)
{
	getAllPersons()
}
else if (process.argv.length === 5)
{
	saveNewPerson()
}



