//GLOBAL VARIABLES
var admin;
var names;
var loginData = {};
var jsondata = {};
var theMonth;
var today;
var theDate = new Date();
var getYear = theDate.getFullYear();
var getMonth = theDate.getMonth();
var getDate = theDate.getDate(); 
var headHeight;
var slides;
var diaryOBJ = {
    "image1" : "",
    "image2" : "",
    "title" : "",
    "user" : "",
    "date" : today,
    "p1" : "",
    "p2" : ""
}; 
var diaryJSON = [];
var articleList = [];
var flickrJSON = "https://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&api_key=9c6890265e6ddc6256cf9222ccc7f0b1&photoset_id=72157655219839730&user_id=133104268@N05&jsoncallback=?";
var notdefined = false; 

function checkWin() {
    //set global variables
    //if the window width is less than or equal to 550 
    //change the img header to the small jpg background image
    //img-header is another container nested in the header container
    //Set the img src of the img-header to the small jpg image
    //Create a new Nav view for smaller screens
    winWidth = $(window).width();
    winScroll = $(window).scrollTop();
    headHeight = (winWidth / 2.5) + 2; 
    var numtoNeg = headHeight * -1;
    if (winWidth <= 550) {
        var src = "images/Leeches-Header-5-Small.jpg"
        $('.header-container').css({"height" : headHeight});
        var $imgheader = $('#img-header');
        $imgheader.attr("src", src);
        $(document).ready(function(){
            var navViewSmall = new NavViewSmall();
            var nvs = navViewSmall.render().el;
            $('.nav-container').html(nvs); 
            $(window).scrollTop(0);
        });
        
    }
    //if the window width is greater than or equal to 550 
    //Run the imagefade slider
    //Create a new Nav View for the large version
    else if(winWidth >= 550) {
        imageSlide();
        $('.nav-container').css({"height" : "45px"});
        $(document).ready(function(){
            var navViewLarge = new NavViewLarge();
            var nvl = navViewLarge.render().el;
            $('.nav-container').html(nvl);
        });
    }
    
}
//Create an empty array
//Function that pushes items onto the array
//Run checkwin if the number of items in the array is 5
slidesArray = [];
function preloaded(data) {
    slidesArray.push(data);
    if (slidesArray.length === 4) {
        checkWin();
    }
}   

//**** Copyright Year Function ****
function copyright() {
    var fullDate = new Date();
    var getYear = fullDate.getFullYear();
    var cr = "&copy Copyright " + getYear + " FilmKaravan Productions";
    $('#notes-copyright').html(cr);
    }
copyright(); 

//Set the whole date including month, date, year
function thisDay() {
        month = {
                0 : "January",
                1 : "February",
                2 : "March",
                3 : "April",
                4 : "May",
                5 : "June",
                6 : "July",
                7 : "August",
                8 : "September",
                9 : "October",
                10 : "November",
                11 : "December"
        };
        for (i=0; i<12; i++) {
            theMonth = month[getMonth];  
        }
        today = theMonth + "." + getDate + "." + getYear;
        diaryOBJ['date'] = today;
}
thisDay(); 


function urlReload() {
    $(document).ready(function(){
    //Check if the current URL contains '#'
        if(document.URL.indexOf("#")==-1) {
            // Set the URL to whatever it was plus "#".
            url = document.URL+"#";
            location = "#";
            //Reload the page
            location.reload(true);
        }
    });
}