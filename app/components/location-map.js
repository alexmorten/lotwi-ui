import Ember from 'ember';

export default Ember.Component.extend({
zoom:10,
showing:false,
actions:{
  toggleShowing(){
    this.toggleProperty("showing");
  }
}
});
