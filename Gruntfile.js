module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt)
    // Project configuration.
    grunt.initConfig({
        clean: {
            dist: {
                files: [{
                    src: [
                        'dist/simon_probe_plugin.min.js'
                    ]
                }]
            }
        },
        concat: {
            js: {
                src: [                    
                    'bower_components/date.format/date.format.js',
                    'bower_components/jquery-jsonp/src/jquery.jsonp.js',
                    'src/**/*.js'
                ],
                dest: 'dist/simon_probe_plugin.min.js'
            }
        },
        uglify: {
            js: {
                dest: 'dist/simon_probe_plugin.min.js',
                src: 'dist/simon_probe_plugin.min.js'
            }
        },
        standard: {
            dev: {
                src: [
                    '{,src/,test/}*.js'
                ]
            }
        },
        karma: {
            ci: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }
    })

    grunt.registerTask('build', function () {
        grunt.task.run('clean:dist');
        grunt.task.run('concat');
        grunt.task.run('uglify');
    });
}
