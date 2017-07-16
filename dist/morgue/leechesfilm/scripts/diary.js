//Define Diary Model class
var DiaryModel = Backbone.Model.extend({
    defaults: {}
});

//Create an empty array to contain diary model instances
var diaryJSON = [];

//Create an empty Javascript Object to push diary form inputs 
var diaryOBJ = {
    "image1" : "",
    "image2" : "",
    "title" : "",
    "user" : "Payal Sethi",
    "date" : "",
    "p1" : "",
    "p2" : ""
};


//Define the diary collection class
var DiaryCollectionList = Backbone.Collection.extend({
    model: DiaryModel
});

//Create a diary collection instance
var diaryCollectionList = new DiaryCollectionList();


//Define a diary model view class
var DiaryModelView = Backbone.View.extend({
    tagName: 'div',
    className: 'diary-model-container',
    template: _.template(
        '<section>' +
            '<h1><%= title %></h1>' +
            '<h3><%= user %></h3>' +
            '<hr>' +
            '<p><%= p1 %></p>' +
            '<img class="diary-model-img" src="<%= image1 %>"/>' + 
            '<p><%= p2 %></p>' +
            '<img class="diary-model-img" src="<%= image2 %>"/>' + 
        '</section>'
        ),
    events: {
        //When preview button is clicked, run preview article
        "click #preview-diary": "previewArticle"
    },
    render: function(){
        var dmv = this.model.toJSON();
        this.$el.html(this.template(dmv));
        return this;
    }
});

//Define a diary collection view
var DiaryCollectionView = Backbone.View.extend(
    {
         tagName: 'div',
         className: 'diary-collection-container',
         
         initialize: function() {
            this.collection.on('reset', this.addAll, this);
         },
         addOne: function(data) {
            var diaryModelView = new DiaryModelView({model: data});
            this.$el.append(diaryModelView.render().el);
         },
         addAll : function() {
            this.collection.forEach(this.addOne, this);
         },

         render: function(){
            this.addAll();
            return this;
         }
    }
);

$('#add-title').click(function() {
    var that = $('#diary-edit-title');
    var key = that.attr('name');
    var value = that.val();
    diaryOBJ[key] = value;
    console.log(diaryOBJ);
    return false;
});

$('#add-img1').click(function() {
    var that = $('#diary-edit-image');
    var key = that.attr('name');
    var value = that.val();
    diaryOBJ[key] = value;
    console.log(diaryOBJ);
    return false;
});

$('#add-p1').click(function() {
    var that = $('#diary-edit-p1');
    var key = that.attr('name');
    var value = that.val();
    diaryOBJ[key] = value;
    console.log(diaryOBJ);
    return false;
});

$('#preview-diary').click(function() {
    $(':input').each(function(i, data){
        var that = $(this);
        var key = that.attr('name');
        var value = that.val();
        diaryOBJ[key] = value;
    }); 

    $('#diary-article-preview').html("diaryOBJ"); 
    return false;\\
    //Push diaryOBJ onto diaryLIST
    //diaryCollectionList.reset(diaryList);
    //var dmv = diaryCollectionView.render().el;
    //$('#diary-article-preview').html(dmv);  
    
    
});

$('#overlay-float-right').click(function() {
    $('#overlaycontainer').css({"z-index":"-1"});
    return false;
});

