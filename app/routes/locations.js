import Ember from 'ember';

export default Ember.Route.extend({
  geolocation: Ember.inject.service(),
  model(){
    var that=this;
    var geo=this.get("geolocation");
    return Ember.RSVP.hash({
      currentLocation:new Ember.RSVP.Promise(function(resolve){
        var currentLocation = geo.get("currentLocation");
        if(currentLocation && currentLocation.length >= 2){ // case 2; lat and lng are already known
          var lat=currentLocation[0];
          var lng=currentLocation[1];
          resolve({lat:lat,lng:lng});

        }else{ // case 1; lat and lng have to be determined by the browser first
          geo.getLocation().then(function(geoObject){ // takes a considerable amount of time!
            var lat=geoObject.coords.latitude;
            var lng=geoObject.coords.longitude;
            resolve({lat:lat,lng:lng});
          
          });
        }

             }),
      allLocations:that.store.findAll("location"),
    });
  }
});
