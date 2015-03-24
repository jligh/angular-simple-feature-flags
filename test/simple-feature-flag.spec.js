'use strict';

describe('Costa Feature Flag service', function() {

  beforeEach(module('boilerplate'));

  var FeatureFlags, flagsArray;

  beforeEach(inject(function($injector) {
    flagsArray = [ {'id': 'example0', 'active': true}, {'id': 'example1', 'active': false} ];
    FeatureFlags = $injector.get('FeatureFlags');
    FeatureFlags.removeAllFlags();
  }));

  it ('this is a placeholder', function () {
      expect(true).toBeTruthy();    
  }) 

  it('should expose the correct public methods', function() {

    expect(FeatureFlags.addFlag).not.toBeUndefined();
    expect(FeatureFlags.removeFlag).not.toBeUndefined();
    expect(FeatureFlags.getFlagStatus).not.toBeUndefined();
    expect(FeatureFlags.setFlagStatus).not.toBeUndefined();
    expect(FeatureFlags.getAllFlags).not.toBeUndefined();

  });

  it('should accept an array of flags - json config obj', function () {

    expect(FeatureFlags.getAllFlags().length).toEqual(0);
    expect(FeatureFlags.addFlags(flagsArray)).toBeTruthy();
    expect(FeatureFlags.addFlags([]) ).toBeFalsy();
    expect(FeatureFlags.getAllFlags().length).toEqual(2);

  });

  it('should not accept an invalid flag config', function () {

    FeatureFlags.addFlags({'id': 'example0', 'active': true});
    FeatureFlags.addFlags(true);
    FeatureFlags.addFlags(undefined);
    expect(FeatureFlags.getAllFlags().length).toEqual(0);

  });

  it('should add a new flag', function() {

    FeatureFlags.addFlag({'id': 'example2', 'active': false});
    expect(FeatureFlags.getAllFlags().length).toEqual(1);

  });

  it('should not add an invalid flag', function() {

    FeatureFlags.addFlag({'id': 'example2', 'active': 'false'});
    FeatureFlags.addFlag({'id': 1, 'active': 'false'});
    FeatureFlags.addFlag({'_id': 'example2', 'active': 'false'});
    expect(FeatureFlags.getAllFlags().length).toEqual(0);

  });

  it('should remove a flag', function(){

    FeatureFlags.addFlags(flagsArray);
    expect(FeatureFlags.getAllFlags().length).toEqual(2);
    FeatureFlags.removeFlag('example0')
    expect(FeatureFlags.getAllFlags()).toEqual([{'id': 'example1', 'active': false}]);

  });

  it('should not removeFlag when non string is passed', function(){

    FeatureFlags.addFlags(flagsArray);
    expect(FeatureFlags.getAllFlags().length).toEqual(2);
    FeatureFlags.removeFlag(0);
    expect(FeatureFlags.getAllFlags().length).toEqual(2);

  });

  it('should not removeFlag when a non flag id is passed', function(){

    FeatureFlags.addFlags(flagsArray);
    expect(FeatureFlags.getAllFlags().length).toEqual(2);
    FeatureFlags.removeFlag('something');
    expect(FeatureFlags.getAllFlags().length).toEqual(2);

  });


  it('should return a flags status', function(){

    FeatureFlags.addFlags(flagsArray);
    
    expect(FeatureFlags.getFlagStatus('example0')).toEqual(true);
    expect(FeatureFlags.getFlagStatus('example1')).toEqual(false);

  });

  it('should return false when an invaild id is passed', function(){

    expect(FeatureFlags.getFlagStatus(22)).toEqual(false);

  });

  it('should set a flags status', function(){

    FeatureFlags.addFlags(flagsArray);
    
    FeatureFlags.setFlagStatus('example0', false);
    FeatureFlags.setFlagStatus('example1', true);

    expect(FeatureFlags.getFlagStatus('example0')).toEqual(false);
    expect(FeatureFlags.getFlagStatus('example1')).toEqual(true);

  });

  it('should not set a flag status when passed invalid arguments', function () {

    FeatureFlags.addFlags(flagsArray);
    FeatureFlags.setFlagStatus('example0', 'false');
    expect(FeatureFlags.getFlagStatus('example0')).toEqual(true);

  });

  it('should return all flags', function(){

    FeatureFlags.addFlags(flagsArray);    
    expect(FeatureFlags.getAllFlags()).toEqual([ {'id': 'example0', 'active': true}, {'id': 'example1', 'active': false} ]);

  });
  
});
