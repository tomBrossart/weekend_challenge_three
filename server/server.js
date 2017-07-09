var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require( 'path' );
// still not 100% clear what this line means... connecting db?
var port = process.env.PORT || 5000;
var tasksRoute = require('./routes/tasks.js');

app.use(bodyParser.urlencoded({extended: true}));

// connect CRUD requets from client.js to tasks.js with this route
app.use('/tasks', tasksRoute);

// Serve back static files by default
app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, '/public/', file));
});

// Start listening for requests on a specific port
app.listen(port, function(){
  console.log('listening on port', port);
});
