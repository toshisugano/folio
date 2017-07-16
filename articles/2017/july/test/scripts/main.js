var win; 
var winWidth;
var winHeight;
var docHeight;
var mainUrl = 'www.thesoogie.com'; 
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
	$('#aboutDescription').html('<h1 id="fadeIn">Once upon a time….</h1>' +
              					'<h1 id="fadeIn2">A small cat-like creature emerged from a long nap and left home to have tea with a friend. Little did the villagers know, this was a harbinger of terrible things to come.</h1>' + 
              					'<br/>' +
              					'<img id="mainBG" src="images/cabbit-bar-l.jpg"/>' + 
              					'<br/>' +
              					'<br/>' +
              					'<h1 id="fadeIn3">Cabbit was a short film produced by Prospekt Films. The Soogie provided illustrations and animation with assistance from Emma Koster, Matt Arnold, and Andre Gorgievski. John Kassab was the producer and also provided the sound design while Kadavre Exquis composed the background music.</h1>' +
              					'<h2>Click <a target="_blank" href="../../morgue/cabbitfilm/index.html">HERE </a>to launch the archived site.</h2>' + 
              					'<br/>' + 
              					'<br/>' + 
              					'<img id="mainBG" src="images/deerwood-bg-l.jpg"/>'  
              					 );
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
		$('#mainBG').attr('src', 'images/main-bg-l.jpg');  
	}

	else if (winWidth <= 768 && winWidth > 500) { 
		$('#mainBG').attr('src', 'images/main-bg-m.jpg');  
	}

	else if (winWidth <= 500)  {  
		$('#mainBG').attr('src', 'images/main-bg-s.jpg'); 
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
		window.location = "http://www.thesoogie.com/" + id;
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
 
}  

window.onresize = function() {
	dims();
    initImg(); 
};
 
window.onresize(); 

$(window).scroll(function(){
	dims();
	scrollTop = $(document).scrollTop();   
	if (scrollTop > 400) {
		$('#fadeIn').addClass('animate');
		$('#fadeIn2').addClass('animate'); 
	}
    if (scrollTop > 600) {
		$('#fadeIn3').addClass('animate');
	}
});  

$(document).ready(function(){  
	setBG(); 
	dims();
	theDate();      
	//Sets ICONS   
	setTimeout(initImg, 1500); 
	setTimeout(initLinks, 1200); 
	sessionStorage.setItem("mainUrl", mainUrl);      
}); 