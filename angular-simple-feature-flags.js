(function(window, angular, undefined) {'use strict';
	
	angular.module('simpleFeatureFlags', ['ng'])


	.provider('FeatureFlags', function() {
    
    // private
    var flags = [];

		function isValidFlagObj (flagObj) {
			return (typeof flagObj.id === 'string' && typeof flagObj.active === 'boolean' && !isDuplicate(flagObj)) ? true : false;
		}

		function isDuplicate (flagObj) {
			return typeof _.find(flags, function(flag){ return flagObj.id === flag.id}) === 'object';
		}

		function isString (flagId) {
			return typeof flagId === 'string';
		}

		function getFlag (flagId) {

			var targetObj;

			if (isString(flagId)) {
				targetObj = _.find(flags, function(flag){ return flag.id === flagId});
			}

			return targetObj ? targetObj : false;

		}

		function addFlag(flagObj) {

			return isValidFlagObj(flagObj) ? flags.push(flagObj) > 0 : false;

		}

		function addFlags(configArray) {

			if (_.isArray(configArray)) {

				_.forEach(configArray, function(element) {
					addFlag(element);
				});

			}

		}

		function removeFlag(flagId) {

			var status = false, flagLength = flags.length;

			if (isString(flagId)) {
				flags = _.without(flags, _.findWhere(flags, {id: flagId}));

				if (flags.length < flagLength) {
					status = true;
				}

			} 

			return status;

		}

		function getFlagStatus(flagId) {

			var targetObj = getFlag(flagId);
			return targetObj && targetObj.active !== undefined ? targetObj.active : false;

		}

		function setFlagStatus(flagId, newStatus) {

			var targetObj = getFlag(flagId);
			var status = false;

			if (targetObj && typeof newStatus === 'boolean') {
				targetObj.active = newStatus;
				status = true;
			}

			return status;

		}

		function getAllFlags(){
			return flags;
		}

		function removeAllFlags(){
			flags = [];
		}

    // public 
    this.$get = function() {

	   	return {
				addFlag : addFlag,
				addFlags : addFlags,
				removeFlag : removeFlag,
				getFlagStatus : getFlagStatus,
				setFlagStatus : setFlagStatus,
				getAllFlags : getAllFlags,
				removeAllFlags : removeAllFlags
	    }

    };

    this.init = function(configArray){
    	addFlags(configArray);
    };

    
	})

	.directive('featureFlag', ['FeatureFlags', function(FeatureFlags) {

	    return {
	        restrict: 'AE',
	        compile: function () {

	            return function ($scope, element, attrs) {

	                if ( !FeatureFlags.getFlagStatus( attrs.featureKey )) {
	                    element.remove();
	                } 
	                
	                
	            }

	        }
	    }

		}]);


})(window, window.angular);