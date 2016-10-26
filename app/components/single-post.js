import Ember from 'ember';

export default Ember.Component.extend({


  distance:function(){
    var dist=this.get("post.dist");
    var roundedDist=Math.round(dist * 100) / 100;
    return roundedDist + "km";
  }.property("post.dist"),

  timeAgo:function(){
    var created = this.get("post.created");
    var currentTime = this.get("currentTime");
    var seconds = Math.floor((currentTime - created) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {

        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {

        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {

        return interval + "d";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {

        return interval + " h";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {

        return interval + "min";
    }
    return Math.floor(seconds) + "s";
  }.property("post.created","currentTime"),
  actions:{

    delete(post){
      this.sendAction("delete",post);
    }
  }
});
