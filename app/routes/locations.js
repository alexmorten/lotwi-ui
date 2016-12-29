import Ember from 'ember';

export default Ember.Route.extend({
  geolocation: Ember.inject.service(),
  model(){
    var that=this;
    var geo=this.get("geolocation");
    return Ember.RSVP.hash({
      currentLocation:new Ember.RSVP.Promise(function(resolve){     resolve(geo.getLocation());     }),
      allLocations:that.store.findAll("location"),
    });
  }
});
