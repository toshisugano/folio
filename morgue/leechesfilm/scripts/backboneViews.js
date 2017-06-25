//**** NAV BAR VIEW(s)****
var NavBarsView = Backbone.View.extend({
    tagName: 'div',
    className: 'nav-bars-container',
    template: _.template('<ul>' +
        '<li><a id="nav-bar-menu" href="#/">HOME</a></li>' +
        '<li><a id="nav-bar-menu" href="#/about">ABOUT</a></li>' +
        '<li><a id="nav-bar-menu" href="#/updates">UPDATES</a></li>' +
        '<li><a id="nav-bar-menu" href="#/festivals">FESTIVALS</a></li>' + 
        '<li><a id="nav-bar-menu" href="#/team">TEAM</a></li>' +
        '<li><a id="nav-bar-menu" href="#/festivals">WATCH</a></li>' +
        '<li><a id="nav-bar-menu" href="#/contact">CONTACT</a></li>' +
        '</ul>'
        ),
    render: function(){
        this.$el.html(this.template());
        return this;
    }
});

var NavViewLarge = Backbone.View.extend({
    tagName: 'div',
    className: 'nav-menu-container',
    template: _.template('<ul><li><a id="nav-home" href="#/">HOME</a></li><li><a id="nav-synopsis" href="#/about">ABOUT</a></li><li><a id="nav-news" href="#/updates">UPDATES</a></li><li><a id="nav-diary" href="#/festivals">FESTIVALS</a></li><li><a id="nav-team" href="#/team">TEAM</a></li><li><a id="nav-news" href="#/watch">WATCH</a></li><li><a id="nav-contact" href="#/contact">CONTACT</a></li></ul>'),
    render: function(){
        this.$el.html(this.template());
        return this;
    }
});

var NavViewSmall = Backbone.View.extend({
    tagName: 'div',
    className: 'nav-menu-container',
    template: _.template('<a href=""><i id="nav-bars" class="fa fa-bars">&nbsp</i></a>'),
    events: {
        "click #nav-bars" : "showSidePanel"
    },
    showSidePanel: function(e) {
        e.preventDefault();
        //Empty the navMenu div 
        var $navMenu = $('.nav-container'); 
        $('#sidePanel').css({"display" : "block"}); 
        $('.nav-container li').css({"margin-top" : "-10px"});
    },
    render: function(){
        this.$el.html(this.template());
        return this;
    }
});

//**** Index View ****
var IndexView = Backbone.View.extend({
    tagName: 'div',
    className: 'index-container',
    template: _.template('<section id="index-container">' +        
            '<br/><iframe id="vimeo-frame" src="https://player.vimeo.com/video/132404733" width="100%" height="390" frameborder="0" style="border: white solid 5px;" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p id="index-center"><a href="https://vimeo.com/132404733">Leeches Teaser</a> from <a href="https://vimeo.com/user2912300">Payal Sethi</a> on <a href="https://vimeo.com">Vimeo</a>.</p><br/><br/><br/><br/><br/>' +
    '</section>'), 
    render: function(){
        view = this.model.toJSON();
        this.$el.html(this.template(view));
        return this;
    }
});

//**** ABOUT/Synopsis VIEW ****
var SynopsisView = Backbone.View.extend({
    tagName: 'div',
    className: 'synopsis-container',
    template: _.template(
            '<div id="synopsis-view">' + 
                '<div id="synopsis-p">' +
                    '<h2><%= h1 %></h2>' +
                    '<p><%= p1 %></p>' +
                    '<br>' +
                    '<h2><%= h2 %></h2>' +
                    '<p><%= p2 %></p>' +
                    '<br>' +
                    '<h2><%= h3 %></h2>' +
                    '<div>' +
                        '<img id="img-director" src="<%= image1 %>"/>' +
                        '<p><%= p3 %></p>' +
                    '</div>' +
                '</div>' +
            '</div>'
         ), 
    render: function(){
        sview = this.model.toJSON();
        this.$el.html(this.template(sview));
        return this;
    }
});

