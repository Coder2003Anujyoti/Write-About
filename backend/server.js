// server.js
const express = require('express');
const fs=require('fs');
const app = express();
const PORT = 8001;
const data=require("./text.json");
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
app.get('/app/reaction',(req,res)=>{
       return res.status(201).json(data);
})
app.post('/app/reaction',(req, res) => {
  const item={
    text:req.body.text
  }
    data.push(item);
    fs.writeFile("./text.json",JSON.stringify(data),(err,data)=>{
      if(err)
      console.log(err)
    });
    return res.json(data);
});

app.listen(PORT,
    () => {
        console.log(
            `Server is listening at 
            http://localhost:${PORT}`
        );
    });