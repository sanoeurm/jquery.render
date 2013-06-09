/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
        }
      }
    },
    testem: {
      options:{
        launch_in_ci: [ 'PhantomJS' ]
      },
      main: {
        files: {
          'tests.tap': [
            "test/*.html"
          ]
        }
      }
    },
    'qunit-cov': {
      test:{
        minimum: 0.9,
        srcDir: 'src',
        depDirs: ['lib', 'test', 'ren'],
        outDir: 'cov',
        testFiles: ['test/*.html']
      }
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-yui-compressor');
  grunt.loadNpmTasks('grunt-qunit-cov');
  grunt.loadNpmTasks('grunt-testem');
  grunt.loadNpmTasks('grunt-devtools');
  grunt.registerTask('default', ['testem', 'qunit-cov', 'concat', 'min']);

};
