var express = require('express');
	http = require('http');
	paypal = require('paypal-rest-sdk');
	uuid = require('node-uuid');
	bodyParser = require('body-parser');
	app = express();
	fs = require('fs'); 
    underscore = require('underscore');

var mainUrl = 'https://cabbitfilm.herokuapp.com/'; 

var clientId = 'Ae6PP_ZnAq9wXIrdeevd9NmfCuT6EnsjQkC-iBVEoiBY4h3HQGlKmpNDWtFJkr7h_X37bz8Eqx3NXv3Y';
// live clientId = Adnckf-8KyL8-pcvcPQ6s3tzDZ9_8DmKT531WbwoxHRk6_3-wHQV4nVNsBZbn0y2RmUVOMM-iu9Gjb9d
var secret = 'EPJTlVNZoYr_iDdZPVxo3Unc2-fDzOM8SHBxy7QV0RWF-FvrGv4IE3xvo_WwttszRsb2YMRsdQhdIiok';
// live secret = EEGsBQKsDmlzy2UxBZZqWaSab677tML5wFXPm0Ml_wkO2sgIg8Dd0BorhuYncAQnIopIVdASWK6gKKps

var port = process.env.PORT || 8000;
   
var images = fs.readFileSync(__dirname + '/dist/json/images.json'); 

var jsonImages= JSON.parse(images);
   
var currPage = 0; 

var data = require(__dirname + '/src/json/about.json'); 

var overlay = function(){
    this.el = '<!DOCTYPE html>' +
                '<html>' +
                '<head>' +
                '<script type="text/javascript" src="//code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>' +
                '<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet" type="text/css" />' +
                '<script type="text/javascript" src="//use.fontawesome.com/4a77a9db4c.js"></script>' +
                '<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" type="text/css" />' +
                '<link rel="stylesheet" type="text/css" href="' + mainUrl + 'css/main.min.css">' +
                '<script type="text/javascript" src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>' +
                '<script type="text/javascript" src="//jashkenas.github.io/underscore/underscore-min.js"></script>' +
                  '<meta charset="utf-8">' +
                  '<meta name="viewport" content="width=device-width; initial-scale=1.0; user-scalable=0;">' +
                  '<title>Cabbit</title>' +
                '</head>' +
                '<body>' +
                '<div id="overlaycontainer">' + 
                '<div id="overlay-app">' +
                  '<a href="' + mainUrl + 'art' + '">' +
                    '<div id="overlay-close">' +
                      '<h2>CLOSE</h2>' +
                    '</div>' +
                  '</a>' +
                  '<div id="overlay-close-up">' + 
                    '<img id="detail-main" src="<%= src3 %>">' +
                    '<img class="close-up" id="detail-a" src="<%= detailA %>" src-large="">' +
                    '<img class="close-up" id="detail-b" src="<%= detailB %>" src-large="">' +
                    '<img class="close-up" id="detail-c" src="<%= detailC %>" src-large="">' +
                    '<img class="close-up" id="detail-d" src="<%= detailD %>" src-large="">' +
                  '</div>' +
                  '<div id="overlay-description">' +
                    '<h2 id="title"><%= title %> </h2>' +
                    '<h2 id="key"><%= id %></h2>' +
                    '<hr/>' +
                    '<h3 id="size">8x10</h3>' +
                    '<h4 id="description">Printed on Epson Fine Art Paper</h4>' +
                    '<h4 id="price"><%= price %></h4>' +
                    '<%= paypal %>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '</body>' +
            '<script src="' + mainUrl + 'scripts/overlay.js"></script>' + 
            '</html>',
    this.rtn = function(){
        return this.el;
    }
};

paypal.configure({
	'mode': 'sandbox', //sandbox or live
    'client_id': clientId,
    'client_secret': secret
});

app.use(bodyParser.json());
app.use('/css', express.static(__dirname + '/dist/css'));
app.use('/images', express.static(__dirname + '/dist/images'));
app.use('/scripts', express.static(__dirname + '/dist/scripts'));
app.use('/templates', express.static(__dirname + '/dist/templates'));
app.use('/json', express.static(__dirname + '/dist/json'));

app.get('/cart', function(req, res){
    res.sendFile(__dirname + '/dist/index.html');
});

// PayPal payment request
app.get('/create', function(req, res) { 
    var payReq = {
        'intent': 'sale',
        'redirect_urls': {
            'return_url': mainUrl + 'process',
            'cancel_url': mainUrl + 'cancel'
        },
        'payer': {
            'payment_method': 'paypal'
        },
        'transactions': [{
            'amount': {
                'total': '7.47',
                'currency': 'USD'
            },
            'description': 'This is the payment transaction description.'
        }]
    };

    paypal.payment.create(payReq, function(error, payment) {
        if (error) {
            console.error(error);
        } else {
            //capture HATEOAS links
            var links = {};
            payment.links.forEach(function(linkObj) {
                links[linkObj.rel] = {
                    'href': linkObj.href,
                    'method': linkObj.method
                };
            }) 
            //if redirect url present, redirect user
            if (links.hasOwnProperty('approval_url')) {
                res.redirect(links['approval_url'].href);
            } else {
                console.error('no redirect URI present');
            }
        }
    }); 

});

//To complete payment, provide route to handle the return
app.get('/process', function(req, res){
    var paymentId = req.query.paymentId;
    var payerId = { 'payer_id': req.query.PayerID };

    paypal.payment.execute(paymentId, payerId, function(error, payment){
        if(error){
            console.error(error);
        } else {
            if (payment.state === 'approved'){ 
                res.sendFile(__dirname + '/dist/cleared.html');
            } else {
                res.send('payment not successful');
            }
        }
    });
});

app.get('/', function(req, res ){
	res.sendFile(__dirname + '/dist/index.html');
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

app.get('/art', function(req, res ){
    res.sendFile(__dirname + '/dist/art.html');
    console.log(mainUrl);
});

app.get('/art/:artId', function(req, res){ 
    var artId = req.params['artId'];  
    var artObj;
    currPage = req.query.page;

    for (i=0; i<jsonImages.length; i++){
        if (jsonImages[i][artId]) {
            artObj = jsonImages[i][artId];
        }
        else {
            continue;
        }
    } 
     
    if (artObj.detailD === undefined) {
        artObj.src = mainUrl + artObj.src;  
        var split = artObj.src.split("");  
        var substr = artObj.src.substring(0, split.length-4); 
        artObj.src3 = substr + "-3.jpg";
        artObj.detailA = substr + "-a-2.jpg";
        artObj.detailB = substr + "-b-2.jpg";
        artObj.detailC = substr + "-c-2.jpg"; 
        artObj.detailD = artObj.src3; 

        var divOverlay =  new overlay();
        var template = underscore.template(divOverlay.rtn());
        var thisDiv = template(artObj);  

        res.send(thisDiv);
    } 

    else {
        var divOverlay =  new overlay();
        var template = underscore.template(divOverlay.rtn());
        var thisDiv = template(artObj);   
        res.send(thisDiv);
    }  
});

app.get('/team', function(req, res ){
    res.sendFile(__dirname + '/dist/team.html');
});

app.get('/checkout', function(req, res ){ 
	console.log("checkout");
	//res.json();
});

app.listen(port);