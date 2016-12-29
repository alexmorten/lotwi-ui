import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
      location: {embedded: 'always'}
  },
  keyForRelationship: function(key, relationship, method) {
     return  Ember.String.underscore(key)+'_id';
   }
});
