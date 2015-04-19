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

    reporters: ['mocha', 'coverage'],

    // reporter options
    mochaReporter: {
      output: 'full'
    },

    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        // generate html reports
        { type: 'lcov', subdir: '' }
        // also output to console
        // { type: 'text' }
      ]
    },

    preprocessors: {
      '/**/*.js': ['coverage']
    },

    

    browsers: ['PhantomJS'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-mocha-reporter',
      'karma-coverage',
      'karma-sinon'
    ]
  });

};
