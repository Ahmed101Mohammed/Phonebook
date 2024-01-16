const express = require('express');
const phoneBookData = require('./data');

const app = express();
app.use(express.json());

app.get('/api/persons/',(req,res)=>
{
  res.json(phoneBookData)
})
const PORT = 3030;
app.listen(PORT,()=>console.log(`Server runing at port:${PORT}`))
