const mongoose = require('mongoose');
const Elephant = mongoose.model('Elephant');
const elephant = require('../controllers/elephant.js');

module.exports = function(app){
  //displays all the elephants
  app.get('/', function(request, response){
    elephant.show(request, response);
  })

  app.get('/elephant/:id', function(request, response){
    console.log('/elephant/:id SHOW ONE req obj.....',request.params.id);
    elephant.show_One(request, response);
  })

  app.get('/new', function(request, response){
    response.render('new/index');
  })

  app.post('/elephant', function(request, response){
    console.log('/elephant req obj.....',request.body);
    elephant.create(request, response);
  })

  app.get('/elephant/edit/:id', function(request, response){
    elephant.editForm(request, response);
  })

  app.post('/elephant/:id', function(request, response){
    console.log('/elephant/:id post route for edit',request.body);
    elephant.edit(request, response);
  })

  app.post('/elephant/destroy/:id', function(request, reponse){
    console.log('removing elephant', request.params.id);
    elephant.remove_ele(request, reponse);
  })
}