// **** CONTACT VIEW ****
//On Submit, run a function that serializes the JSON data and sends to the server
var ContactView = Backbone.View.extend({
    tagName: 'div',
    className: 'contact-container',
    template: _.template(
        '<div id="contact-view">' +
            '<div id="contact-info"><h2>Email Us</h2><br><h4>We love to hear from you</h4><br><ul><li><h3>Director/Producer : <a href="mailto:payalsethi1202@gmail.com">Payal Sethi</a></h3></li><li><h3>Press : <a href="mailto:leeches.film@gmail.com">leeches.film@gmail.com</a></h3></li><li><h3>Phone : <a href="tel:+91 8884955066">+91 8884955066</a></h3></li></ul></div>' +
            '<div id="vruler1"></div>' +
            '<div id="contact-info">' +
                '<form method="post" id="contact-f"><p><label for="firstname" class="contact-input-label">First Name</label> <br/><input class="contact-input-text" name="firstname" type="text" maxlength="30" autofocus required /></p><p><label for="lastName" class="contact-input-label">Last Name</label> <br/><input class="contact-input-text" name="lastname" type="text" maxlength="30" required/></p><p><label for="email" class="contact-input-label">E-Mail</label> <br/><input class="contact-input-text" name="email" type="email" maxlength="40" required/></p><p><label for="telephone" class="contact-input-label">Phone Number</label> <br/><input class="contact-input-text" name="telephone" type="tel" /></p><p><label for="message" class="contact-input-label">Message</label> <br/><textarea class="contact-input-text" id="contact-text-message" name="message"></textarea></p><div id="contact-button"><p>Submit</p></div></form>' +
            '</div>' +
            '<div id="vruler2"></div>' +
            '<div id="contact-social-media"><h2>Social Media</h2><ul><li><h3><a href="https://www.flickr.com/photos/133104268@N05/" target="blank"><i class="fa fa-flickr">&nbsp </i></a>&nbsp&nbspFlickr</h3></li><li><h3><a href="https://twitter.com/leechesfilm" target="blank"><i class="fa fa-twitter"></i></a>&nbsp&nbspTwitter</h3></li><li><h3><a href="https://www.facebook.com/leechesfilm" target="blank"><i class="fa fa-facebook-square">&nbsp </i></a>&nbsp&nbspFacebook</h3></li><li><h3><a href="https://www.youtube.com/user/farfara1561" target="blank"><i class="fa fa-youtube"></i></a>&nbsp&nbspYoutube</h3></li></ul></div>' +
        '</div>'
    ),

    events: {
        "click #contact-button": "postJSON"
    },

    postJSON: function(){ 
        var permission = true;
            //$(this).find('[name]').each(function(i, data) {
            $(':input').each(function(i, data){
                //Get input fields and set key value variables
                var that = $(this); 
                var key = that.attr('name');
                var value = that.val();
                jsondata[key] = value;
                //Security measures
                var characters = ["/", "{", "}", "[", "]", "*", "&", "<", ">", "%", "$", "#", "(", ")", "=", "'", '"'];
                for (var i = 0; i < value.length; i++) {
                    for (var h = 0; h < characters.length; h++){
                        if (value.slice(i, i+1) === characters[h]) {    
                        permission = false;
                        }
                    } 
                }

            });
     
        if (permission === true){
            contactphp();
        }
        if (permission === false) {
            alert("For security reasons, please refrain from using the characters /, {}, [], *, &, %, $, #, (), =, and quotation marks.");
        }
        return false;
    },    
        render: function(){
            this.$el.html(this.template());
            return this;
        }
});

//**** NEWS VIEW ****
var NewsView = Backbone.View.extend({
    tagName: 'div',
    className: 'news-container',
    template: _.template(
            '<h1>COMING SOON</h1>' 
        ),
    render: function(){
        this.$el.html(this.template());
        return this;
    }
});

var WatchView = Backbone.View.extend({
    tagName : 'div',
    className : 'watch-container',
    template : _.template(
        '<h2>WATCH ONLINE :</h2>' +   
        '<ul>' + 
        '<li id="googlePlay"><a href="https://play.google.com/store/movies/details/Leeches?id=m1nMSN3-44k&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"><img width="153" alt="Get it on Google Play" src="/images/google_play.png"/></a></li>' + 
        '<li id="amazonUS"><a href="https://www.amazon.com/dp/B01N3XPH21/ref=sr_1_2?s=instant-video&ie=UTF8&qid=1478670965&sr=1-2&keywords=leeches"><img width="200" src="/images/amazon_us.jpg"></a></li>' + 
        '<li id="amazonUK"><a href="https://www.amazon.co.uk/dp/B01MD2J5MS/ref=sr_1_1?s=instant-video&ie=UTF8&qid=1478503835&sr=1-1&keywords=leeches"><img width="200" src="/images/amazon_uk.jpg"></a></li>' + 
        '</ul>'  
    ),
    render : function(){
        this.$el.html(this.template());
        return this;
    }
});

