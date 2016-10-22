import DS from 'ember-data';

export default DS.Model.extend({
  lng: DS.attr('number'),
  lat: DS.attr('number'),
  post: DS.belongsTo('post',{ async: false })
});
