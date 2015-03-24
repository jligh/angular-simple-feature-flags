'use strict';

describe('The feature Flag directive', function() {
  var element,
      scope,
      FeatureFlags,
      $compile,
      $rootScope;


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

  });


  it('removes the element when the feature flag is inactive', function () {
    
    FeatureFlags.addFlag({'id': 'example1', 'active': false});
    scope = $rootScope.$new();
    element = '<div><feature-flag feature-key="example1"><div id="hello">Hello</div></feature-flag></div>';
    element = $compile(element)(scope);
    scope.$digest();

    expect( element.text() ).toBe('');

  });
  

});