//**** Festivals VIEW ****
var FestivalView = Backbone.View.extend({
    tagName: 'div',
    className: 'news-container',
    template: _.template(
            '<br/>' +
            '<br/>' +
            '<h2>FESTIVALS</h2>' +
            '<hr/>' +
            '<p>Bengaluru International Film Festival, January 2016</p>' +   
            '<p>FICCI FLO Film Festival, Mumbai, February 2016</p>' +
            '<p>I-View World Film Festival, New Delhi, March 2016</p>' + 
            '<p>Tampere Film Festival, Finland, March 2016</p>' + 
            '<p>Friss Hus Budapest Festival, March 2016</p>' + 
            '<p>Indian Film Festival of Los Angeles (IFFLA), April 2016</p>' + 
            '<p>Brussels Short Film Festival, May 2016</p>' + 
            '<p>Cine Pobre Film Festival, May 2016</p>' + 
            '<p>Matheran Green Festival, May 2016</p>' + 
            '<p>Global Voices Film Festival (UN Women Initiative), May 2016  </p>' + 
            '<p>International Film Festival of South Asia (IFFSA), May 2016</p>' + 
            '<p>Seoul International Women\'s Film Festival (Asian Film & Video Competition), June 2016</p>' + 
            '<p>Palm Springs International ShortFest, June 2016</p>' + 
            '<p>Zanzibar International Film Festival, June 2016</p>' + 
            '<p>Durban International Film Festival, June 2016</p>' + 
            '<p>International Documentary & Short Film Festival of Kerala, June 2016</p>' + 
            '<p>Indian Film Festival of Stuttgart, July 2016</p>' + 
            '<p>Jahorina Film Festival, Bosnia & Herzegovina, September 2016</p>' + 
            '<p>SiGNS Festival, Kochi, September 2016</p>' + 
            '<p>Dharamshala International Film Festival (DIFF), November 2016</p>' + 
            '<p>Sapporo International Shortfest, October 2016</p>' + 
            '<p>Thessaloniki International Short Film Festival (TISFF), October 2016</p>' + 
            '<p>Women Make Moves Film Festival, Taiwan, October 2016</p>' + 
            '<p>Indian Film Festival The Hague - October 2016</p>' +
            '<p>South Asia Film Festival (FFAST) Paris - October 2016</p>' +
            '<p>3rd i San Francisco International South Asian Film Festival, November 2016</p>' +
            '<p>Hawaii International Film Festival, November 2016</p>' +
            '<p>Winchester Short Film Festival, November 2016</p>' +
            '<p>Filmi: Toronto’s South Asian Film Festival, December 2016</p>' +
            '<p>Florence River to River Indian Film Festival, December 2016</p>' +
            '<p>Kathmandu International Mountain Film Festival, December 2016</p>' + 
            '<p>Jaipur International Film Festival, January 2017</p>' +
            '<p>Athena Film Festival, February 2017</p>' +
            '<br/>' +
            '<br/>' +
            '<h2>AWARDS</h2>' +
            '<p>Special Jury Award – SiGNS Festival, Kochi</p>' +
            '<p>Audience Award, 22nd Florida South Asian Film Festival</p>' + 
            '<p>Special Mention, Winchester Short Film Festival</p>' +
            '<p>Grand Prix Internationale, Brussels Short Film Festival, May 2016</p>' +  
            '<p>Audience Award – Seoul International Women’s Film Festival, June 2016</p>' +  
            '<p>Best Performance in a Short Film - Indian Film Festival of Los Angeles (IFFLA), April 2016</p>' +  
            '<p>Best Short Film - Global Voices Film Festival (UN Women Initiative), May 2016</p>' + 
            '<p>Best Film from Dhow Countries – Zanzibar International Film Festival, July 2016</p>' +  
            '<p>Best Short Film – Indian Film Festival of Stuttgart, July 2016</p>'   
        ),
    render: function(){
        this.$el.html(this.template());
        return this;
    }
});


    
//**** LOGIN NAVIGATION BAR VIEW ****
var LoginNavView = Backbone.View.extend({
    tagName: 'div',
    className: 'login-nav-container',
    template: _.template('<ul><li><h2>ADMIN</h2></li><li id="overlay-float-right"><a href=""><h2>X</h2></a></li></ul>'),
    render: function(){
        this.$el.html(this.template());
        return this;
    }
});

