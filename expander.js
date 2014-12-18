var myModule = angular.module('myModule', []);
myModule.controller('myController', ['$scope', function($scope){
	$scope.expanders = [
	{title: 'Hello World', text: '是不是除了Hello World，你什么也不会写？'},
	{title: 'Emberjs', text: 'AngularJS很厉害吗？我不觉得。-Emberjs'},
	{title: 'AngularJS', text: '楼上说话要注意一点!'}
	];
}]);
myModule.directive('expanderContainer', function(){
	return {
		restrict: 'AE',
		template: '<div ng-transclude></div>',
		replace: true,
		transclude: true,
		controller: function(){
			var expanders = [];

			this.addExpander = function(expander){
				expanders.push(expander);
			}

			this.getOpend = function(selectedExpander){
				angular.forEach(expanders, function(expander){
					if(selectedExpander != expander){
						expander.show = false;
					}
				});
			}

		}
	};
});
myModule.directive('expander', function(){
	return {
		scope: {title: '=expanderTitle'},
		require: '^?expanderContainer',
		restrict: 'AE',
		template: '<div>'+
				'<div class="title" ng-click="toggle()">{{title}}</div>'+
				'<div class="text" ng-show="show" ng-transclude></div>'+
			    '</div>',
		replace: true,
		transclude: true,
		link: function(scope, iElm, iAttrs, controller) {
			scope.show = false;

			controller.addExpander(scope);

			scope.toggle = function toggle(){
				scope.show = !scope.show;
				controller.getOpend(scope);
			}
		}
	};
});