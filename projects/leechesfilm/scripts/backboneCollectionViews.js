var PreviewCollectionView = Backbone.View.extend(
    {
         tagName: 'div',
         className: 'preview-collection-container',
         
         initialize: function() {
            this.collection.on('reset', this.addAll, this);
         },
         addOne: function(data) {
            var previewModelView = new PreviewModelView({model: data});
            this.$el.append(previewModelView.render().el);
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