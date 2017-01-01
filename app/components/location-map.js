import Ember from 'ember';

export default Ember.Component.extend({
zoom:13,
showing:false,
radiusMeters:function(){
  return this.get("radius")*1000;
}.property("radius"),

actions:{
  toggleShowing(){
    this.toggleProperty("showing");
  }
}

});
