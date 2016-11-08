module.exports = function(grunt) {
  
  grunt.loadNpmTasks('grunt-starlight')
  grunt.loadNpmTasks('grunt-babel')

  grunt.initConfig({
    starlight: {
      the_test: {
        src: 'src/the_test.lua',
        dest: 'dist/out.es6.js'
      }
    },

    babel: {
      options: {
        plugins: ['transform-es2015-destructuring']
      },
      the_test: {
        src: 'dist/out.es6.js',
        dest: 'dist/out.js'
      }
    }
  });

  grunt.registerTask('default', ['starlight:the_test', 'babel:the_test']);

};
