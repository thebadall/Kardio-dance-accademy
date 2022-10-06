// import module 
const express = require('express');
const path = require('path');
const app = express();
// mongoose 
const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/contactDance');
//  define mongoose schema 
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  name: String,
  email: String,
  address: String,
  desc: String
});
const Contact = mongoose.model('Contact', contactSchema);

const port = 80;
// express specific stuff 
app.use('/static', express.static('static')) // for serving static files
app.use(express.urlencoded());

// pug specified stuff
app.set('view engine', 'pug') // set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // set the views directory

// endpoints
app.get('/', (req, res) => {
  res.render('home.pug')
})
app.get('/contact', (req, res) => {
  res.render('contact.pug')
})
app.post('/contact', (req, res) => {
  var myData = new Contact(req.body);
  myData.save().then(() => {
    res.send("this is saved in database")
  }).catch(() => {
    res.status(400).send("Item was not saved to the database")
  })

})
// for start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
