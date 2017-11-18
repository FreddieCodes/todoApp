// to handle routes, and rendering and passing of data to views 
module.exports = function(app){

// routes

app.get('/todo', function(req,res){
res.render('todo')
});

app.post('/todo', function(req,res){
    
});

app.delete('/todo', function(req,res){
    
});

}