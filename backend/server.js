// server.js
const express = require('express');
const fs=require('fs');
const app = express();
const PORT = 8000;
const data=require("./text.json");
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const URL = 'mongodb+srv://anujyotide:cr7FUgn1CxHAHUxo@benapi.x6nes.mongodb.net/About?retryWrites=true&w=majority';
const connectionParams={ useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(URL,connectionParams)
    .then(() => { console.log("Connected to the database");
    addDataToMongodb()
    }).catch((err)=>{console.log(err)})
    async function addDataToMongodb() {
    await GFGCollection
        .deleteMany();
    await GFGCollection
        .insertMany(data);
    console.log("Data added to MongoDB");
}
const gfgSchema = new mongoose
    .Schema({
        text: { type: String, required: true },
    });
    const GFGCollection = mongoose
    .model("collections", gfgSchema);
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
app.get('/app/reaction',async(req,res)=>{
  try {
        const data = await GFGCollection.find();
       return res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})
app.post('/app/reaction', async (req, res) => {
  try {
    const newSample = await GFGCollection({
      text:req.body.text,
    });
    const saved=await newSample.save({w:"majoriry"});
    return res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT,
    () => {
        console.log(
            `Server is listening at 
            http://localhost:${PORT}`
        );
    });