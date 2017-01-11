'use strict';

/**
 * @ngdoc function
 * @name angular15App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angular15App
 */
angular.module('myAngularApp')
  .controller('SearchProjectCtrl', function ($scope, $location, $localStorage, JsonService, $filter) {
    
    $scope.subteam = "Select one";
    $scope.selectedName = "Select one";
    $scope.showSelects = false;
    $scope.tempProjects = '';
    $scope.tempSubTeam = [];
    //load first data
    if (!$localStorage.prevPageData) {
      $localStorage.prevPageData = JsonService.getData();
      $scope.myUsers = $localStorage.prevPageData;
    } else {
      $scope.myUsers = $localStorage.prevPageData;
    }
//function to show projects names
    $scope.showingData = function(selectedName){
     $scope.tempSubTeam = [];
     $scope.myUserName = $filter('lowercase')($scope.myUserName);
     $scope.selectedName = "Select one";
      for (var i = 0; i < $scope.myUsers.users.length ; i++) {
        if (selectedName === $scope.myUsers.users[i].name) {
          $scope.showSelects = true;
          $scope.tempProjects = $scope.myUsers.users[i].projects;
          break;
        } else {
          $scope.showSelects = false;
        }
      };
    };

    //function to show sub team as per selected projects
    $scope.showingSubTeamData = function(selectedName){
     $scope.tempSubTeam = [];
     $scope.selectedName = selectedName;
     $scope.subteam = 'Select one';
      for (var i = 0; i < $scope.tempProjects.length ; i++) {
        if (selectedName === $scope.tempProjects[i].name) {
          for (var x = 0; x < $scope.tempProjects[i].subteam.length; x++) {
              $scope.tempSubTeam.push($scope.tempProjects[i].subteam[x].name);
          };
          break;
        };
      };
    };

    //function to search the filtered list
    $scope.searchList = function (selectedName,subTeam) {
      for (var i = 0; i < $scope.tempProjects.length ; i++) {
        if (selectedName === $scope.tempProjects[i].name) {
          for (var x = 0; x < $scope.tempProjects[i].subteam.length; x++) {
              if (subTeam === $scope.tempProjects[i].subteam[x].name) {
                $localStorage.prevListData = '';
                $localStorage.prevListData = $scope.tempProjects[i].subteam[x].items;
                $location.path('/list');
              };
          };
          break;
        };
      };
    };
  });
