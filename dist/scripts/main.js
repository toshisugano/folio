var win; 
var winWidth;
var winHeight;
var docHeight;
var mainUrl = window.location.href; 
var scrollTop;
var aboutHeight; 
var watchHeight; 
var newsHeight; 
var artHeight; 
var teamHeight;  
var folioHeights = [];
var flickrLength = 0;

var date = new Date(); 
var year = date.getFullYear();

var mainBG = new Object(); 
mainBG.large = 'images/main-bg-'; 
mainBG.construct = function(obj){
  return obj + '.jpg';
}; 

var articleTemp;
var articleTemp2;  
var bioTemp; 
var bioTemp2; 
var cartTemp;
var cartTemp2;
var totalTemp;
var aboutBios = [];
var socialIcons = {};
var images = []; 
var shoppingCart = [];
var nodeCart = [];
var grandTotal = 0; 
var shipCal = 0;
var finalTotal = 0; 
var totalPrints = 0;
var shipType = undefined;

var currPage = sessionStorage.currPage || 1;   

function winReload(){
	window.location.reload();
} 

function setBG(){

	var num = Math.ceil(Math.random()*10);
	var div = num/2;

	if (div === 0 || div < 1) {
	   mainBG.large += 'house';
	   $('#aboutDescription').html('<h1>Featured Project : Cabbit - An Interpretive Eco-Fable</h1>' +
              					 '<h1>Cabbit was a short film produced by Prospekt Films.</h1>' +
              					 '<h2>Learn more about it <a href="/projects/cabbitfilm">HERE</a></h2>');
	}
	else if (div === 1 || div < 2) {
	   mainBG.large += 'house';
	   $('#aboutDescription').html('<h1>Featured Project : Cabbit - An Interpretive Eco-Fable</h1>' +
              					 '<h1>Cabbit was a short film produced by Prospekt Films.</h1>' +
              					 '<h2>Learn more about it <a href="/projects/cabbitfilm">HERE</a></h2>');
	}
	else if (div === 2 || div < 3) {
	   mainBG.large += 'house';
	   $('#aboutDescription').html('<h1>Featured Project : Cabbit - An Interpretive Eco-Fable</h1>' +
              					 '<h1>Cabbit was a short film produced by Prospekt Films.</h1>' +
              					 '<h2>Learn more about it <a href="/projects/cabbitfilm">HERE</a></h2>');
	}
	else if (div === 3 || div < 4) {
	   mainBG.large += 'house';
	   $('#aboutDescription').html('<h1>Featured Project : Cabbit - An Interpretive Eco-Fable</h1>' +
              					 '<h1>Cabbit was a short film produced by Prospekt Films.</h1>' +
              					 '<h2>Learn more about it <a href="/projects/cabbitfilm">HERE</a></h2>');
	}
	else if (div === 4 || div <= 5) {
	   mainBG.large += 'moon';
	   $('#aboutDescription').html('<h1>Featured Project : Cabbit - An Interpretive Eco-Fable</h1>' +
              					 '<h1>Moon was a short film produced by Prospekt Films.</h1>' +
              					 '<h2>Learn more about it <a href="/projects/cabbitfilm">HERE</a></h2>');
	}

}


