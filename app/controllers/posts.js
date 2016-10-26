import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['limit','radius','title','text'],
  limit: 10,
  radius:5,
  title:null,
  text:null,
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
