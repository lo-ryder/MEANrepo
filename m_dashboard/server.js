const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const port = process.env.PORT || 8000;
const app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/elephantsDashboard');
mongoose.connection.on('connected', () => console.log('Listening to the db'));

const elephantSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,

  },
  species: {
    type: String,
    required: true,
    trim: true,
  },
  native_country: {
    type: String,
    required: true,
    trim: true,
  },
  age: Number,

}, {
  timestamps: true
});

const Elephant = mongoose.model('Elephant', elephantSchema);


//displays all the elephants
app.get('/', function(request, response){
  Elephant.find({})
  .then(elephants => {
    response.render('index', { elephants });
  })
  .catch(error => {
    console.log('Error--->', error);
  })
});

app.get('elephant/:id', function(request, reponse){
  let id = request.params.id;
  // res.send("Id is set to " + request.param("id"))
  console.log('request.params---',request.params.id);
  console.log(':id---',id);
  Elephant.find({_id: request.params})
  .then(elephant => {
    response.render('one/index', { elephant });
  })
  .catch(error => {
    console.log('Error--->', error);
  })
})

app.get('/elephant/new', function(request, response){
  response.render('new/index');
});

app.post('/elephant', function(request, response){
  console.log('req obj.....',request.body);
  Elephant.create(request.body)
  .then(elephant => {

    response.redirect(`/elephant/:id`)(elephant._id)})
  .catch(error => {
    console.log('Error-> ', error);
  })
});

app.get('/elephant/edit/:id', function(request, response){
  let id = request.params.id;
  Elephant.find({ _id: request.params.id })
  .then(elephant => {
    response.render('edit/index', { elephant });
  })
  .catch(error => {
    console.log('Error--->', error);
  })
})

app.post('/elephant/:id', function(request, response){
  let id = request.params.id;
  Elephant.findByIdAndUpdate(request.params._id, request.body)
  .then( elephant => {
    console.log('updated elephant!');
    response.redirect(`/elephant/${ request.params._id }`);
  })
  .catch(error => {
    console.log('Error-> ', error);
  })
})

app.post('/elephant/destroy/:id', function(request, reponse){
  console.log('removing elephant', request.params.id);
  Elephant.remove({ _id: request.params.id })
  .then( () => {
    console.log('SUCCESS');
    response.redirect('/elephant');
  })
  .catch(error => {
    console.log('Error-> ', error);
  })
});



app.listen(port, console.log('PORT: ',port));