function flickrAPI(){
    //create a var that makes a call to the flickr API 
    var getIMG = "https://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id=72157645079323413&+description+&api_key=814796ef7eee08b0534ae009b71b62aa&jsoncallback=?";
    //pass the getIMG var through the getJSON function
    $.getJSON(getIMG, function(data){ 
    	flickrLength = data.photoset.photo.length;
        //Loop through each of the photos
        $.each(data.photoset.photo, function(index, photo){ 
        //Create a variable that creates an img src tag for each photo returned
        var img_src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "c.jpg";
        //Create a variable that creates an href tag for each photo returned
        var a_href = "http://www.flickr.com/photos/" + data.photoset.owner + "/" + photo.id + "/";  
        var folio = $("<div></div>", {"class": "folioDiv20"}).appendTo("#folioArticle2");
        //Create a container for the image and then append to folio
        var img_box = $("<div></div>", {"class": "folioImage20"}).appendTo(folio);
        //Create an image tag and append to each img_box
        $("<img/>").attr("src", img_src).appendTo(img_box).wrap("<a href='" + a_href + "'' target=\"'_blank'\" ></a>"); 
            //Create a variable that looks up each individual photo and stores the description from each photo 
            var getPhotoInfo = "https://api.flickr.com/services/rest/?format=json&method=flickr.photos.getInfo&photo_id=" + photo.id + "&api_key=814796ef7eee08b0534ae009b71b62aa&jsoncallback=?";
            //Create a function that parses the info
            $.getJSON(getPhotoInfo, function(data){
                //Loop through the info and sort through key-value pairs
                $.each(data.photo.title, function(key, title){
                    //create a div that stores each title for each photo
                    $("<div/>", {"class": "folioTitle", "text": title }).appendTo(folio);
                     //Create a horizontal orange line
                    $("<hr></hr>", {"background": "#f7b321", "border": "0", "height": "3px", "width": "90%"}).appendTo(folio);
                });

                $.each(data.photo.description, function(key, desc){
                    //create a variable that stores each description for each photo
                    $("<div></div>", {"class": "folioDescription20", "text": desc, "width": "90%"}).appendTo(folio);
                });

                $.each(data.photo.tags.tag, function(index, object){
                    //Create a variable that stores each of the tags
                    var tagString = object.raw;  
                    var regex = /www/i;  
                    var testregex = regex.test(tagString);   
                    var substr = tagString.substr(4, tagString.split("").length);

                    var soogStr = substr.substr(0,3); 
                    var a_href = 'http://' + tagString;
                    var target = "_blank";

                    /*if (soogStr === 'htt') {
                    	a_href = tagString;
                    	target = "_blank";
                    }*/

                    if (soogStr === 'the') {
                    	a_href = 'http://' + tagString;
                    	target = '_self';
                    } 

                    if (soogStr === 'tos') {
                    	a_href = 'http://toshiblog.herokuapp.com';
                    }

                    if (testregex === true) { 
                        //Create a JQuery div whose class is folioTag
                        var folioFooter = $("<div></div>", {"class": "folioTag"}).appendTo(folio);
                        //Create a variable called valueLink that creates an href incorporating tagString
                        $('<a/>', {
                            href : a_href,
                            text : "Visit Site",
                            target : target
                        }).appendTo(folioFooter);
                        //Wrap valueLink with class tagWhite
                        //Append to folio
                        }

                 });
				
				folioHeights.push($(folio).height());

					if (flickrLength === folioHeights.length) {
						var Num = folioHeights.sort().pop();
						$('.folioDiv20').each(function(index, obj){
							var that = $(obj);
							var height = that.css("height");
							that.css("height", Num);
						});
					}

            }); 
               
        });

    });//end

  
}

function theDate(){
	$('#footerContainer').append('<footer id="copyright">&copy;' + year + ' THE SOOGIE</footer>');
}  

function dims(){
	win = window; 
	winWidth = win.innerWidth;  
	winHeight = win.innerHeight;
	docHeight = $('#mainContainer').height();
	aboutHeight = $('#aboutContainer').height();
	watchHeight = $('#watchContainer').height() + aboutHeight; 
	newsHeight = watchHeight + $('#newsContainer').height();
	artHeight = newsHeight + $('#artContainer').height();
	teamHeight = $('#teamContainer').height() + artHeight; 
} 

function cartCount() { 

	var currCount;
	
	if (sessionStorage.cart === undefined) {
		currCount = 0;
	}
	else {
		var cart = JSON.parse(sessionStorage.cart);
		currCount = cart.length;
	}
	
	$('#cartCount').children().children().text(currCount);
} 

