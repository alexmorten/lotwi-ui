import Ember from 'ember';

export default Ember.Route.extend({
  geolocation: Ember.inject.service(),
  model() {
    var that=this;
      return new Ember.RSVP.Promise(function(resolve) {
      that.get("geolocation").getLocation().then(function(geoObject){
        var coords=geoObject.coords;
        resolve(
          that.store.query("post",{
            lat:coords.latitude,
            lng:coords.longitude,
            dist:5,
            limit:20
          })
        );
      });
      });
    },
  actions:{
    deletePost(post){
      post.destroyRecord();
    },
    createPost(title,text){
      var that=this;
      if(title &&  text){
        this.get('geolocation').getLocation().then(function(geoObject) {

          var p = that.store.createRecord("post",{
            title:title,
            text:text
          });
          p.save().then(function(post){
            var l = that.store.createRecord("location",{
            lng:geoObject.coords.longitude,
            lat:geoObject.coords.latitude,
            post:post
            });
            l.save();
          })
          });
      }
    }
  }
});
