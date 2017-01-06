import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['limit','radius','query','title','text','mode','zoom','mapLat','mapLng'],
  limit: 20,
  radius:5,
  query:'',
  title:'',
  text:'',
  mode:'list',
  zoom:13,

  currentTime:new Date(),
  sortBy:["created:desc"],
  posts:Ember.computed.sort("model.posts","sortBy"),
  showingMap:function(){
    return this.get("mode") === "map";
  }.property("mode"),
  radiusMeters:function(){
    return this.get("radius")*1000;
  }.property("radius"),
  init(){
    var that=this;
    var update = function(){
      if(that.get("currentTime")){
        that.set("currentTime",new Date());
        Ember.run.later(null,update,2000);
      }
    }
    update();
  },
  willDestroy(){
    this.set("currentTime",null);
  },
  actions:{
    toggleMode(){
      var mode=this.get("mode");
      if(mode==="list"){
        this.set("mode","map");
      }else{
        this.set("mode","list");
      }
    },

  }
});
