module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: [
                'Gruntfile.js',
                'src/**/*.js',
                'test/**/*.js'
            ],
            options: {
                globals: {
                    jQuery: false
                }
            }
        },

        mocha: {
            all: {
                src: ['tests/testrunner.html'],
            },
            options: {
                run: true
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        cssmin: {
            target: {
                files: [{
                    src: 'src/<%= pkg.name %>.css',
                    dest: 'build/<%= pkg.name %>.min.css',
                }]
            }
        },

        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src/', src: ['themes/**'], dest: 'build/'},
                ],
            },
        },

        clean: {
            build: {
                src: ["build"]
            }
        },

        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'jshint', 'mocha', 'uglify', 'cssmin', 'copy']);
    grunt.registerTask('watch', ['jshint', 'mocha', 'uglify', 'watch']);
};
