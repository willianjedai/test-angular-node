angular.module('app', [ 'app.services' ])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  
  $httpProvider.defaults.withCredentials = true;
});