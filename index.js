const express = require('express');
let phoneBookData = require('./data');

const app = express();
app.use(express.json());

app.get('/info',(req,res)=>{
  const message = `<p>Phonebook has info for ${phoneBookData.length} people.</p> <p>${new Date()}</p>`;
  res.send(message);
})

app.get('/api/persons/',(req,res)=>
{
  res.json(phoneBookData)
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

const idGenerator = ()=>
{
  const min = Math.max(...phoneBookData.map(person=>person.id));
  const random = Math.ceil(Math.random() * 1000);
  return random+min;
}
app.post('/api/persons/',(req,res)=>{
  const personName = req.body.name;
  const personNumber = req.body.number;
  const person = phoneBookData.find(person=> person.name === personName);
  if(personName && personNumber && !person)
  {
    const newPerson = {id:idGenerator(),name:personName,number:personNumber};
    phoneBookData.push(newPerson);
    res.json(newPerson);
  }
  else if(person)
  {
    res.status(404).send({erro: 'Name must be unique.'})
  }
  else
  {
    
    res.status(404).send({"Error":"There are messing data (name or number)."})
  }
  
})

const PORT = 3001;
app.listen(PORT,()=>console.log(`Server runing at port:${PORT}`))
