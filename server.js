var express = require('express');
    nodemailer = require('nodemailer');
  	http = require('http'); 
  	bodyParser = require('body-parser');
  	app = express();
    router = express.Router();
  	fs = require('fs');  
    mongoose = require('mongoose'); 
    Schema = mongoose.Schema;
    NewsArticle = require('./src/scripts/news'); 
    ProjectArticle = require('./src/scripts/projects');
    Message = require('./src/scripts/messages');

    api = 'FIFTXsj31ugm8JR-8QJM_rodJAei8QyS';
    mongoLocal = 'mongodb://localhost/users_test';
    mongoLabsNews = 'mongodb://thesoogie:Sugi21!!@ds161931.mlab.com:61931/soogiedb/collections/news?apiKey=FIFTXsj31ugm8JR-8QJM_rodJAei8QyS';
    mongoLabsProjects = 'mongodb://thesoogie:Sugi21!!@ds161931.mlab.com:61931/soogiedb/collections/projects?apiKey=FIFTXsj31ugm8JR-8QJM_rodJAei8QyS';
    mongoLabsMessages = 'mongodb://thesoogie:Sugi21!!@ds161931.mlab.com:61931/soogiedb/collections/messages?apiKey=FIFTXsj31ugm8JR-8QJM_rodJAei8QyS';
    
    options = { 
                server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } 
              };

    projects = require('./routes/projects'); 

mongoose.Promise = global.Promise; 

mongoose.connection.close();

//mongoose.connect(mongoLabs, options); 
/*mongoose.connect(mongoLabsNews); 
 
  var conn = mongoose.connection;
  conn.on('error', console.error.bind(console, 'connection error:'));  
  conn.on('open', function() {

    conn.db.dropCollection('news', (err, result) => {});  

    var news = new NewsArticle({
        title : "New Portolio section up and runningnowwwww",
        linkText : "Link",
        url : "http://WWW.thesoogie.com/friends"  
    });  

    news.save(); 

  });  */

NewsArticle.find({title : 'New Portolio section up and running!'}, (err, obj) => {
  if (obj) {
     for (i=0; i<obj.length; i++) {
      console.log(obj[i].url);
     }
  }
  else {
    console.log(err);
  }
}); 

var urlencodedParser = bodyParser.urlencoded({
  extended : false
});

var mainUrl = '//www.thesoogie.com/';  

var images = fs.readFileSync(__dirname + '/dist/json/images.json'); 

var jsonImages = JSON.parse(images); 

var port = process.env.PORT || 8000;  

app.use(bodyParser.json());
app.use('/projects', express.static(__dirname + '/projects'));
app.use('/css', express.static(__dirname + '/dist/css'));
app.use('/images', express.static(__dirname + '/dist/images'));
app.use('/scripts', express.static(__dirname + '/dist/scripts'));
app.use('/templates', express.static(__dirname + '/dist/templates'));
app.use('/json', express.static(__dirname + '/dist/json'));   
app.use('/projects', projects);

app.get('/cart', function(req, res){
    res.sendFile(__dirname + '/dist/index.html');
});
 
app.get('/', function(req, res ){
	res.sendFile(__dirname + '/dist/about.html');
});

app.get('/cancel', function(req, res ){
    res.sendFile(__dirname + '/dist/index.html');
});

app.get('/about', function(req, res ){
    res.sendFile(__dirname + '/dist/about.html');
});

app.get('/news', function(req, res ){
    res.sendFile(__dirname + '/dist/news.html');
});

app.get('/folio', function(req, res ){
    res.sendFile(__dirname + '/dist/folio.html');
});

app.get('/contact', function(req, res){

  mongoose.connect(mongoLabsMessages, options); 
 
  var conn = mongoose.connection;
  conn.on('error', console.error.bind(console, 'connection error:'));  
  conn.on('open', function() {  
    console.log('db opened'); 
  });

  res.sendFile(__dirname + '/dist/contact.html');

});

app.post('/contact', urlencodedParser, function(req, res){    

  var message = new Message({
      name : req.body.name,
      email : req.body.email,
      message : req.body.message  
  });   

  message.save();   
  
  conn.close();

  res.sendFile(__dirname + '/dist/contact.html');

});

app.get('/team', function(req, res ){
    res.sendFile(__dirname + '/dist/team.html');
}); 

app.listen(port);