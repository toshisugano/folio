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

var date = new Date(); 
var year = date.getFullYear();  

var articleTemp;
var articleTemp2;  
var bioTemp; 
var bioTemp2; 
var aboutBios = [];
var socialIcons = {};
var images = []; 
var frameArr = ['#artRow1-a', '#artRow1-b', '#artRow2', '#artRow3-a', '#artRow3-b', '#artRow3-c'];
var imgKeys = ['bison', 'cabbit-apocalypse', 'cabbit-balloons', 'cabbit-eclipse', 'cabbit-enters', 'cabbit-mtn', 'cabbit-river', 'cabbit-tea', 'cabbit-trees', 'cabbit-valley', 'clouds', 'deerwood-dr', 'flying-humans', 'house', 'moon-blows', 'walking-humans'];
var shoppingCart = [];

var currPage = sessionStorage.currPage || 1; 
var artIndex = currPage-1;

function winReload(){
	window.location.reload();
}

function theDate(){
	$('#footerContainer').append('<footer>&copy;' + year + ' Prospekt Group Films</footer>');
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
	var currCount = shoppingCart.length;
	$('#cartCount').children().children().text(currCount);
} 

//Changes image sizes depending on window width
function initImg(){ 
	console.log("initImg");
	var vidWidth = winWidth/1.5;
	var vidHeight = vidWidth/1.3333;   
	var midImgHeight = $('#artRow2').height() + 80;
	var midHeight = -Math.abs(midImgHeight / 2);
	$('.nextButton').css('margin-top', midHeight);
	if (winWidth > 768) {
		$('#mainBG').attr('src', 'images/main-bg.jpg');
		$('#newsHeader').attr('src', 'images/newsBar.jpg');
		$('#artHeader').attr('src', 'images/artBar.jpg');  
		$('#teamHeader').attr('src', 'images/teamBar.jpg');
			$('.john').attr('src', 'images/bio-john.png');
			$('.emma').attr('src', 'images/bio-emma.png');
			$('.kadavre').attr('src', 'images/bio-kadavre.png');
			$('.matt').attr('src', 'images/bio-matt.png');
			$('.andre').attr('src', 'images/bio-andre.png');
		$('#video').attr({
			width : vidWidth,
			height : vidHeight
		});  
	}
	else if (winWidth <= 768 && winWidth > 500) { 
		$('#mainBG').attr('src', 'images/main-bg-m.jpg'); 
		$('#newsHeader').attr('src', 'images/newsBar-m.jpg');
		$('#artHeader').attr('src', 'images/artBar.jpg');
			$('#artRow1-a').children().attr('src', 'images/artRow1-a.jpg');
			$('#artRow1-b').children().attr('src', 'images/artRow1-b.jpg');
			$('#artRow2').children().attr('src', 'images/artRow2.jpg');
			$('#artRow3-a').children().attr('src', 'images/artRow3-a.jpg');
			$('#artRow3-b').children().attr('src', 'images/artRow3-b.jpg');
			$('#artRow3-c').children().attr('src', 'images/artRow3-c.jpg');
		$('#teamHeader').attr('src', 'images/teamBar-m.jpg');
			$('.john').attr('src', 'images/bio-john-m.png');
			$('.emma').attr('src', 'images/bio-emma-m.png');
			$('.kadavre').attr('src', 'images/bio-kadavre-m.png');
			$('.matt').attr('src', 'images/bio-matt-m.png');
			$('.andre').attr('src', 'images/bio-andre-m.png'); 
		$('#video').attr({
			width : winWidth,
			height : vidHeight
		});  
	}
	else if (winWidth <= 500)  {  
		$('#mainBG').attr('src', 'images/main-bg-s.jpg');
		$('#newsHeader').attr('src', 'images/newsBar-s.jpg');
		$('#artHeader').attr('src', 'images/artBar-2.jpg');
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
		$('#teamHeader').attr('src', 'images/teamBar-s.jpg');
			$('.john').attr('src', 'images/bio-john-s.png');
			$('.emma').attr('src', 'images/bio-emma-s.png');
			$('.kadavre').attr('src', 'images/bio-kadavre-s.png');
			$('.matt').attr('src', 'images/bio-matt-s.png');
			$('.andre').attr('src', 'images/bio-andre-s.png');   
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



// selects ARTRow img objects and fills in params//
function toggleIMG(page, size, speed){  
	console.log('toggleIMG');
	var imagePage = images[page];  
	var keys = Object.keys(imagePage);  
	var time = speed;
	var src;
	if (size === 'small'){
		src = 'src2';
	}
	else if (size === 'large'){
		src = 'src';
	}
	_.each(keys, function(obj, index){
		return setTimeout(function(){
			var query = frameArr[index] + ' img';
            var $img = $(query);
            var thisObj = imagePage[keys[index]]; 
             
            $img.hide();
            $img.attr({
            	"id" : keys[index],
            	"src" : thisObj[src],
            	"title" : thisObj.title,
            	"size" : thisObj.size,
            	"price" : thisObj.price,
            	"paypal" : thisObj.paypal
            }).fadeIn(speed);  
		}, time + (100*index));
	});
}
  
function changePage(input, speed){ 
	console.log("changePage");
	var num = Number(input); 
	var artIndex = num-1; 
	if (input === 1 && winWidth > 500){
		$('#prevArrow').css('opacity', '.5').addClass('not-active'); 
		toggleIMG(artIndex, "large", 100);
	}
	else if (input === 1 && winWidth < 500){
		$('#prevArrow').css('opacity', '.5').addClass('not-active'); 
		 toggleIMG(artIndex, "small", 100);
	}
	else if (input === 2 && winWidth > 500){
		$('#prevArrow').css('opacity', '1').removeClass('not-active');
		$('#nextArrow').css('opacity', '1').removeClass('not-active');
		toggleIMG(artIndex, "large", 100);
	}
	else if (input === 2 && winWidth < 500){
		$('#prevArrow').css('opacity', '1').removeClass('not-active');
		$('#nextArrow').css('opacity', '1').removeClass('not-active');
		toggleIMG(artIndex, "small", 100);
	}
	else if (input === 3 && winWidth > 500) {
		$('#nextArrow').css('opacity', '.5').addClass('not-active'); 
		toggleIMG(artIndex, "large", 100);
	} 
	else if (input === 3 && winWidth < 500) {
		$('#nextArrow').css('opacity', '.5').addClass('not-active'); 
		toggleIMG(artIndex, "small"); 
        $('#artRow3-b img').css("display", "none");  
        $('#artRow3-c img').hide();
	} 
}    


 
function getJSONs(){  
	//Load article1 template
	var split = mainUrl.split("");
	var route = mainUrl.slice(split.length-3, split.length); 

	if (route === "eam"){ 
		console.log("team");
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

		initImg(); 

	} 

	else if (route === "ews") {

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

	else if (route === "art") {

		var imageJSON = $.getJSON("json/images.json");  

		imageJSON.then(function(data){
			_.each(data, function(obj, index){
				var keys = Object.keys(obj);
				var thisObj = {};
				for (i=0; i<keys.length; i++){
					var thisKey = keys[i]; 
					thisObj[thisKey] = obj[thisKey];
				}  
				images.push(thisObj);
			});  

			var index = Number(sessionStorage.currPage) || 1; 
			changePage(index, 200);
			$(document).scrollTop(sessionStorage.scrollTop); 
			 
		});  

	}
	
}	 

$('.links').on('click', function(){  
	var that = $(this); 
	that.parent().siblings().children().children().attr('style', 'color : $vanilla');
	var id = that[0].id; 
	var child = $('#' + id).children()[0]; 
	$(child).attr('style', 'color : red'); 
}); 
    

$('.nextButton').on('click', function(e){
	e.preventDefault();
	var thisId = $(this).attr('id'); 
	if (thisId === 'prevArrow'){
		currPage--; 
		sessionStorage.setItem("currPage", currPage);
		changePage(currPage, 100);
	}
	if (thisId === 'nextArrow'){
		currPage++; 
		sessionStorage.setItem("currPage", currPage);
		changePage(currPage, 100);
	} 
}); 

$('.close-up').on('click', function(){ 
	var thisURL = $(this)[0].src;
	var split = thisURL.split(""); 
	var spliced = thisURL.substring(0, split.length-6); 
	var newURL; 
	if ($(this)[0].id === "detail-d") {
		newURL = spliced + "-3.jpg";
	}
	else {
		newURL = spliced + ".jpg";
	} 
	$('#detail-main').attr("src", newURL);
});

$('#overlay-close').on('click', function(e){ 
	e.preventDefault(); 
	window.location = mainUrl + "art";  
});

$('.artClick').on('click', function(e){
	e.preventDefault();   
	var id = $(this).children().children()[0].id;
	window.location = mainUrl + "/" + id;
	sessionStorage.setItem("scrollTop", scrollTop); 
});

$('.cartButton').on('click', function(){
	var thisText = $('#key').text();
	shoppingCart.push(thisText);
	sessionStorage.setItem(thisText, thisText);
	cartCount();
});

$('#cartCount, .fa-shopping-cart').on('click', function(){
	alert(shoppingCart); 
});

$('#bars').on('click', function(){  
	$("#menuItems").animate({height: "255px"});
	$('#announcements').attr('margin-top', '-11px');
	$('#bars').attr('opacity', '0.5').addClass('inactive');
	$("#menuItems").append(
		'<li><a id="about" style="" href="about"><h3>HOME</h3></a></li>' +
		'<li><a id="news" style="" href="news"><h3>NEWS</h3></a></li>' +
        '<li><a id="art" style="" href="art"><h3>ART</h3></a></li>' +
        '<li><a id="team" style="" href="team"><h3>TEAM</h3></a></li>'
    );
});
 
//On window resize, run imageBG 
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
	dims();
	theDate();
	cartCount();
	getJSONs();   
	setTimeout(setIcons, 1000);   
	sessionStorage.setItem("mainUrl", mainUrl);  
	//setTimeout(changePage(currPage, 100), 1000);
});
 
