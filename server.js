var express = require('express');
  	http = require('http'); 
  	bodyParser = require('body-parser');
  	app = express();
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

mongoose.Promise = global.Promise; 

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
   
var currPage = 1; 

//var clientId = 'Ab-5KXy0DQVuy-RoIt-cM0LXscYCQ0wKMLnBh1X_omBzzv9NgXzw5Hg5samAPS8UxjNAwQfVFwkxIZAp';
var clientId = 'AT57UwwDwMyJTgYc4HLxcGyCQVHVHnkJH_B0Av3jsKiMhrh_n3oov8kOSC4PFac2YzZ-C951qRP0mmof';
//var secret = 'EHN-W21_7yKiaz1CDc_7q5q-ldruVyIIRkxZCw7FFQlBnV5_USoCeULdU7gkfr126hlrRNQOqnA5yajL';
var secret = 'ENzMgFKmEfIAbYhUQzEQTiQiGlJamwPly8e2ckJYJt-pIS0Wau6yEIx8YuMp35m-r_rwhYz0LoSWAZGl';

var port = process.env.PORT || 8000;  


// selects ARTRow img objects and fills in params//
function artGallery(page, width){    

    var artIndex = page - 1;
    var artObj = {}; 
    var src;
    var count = 0;

    if (width <= 500){
        src = 'src2';
    }
    else {
        src = 'src';
    }

    underscore.each(jsonImages[artIndex], function(obj, index){

        var Id = 'id' + obj.index;
        var Src = 'src' + obj.index;
        var Title = 'title' + obj.index;
        var Size = 'size' + obj.index;
        var Price = 'price' + obj.index;
        var Paypal = 'paypal' + obj.index; 

        artObj[Id] = obj.id;
        artObj[Src] = obj[src];
        artObj[Title] = obj.title;
        artObj[Size] = obj.size;
        artObj[Price] = obj.price;
        artObj[Paypal] = obj.paypal; 
         
    });

    return artObj;
    
}
 

app.use(bodyParser.json());
app.use('/projects/scripts', express.static(__dirname + '/dist/scripts'));
app.use('/css', express.static(__dirname + '/dist/css'));
app.use('/images', express.static(__dirname + '/dist/images'));
app.use('/scripts', express.static(__dirname + '/dist/scripts'));
app.use('/templates', express.static(__dirname + '/dist/templates'));
app.use('/json', express.static(__dirname + '/dist/json'));

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
  res.sendFile(__dirname + '/dist/contact.html');
});

app.get('/projects/:projectId', function(req, res){

  var projectId = req.params['projectId'];
  console.log(projectId);

  mongoose.connect(mongoLabsProjects); 
 
  var conn = mongoose.connection;
  conn.on('error', console.error.bind(console, 'connection error:'));  
  conn.on('open', function() {

    conn.db.dropCollection('projects', (err, result) => {});  

    var project = new ProjectArticle({
        title : projectId,
        linkText : "Link",
        url : "http://WWW.thesoogie.com/cabbitfilms"  
    });  

    project.save(); 

  });  

  res.sendFile(__dirname + '/dist/blank.html');

}); 

app.post('/contact', urlencodedParser, function(req, res){  

  mongoose.connect(mongoLabsMessages, options); 
 
  var conn = mongoose.connection;
  conn.on('error', console.error.bind(console, 'connection error:'));  
  conn.on('open', function() { 
    
    var message = new Message({
        name : req.body.name,
        email : req.body.email,
        message : req.body.message  
    });  

    message.save(); 

  });    

  res.sendFile(__dirname + '/dist/contact.html');

});

app.get('/team', function(req, res ){
    res.sendFile(__dirname + '/dist/team.html');
});

app.get('/test', function(req, res ){
    res.sendFile(__dirname + '/dist/test.html');
}); 

app.listen(port);