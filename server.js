var express = require('express');
    nodemailer = require('nodemailer');
  	http = require('http'); 
  	bodyParser = require('body-parser');
  	app = express();
    router = express.Router();
  	fs = require('fs');  
    mongoose = require('mongoose'); 
    Schema = mongoose.Schema;
    NewsArticle = require('./dist/scripts/news'); 
    ProjectArticle = require('./dist/scripts/projects');
    Message = require('./dist/scripts/messages');

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
    morgue = require('./routes/morgue');

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

var urlencodedParser = bodyParser.urlencoded({
  extended : false
});

var mainUrl = '//www.thesoogie.com/';  

var images = fs.readFileSync(__dirname + '/dist/json/images.json'); 

var jsonImages = JSON.parse(images); 

var port = process.env.PORT || 8000;  

app.use(bodyParser.json());
app.use('/projects', express.static(__dirname + '/projects'));
app.use('/morgue', express.static(__dirname + '/morgue'));
app.use('/css', express.static(__dirname + '/dist/css'));
app.use('/images', express.static(__dirname + '/dist/images'));
app.use('/scripts', express.static(__dirname + '/dist/scripts'));
app.use('/templates', express.static(__dirname + '/dist/templates'));
app.use('/json', express.static(__dirname + '/dist/json'));   
app.use('/projects', projects);
app.use('/morgue', morgue); 
 
app.get('/', function(req, res ){
  mongoose.connection.close();
	res.sendFile(__dirname + '/dist/about.html');
});
 

app.get('/about', function(req, res ){
    mongoose.connection.close();
    res.sendFile(__dirname + '/dist/about.html');
});

app.get('/news', function(req, res ){
    mongoose.connection.close();
    res.sendFile(__dirname + '/dist/news.html');
});

app.get('/newsjson', function(req, res){

    mongoose.connect(mongoLabsNews, options); 
 
    var conn = mongoose.connection;
    conn.on('error', console.error.bind(console, 'connection error:'));  
    conn.on('open', function() {
    
      NewsArticle.find({}, (err, obj) => {

        if (obj) {  
            res.end(JSON.stringify(obj));
        }

        else {
          console.log(err);
        }

        
  
      }); 

    }); 

    setTimeout(function(){
      conn.close();
    }, 2000);

});

app.get('/editnews', function(req, res ){  
    res.sendFile(__dirname + '/dist/editNews.html');   
});

app.post('/editnews', urlencodedParser, function(req, res ){

  mongoose.connect(mongoLabsNews, options); 
 
  var conn = mongoose.connection; 
  conn.on('error', console.error.bind(console, 'connection error:'));   
  conn.on('open', function() {  
    console.log('db opened'); 
  });

  var news = new NewsArticle({
      title : req.body.text,
      linkText : req.body.source,
      url : req.body.url  
  });   

  news.save();    
 
  setTimeout(function(){
    conn.close();
  }, 2000);

  res.sendFile(__dirname + '/dist/editNews.html');

});

app.get('/folio', function(req, res ){
    mongoose.connection.close();
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
  
  setTimeout(function(){
    conn.close();
  }, 2000);

  res.sendFile(__dirname + '/dist/contact.html');

});

app.get('/team', function(req, res ){
    mongoose.connection.close();
    res.sendFile(__dirname + '/dist/team.html');
}); 

app.listen(port);