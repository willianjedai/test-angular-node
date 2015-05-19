angular.module('app', [])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  
  $httpProvider.defaults.withCredentials = true;
});