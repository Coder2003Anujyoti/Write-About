// server.js
const express = require('express');
const fs=require('fs');
const app = express();
const PORT = 8001;
const reaction=require("./text.json");
const cors=require('cors');
const bodyParser=require('body-parser');
app.use(cors({
  origin:"*"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
// define the route
app.get('/',
    (req, res) => {
        res.send(
            `<h1 style="color: green;">
            Hello Anujyoti!</h1>`
        );
    });
app.get('/app/reaction', (req, res) => {
  const limit = parseInt(req.query.limit)||reaction.length;  // Default to 10 if not provided
  const offset = parseInt(req.query.offset)||0;  // Default to 0 if not provided
if(isNaN(limit) && limit<=0){
  return res.status(400).json({error:"Limit must be a positive number."})
}
if(isNaN(offset) && offset<0){
  return res.status(400).json({error:"Offset must be a non-negative number."})
}

// Send the posts array as a JSON response
return res.json(reaction.slice(offset,offset+limit));
});
app.get('/app/reaction/:id',(req,res)=>{
  const id=Number(req.params.id);
  const alien=reaction.find(i=> i.index===id)
  return res.json(alien);
})
app.get('/reaction',(req,res)=>{
  const html=`
  <ul>
  ${reaction.map(i=>`<li>${i.text}</li>`).join("")}
  </ul>
  `
  res.send(html);
})
app.post('/app/reaction',(req,res)=>{
  const data={
    id:reaction.length+1,
    text:req.body.text,
  }
  reaction.push(data);
  fs.writeFile("./text.json",JSON.stringify(reaction), (err) => {
  if (err) {
    console.error('Error appending to file', err);
  }
});
 return res.json({message:"Data successfully send"});
})

app.listen(PORT,
    () => {
        console.log(
            `Server is listening at 
            http://localhost:${PORT}`
        );
    });