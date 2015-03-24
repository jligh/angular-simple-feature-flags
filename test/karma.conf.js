'use strict';

module.exports = function(config) {

  config.set({
    basePath: '..', //!\\ Ignored through gulp-karma //!\\

    files: [ //!\\ Ignored through gulp-karma //!\\
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/lodash/lodash.js',
      'app.js',
      'angular-simple-feature-flags.js',
      //'src/app/**/*.js',
      'test/**/*.js'
    ],

    autoWatch: false,

    frameworks: ['jasmine'],

    reporters: ['progress', 'coverage'],

    preprocessors: {
      'src/app/**/*.js': ['coverage']
    },

    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },

    browsers: ['PhantomJS'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage',
      'karma-sinon'
    ]
  });

};
