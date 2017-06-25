//**** NEWS COLLECTION ****
var NewsItemList = Backbone.Collection.extend({
    model: NewsModel
});

var newsItemList = new NewsItemList();

var articleList = [];

// **** Preview Collection LIST **** //
var previewList = [];

var PreviewCollectionList = Backbone.Collection.extend({
    model: PreviewModel
});

var previewCollectionList = new PreviewCollectionList();


//DIARY COLLECTION LIST 
var DiaryCollectionList = Backbone.Collection.extend({
    model: DiaryModel
});

//Create a diary collection instance
var diaryCollectionList = new DiaryCollectionList();