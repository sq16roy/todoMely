(function(){   

 "use strict";
/**
 * @ngdoc overview
 * @name angular15App
 * @description
 * # angular15App
 *
 * Main module of the application.
 */
angular.module('myAngularApp', ['ngAnimate','myAngularServices', 'ngResource','ngRoute','ngSanitize','ngTouch','ngStorage'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/search.html',
        controller: 'SearchProjectCtrl'
      })
      .when('/list', {
        templateUrl: 'views/main.html',
        controller: 'ListCtrl'
      })
      .when('/newProject', {
        templateUrl: 'views/newProjectName.html',
        controller: 'ProjectNameCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
})();
