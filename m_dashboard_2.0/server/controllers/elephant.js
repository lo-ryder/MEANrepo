const mongoose = require('mongoose');
const Elephant = mongoose.model('Elephant');

module.exports = {
  show: function(request, response) {
    Elephant.find({}, function(err, elephants) {
      if(err){
        console.log('Error in show function--->', error);
      } else {
        response.render('index', { elephants });
      }
    })
  },
  show_One: function(request, response) {
    Elephant.find({_id: request.params.id}, function(err, elephant) {
      console.log(elephant)
      if(err){
        console.log('Error in show function--->', error);
      } else {
        response.render('one/index', { elephant });
      }
    })
  },
  create: function(request, response) {
    var elephant = new Elephant(request.body);
    elephant.save(function(err) {
      if(err){
        console.log("something went wrong");
      } else {
        response.redirect('/');
      }
    })
  },
  editForm: function(request, response){
    Elephant.find({_id: request.params.id}, function(err, elephant) {
      response.render('edit/index', { elephant });
    })
  },
  edit: function(request, response){
    Elephant.findByIdAndUpdate({_id: request.params.id}, request.body, { new: true}, function(err, elephant) {
      response.render('one/index', { elephant });
    })
  },
  remove_ele: function(request, response){
    console.log('removing elephant in remove_ele');
    Elephant.findByIdAndRemove({ _id: request.params.id }, function(err){
      if(err){
        console.log('Error in show function--->', err);
      } else {
        response.redirect('/');
      }
    })
  }
}
