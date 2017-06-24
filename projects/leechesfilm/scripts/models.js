var Team = Backbone.Model.extend({
  urlRoot: '/JSON'

});

var TeamList = Backbone.Collection.extend({
  model: Team

});