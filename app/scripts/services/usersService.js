'use strict';

/**
 * @ngdoc function
 * @name angular15App.controller:DayCtrl
 * @description
 * # DayCtrl
 * Controller of the angular15App
 */
angular.module('myAngularServices', ['ngResource'])

//service to get date from json file
.service('JsonService', function($resource) {
  return $resource('data/list.json',{ }, {
    getData: {method:'GET', isArray: false}
  });
});