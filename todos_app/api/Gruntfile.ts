export default function(grunt: any) {
    require('load-grunt-tasks')(grunt); // Automatically load required Grunt tasks
  
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
  
      // Clean the 'dist/' directory
      clean: {
        build: ['dist/'],
      },
  
      // TypeScript compilation
      ts: {
        options: {
          // Options can be specified here
        },
        backend: {
          tsconfig: './tsconfig.json' // Path to the backend's tsconfig.json
        },
        frontend: {
          tsconfig: '../ui/tsconfig.json' // Path to the frontend's tsconfig.json
        }
      },
  
      // Execute shell commands
      shell: {
        buildVue: {
          command: 'npm run build',
          options: {
            execOptions: {
              cwd: '../ui', // Make sure to adjust this path as needed
            },
          },
        }
      },
  
      // Copy built Vue.js assets
      copy: {
        vueToPublic: {
          expand: true,
          cwd: '../ui/dist', // Make sure this path is correct
          src: '**',
          dest: './dist/public', // Destination path within the 'dist' folder
        },
      },
  
      // Zip the 'dist/' directory for deployment
      zip: {
        'using-cwd': {
          cwd: './',
          src: ['./dist/**/*', '!**/node_modules/**'], // Exclude 'node_modules'
          dest: 'dist/api.zip',
        },
      },
    });
  
    // Load necessary Grunt tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-ts');
  
    // Define the default task sequence
    grunt.registerTask('default', ['clean', 'ts:backend', 'ts:frontend', 'shell:buildVue', 'copy', 'zip']);
  }
  