//**** LOGIN INPUTS VIEW ****
var LoginModelView = Backbone.View.extend({
    tagName: 'div',
    className: 'login-model-container',
    template: _.template('<p>{Please Log In}</p><hr/><form method="post" id="login-admin"><p><br/><input id="login-username" name="username" type="text" maxlength="100"></input></p><div class="diary-add" id="add-title"><p>Username</p></div><p><br/><input id="login-password" name="password" type="password" maxlength="100"></input></p><div class="diary-add" id="add-img1"><p>Password</p></div><br/><br/><div id="login-error"></div>><div id="submit-login"><p id="login-submit">SUBMIT</p></div></form>'),
    events: {"click #login-submit" : "getLogin"},
    getLogin: function() {
        loginData = {};

        $(':input').each(function(i, data){
            var that = $(this); 
            var key = that.attr('name');
            var value = that.val();
            loginData[key] = value;
        });
        setAdmin();

        loginPermission();

    },
    render: function(){
        this.$el.html(this.template());
        return this;
    }
});

var AdminNavView = Backbone.View.extend({
    tagName: 'div',
    className: 'admin-nav-container',
    template: _.template('<ul><li><a id="admin-news" href="#/admin/news"><h2>NEWS</h2></a></li><li id="overlay-float-right"><a href=""><h2>X</h2></a></li></ul>'),
    events: {
        "click #admin-diary": "adminDiary",
        "click #admin-news": "adminNews"
    },
    adminDiary : function() {
        $('#overlay-nav').css({"background-color":"#841a02"});
    },
    adminNews : function() {
        $('#overlay-nav').css({"background-color":"#31837c"});
    },
    render: function(){
        this.$el.html(this.template());
        return this;
    }
});

var AdminDiaryView = Backbone.View.extend({
    tagName: 'div',
    className: 'admin-nav-container',
    template: _.template('<p>{CREATE A DIARY ENTRY}</p><hr/><form method="post" id="diary-edit"><p><br/><input id="diary-edit-title" name="title" type="text" maxlength="100"></input></p><div class="diary-add" id="add-title"><p>Add Title</p></div><p><br/><input id="diary-edit-image" name="image1" type="text" maxlength="100" placeholder="Example http://flickr.com/photos/57s4895959/c.jpg"></input></p><div class="diary-add" id="add-img1"><p>Add Image 1</p></div><p><textarea id="diary-edit-p1" name="p1" type="text" maxlength="500" autofocus ></textarea></p><div class="diary-add" id="add-p1"><p>Add&nbspText Block&nbsp1</p></div><p><br/><input id="diary-edit-image" name="image2" type="text" maxlength="100"></input></p><div class="diary-add"><p>Add Image 2</p></div><p><textarea id="diary-edit-p2" name="p2" type="text" maxlength="500" autofocus ></textarea></p><div class="diary-add"><p>Add&nbspText Block&nbsp2</p></div><br><br><div id="preview-diary"><p>Preview</p></div><div id="diary-article-preview"></div><div id="submit-diary"><a href=""><p>Publish</p></a></div>'),
    events: {
        "click #preview-diary": "previewDiary",
        "click #submit-diary": "submitDiary",
        "click #overlay-float-right": "closeOverlay"
            },
    previewDiary: function(e) {
        e.preventDefault();
        previewList = [];
        flickrAPI();
    },
    submitDiary : function(e) {
        e.preventDefault(); 
        if (loginData === undefined) {
            window.location.href = "#/login";
        }
        diaryVerify();
    },
    closeOverlay: function(e) {
        e.preventDefault();
        articleList = [];
        $(':input').each(function(index, obj) {
            var that = $(this);
            that.empty();
        });
        $('#overlaycontainer').css({"z-index":"-1"});
        location.reload();
        
        },
        render: function() {
            this.$el.html(this.template());
            return this;
        }
});
  

