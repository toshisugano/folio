//SendCONTACT data to the server
function contactphp() {
    $.ajax({
        type: 'POST',
        url: 'ajax.php',
        data: jsondata,
        success: function(response){
             alert("Your message was delivered!");
        },
        error: function(xhr){
         
        }
    });
}

//Send the diaryOBJ to the php file on the server
function postDiary() {
    var postAJAX = $.ajax({
        type: 'POST',
        url: 'diary.php',
        data: diaryOBJ,
        success: function(response){

        },
        error: function(xhr){
         
        }
    });
    //Once the AJAX call is made, then  hide the overlaycontainer and reload location
    postAJAX.then(function(){
        $('#overlaycontainer').css({"display":"none","z-index":"-1"});
        window.location.href = "";
    });
}

function postNews() {
    var postAJAX = $.ajax({
        type: 'POST',
        url: 'news.php',
        data: newsOBJ,
        success: function(response){
            
        },
        error: function(xhr){
         
        }
    });
    //Once the AJAX call is made, then  hide the overlaycontainer and reload location
    postAJAX.then(function(){
        $('#overlaycontainer').css({"display":"none","z-index":"-1"});
        window.location.href = "";
    });
}

function setAdmin() { 
    var data = loginData.username;
    var loginUser = data.toLowerCase();
    loginData.username = loginUser;
    names = {
        "payal" : "Payal Sethi",
        "director" : "Payal Sethi",
        "apoorva" : "Apoorva Marur",
        "samir" : "Samir",
        "writer" : "Samir",
        "pooja" : "Pooja Kohli Taneja",
        "riddhi" : "Riddhi Desai",
        "farooq" : "Farooq Hundekar",
        "lipi" : "Lipi Bharadwaj",
        "sourav" : "Sourav Paul",
        "toshi" : "Toshi Sugano"
    };
    admin = names[loginUser];
}

function loginPermission() {
    $.ajax({
        type: 'POST',
        url: 'login.php',
        data: loginData,
        success: function(response){
            if (response == true) {
                $("#overlay-nav").empty();
                $("#overlay-app").empty();
                window.location.href = "#/admin/diary";
            } 
            else {
                $('#login-error').html("Wrong username and/or password");
            }
        },
        error: function(xhr){
        
        }
    });
}

//Send pogindata to the login.php server side
//If response is true, then run postDiary
function diaryVerify() {
    $.ajax({
        type: 'POST',
        url: 'login.php',
        data: loginData,
        success: function(response){
            if (response == true) {
                postDiary();
            } 
            else {
                alert('Please Log In');
            }
        },
        error: function(xhr){
        
        }
    });
}

function newsVerify() {
    $.ajax({
        type: 'POST',
        url: 'login.php',
        data: loginData,
        success: function(response){
            if (response == true) {
                postNews();
            } 
            else {
                alert('Please Log In');
            }
        },
        error: function(xhr){
        }
    });
}
//Get all inputs from the screen and then values to diaryOBJ variable;
 

function newsInputs() {
    console.log("newsInputs");
    $(':input').each(function(i, data){
    var that = $(this);
    var key = that.attr('name');
    var value = that.val();
    newsOBJ[key] = value;
    newsOBJ['date'] = today;
    newsOBJ['user'] = "Posted by : " + admin;
    });
}

function flickrAPI() { 
        $(':input').each(function(i, data){
            var that = $(this);
            var key = that.attr('name');
            var value = that.val();
            diaryOBJ[key] = value;
            diaryOBJ['date'] = today;
            diaryOBJ['user'] = "Posted by : " + admin;
        });
        $.getJSON(flickrJSON, function(data) { 
        //Go through each of the photos returned
            $.each(data.photoset.photo, function(index, obj){
                //save variables
                var farm_id = obj.farm;
                var secret = obj.secret;
                var server = obj.server;
                var photo_id = obj.id; 
                //get the image1 URL and save as variable
                var diary_img1 = diaryOBJ.image1;
                var diary_img2 = diaryOBJ.image2;
                //If undefined, then change to blank.jpg
            
                if (diary_img1 === "") {
                    diaryOBJ['image1'] = "images/bg-blank.jpg";
                }

                if (diary_img2 === "") {
                    diaryOBJ['image2'] = "images/bg-blank.jpg";
                }

                var img1_slice = diary_img1.slice(44, 55);
                console.log(img1_slice);
                
                var img2_slice = diary_img2.slice(44, 55);
            

                if (img1_slice === photo_id) { 
                    diaryOBJ.image1 = "https://farm" + farm_id + ".static.flickr.com/" + server + "/" + photo_id + "_" + secret + "_" + "n.jpg";
                }

                if (img2_slice === photo_id) {
                    diaryOBJ.image2 = "https://farm" + farm_id + ".static.flickr.com/" + server + "/" + photo_id + "_" + secret + "_" + "n.jpg";
                } 
            });
        }).then(function() {
            console.log(diaryOBJ.image1);
            var previewModel = new PreviewModel(diaryOBJ);
            var previewModelView = new PreviewModelView({model: previewModel});
            var pmv = previewModelView.render().el;
            $('#diary-article-preview').html(pmv);  
            });

}