
$('#preview-diary').click(function() {
    $(':input').each(function(i, data){
        var that = $(this);
        var key = that.attr('name');
        var value = that.val();
        diaryOBJ[key] = value;
    }); 

    $('#diary-article-preview').html("diaryOBJ"); 
    return false;
    //Push diaryOBJ onto diaryLIST
    //diaryCollectionList.reset(diaryList);
    //var dmv = diaryCollectionView.render().el;
    //$('#diary-article-preview').html(dmv);  
    
    
});

$('#overlay-float-right').click(function() {
    $('#overlaycontainer').css({"z-index":"-1"});
    return false;
});

