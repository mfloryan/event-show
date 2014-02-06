module.exports = function(config){
    config.set({
    files : [
      'content/js/angular.min.js',
      'node_modules/lodash/dist/lodash.min.js',
      'content/js/app.js',
      'tests/angular-mocks.js',
      'tests/unit/**/*.js',
    ],
    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
})}
