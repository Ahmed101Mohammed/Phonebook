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
const PORT = 3001;
app.listen(PORT,()=>console.log(`Server runing at port:${PORT}`))
