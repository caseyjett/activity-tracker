const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const DataStore = require('nedb'); 
const { response } = require('express');
const alert = require('alert'); 

const database = new DataStore({filename: 'anything.db', autoload: true});
database.loadDatabase(); 


app.listen(3000, () => console.log("Listening at 3000") ); 
app.use(express.static('public')); 
app.use(express.json()); 
// app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
  }))

app.get('/all', (req, res) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end(); 
            return; 
        }
        res.json(data);    
    })  
})

  app.post('/form-submissions', (req, res) => {
    const data = req.body; 
    const timestamp = Date.now(); 
    data.timestamp = timestamp; 
    database.insert(data); 
   
    // // res.end();  
    // res.json(data)
    res.redirect('/');
    alert('Thanks!')
})