//Changes image sizes depending on window width
function initImg(){  
	var vidWidth = winWidth/1.5;
	var vidHeight = vidWidth/1.3333;   
	var midImgHeight = $('#artRow2').height() + 80;
	var midHeight = -Math.abs(midImgHeight / 2); 
	if (winWidth > 768) {
		$('#mainBG').attr('src', mainBG.construct(mainBG.large)); 
		$('#newsHeader').attr('src', 'images/newsBar.jpg');
		$('#folioHeader').attr('src', 'images/folioBar.jpg');
		$('#artHeader').attr('src', 'images/artBar.jpg');  
		$('#teamHeader').attr('src', 'images/teamBar.jpg');
			$('.john').attr('src', 'images/bio-john.png');
			$('.emma').attr('src', 'images/bio-emma.png');
			$('.kadavre').attr('src', 'images/bio-kadavre.png');
			$('.matt').attr('src', 'images/bio-matt.png');
			$('.andre').attr('src', 'images/bio-andre.png');
		$('#contactHeader').attr('src', 'images/contactBar.jpg');
		$('#video').attr({
			width : vidWidth,
			height : vidHeight
		});  
	}

	else if (winWidth <= 768 && winWidth > 500) { 
		$('#mainBG').attr('src', mainBG.construct(mainBG.large + "-m")); 
		$('#newsHeader').attr('src', 'images/newsBar-m.jpg');
		$('#folioHeader').attr('src', 'images/folioBar-m.jpg');
		$('#artHeader').attr('src', 'images/artBar.jpg');
			/*
			$('#artRow1-a').children().attr('src', 'images/artRow1-a.jpg');
			$('#artRow1-b').children().attr('src', 'images/artRow1-b.jpg');
			$('#artRow2').children().attr('src', 'images/artRow2.jpg');
			$('#artRow3-a').children().attr('src', 'images/artRow3-a.jpg');
			$('#artRow3-b').children().attr('src', 'images/artRow3-b.jpg');
			$('#artRow3-c').children().attr('src', 'images/artRow3-c.jpg');
			*/
		$('#teamHeader').attr('src', 'images/teamBar-m.jpg');
			$('.john').attr('src', 'images/bio-john-m.png');
			$('.emma').attr('src', 'images/bio-emma-m.png');
			$('.kadavre').attr('src', 'images/bio-kadavre-m.png');
			$('.matt').attr('src', 'images/bio-matt-m.png');
			$('.andre').attr('src', 'images/bio-andre-m.png'); 
		$('#contactHeader').attr('src', 'images/contactBar-m.jpg');
		$('#video').attr({
			width : winWidth,
			height : vidHeight
		});  
	}

	else if (winWidth <= 500)  {  
		$('#mainBG').attr('src', mainBG.construct(mainBG.large + "-s"));
		$('#newsHeader').attr('src', 'images/newsBar-s.jpg');
		$('#folioHeader').attr('src', 'images/folioBar-s.jpg');
		$('#artHeader').attr('src', 'images/artBar-2.jpg');
			/*
			(function(page){
				if (page === 1){
					$('#artRow1-a').children().attr('src', 'images/artRow1-a-2.jpg');
					$('#artRow1-b').children().attr('src', 'images/artRow1-b-2.jpg');
					$('#artRow2').children().attr('src', 'images/artRow2-2.jpg');
					$('#artRow3-a').children().attr('src', 'images/artRow3-a-2.jpg');
					$('#artRow3-b').children().attr('src', 'images/artRow3-b-2.jpg');
					$('#artRow3-c').children().attr('src', 'images/artRow3-c-2.jpg');
				}
			})(currPage);
		*/
		$('#teamHeader').attr('src', 'images/teamBar-s.jpg');
			$('.john').attr('src', 'images/bio-john-s.png');
			$('.emma').attr('src', 'images/bio-emma-s.png');
			$('.kadavre').attr('src', 'images/bio-kadavre-s.png');
			$('.matt').attr('src', 'images/bio-matt-s.png');
			$('.andre').attr('src', 'images/bio-andre-s.png');   
		$('#contactHeader').attr('src', 'images/contactBar-s.jpg');
		$('#video').attr({
			width : winWidth,
			height : vidHeight
		});  
	} 
}

function setIcons(){
	for (i=0; i<aboutBios.length; i++){
		var that = aboutBios[i];
		if (that.facebook !== ""){ 
			var template = _.template(socialIcons.facebook);
			var htmlTemp = template(that);   
			$('.socialLinks.' + that.name).append(htmlTemp);
		}
		if (that.instagram !== ""){
			var template = _.template(socialIcons.instagram);
			var htmlTemp = template(that);   
			$('.socialLinks.' + that.name).append(htmlTemp);
		}
		if (that.site !== ""){
			var template = _.template(socialIcons.site);
			var htmlTemp = template(that);   
			$('.socialLinks.' + that.name).append(htmlTemp); 
		}
		if (that.vimeo !== ""){
			var template = _.template(socialIcons.vimeo);
			var htmlTemp = template(that);   
			$('.socialLinks.' + that.name).append(htmlTemp);
		}
		if (that.twitter !== ""){
			var template = _.template(socialIcons.twitter);
			var htmlTemp = template(that);   
			$('.socialLinks.' + that.name).append(htmlTemp);
		}
		if (that.linkedin !== ""){
			var template = _.template(socialIcons.linkedin);
			var htmlTemp = template(that);   
			$('.socialLinks.' + that.name).append(htmlTemp);
		}
	}
}  
 
