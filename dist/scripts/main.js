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
		$('#video').attr({
			width : winWidth,
			height : vidHeight
		});  
	}
	else if (winWidth <= 500)  {  
		$('#mainBG').attr('src', 'images/main-bg-s.jpg');
		$('#newsHeader').attr('src', 'images/newsBar-s.jpg');
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
  
function changePage(input){  
	var num = Number(input);  
	if (num === 1 /*&& winWidth > 500*/){
		$('#prevArrow').css('opacity', '.5').addClass('not-active'); 
		$('#nextArrow').css('opacity', '1').removeClass('not-active');
		//toggleIMG(artIndex, "large", 100); 
	}
	/*else if (input === 1 && winWidth < 500){
		$('#prevArrow').css('opacity', '.5').addClass('not-active'); 
		 //toggleIMG(artIndex, "small", 100);
	}*/
	else if (num === 2 /*&& winWidth > 500*/){
		$('#prevArrow').css('opacity', '1').removeClass('not-active');
		$('#nextArrow').css('opacity', '.5').addClass('not-active');
		//toggleIMG(artIndex, "large", 100);
		 
	}
	/*else if (input === 2 && winWidth < 500){
		$('#prevArrow').css('opacity', '1').removeClass('not-active');
		$('#nextArrow').css('opacity', '1').removeClass('not-active');
		//toggleIMG(artIndex, "small", 100);
	}
	else if (input === 3 && winWidth > 500) {
		$('#nextArrow').css('opacity', '.5').addClass('not-active'); 
		//toggleIMG(artIndex, "large", 100);
	} 
	else if (input === 3 && winWidth < 500) {
		$('#nextArrow').css('opacity', '.5').addClass('not-active'); 
		//toggleIMG(artIndex, "small"); 
        $('#artRow3-b img').css("display", "none");  
        $('#artRow3-c img').hide();
	} */
}     
 
function getJSONs(){  
	//Load article1 template
	var split = mainUrl.split("");
	var route = mainUrl.slice(split.length-3, split.length); 

	if (route === "eam"){ 
		
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

	else if (route === "est") {

		shoppingCart = [];

		$.get("templates/total.txt", function(data) { 
			totalTemp = data;
		});

		$.get("templates/cart1.txt", function(data) { 
        	cartTemp = data;
    	}); 

		$.get("templates/cart2.txt", function(data) { 
		    cartTemp2 = data;
		});   

		var cart = sessionStorage.cart;
		var cartParse = JSON.parse(cart);   

		var imgJSON = $.getJSON("json/images.json"); 
		var imgObj = []; 

		imgJSON.then(function(res){ 
			setTimeout(function(){
				_.each(res, function(obj){
					imgObj.push(obj)
				});  
				for (i=0; i<cartParse.length; i++) {
					var id = cartParse[i]; 
					totalPrints++;
					_.each(imgObj, function(obj){ 
						if (obj[id]) { 
							var thisObj = obj[id];  
							grandTotal = grandTotal + Number(thisObj.price);
							shoppingCart.push(thisObj);
							var modulus = i%2;
							if (modulus){
								var template = _.template(cartTemp);
								var htmlTemp = template(thisObj);  
								$('#cartContainer').append(htmlTemp);
							}
							else {
								var template = _.template(cartTemp2);
								var htmlTemp2 = template(thisObj);  
								$('#cartContainer').append(htmlTemp2);
							}
						} 
					});
				} 

				var temp = _.template(totalTemp);
				$('#cartContainer').append(temp());
				  
			}, 500); 
		});  

		totalPrints = shoppingCart.length; 
		calcShipping();

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
		changePage(currPage);
		window.location.href = "?page=" + currPage + "&winWidth=" + winWidth;
	}
	if (thisId === 'nextArrow'){
		currPage++; 
		sessionStorage.setItem("currPage", currPage); 
		changePage(currPage); 
		window.location.href =  "?page=" + currPage + "&winWidth=" + winWidth;
	} 
});  

function calcShipping() {
	nodeCart = [];

	if (shipType === "US") { 
		$('#shippingTotal').html("Shipping : $0.00"); 
		$('#finalTotal').html("Total : $" + grandTotal + ".00");
	} 

	else if (shipType === "intl") {
		shipCal = 1 * totalPrints; 
		finalTotal = grandTotal + shipCal;
		$('#shippingTotal').html("Shipping : $" + shipCal + ".00"); 
		$('#finalTotal').html("Total : $" + finalTotal + ".00");
	}
	else if (shipType === undefined){
		$('#finalTotal').html("Total : $" + grandTotal + ".00");
	}

	for (j=0; j<shoppingCart.length; j++) {
		var arr = []; 
		arr.push(shoppingCart[j].id);
		arr.push(shoppingCart[j].quantity); 
		nodeCart.push(arr);
	}

	nodeCart = nodeCart.toString();

}

function artLink() {
	window.location =  "art" + "?page=1&winWidth=" + winWidth; 
}

function initLinks() { 
	$('#art').on('click', function(e){ 
		e.preventDefault();
		window.location =  "art" + "?page=1&winWidth=" + winWidth; 
	});

	$('#menuItems').on('click', function(e){ 
		console.log($(this)[0].children);
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
		window.location = "art" + "/" + id;
		sessionStorage.setItem("scrollTop", scrollTop); 
		sessionStorage.setItem("artId", id);
	}); 

	/*$('.cartButton').on('click', function(e){
		 
	}); 

	$('#cartCount, .fa-shopping-cart').on('click', function(e){ 
		 
	});*/

	$('#bars').on('click', function(){  

		$("#menuItems").animate({height: "255px"});
		$('#announcements').attr('margin-top', '-11px');
		$('#bars').attr('opacity', '0.5').addClass('inactive');
		$("#menuItems").append(
			'<li><a id="about" style="" href="about"><h3>HOME</h3></a></li>' +
			'<li><a id="news" style="" href="news"><h3>NEWS</h3></a></li>' +
	        '<li><a id="art" style="" href="art?page=1&winWidth=525"><h3>ART</h3></a></li>' +
	        '<li><a id="team" style="" href="team"><h3>TEAM</h3></a></li>'
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
		calcShipping();
	});

	$('#shipinUS').on('click', function(e){  
		shipType = "US";  
		calcShipping();
		if ($('#shipinUS').attr('checked')) {
			$('#shipinUS').removeAttr('checked');
		}
		else {
			$('#shipinUS').attr('checked', 'true');
			$('#shipoutUS').removeAttr('checked');
		}
	});

	$('#shipoutUS').on('click', function(e){   
		var shipCal = 1 * totalPrints;
		shipType = "intl";
		calcShipping();
		$('#shippingTotal').html("Shipping : $" + shipCal + ".00"); 
		if ($('#shipoutUS').attr('checked')) {
			$('#shipoutUS').removeAttr('checked');
		}
		else {
			$('#shipoutUS').attr('checked', 'true');
			$('#shipinUS').removeAttr('checked');
		}
	}); 

	$('.removeItem').on('click', function(e){
		e.preventDefault();
		var id = $(this).parent().prev().prev().prev().prev().children()[0].id;
		var arr = JSON.parse(sessionStorage.cart); 
		
		for (i=0; i<arr.length; i++) {
			if (arr[i] === id) {
				console.log(id);
				arr.splice(i, 1);
			}
		} 

		sessionStorage.cart = JSON.stringify(arr); 
		window.location.href = mainUrl;
	});

	$('#checkOut').on('click', function(e){
		e.preventDefault();
		var url = window.location.href;
		var split = url.split("");
		var newUrl = url.slice(0, url.length-4);
		window.location = newUrl + "create" + "?total=" + finalTotal + "&cart=" + nodeCart;
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
	dims();
	theDate();
	cartCount(); 
	//Populates the news and team page
	getJSONs();    
	//Sets ICONS 
	setTimeout(setIcons, 1000);  
	setTimeout(initImg, 1000); 
	setTimeout(initLinks, 1200);
	sessionStorage.setItem("mainUrl", mainUrl);  
	changePage(sessionStorage.currPage || currPage);   
}); 