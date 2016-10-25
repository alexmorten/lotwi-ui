import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  title: DS.attr('string'),
  location: DS.belongsTo('location',{ async: false }),
  dist:DS.attr('number'),
  created:DS.attr('date'),
});
