module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    includereplace: {
      dist: {
        options: {
          includesDir: 'src/'
        },
        src: 'src/base.js',
        dest: '<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        mangle: false,
        banner: '/*! <%= pkg.name %> (<%= pkg.homepage %>) <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= pkg.name %>.js',
        dest: '<%= pkg.name %>.min.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= pkg.name %>.css': 'sass/<%= pkg.name %>.scss',
        }
      }
    },
    watch: {
      build: {
        files: ['src/*.js', 'sass/*.scss'],
        tasks: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-include-replace');

  grunt.registerTask('build', ['includereplace', 'sass', 'uglify']);
  grunt.registerTask('default', ['includereplace', 'sass', 'uglify']);
};