function getJSONs(){  
	//Load article1 template
	var split = mainUrl.split("");
	var route = mainUrl.slice(split.length-4, split.length); 

	if (route === "team"){ 
		
		var aboutJSON = $.getJSON("json/about.json");
		var socialJSON = $.getJSON("templates/socialMedia.json"); 

		$.get("templates/bio1.txt", function(data) {
    		bioTemp = data;
    	}); 

    	$.get("templates/bio2.txt", function(data) {
    		bioTemp2 = data;
    	}); 

    	aboutJSON.then(function(json){ 
			setTimeout(function(){
				_.each(json, function(obj){ 
				aboutBios.push(obj);
				var modulus = obj.id%2;
				if (modulus){
					var template = _.template(bioTemp);
					var htmlTemp = template(obj);  
					$('#teamContainer').append(htmlTemp);
				}
				else {
					var template2 = _.template(bioTemp2);
					var htmlTemp2 = template2(obj); 
					$('#teamContainer').append(htmlTemp2);
				}  
				});
			}, 500);    
		});   

		socialJSON.then(function(jsondata){
			_.each(jsondata, function(icons){
				var keys = Object.keys(icons);
				for (i=0; i<keys.length; i++){
					var thisKey = keys[i];
					socialIcons[thisKey] = icons[thisKey];
				}
			}); 
		});   

	} 

	else if (route === "olio") {
		setTimeout(function(){
			flickrAPI();
		}, 500);
	}

	else if (route === "news") {

		$.get("templates/article1.txt", function( data ) {
        	articleTemp = data;
    	});
     
	    $.get("templates/article2.txt", function( data ) {
	        articleTemp2 = data;
	    }); 

	    var newsJSON = $.getJSON("json/news.json");

	    newsJSON.then(function(json){
			setTimeout(function(){
			_.each(json, function(obj){ 
				var modulus = obj.id%2;
				if (modulus){
					var template = _.template(articleTemp);
					var htmlTemp = template(obj);  
					$('#newsContainer').append(htmlTemp);
				}
				else {
					var template2 = _.template(articleTemp2);
					var htmlTemp2 = template2(obj); 
					$('#newsContainer').append(htmlTemp2);
				}   
			}); 
			}, 500);  
		});

	} 
  
}	


 
function initLinks() {  

	$('.links').on('click', function(e){  
		e.preventDefault(); 
		var that = $(this); 
		that.parent().siblings().children().children().attr('style', 'color : $vanilla');
		var id = that[0].id; 
		var child = $('#' + id).children()[0]; 
		$(child).attr('style', 'color : red'); 
		location.href = "http://www.thesoogie.com/" + id;
		console.log(id + "this");
	});   

	$('#bars').on('click', function(){  

		$("#menuItems").animate({height: "355px"});
		$('#announcements').attr('margin-top', '-11px');
		$('#bars').attr('opacity', '0.5').addClass('inactive');
		$("#menuItems").append(
			'<li><a id="about" style="" href="about"><h3>HOME</h3></a></li>' +
			'<li><a id="news" style="" href="news"><h3>NEWS</h3></a></li>' +
	        '<li><a id="art" style="" href="art?page=1&winWidth=525"><h3>ART</h3></a></li>' +
	        '<li><a id="team" style="" href="team"><h3>FRIENDS</h3></a></li>'+  
            '<li><a id="contact" class="links" style="" href="contact"><h3><i class="fa fa-envelope" aria-hidden="true"></i>'
	    );
	    initLinks();
	});    


	$('.plusSign').on('click', function(e){
		e.stopImmediatePropagation();
		e.preventDefault();

		var count = $(this).parent().parent().next().children()[0].innerText; 
		if (count >= 1) {
			$(this).parent().parent().next().next().children().children().removeClass("not-active");
		} 

		totalPrints++;
		var count = $(this).parent().parent().next().children()[0].innerText;  
		var price = Number($(this).parent().parent().prev().children().attr("data-price"));
		var id = $(this).parent().parent().prev().children().attr("id"); 
		var num = Number(count); 
		num++; 

		for (i=0; i<shoppingCart.length; i++) {
			if (shoppingCart[i].id === id) {
				shoppingCart[i].quantity = num; 
			}
		}

		var total = "$" +  price * num + ".00";
		grandTotal = grandTotal + price;
		$(this).parent().parent().next().children().html(num);
		$(this).parent().parent().prev().children().html(total); 
		calcShipping();

	});

	$('.minusSign').on('click', function(e){
		e.preventDefault();
		e.stopImmediatePropagation();
		totalPrints--;

		var count = $(this).parent().parent().prev().children()[0].innerText; 
		if (count <= 2) {
			$(this).addClass("not-active");
		}

		var price = Number($(this).parent().parent().prev().prev().prev().children().attr("data-price"));
		var id = $(this).parent().parent().prev().prev().prev().children().attr("id");  
		var num = Number(count); 
		num--;
		var total = "$" + price * num + ".00"; 
		grandTotal = grandTotal - price;
		if (num < 1) { 
			$(this).parent().parent().prev().children().html(1);
			$(this).parent().parent().prev().prev().prev().children().children().html(price);
		}
		else {
			$(this).parent().parent().prev().children().html(num);
			$(this).parent().parent().prev().prev().prev().children().html(total);
		}  
	}); 

}  

window.onresize = function() {
	dims();
    initImg(); 
};
 
window.onresize(); 

$(window).scroll(function(){
	dims();
	scrollTop = $(document).scrollTop();   
});  

$(document).ready(function(){  
	setBG(); 
	dims();
	theDate(); 
	getJSONs();    
	//Sets ICONS 
	setTimeout(setIcons, 1200);  
	setTimeout(initImg, 1500); 
	setTimeout(initLinks, 1200); 
	sessionStorage.setItem("mainUrl", mainUrl);      
}); 