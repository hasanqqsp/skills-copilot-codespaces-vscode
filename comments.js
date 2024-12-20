// Create web server 
var express = require('express');
var app = express();
var fs = require("fs");

// Get comments
app.get('/comments', function (req, res) {
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

// Post comments
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.post('/comments', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
       comment:req.body.comment
   };
   console.log(response);
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["comment"] = response.comment;
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

// Delete comments
app.delete('/comments', function (req, res) {
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["comment"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

// Create a server to listen at port 8081
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})

// Run the server using the command:
// node comments.js
// Then open the browser and type:
// http://