# angular-simple-feature-flags

[![Circle CI](https://circleci.com/gh/costacruise/angular-simple-feature-flags.svg?style=svg)](https://circleci.com/gh/costacruise/angular-simple-feature-flags)

A configuragle angular module that supports visiblity toggling (hide/show) of application components

## Installing via Bower
```
bower install angular-simple-feature-flags [to-do]

```
## Usage

### Installation

Manually add the...

### Configuration 

#### Step 1

Add the module as a dependency to your application:

```html
	angular.module('exampleApp', [
  	'simpleFeatureFlags'
	])
```

#### Step 2

Add a new config function to your application where you can pass in a default config array using the modules init method.


```html
angular.module('exampleApp', [
  'simpleFeatureFlags'
  ])
  .config(function(FeatureFlagsProvider){
    
    FeatureFlagsProvider.init(
      [ 
        {'id': 'example0', 'active': true}, 
        {'id': 'example1', 'active': false},
        {'id': 'example2', 'active': false}
      ]
    );    

});
```

#### Note

The config object is an array of objects, see above as an example.




