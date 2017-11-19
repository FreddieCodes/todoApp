var bodyParser = require('body-parser');
var mongoose = require('mongoose');
/////////
// Connect to the database
mongoose.connect('mongodb://test:test@ds161793.mlab.com:61793/freddiecodestodo');

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});
//

var Todo = mongoose.model('Todo', todoSchema);

////////
// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}]

var urlencodedParser = bodyParser.urlencoded({extended: false});
// to handle routes, and rendering and passing of data to views 
module.exports = function(app){

// routes

app.get('/todo', function(req,res){
    //  get data from mongodb and pass it to view 
    // .find({}) retrieves all the items in the collection 
    Todo.find({}, function(err, data){
        if (err) throw err;
        res.render('todo', {todos: data});
    })  
});

app.post('/todo', urlencodedParser, function(req,res){
    //  get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
        if (err) throw err;
        res.json(data);
    })
});

app.delete('/todo/:item', function(req,res){
    // delete the request iteam from the database (mongodb)
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
        if (err) throw err
        res.json(data);
    }) 
});

}