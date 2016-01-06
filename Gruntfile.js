module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            build: ['Gruntfile.js', 'dev/**/*.js']
        },

        uglify: {
            options: {
                banner: '/*<%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
            },
            build: {
                files: {
                    'prod/js/scripts.js': ['dev/js/script1.js', 'dev/js/script2.js']
                }
            }
        },

        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    src: 'dev/sass/styles.scss',
                    dest: 'dev/css/styles.css'
                }]
            }
        },

        cssmin: {
            options: {
                banner: '/*<%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
            },
            build: {
                files: {
                    'prod/css/styles.css': 'dev/css/styles.css'
                }
            }
        },

        htmlmin: {
            prod: {
                options: {
                    removeComments: true,
                    collapseWhiteSpaces: true
                },
                files: {
                    'prod/index.html': 'dev/index.html'
                }
            }
        },

        watch: {
            files: 'dev//*.html',
            tasks: 'htmlmin',
            css: {
                files: ['dev//*.css', 'dev//*.scss'],
                tasks: ['sass:dev', 'cssmin']
            },
            scripts: {
                files: 'dev/**/*.js',
                tasks: ['jshint', 'uglify']
            }
        }


    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'uglify', 'sass:dev', 'cssmin', 'htmlmin']);
};
