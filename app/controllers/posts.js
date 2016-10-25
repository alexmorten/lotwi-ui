import Ember from 'ember';

export default Ember.Controller.extend({
  radius:5,
  currentTime:new Date(),
  sortBy:["created:desc"],
  posts:Ember.computed.sort("model","sortBy"),
  init(){
    var that=this;
    var update = function(){
      if(that.get("currentTime")){
        that.set("currentTime",new Date());
        console.log("update");
        Ember.run.later(null,update,2000);
      }
    }
    update();
  },
  willDestroy(){
    this.set("currentTime",null);
  },

});
