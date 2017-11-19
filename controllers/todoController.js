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

var itemOne = Todo({item: "get flowers"}).save(function(err){
    if (err) throw err;
    console.log('item saved');
});
////////
var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}]

var urlencodedParser = bodyParser.urlencoded({extended: false});
// to handle routes, and rendering and passing of data to views 
module.exports = function(app){

// routes

app.get('/todo', function(req,res){
res.render('todo', {todos: data});
});

app.post('/todo', urlencodedParser, function(req,res){
    data.push(req.body)
    console.log(data)
    res.json(data)
});

app.delete('/todo/:item', function(req,res){
    data = data.filter(function(todo){
        return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    console.log(data)
    res.json(data);
    
});

}