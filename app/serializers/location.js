import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  keyForRelationship: function(key, relationship, method) {
     return  Ember.String.underscore(key)+'_id';
   }
});
