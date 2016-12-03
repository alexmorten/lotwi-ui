import Ember from 'ember';

export default Ember.Route.extend({
  geolocation: Ember.inject.service(),

  queryParams: {
    limit: {
      refreshModel: true
    },
    radius: {
      refreshModel: true
    }
  },
  model(params) {
    var that=this;
      return new Ember.RSVP.Promise(function(resolve) {
      var geo = that.get("geolocation");
      var currentLocation=geo.get("currentLocation");

      if(currentLocation && currentLocation.length >= 2){ // case 2; lat and lng are already known
        var lat=currentLocation[0];
        var lng=currentLocation[1];
        resolve(
          that.store.query("post",{
            lat:lat,
            lng:lng,
            dist:params.radius,
            limit:params.limit
          })
        );
      }else{ // case 1; lat and lng have to be determined by the browser first
        geo.getLocation().then(function(geoObject){ // takes a considerable amount of time!
          var lat=geoObject.coords.latitude;
          var lng=geoObject.coords.longitude;
          resolve(
            that.store.query("post",{
              lat:lat,
              lng:lng,
              dist:params.radius,
              limit:params.limit
            })
          );
        });
      }
      });
    },
  actions:{
    refreshRoute(){
      this.refresh();
    },
    deletePost(post){
      post.destroyRecord();
      this.refresh();
    },

    createPost(title,text){
      var that=this;
      if(title &&  text){
        this.controllerFor("posts").set("title",null);
        this.controllerFor("posts").set("text",null);
        var geo = that.get("geolocation");
        var currentLocation=geo.get("currentLocation");
          var lat = currentLocation[0];
          var lng = currentLocation[1];
          if(!lat || !lng){ return;}
          var p = that.store.createRecord("post",{
            title:title,
            text:text
          });
          p.save().then(function(post){
            var l = that.store.createRecord("location",{
            lng:lng,
            lat:lat,
            post:post
            });
            l.save().then(function(){
              that.refresh();
            });
          })

      }
    }
  }
});
