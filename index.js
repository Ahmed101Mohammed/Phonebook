require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Person =  require('./models/db')

const app = express();
app.use(express.static('dist'))
app.use(cors());
app.use(express.json());
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    Object.keys(req.body).length === 0? '':JSON.stringify(req.body)
  ].join(' ')
}));

app.get('/info',(req,res)=>{
  const message = `<p>Phonebook has info for ${phoneBookData.length} people.</p> <p>${new Date()}</p>`;
  res.send(message);
})

app.get('/api/persons/',(req,res)=>
{
  Person.find({})
  .then(persons=>res.json(persons))
  .catch(error=>{
    console.log("Error of geting all persons data:",error)
    res.status(500).send('Failed in DB.')
  })
})

app.get('/api/persons/:id',(req,res)=>
{
  const id = Number(req.params.id);
  const person = phoneBookData.find(person=>person.id===id);
  if(person)
  {
    res.json(person)
  }
  else
  {
    res.status(404).end();
  }
})

app.delete('/api/persons/:id',(req,res)=>
{
  const id = Number(req.params.id);
  phoneBookData = phoneBookData.filter(person=>person.id !== id)
  res.status(204).end()
})

app.post('/api/persons/',(req,res)=>{

  const personName = req.body.name;
  const personNumber = req.body.number;
  const newPerson = Person({
    name: req.body.name,
    number: req.body.number,
  })
  
  Person.find({name:req.body.name})
  .then(result=>{
    console.log("Exist:",result)
    if(result.length > 0)
    {
      res.json({Error:"The person name is already exist before"})
    }
    else if(personName && personNumber)
    {
     newPerson.save()
      .then(data=>
      {
        res.json(data)
      })
      .catch(error=>{
        res.json({Error: `Failed to save data: ${error}`})
      })
    }
    else
    {
      res.status(404).send({"Error":"There are messing data (name or number)."})
    }
 
  })
 
})

const PORT = process.env.PORT||3001;
app.listen(PORT,()=>console.log(`Server runing at port:${PORT}`))
