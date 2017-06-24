//**** ROUTERS ****
var Router = Backbone.Router.extend({
    routes: {
        "": 'Home',
        "team": 'Team',
        "festivals": 'Festivals',
        "updates": 'Updates',
        "about": 'About',
        "watch": 'Watch',
        "contact": 'Contact',
        "login": 'Admin-Login',
        "admin/diary": 'Admin-Diary',
        "admin/news": 'Admin-News'
    }
});                     

var router = new Router();

router.on('route:Home', function() {
    navReset(); 
    $('.index-container').css({"margin-top": "50px"});
    var indexView = new IndexView({model: indexModel});
    var iv = indexView.render().el;
    $('#app').html(iv);
});

router.on('route:Watch', function() {
    navReset(); 
    $('.index-container').css({"margin-top": "50px"});
    var watchView = new WatchView();
    var wv = watchView.render().el;
    $('#app').html(wv);
});

router.on('route:Festivals', function() {
    navReset();
    var festivalView = new FestivalView(); 
    var fv = festivalView.render().el;
    $('#app').html(fv); 
});

router.on('route:Updates', function() {
    navReset(); 
    //make ajax call to access diary.json
    var getJSON = $.getJSON("news.json");
    getJSON.then(function(data) {
        $.each(data, function(index, obj) {
            diaryJSON.push(obj);
        });
    }).then(function(){
        var reverseArray = diaryJSON.reverse();
        diaryCollectionList.reset(reverseArray);
        $('.diary-collection-container').css({"margin-top": "20px"});
        var diaryCollectionView = new DiaryCollectionView({collection: diaryCollectionList}); 
        var dcv = diaryCollectionView.render().el;
        $('#app').html(dcv);
    });
    
});

router.on('route:Team', function() {
    navReset();
    var teamView = new TeamView();
    var tv = teamView.render().el;
    $('#app').html(tv);

});

router.on('route:About', function() {
    navReset();
    var synopsisView = new SynopsisView({model: synopsisModel});
    var sv = synopsisView.render().el;
    $('#app').html(sv);
});

router.on('route:Contact', function() {
    console.log("am I working?");
    navReset();
    var contactView = new ContactView();
    var cv = contactView.render().el;
    $('#app').html(cv);

});

router.on('route:Admin-Login', function() {
    $('#overlaycontainer').css({"z-index":"500", "display": "block"});
    $('#main-container').css({"display": "none"});
    $('#side-nav-container').css({"display": "none"});
    var loginModelView = new LoginModelView();
    var lv = loginModelView.render().el;
    var loginNavView = new LoginNavView();
    var lnv = loginNavView.render().el;
    $('#overlay-nav').html(lnv);
    $('#overlay-app').html(lv); 
});

router.on('route:Admin-Diary', function() {
    articleList = [];
    diaryJSON = {};
    $('#overlaycontainer').css({"z-index":"500", "display": "block"});
    $('#main-container').css({"display": "none"});
    $('#side-nav-container').css({"display": "none"});
    var adminNavView = new AdminNavView();
    var anv = adminNavView.render().el;
    var adminDiaryView = new AdminDiaryView();
    var adv = adminDiaryView.render().el;
    $('#overlay-nav').html(anv);
    $('#overlay-app').html(adv); 
});

router.on('route:Admin-News', function() {
    newsList = [];
    newsJSON = {};
    $('#overlaycontainer').css({"z-index":"500", "display": "block"});
    $('#main-container').css({"display": "none"});
    $('#side-nav-container').css({"display": "none"});
    var adminNavView = new AdminNavView();
    var anv = adminNavView.render().el;
    var adminNewsView = new AdminNewsView();
    var nv = adminNewsView.render().el;
    $('#overlay-nav').html(anv);
    $('#overlay-app').html(nv); 
});

Backbone.history.start();
urlReload();


