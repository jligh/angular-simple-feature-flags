'use strict';

angular.module('boilerplate', [
  'simpleFeatureFlags'
  ])
  .config(function(FeatureFlagsProvider){

    //FeatureFlagsProvider.enableSessionStorage();
    FeatureFlagsProvider.init(
      [ 
        {'id': 'example0', 'active': false}, 
        {'id': 'example1', 'active': false},
        {'id': 'example2', 'active': false}
      ]
    );
    

});