//Define a diary model view class
var DiaryModelView = Backbone.View.extend({
    tagName: 'div',
    className: 'diary-model-container',
    template: _.template('<section>' +
            '<h1><%= title %></h1>' +
            '<h3><%= user %></h3>' +
            '<h3><%= date %></h3>' +
            '<hr>' +
            '<p><%= p1 %></p>' +
            '<img class="diary-model-img" src="<%= image1 %>"/>' + 
            '<p><%= p2 %></p>' +
            '<img class="diary-model-img" src="<%= image2 %>"/>' + 
        '</section>'), 
    template2: _.template('<section>' +
            '<h1><%= title %></h1>' +
            '<h3><%= user %></h3>' +
            '<h3><%= date %></h3>' +
            '<hr>' +
            '<p><%= p1 %></p>' +
            '<img class="diary-model-img" src="<%= image1 %>"/>' + 
            '<p><%= p2 %></p>' +
            '<img class="diary-model-img-blank" src="<%= image2 %>"/>' + 
        '</section>'),
    template3: _.template('<section>' +
            '<h1><%= title %></h1>' +
            '<h3><%= user %></h3>' +
            '<h3><%= date %></h3>' +
            '<hr>' +
            '<p><%= p1 %></p>' +
            '<img class="diary-model-img-blank" src="<%= image1 %>"/>' + 
            '<p><%= p2 %></p>' +
            '<img class="diary-model-img-blank" src="<%= image2 %>"/>' + 
        '</section>'),
    events: {
        //When preview button is clicked, run preview article
        "click #preview-diary": "previewArticle"
    },
    render: function(){
        var dmv = this.model.toJSON();
        //if images 2 is blank, return this template 2
        
        if (dmv.image2 === 'images/blank.jpg' && dmv.image1 === 'images/blank.jpg') {
            this.$el.html(this.template3(dmv));
            return this; 
        }

        else if (dmv.image2 === 'images/blank.jpg') {
            this.$el.html(this.template2(dmv));
            return this;
        }

        else {
            this.$el.html(this.template(dmv));
            return this;
        }
        //if both images1 and images 2 are blank, return template 3
         
    }
});

//Define a diary model view class
var PreviewModelView = Backbone.View.extend({
    tagName: 'preview-model-container',
    template: _.template(
        '<section>' +
            '<h1><%= title %></h1>' +
            '<h3><%= user %></h3>' +
            '<h3><%= date %></h3>' +
            '<hr>' +
            '<p><%= p1 %></p>' +
            '<img class="diary-model-img" src="<%= image1 %>"/>' + 
            '<p><%= p2 %></p>' +
            '<img class="diary-model-img" src="<%= image2 %>"/>' + 
        '</section>'
        ),
    render: function(){
        var pmv = this.model.toJSON();
        this.$el.html(this.template(pmv));
        return this;
    }
});

