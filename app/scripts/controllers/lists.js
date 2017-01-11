(function(){
'use strict';

angular.module('myAngularApp')
  //controller
.controller("ListCtrl", function ($scope, $localStorage, JsonService) {
   var model = $localStorage.prevListData;
   /*JsonService.getData(function(data){
        model = data;
    }); otra forma de hacerlo */
    console.log(model);
    $scope.showList = false;
    $scope.todo = model;
    $scope.validate = '';
    //function to add new tasks
    $scope.add = function (name) {
        if (!name) {
                $scope.validate = $scope.warningInput();
            } else {
                $scope.todo.push(
                    {actions: name, done: false, state: 'Incomplete'}
                );
                $scope.validate = '';
            }
    $scope.myNewName = '';
    };
   //end new tasks
   
   //function to count pending tasks
    $scope.incompleteCount = function () {
        var count = 0;
        angular.forEach($scope.todo, function (item) {
            if (!item.done) {
                count++;
            }
        });
        return count;
    };
    //end pending tasks
    
    //function to add class to a pending count new tasks
    $scope.warningLevel = function () {
        return $scope.incompleteCount() < 3 ? "label-success" : "label-warning";
    };
    //end pending count
    
    //function to validate new tasks
    $scope.warningInput = function () {
        if (!$scope.myNewName) {
            return "has-error";
        } else {
           $scope.validate = '';
        }
    };
    //end validate
    
    //function to change state on view
    $scope.state = function (state,index) {
        if (state) {
            state = 'Done';
        } else {
            state = 'Incomplete';
        }
        $scope.todo[index].state = state;
        $localStorage.prevListData = $scope.todo;
        
    };
    //end change state
    
    //function to delete tasks
    $scope.delete = function (index) {
        console.log($scope.todo[index]);
        $scope.todo.splice(index,1);
        $localStorage.prevListData = $scope.todo;
    };
    //end delete
    
    //function to get edite task info
    $scope.tempEditInfo = '';
    $scope.edit = function (item) {
       $scope.tempEditInfo  = item.actions;
       $scope.tempState = item.done;
        $scope.tempIndex = $scope.todo.map(function(e) { return e.actions; }).indexOf(item.actions);
        //console.log( $scope.tempEditInfo);
        console.log( $scope.tempIndex);
    };
    //end get edit
    
    //function to save edited tasks info
    $scope.saveEdit = function () {
        console.log($scope.tempEditInfo);
       $scope.todo[$scope.tempIndex].actions = $scope.tempEditInfo;
       $scope.todo[$scope.tempIndex].done = $scope.tempState;
       if ($scope.tempState) {
           $scope.todo[$scope.tempIndex].state = 'Done';
       } else {
           $scope.todo[$scope.tempIndex].state = 'Incomplete';
       }
       $localStorage.prevListData = $scope.todo;
    };
    //end save edit
    
    //function to order colums
    $scope.myOrder = "-actions";
    $scope.orderBy = function (id) {
            if (id === "d") {
                if ($scope.myOrder === "-actions") {
                    $scope.myOrder = "actions";
                } else {
                    $scope.myOrder = "-actions";
                }
            } else {
               if ($scope.myOrder === "-state") {
                    $scope.myOrder = "state";
                } else {
                    $scope.myOrder = "-state";
                } 
            }
            return  $scope.myOrder;
    }
    //console.log($scope.orderBy())
    //end order
});
//end controller
})();

(function(){
'use strict';

angular.module('nombreDelModulo',[])
//controller
.controller("nombreDelControlador", function ($scope) {
    //aqui las funciones q quiera usar
});
//end controller
})();