'use strict';

describe('The feature Flag directive', function() {
  var element,
      scope,
      FeatureFlags,
      $compile,
      $rootScope;


  angular.module('boilerplate', [
  'simpleFeatureFlags'
  ])
  .config(function(FeatureFlagsProvider){

    FeatureFlagsProvider.init(
      [
        {'id': 'example0', 'active': false},
        {'id': 'example1', 'active': false},
        {'id': 'example2', 'active': false}
      ]
    );


  });

  beforeEach(module('boilerplate'));

  beforeEach(inject(function(_$rootScope_, _$compile_, $injector) {

    FeatureFlags = $injector.get('FeatureFlags');

    $compile = _$compile_;
    $rootScope = _$rootScope_;

    FeatureFlags.removeAllFlags();

  }));

  it('does not remove the element when the feature flag is active', function () {

    FeatureFlags.addFlag({'id': 'example0', 'active': true});
    scope = $rootScope.$new();
    element = '<div><feature-flag feature-key="example0"><div id="hello">Hello</div></feature-flag></div>';
    element = $compile(element)(scope);
    scope.$digest();

    expect( element.text() ).toBe('Hello');
    expect( element.find('feature-flag').hasClass('ng-hide') ).toBe(false);

  });


  it('removes the element when the feature flag is inactive', function () {

    FeatureFlags.addFlag({'id': 'example1', 'active': false});
    scope = $rootScope.$new();
    element = '<div><feature-flag feature-key="example1"><div id="hello" class="xxx">Hello</div></feature-flag></div>';
    element = $compile(element)(scope);
    expect( element.find('feature-flag').hasClass('ng-hide') ).toBe(true);

  });

  it('removes the element when the feature flag is inactive - attribute', function () {

    FeatureFlags.addFlag({'id': 'example1', 'active': false});
    scope = $rootScope.$new();
    element = '<div feature-flag feature-key="example1"><div id="hello" class="xxx">Hello</div></div>';
    element = $compile(element)(scope);
    expect( element.hasClass('ng-hide') ).toBe(true);

  });

  it('does not remove the element when the feature flag is active - attribute', function () {

    FeatureFlags.addFlag({'id': 'example1', 'active': true});
    scope = $rootScope.$new();
    element = '<div feature-flag feature-key="example1"><div id="hello" class="xxx">Hello</div></div>';
    element = $compile(element)(scope);
    expect( element.hasClass('ng-hide') ).toBe(false);

  });

  it('hides the element when the feature flag is inactive but toggled - attribute', function () {

    FeatureFlags.addFlag({'id': 'example1', 'active': true});
    scope = $rootScope.$new();
    element = '<div feature-flag feature-key="example1" toggled><div id="hello" class="xxx">Hello</div></div>';
    element = $compile(element)(scope);
    expect( element.hasClass('ng-hide') ).toBe(true);

  });

  it('toggles the visiblity of an elment when applicable event is fired on rootscope', function () {

    FeatureFlags.addFlag({'id': 'example1', 'active': true});
    scope = $rootScope.$new();
    element = '<div feature-flag feature-key="example1" toggled><div id="hello" class="xxx">Hello</div></div>';
    element = $compile(element)(scope);
    expect( element.hasClass('ng-hide') ).toBe(true);

    FeatureFlags.setFlagStatus('example1', false)
    //$rootScope.$broadcast('featureUpdated', 'example1');

    expect( element.hasClass('ng-hide') ).toBe(false);

  });


});
