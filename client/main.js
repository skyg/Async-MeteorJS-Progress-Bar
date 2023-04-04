import { Template } from 'meteor/templating';
import { ProgressBars } from '../imports/api/progressBars';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


import './main.html';

Template.body.onCreated(function () {
  Meteor.subscribe('progressBars');
});

Template.body.helpers({
  progressBars() {
    return ProgressBars.find();
  },
  isEqual(a, b) {
    return a === b;
  },
  isGreaterThan(a, b) {
    return a > b;
  },
  countBars(){
    return ProgressBars.find().count();
  }
});

Template.body.events({
  'click .export'(event) {
    event.preventDefault();
    Meteor.call('startProgress');
  },
  'click .restart'(event) {
    event.preventDefault();
    const progressBarId = event.target.dataset.progressbarid;
    Meteor.call('restartProgress', progressBarId);
  },
  'click .delete'(event) {
    event.preventDefault();
    const progressBarId = event.target.dataset.progressbarid;
    Meteor.call('deleteProgress', progressBarId);
  },
});
