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

var newsJSON = $.getJSON("json/news.json");
var aboutJSON = $.getJSON("json/about.json");
var socialJSON = $.getJSON("templates/socialMedia.json");
var imageJSON = $.getJSON("json/images.json"); 

var articleTemp;
var articleTemp2;  
var bioTemp; 
var bioTemp2; 
var aboutBios = [];
var socialIcons = {};
var images = []; 
var frameArr = ['#artRow1-a', '#artRow1-b', '#artRow2', '#artRow3-a', '#artRow3-b', '#artRow3-c'];
var shoppingCart = [];

var currPage = sessionStorage.currPage || 1; 
var artIndex = currPage-1;

function winReload(){
	window.location.reload();
}

function theDate(){
	$('#footerContainer').append('<footer>&copy;' + year + ' Prospekt Group Films</footer>');
}  

function cartCount() {
	var currCount = shoppingCart.length;
	$('#cartCount').children().children().text(currCount);
} 

function toggleIMG(page, size, speed){  
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
            console.log(thisObj);
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
	var num = Number(input); 
	var artIndex = num-1; 
	if (input === 1 && winWidth > 500){
		$('#prevArrow').css('opacity', '.5').addClass('not-active'); 
		toggleIMG(artIndex, "large", speed);
	}
	else if (input === 1 && winWidth < 500){
		$('#prevArrow').css('opacity', '.5').addClass('not-active'); 
		 toggleIMG(artIndex, "small", speed);
	}
	else if (input === 2 && winWidth > 500){
		$('#prevArrow').css('opacity', '1').removeClass('not-active');
		$('#nextArrow').css('opacity', '1').removeClass('not-active');
		toggleIMG(artIndex, "large", speed);
	}
	else if (input === 2 && winWidth < 500){
		$('#prevArrow').css('opacity', '1').removeClass('not-active');
		$('#nextArrow').css('opacity', '1').removeClass('not-active');
		toggleIMG(artIndex, "small", speed);
	}
	else if (input === 3 && winWidth > 500) {
		$('#nextArrow').css('opacity', '.5').addClass('not-active'); 
		toggleIMG(artIndex, "large", speed);
	} 
	else if (input === 3 && winWidth < 500) {
		$('#nextArrow').css('opacity', '.5').addClass('not-active'); 
		toggleIMG(artIndex, "small"); 
        $('#artRow3-b img').css("display", "none");  
        $('#artRow3-c img').hide();
	} 
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

//Changes image sizes depending on window width
function initImg(){ 
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
			$('#artRow1-a').children().attr('src', 'images/moon-blows.jpg');
			$('#artRow1-b').children().attr('src', 'images/cabbit-valley.jpg');
			$('#artRow2').children().attr('src', 'images/house.jpg');
			$('#artRow3-a').children().attr('src', 'images/walking-humans.jpg');
			$('#artRow3-b').children().attr('src', 'images/deerwood-dr.jpg');
			$('#artRow3-c').children().attr('src', 'images/cabbit-enters.jpg');
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
					$('#artRow1-a').children().attr('src', 'images/moon-blows-2.jpg');
					$('#artRow1-b').children().attr('src', 'images/cabbit-valley-2.jpg');
					$('#artRow2').children().attr('src', 'images/house-2.jpg');
					$('#artRow3-a').children().attr('src', 'images/walking-humans-2.jpg');
					$('#artRow3-b').children().attr('src', 'images/deerwood-dr-2.jpg');
					$('#artRow3-c').children().attr('src', 'images/cabbit-enters-2.jpg');
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
 
function bios(){  
	//Load article1 template
	$.get("templates/article1.txt", function( data ) {
        articleTemp = data;
    });
    //Load article2 template
    $.get("templates/article2.txt", function( data ) {
        articleTemp2 = data;
    }); 

    $.get("templates/bio1.txt", function(data) {
    	bioTemp = data;
    }); 

    $.get("templates/bio2.txt", function(data) {
    	bioTemp2 = data;
    });   

	//Loop through JSON
	socialJSON.then(function(jsondata){
		_.each(jsondata, function(icons){
			var keys = Object.keys(icons);
			for (i=0; i<keys.length; i++){
				var thisKey = keys[i];
				socialIcons[thisKey] = icons[thisKey];
			}
		});
	});

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
			initImg();
		});
		}, 500);   
	});   
 
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
		var split = mainUrl.split("");
		var slice = mainUrl.slice(split.length-3, split.length); 

		if (slice === "art"){
			console.log(images);
			var index = Number(sessionStorage.currPage) || 1; 
			changePage(index, 200);
			$(document).scrollTop(sessionStorage.scrollTop);
		} 
	});
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
	/*
	var title = $(this).children().children()[0].title;  
	var src = $(this).children().children()[0].attributes[0].value; 
	var size = $(this).children().children()[0].attributes[1].value;
	var price = $(this).children().children()[0].attributes[2].value; 
	var paypal = $(this).children().children()[0].attributes[4].value; 
	var split = src.split("");  
	var substr = src.substring(0, split.length-4);  
	var subsplit = substr.split(""); 
	var newstr = src.substring(0, split.length-6); 
	 
	var thisObj;
	for (i=0; i<images.length; i++){
		thisObj = images[i][id];
	}
	console.log("thisObj"); 
	 
	$('#overlaycontainer').css("display" , "inline");  
	$('#key').text(id);
	$('#price').text(price);
	$('#size').text(size);
	$('#title').text(title); 
	$('#buyitnow').html(paypal);
	if (substr.substring(subsplit.length-2, subsplit.length) === "-2") { 
		$('#detail-main').attr("src", newstr + "-3.jpg"); 
		$('#detail-a').attr("src", newstr + "-a-2.jpg"); 
		$('#detail-b').attr("src", newstr + "-b-2.jpg"); 
		$('#detail-c').attr("src", newstr + "-c-2.jpg");  
		$('#detail-d').attr("src", newstr + "-3.jpg");
	}  
	else {
		$('#detail-main').attr("src", substr + "-3.jpg");  
		$('#detail-a').attr("src", substr + "-a-2.jpg"); 
		$('#detail-b').attr("src", substr + "-b-2.jpg"); 
		$('#detail-c').attr("src", substr + "-c-2.jpg");  
		$('#detail-d').attr("src", substr + "-3.jpg");
	}*/
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
	bios();  
	setTimeout(setIcons, 1000);  

	sessionStorage.setItem("mainUrl", mainUrl); 
});
 
