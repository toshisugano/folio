var win; 
var winWidth;
var winHeight;
var docHeight; 
var scrollTop;
var aboutHeight; 
var watchHeight; 
var newsHeight; 
var artHeight; 
var teamHeight; 
 
var mainUrl = sessionStorage.mainUrl;
var baseUrl = mainUrl.slice(0, (mainUrl.split("").length)-3);
var imageJSON = $.getJSON(baseUrl + "json/images.json"); 

var images = []; 
var frameArr = ['#artRow1-a', '#artRow1-b', '#artRow2', '#artRow3-a', '#artRow3-b', '#artRow3-c'];
var shoppingCart = [];

var currPage = 1;
var artIndex = 0; 

function init(){ 

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
		window.location = sessionStorage.mainUrl;  
	}); 

	$('.addToCart').on('click', function(e){ 
		e.preventDefault();
		shoppingCart.push("hello");
	});

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
 
//On window resize, run imageBG 
window.onresize = function() {
	dims(); 
};
 
window.onresize(); 

$(window).scroll(function(){
	dims();
	scrollTop = $(document).scrollTop();   
}); 

$(document).ready(function(){
	dims();  
	init(); 
});
 
