module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        standard: {
            dev: {
                src: [
                    '{,src/,test/}*.js'
                ]
            }
        }
    })
};
