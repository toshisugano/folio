var express = require('express');
  	http = require('http');
  	paypal = require('paypal-rest-sdk');
  	uuid = require('node-uuid');
  	bodyParser = require('body-parser');
  	app = express();
  	fs = require('fs'); 
    underscore = require('underscore');

var mainUrl = '//cabbitfilm.herokuapp.com/';  

var images = fs.readFileSync(__dirname + '/dist/json/images.json'); 

var jsonImages = JSON.parse(images);
   
var currPage = 1; 

var clientId = 'Ab-5KXy0DQVuy-RoIt-cM0LXscYCQ0wKMLnBh1X_omBzzv9NgXzw5Hg5samAPS8UxjNAwQfVFwkxIZAp';
//var clientId = 'AT57UwwDwMyJTgYc4HLxcGyCQVHVHnkJH_B0Av3jsKiMhrh_n3oov8kOSC4PFac2YzZ-C951qRP0mmof';
var secret = 'EHN-W21_7yKiaz1CDc_7q5q-ldruVyIIRkxZCw7FFQlBnV5_USoCeULdU7gkfr126hlrRNQOqnA5yajL';
//var secret = 'ENzMgFKmEfIAbYhUQzEQTiQiGlJamwPly8e2ckJYJt-pIS0Wau6yEIx8YuMp35m-r_rwhYz0LoSWAZGl';

var port = process.env.PORT || 8000; 

