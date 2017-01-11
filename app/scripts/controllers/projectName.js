'use strict';

/**
 * @ngdoc function
 * @name angular15App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angular15App
 */
angular.module('myAngularApp')
  .controller('ProjectNameCtrl', function ($scope, $localStorage, JsonService, $filter) {
    $scope.subteamNew = 'Select one';
    //load first data
    if (!$localStorage.prevPageData) {
      $localStorage.prevPageData = JsonService.getData();
      $scope.myUsers = $localStorage.prevPageData;
      console.log($scope.myUsers);
    } else {
      $scope.myUsers = $localStorage.prevPageData;
      console.log($scope.myUsers.users);
    }
    //function to show or hide inputs
    $scope.showSubmit = function () {
      $scope.newUsername = $filter('lowercase')($scope.newUsername);
      if (!$scope.newUsername) {
        $scope.newProjectName = '';
        $scope.subteamNew = 'Select one';
      }
    };
    //function to Lowercase project name
    $scope.toLowercaseName = function () {
      $scope.newProjectName = $filter('lowercase')($scope.newProjectName);
    };
    //function to submit new projects
    $scope.submitNew = function (selectedName, selectedProjectName, selectedSub) {
      if (testName(selectedName) != -1) {
        if (testProjectName(selectedName,selectedProjectName) != -1) {
          if (testProjectSubName(selectedName, selectedProjectName, selectedSub) != -1) {
            $scope.subTeamError = true;
            $scope.subteamNew = 'Select one';
          } else {
            $localStorage.prevPageData.users[testName(selectedName)].projects[testProjectName(selectedName,selectedProjectName)].subteam.push(
              {
                "name" : selectedSub,
                "items" : []
              }
            );
            $scope.newUsername = '';
            $scope.newProjectName = '';
            $scope.subteamNew = 'Select one';
          };
        } else {
          $localStorage.prevPageData.users[testName(selectedName)].projects.push(
            {
              "name" : selectedProjectName,
              "subteam" : [
                {
                  "name" : selectedSub,
                  "items" : []
                }
              ]
            }
          );
          $scope.newUsername = '';
          $scope.newProjectName = '';
          $scope.subteamNew = 'Select one';
        };
      } else {
        $localStorage.prevPageData.users.push(
          {
            "name" : selectedName,
            "projects" : [
              {
                "name" : selectedProjectName,
                "subteam" : [
                  {
                    "name" : selectedSub,
                    "items" : []
                  }
                ]
              }
            ]
          }
        );
        $scope.newUsername = '';
        $scope.newProjectName = '';
        $scope.subteamNew = 'Select one';
      };
    };
    //function to validate if user name is already in use
    var testName = function (selectedName){
      var temCount = -1;
      var tempData = $localStorage.prevPageData.users.length;
      for (var i = 0; i < tempData; i++) {
        if ($localStorage.prevPageData.users[i].name === selectedName) {
          temCount = i;
          break;
        };
      };
      return temCount;
    };
    //function to validate if the new project name is already in use
   var testProjectName = function (selectedName, selectedProjectName){
      var temCount = -1;
      var tempData = $localStorage.prevPageData.users[testName(selectedName)].projects.length;
      for (var i = 0; i < tempData; i++) {
        if ($localStorage.prevPageData.users[testName(selectedName)].projects[i].name === selectedProjectName) {
          temCount = i;
          break;
        };
      };
      return temCount;
    };
    //function to validate if the selected sub team name is already in use
    var testProjectSubName = function (selectedName, selectedProjectName, selectedSub){
      var temCount = -1;
      var tempData =  $localStorage.prevPageData.users[testName(selectedName)].projects[testProjectName(selectedName,selectedProjectName)].subteam.length;
      for (var i = 0; i < tempData; i++) {
        if ( $localStorage.prevPageData.users[testName(selectedName)].projects[testProjectName(selectedName,selectedProjectName)].subteam[i].name === selectedSub) {
          temCount = i;
          break;
        };
      };
      return temCount;
    };
  });