var TeamView = Backbone.View.extend({
    tagName: 'div',
    className: 'team-model-container',
    template: _.template(
        '<div class="cast-view">' + 
                '<h2>CAST</h2>' +
                '<div class="cast-view-col-1">' + 
                    '<p>Raisa</p>' + 
                    '<p>Nawaz</p>' + 
                    '<p>Zainab</p>' +
                    '<p>Bilqis</p>' +
                    '<p>Ammi</p>' +
                    '<p>Shafiq</p>' +
                    '<p>Mariam</p>' +
                    '<p>Sheikh</p>' +
                    '<p>Oazi</p>' +
                '</div>' + 
                '<div class="cast-view-col-2">' + 
                    '<p>Sayani Gupta</p>' + 
                    '<p>Mohammed Abdul Razak</p>' + 
                    '<p>Preeti Golacha</p>' + 
                    '<p>Manju Raval</p>' + 
                    '<p>Najma Nusrat</p>' + 
                    '<p>Barkat Khan</p>' + 
                    '<p>Sherin Bhatt</p>' + 
                    '<p>Agha Asker Hussain</p>' + 
                    '<p>Moin Amar</p>' + 
                '</div>' +
        '</div>' +
        '<div class="cast-view">' +
            '<h2>CREW</h2>' +
            '<div id="crew_1">' +
                '<div class="cast-view-col-1">' + 
                        '<p>Writer, Director, Producer</p>' + 
                        '<p>Story & Screenplay</p>' + 
                        '<p>Director of Photography</p>' +
                        '<p>Composer</p>' +
                        '<p>Art Director</p>' +
                        '<p>Editor</p>' +
                        '<p>Sound Designer</p>' +
                        '<p>Dialogues</p>' +
                        '<p>Producer<br><br><br><br></p>' +
                        '<p>Executive Producers<br><br><br><br><br><br><br></p>' +
                        '<p>Co-Producers<br><br><br><br><br><br><br></p>' +
                        '<p>Casting</p>' +
                '</div>' + 
                '<div class="cast-view-col-1">' + 
                        '<p>Payal Sethi</p>' + 
                        '<p>Samir Patil</p>' + 
                        '<p>James Demetri</p>' +
                        '<p>Tanuj Tiku</p>' +
                        '<p>Hiromi Sano</p>' +
                        '<p>Vivan Chopra</p>' +
                        '<p>Udit Duseja</p>' +
                        '<p>Ali Hussain Mir</p>' +
                        '<p>Apoorva Marur</p>' +
                        '<br/>' +
                        '<p>Hansdip Bindra</p>' +
                        '<p>Samrat Chakrabarti</p>' +
                        '<p>Pooja Kohli</p>' +
                        '<p>Judith Marcellene</p>' +
                        '<p>Purab Kohli</p>' +
                        '<p>Rajeev Sarda</p>' +
                        '<p>Razzak & Amit</p>' +
                '</div>' + 
            '</div>' +
            '<div id="crew_2">' +
                '<div class="cast-view-col-1">' + 
                        '<p>Foley Artist</p>' + 
                        '<p>Set Photographer</p>' + 
                        '<p>Camera Rental</p>' +
                        '<p>ADR Studio Provider<br><br><br><br><br><br><br></p>' +
                        '<p>Graphic Designer</p>' +
                        '<p>Web Developer/Designer</p>' +
                        '<p>Marketing Intern</p>' +
                        '<p>Media Intern</p>' +
                        '<p>Associate Producers<br><br><br><br></p>' +
                '</div>' + 
                '<div class="cast-view-col-1">' + 
                        '<p>Clemens Endress</p>' + 
                        '<p>Sanjay Borra</p>' + 
                        '<p>Post Lounge</p>' +
                        '<p>Pranay Dev Banpur (HYD)</p>' +
                        '<p>Panache School of Music</p>' +
                        '<br/>' +
                        '<p>Sourav Paul</p>' +
                        '<p>Toshi Sugano</p>' +
                        '<p>Riddhi Desai</p>' +
                        '<p>Lipi Bharadwaj</p>' +
                        '<p>Michelle Mama</p>' +
                        '<p>TT Venkatesh</p>' +
                        '<p>Anu Mahal</p>' +
                        '<p>Stuti Ramachandran</p>' +
                        '<p>Priyanka Vir</p>' +
                        '<p>Arun Verma</p>' +
                        '<p>Gurmeet Sethi</p>' +
                        '<p>Nikhil Kamkolkar</p>' +
                '</div>' + 
            '</div>' +
        '</div>' +
        '<div class="cast-view" id="special_thanks">' +
            '<h2>SPECIAL THANKS</h2>' +
            '<div class="cast-view-col-1">' + 
                    '<p>Aarti Sanan</p>' + 
                    '<p>Adhirath & Hufriz Sethi</p>' + 
                    '<p>Aarti Sanan</p>' + 
                    '<p>Adhirath & Hufriz Sethi</p>' +
                    '<p>Ajay Kolanupaka</p>' +
                    '<p>Aman Batra</p>' +
                    '<p>Amanda Mooney</p>' +
                    '<p>Andeep Singh</p>' +
                    '<p>Anil Pingali</p>' +
                    '<p>Anil Reddy</p>' +
                    '<p>Anjali Iyer</p>' +
                    '<p>Anjalika Sharma</p>' +
                    '<p>Ankur Bhatia</p>' +
                    '<p>Ankur Kaul</p>' +
                    '<p>Aparna Gulati</p>' +
                    '<p>Apoorva Bakshi</p>' +
                    '<p>Arpita Kaul</p>' +
                    '<p>Aruna Venkatachalam</p>' +
                    '<p>Athreya Chidambi</p>' +
                    '<p>Aviva Frenkel</p>' +
                    '<p>Ayesha Chari</p>' +
                    '<p>Benjamin Lu</p>' +
                    '<p>Bhavya Pydi</p>' +
                    '<p>Biswajit Bardhan</p>' +
                    '<p>Bob Gundu</p>' +
                    '<p>Bunty Chand</p>' +
                    '<p>Chester Misquitta</p>' +
                    '<p>Colin Patrick McGreal</p>' +
            '</div>' +
            '<div class="cast-view-col-1">' + 
                    '<p>Colleen</p>' +
                    '<p>Deepti Sastry</p>' +
                    '<p>Dimps Ghumman</p>' +
                    '<p>Ekwamente Igualmente</p>' +
                    '<p>Ela Thier</p>' +
                    '<p>Faiq G</p>' +
                    '<p>Farooq Hundekar</p>' +
                    '<p>Gargi Chawla</p>' +
                    '<p>Gautam Kishanchandani</p>' +
                    '<p>Gautam Mahmood</p>' +
                    '<p>Gee Mann</p>' +
                    '<p>Geeta Kohli</p>' +
                    '<p>Gourita Murdeshwar</p>' +
                    '<p>Harish Amin</p>' +
                    '<p>Harish Mallya</p>' +
                    '<p>Jasbir Singh Sawhney</p>' +
                    '<p>Jayesh Bagda</p>' +
                    '<p>Joseph Mathew</p>' +
                    '<p>Juancarlos Zaldivar</p>' +
                    '<p>K Devitre</p>' +
                    '<p>Kanna R</p>' +
                    '<p>Karen Wang</p>' +
                    '<p>Kartik Srinivasan</p>' +
                    '<p>Katherine Matthews</p>' +
                    '<p>Kevin Gilchrist</p>' +
                    '<p>Keya Kamat</p>' +
                    '<p>Kumar Sivan</p>' +
                    '<p>Kunal Condillac</p>' +
            '</div>' +
            '<div class="cast-view-col-1">' + 
                    '<p>Lakxmi Subramanian</p>' +
                    '<p>Lalit Choudhary</p>' +
                    '<p>Mahmood Al-Yousif</p>' +
                    '<p>Marisha Kirtane</p>' +
                    '<p>Meetu Pandey</p>' +
                    '<p>Megha Shenoy</p>' +
                    '<p>Meghna Damani</p>' +
                    '<p>Melanie Le Forestier</p>' +
                    '<p>Merenla Imsong</p>' +
                    '<p>Mitch Alexander</p>' +
                    '<p>Mohit Gupta</p>' +
                    '<p>Mona Singh</p>' +
                    '<p>Moti Kaul</p>' +
                    '<p>Deepak Malhotra</p>' +
                    '<p>Anil Reddy</p>' +
                    '<p>Nancy Nisa Beso</p>' +
                    '<p>Naveed Iqbal</p>' +
                    '<p>Nikhil Kohli</p>' +
                    '<p>Nitin Baid</p>' +
                    '<p>Nitin Kapoor</p>' +
                    '<p>Parinay Pande</p>' +
                    '<p>Pauline Tautu</p>' +
                    '<p>Pavani Rao</p>' +
                    '<p>Philip David Morgan</p>' +
                    '<p>Pooja Varma</p>' +
                    '<p>Poorna Jagannathan</p>' +
                    '<p>Priya Madhavan</p>' +
                    '<p>Priya Sharma</p>' +
            '</div>' +
            '<div class="cast-view-col-1">' + 
                    '<p>Purva Amar</p>' +
                    '<p>Radhika Yelkur</p>' +
                    '<p>Raghav Kumar</p>' +
                    '<p>Raghavan </p>' +
                    '<p>Rajiv Desai</p>' +
                    '<p>Ramji & Monica Raghavan</p>' +
                    '<p>Rattan Tiku</p>' +
                    '<p>Ravina Malani</p>' +
                    '<p>Rebecca Challis</p>' +
                    '<p>Rema Sayge</p>' +
                    '<p>Riddhika Jesrani</p>' +
                    '<p>Ritesh Parikh</p>' +
                    '<p>Rohan Narula</p>' +
                    '<p>Rohit Apte</p>' +
                    '<p>Rohit Sathe</p>' +
                    '<p>Sahil Gupta</p>' +
            '</div>' + 
        '</div>'
        ), 
    render: function(){  
        this.$el.html(this.template());
        return this;
    }
});