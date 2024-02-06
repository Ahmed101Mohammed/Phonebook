const mongoose = require('mongoose');
const url = process.env.MONGODB_URL;

mongoose.set('strictQuery',false);
mongoose.connect(url)
  .then(r=>console.log("Connection to DB is successful:",r))
  .catch(err=>console.log("Failed to connect to DB:", err))
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate:{
      validator: function(v)
      {
        return /^\d{2,3}-\d+/.test(v);
      },
      message: () => `Invalid phone number format. this is the valid ones: 55-55555.. or 555-5555..`,
    },
    required: true
  } 
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
