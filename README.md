#Angular Simple Feature Flags
Angular Simple Feature Flags is a configurable module for [AngularJS](https://angularjs.org/) that supports visibility-toggling (hiding/showing) of application components. [Feature flags](http://en.wikipedia.org/wiki/Feature_toggle) (or feature toggles) are commonly used in CI ([Continuous Integration](http://en.wikipedia.org/wiki/Continuous_integration)) workflows as they allow for code to be continuously released in to production environments, with incomplete features hidden behind a feature flag.

##Get Started

**(1)** Get this module in one of the following ways:

* [download the release](https://raw.githubusercontent.com/costacruise/angular-simple-feature-flags/master/angular-simple-feature-flags.js) *
* via Bower: by running `$ bower install angular-simple-feature-flags` from your console (recommended)


**(2)** Include `angular-simple-feature-flags.js` in your `index.html`, after including AngularJS itself


**(3)** Add 'simpleFeatureFlag' to your main module's list of dependencies:

```html
angular.module('exampleApp', [
  'simpleFeatureFlags'
]);
```

**(4)** Add a new config function to your application where you can pass in a config array using the modules init method:

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
**Note:** The config is expected as an array of objects in the above format.


**(5)** Specify which elements should be controlled by the feature flags config in either of the following ways:

Contained within a `<feature-flags>` element:
```html
<feature-flag feature-key="example0">
  <div>
    <h1>This is my cool new feature!</h1>
  </div>
</feature-flag>
```
Or as an elements attribute:
```html
<div feature-flag feature-key="example1">
  <h1>This is my cool new feature!</h1>
</div>
```

\* If installing manually, you will also need to install [Lodash](https://github.com/lodash/lodash) as a dependency

###Feedback
Please add any bugs or feedback to the issue queue.

###Roadmap
* Add minification to the gulp build
* Further document the module’s API
* Support the inclusion of a config JSON file via $http request