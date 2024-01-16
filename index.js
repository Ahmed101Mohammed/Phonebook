const express = require('express');
const phoneBookData = require('./data');

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
const PORT = 3001;
app.listen(PORT,()=>console.log(`Server runing at port:${PORT}`))