var artHtml = function(){
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
                  '<div id="fb-root"></div>' + 
                  '<script>(function(d, s, id) {' + 
                  'var js, fjs = d.getElementsByTagName(s)[0];' + 
                  'if (d.getElementById(id)) return;' +
                  'js = d.createElement(s); js.id = id;' + 
                  'js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8";' + 
                  'fjs.parentNode.insertBefore(js, fjs);' + 
                  '}(document, "script", "facebook-jssdk"));</script>' +
                  '<div class="row" id="mainContainer">' +  
                        '<div id="pageCenter">' + 
                          '<ul id="menu">' + 
                            '<a href="#"><i id="bars" class="fa fa-bars fa-2x" aria-hidden="true"></i></a>' + 
                          '</ul>' + 
                          '<ul id="navLinks">' +
                            '<li><a id="about" class="links" style="" href="about"><i class="fa fa-home fa-2x" aria-hidden="true"></i></a></li> ' + 
                            '<li><a id="news" class="links" style="" href="news"><h3>NEWS</h3></a></li>' + 
                            '<li><a id="art" class="links" style="" href="art"><h3>ART</h3></a></li>' +
                            '<li><a id="team" class="links" style="" href="team"><h3>TEAM</h3></a></li>' +
                          '</ul>' +
                          '<div id="socialLinks">' + 
                            '<ul>' + 
                             '<li id="fbRecommend" >' + 
                             '<div class="fb-like" data-href="https://cabbitfilm.herokuapp.com" data-layout="button" data-action="recommend" data-size="large" data-show-faces="false" data-share="false">' + 
                             '</div></li>' + 
                             '<li id="cartCount"><a href="test"><h3></h3></a></li>' +  
                             '<li><a href="test"><i class="fa fa-2x fa-shopping-cart" aria-hidden="true"></i></a></li>' +
                            '</ul>' + 
                          '</div>' + 
                          '<div id="menuItems"></div>' + 
                          '<div id="announcements">' + 
                            '<h4>ALL PRINTS ARE CURRENTLY 50% OFF</h4>' + 
                          '</div>' +
                        '</div>' +  
                      '<div id="content">' +
                          '<div class="row" id="artContainer">' + 
                              '<img id="artHeader" src="images/artBar.jpg">' +
                              '<div id="artGallery" class="row">' + 
                                '<div id="artFrame" class="row">' + 
                                  '<div class="row" id="artRow1">' + 
                                    '<a class="artClick" href="#">' + 
                                      '<div id="artRow1-a">' + 
                                        '<img id="<%= id1 %>" paypal= "<%= paypal1 %>" title="<%= title1 %>" price="<%= price1 %>" size="<%= size1 %>" src="<%= src1 %>">' + 
                                      '</div>' +  
                                    '</a>' + 
                                    '<a class="artClick" href="#">' + 
                                      '<div id="artRow1-b">' + 
                                         '<img id="<%= id2 %>" paypal= "<%= paypal2 %>" title="<%= title2 %>" price="<%= price2 %>" size="<%= size2 %>" src="<%= src2 %>">' + 
                                      '</div>' + 
                                    '</a>' + 
                                  '</div>' + 
                                  '<a class="artClick" href="#">' + 
                                    '<div class="row" id="artRow2">' +
                                        '<img id="<%= id3 %>" paypal= "<%= paypal3 %>" title="<%= title3 %>" price="<%= price3 %>" size="<%= size3 %>" src="<%= src3 %>">' +   
                                    '</div>' + 
                                  '</a>' + 
                                  '<div id="buttons">' + 
                                      '<a href="#"><img class="nextButton not-active" id="prevArrow" src="images/prevArrow.gif"></a>' + 
                                      '<a href="#"><img class="nextButton" id="nextArrow" src="images/nextArrow.gif"></a>' +  
                                  '</div>' + 
                                  '<div class="row" id="artRow3">' + 
                                    '<a class="artClick" href="#">' + 
                                      '<div id="artRow3-a">' + 
                                        '<img id="<%= id4 %>" paypal= "<%= paypal4 %>" title="<%= title4 %>" price="<%= price4 %>" size="<%= size4 %>" src="<%= src4 %>">' + 
                                      '</div>' + 
                                    '</a>' + 
                                    '<a class="artClick" href="#">' + 
                                      '<div id="artRow3-b">' + 
                                         '<img id="<%= id5 %>" paypal= "<%= paypal5 %>" title="<%= title5 %>" price="<%= price5 %>" size="<%= size5 %>" src="<%= src5 %>">' + 
                                      '</div>' + 
                                    '</a>' + 
                                    '<a class="artClick" href="#">' + 
                                      '<div id="artRow3-c">' + 
                                         '<img id="<%= id6 %>" paypal= "<%= paypal6 %>" title="<%= title6 %>" price="<%= price6 %>" size="<%= size6 %>" src="<%= src6 %>">' + 
                                      '</div>' + 
                                    '</a>' + 
                                  '</div>' + 
                                '</div>' + 
                              '</div>' +  
                          '</div>' +   
                      '</div>' +  
                      '<div class="row" id="footerContainer">' + 
                        '<h5>PROSPEKT</h5>' + 
                      '</div>' + 
                  '</div>' + 
                '</body>' +
                '<script src="scripts/main.js"></script>' + 
                '</html>',
        this.rtn = function(){
            return this.el;
        }
}; 
  
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
                      '<a class="addToCart" href="#">' + 
                        '<div>' +
                          '<h2>ADD TO CART</h2>' + 
                        '</div>' + 
                      '</a>' + 
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

        Id = 'id' + obj.index;
        Src = 'src' + obj.index;
        Title = 'title' + obj.index;
        Size = 'size' + obj.index;
        Price = 'price' + obj.index;
        Paypal = 'paypal' + obj.index; 

        artObj[Id] = obj.id;
        artObj[Src] = obj[src];
        artObj[Title] = obj.title;
        artObj[Size] = obj.size;
        artObj[Price] = obj.price;
        artObj[Paypal] = obj.paypal; 
         
    });

    return artObj;
    
}

paypal.configure({
	  'mode': 'sandbox', //sandbox or live
    "host": "api.paypal.com",
    "port": "",
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

    var cart = req.query.cart;
    var total = req.query.total;
  
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
                'total': total,
                'currency': 'USD'
            },
            'description': cart
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

    var page = req.query.page || undefined;
    var width = req.query.winWidth || undefined;

    if (page === undefined) {
      res.sendFile(__dirname + '/dist/art.html'); 
    } 

    else { 
      var html =  new artHtml(); 
      var template = underscore.template(html.rtn());
      var thisDiv = template(artGallery(page, width));   
      res.send(thisDiv); 
    }
    
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

app.get('/test', function(req, res ){
    res.sendFile(__dirname + '/dist/test.html');
});

app.get('/checkout', function(req, res ){ 
	console.log("checkout");
	//res.json();
});

app.listen(port);