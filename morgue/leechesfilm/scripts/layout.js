//Sets and resets variables when window is resized and scrolled
function setVars() {
    //Window Scroll top location
     windowTop = $(window).scrollTop();

     //Window width
     windowWidth = $(window).width();

     //Height of the img header in pixels
     windowRatio = (windowWidth / 3.25) + 9;

     //Height of the img header plus offset adjustment for spacing discrepancy in the nav bar
     windowRatioPlus = (windowWidth / 3.25) + 15;

     //Height of the small img header 
     windowSmallRatio = (windowWidth / 3.25);

     //Location of the top of the nav bar relative to the img header
     navMargin = windowWidth / 10.5; 

     //Neg value of the above
     negMargin = navMargin * -1;


     //Img header minus height of the nav bar location
     numToNeg = ((windowRatio * -1) - navMargin) + 6;
     numToNegSmall = (windowSmallRatio * -1) - 53;
     winSmallNeg = ((windowSmallRatio * -1) + navMargin) + 20;
}
setVars();

//Resets the scrolltop when routes are called 
function navReset() {
    diaryJSON = [];
    if (windowWidth <= 550) {
        $(window).scrollTop(windowRatioPlus);
        $('#app').css({"margin-top" : "100px"});
    }

    else if(windowTop >= windowRatio) {
        $(window).scrollTop(windowRatioPlus);
        $('#app').css({"margin-top" : "20px"});
    }
    adjustNav(); 
}

function adjustNav() {
    switch (wWidthScroll(windowWidth, windowTop, windowRatio)) {
        case ">550" :
          $('.nav-container').css({"position":"fixed", "margin-top": numToNeg, "opacity":"1"});
          $('.nav-container li').css({"margin-top":"-15px"});
          break;
        case "<=550" :
          $('.nav-container').css({"position":"fixed", "margin-top": numToNegSmall});
          $('.nav-container li').css({"margin-top":"-15px"});
          $('#app').css({"margin-top" : "100px"});
          break;
        case "<=550+" :
          var $navMenu = $('.nav-menu-container');
          $navMenu.empty();
          var navViewSmall = new NavViewSmall();
          var nvs = navViewSmall.render().el;
          $navMenu.html(nvs);
          $('.nav-container').css({"position":"relative", "margin-top": winSmallNeg + 30});
          $('.nav-container li').css({"margin-top":"-10px"});
          break;

        //HERE IS WHERE I LEFT OFF... COPY PATTERN FROM 375 and 375+
        case "<=475" :
          $('.nav-container').css({"position":"fixed", "margin-top": numToNegSmall + 9});
          $('.nav-container li').css({"margin-top":"-10px"});
          $('#app').css({"margin-top" : "100px"});
          break;
        case "<=475+" :
          var $navMenu = $('.nav-menu-container');
          $navMenu.empty();
          var navViewSmall = new NavViewSmall();
          var nvs = navViewSmall.render().el;
          $navMenu.html(nvs);
          $('.nav-container').css({"position":"relative", "margin-top": winSmallNeg + 30});
          $('.nav-container li').css({"margin-top":"-10px"});
          break;

        case "<=375" :
          $('.nav-container').css({"position":"fixed", "margin-top": numToNegSmall + 15});
          $('.nav-container li').css({"margin-top":"-15px"});
          $('#app').css({"margin-top" : "100px"});
          break;
        case "<=375+" :
          var $navMenu = $('.nav-menu-container');
          $navMenu.empty();
          var navViewSmall = new NavViewSmall();
          var nvs = navViewSmall.render().el;
          $navMenu.html(nvs);
          $('.nav-container').css({"position":"relative", "margin-top": winSmallNeg + 25});
          $('.nav-container li').css({"margin-top":"-15px"});
          break;


        case "<320" :
          $('.nav-container').css({"position":"fixed", "margin-top": numToNegSmall + 20});
          $('.nav-container li').css({"margin-top":"-15px"});
          $('#app').css({"margin-top" : "100px"});
          break;
        case "<320+" :
          var $navMenu = $('.nav-menu-container');
          $navMenu.empty();
          var navViewSmall = new NavViewSmall();
          var nvs = navViewSmall.render().el;
          $navMenu.html(nvs);
          $('.nav-container').css({"position":"relative", "margin-top" : winSmallNeg + 25});
          $('.nav-container li').css({"margin-top":"-10px"});
          break;
        default :
           $('.nav-container').css({"position":"relative", "margin-top":"", "opacity":".8"});
           $('.nav-container li').css({"margin-top":""});

    }
    if ((windowWidth <= 550) && (windowTop <= windowRatio)) {
        $('#app').css({"margin-top" : "20px"});
    }
}

//The background imagerfader
function imageSlide() {
    slides = [];
    //Make sure that the IMG SRC height is set to headheight
    //$('#img-header').css("height" : headHeight);
    $('.header-container').css({"height" : headHeight});
    //Grab all the img elements with the id of image-loader
    slides = $('#image-loader img');
    //Get the number of elements pulled and save as variable
    var slideCount = slides.length; 
    //Create an empty array container
    var slideSrc = [];

   //Go through each of the slide elements 
    slides.each(function(i, data){
        //Get the src attribute for each slide element
        imgSrc = data.src;
        //Push each src onto the slideSrc array
        slideSrc.push(imgSrc);
    });
    //Go through each of the elements in the slideSrc array
    //For each element, run a function that goes through each value
    //Then sets the src attribute to the new value
    $.each(slideSrc, function(i, src){
        setTimeout(function(){
            var $imgheader = $('#img-header');
            $imgheader.hide();
            $imgheader.attr("src", src).fadeIn(500);     
            }, 5000 * i);

    });
    
}

//**** CHECK WINDOW WIDTH Function ****//
function wWidthScroll(ww, wt, wr) {
    //if ww is greater than 550
    if ((ww <= 320) && (wt >= wr)) {
        return "<320";
    }
    if ((ww <= 320) && (wt <= wr)) {
        return "<320+";
    }
    if (((ww > 320) && (ww <= 375)) && (wt >= wr)) {
        return "<=375";
    }
    if (((ww > 320) && (ww <= 375)) && (wt <= wr)) {
        return "<=375+";
    }
    if (((ww > 375) && (ww <= 475)) && (wt >= wr)) {
        return "<=475";
    }
    if (((ww > 375) && (ww <= 475)) && (wt <= wr)) {
        return "<=475+";
    }
    //if ww is less than or equal to 550 AND greater than 475
    if (((ww <= 550) && (ww > 475)) && (wt >= wr)) {
        return "<=550";
    }
    if (((ww <= 550) && (ww > 475)) && (wt <= wr)) {
        return "<=550+";
    }
    if ((ww > 550) && (wt >= wr))  {
        return ">550";
    }
}

function closeSidePanel(e) { 

  
  $('#sidePanel').css({"display":"none"});
  $('#closeButton').click(function(){
    return false;
  }); 
  setVars();
  adjustNav();
}

$(window).scroll(function(){
     $('#sidePanel').css({"height" : "100%"});
     setVars();  
     adjustNav();
});

//**** Window Re-size Funtion ****
$(window).resize(function(){ 
    location.reload();
    checkWin();
    navReset(); 
    windowRatio = (winWidth / 3.25) - 10;
    var imgHeight = (winWidth / 3.25) + 13;
    if (winScroll >= windowRatio) {
        $(window).scrollTop(imgHeight);
    } 
});