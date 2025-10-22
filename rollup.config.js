import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

const isDev = process.env.NODE_ENV === 'development';

export default {
  input: 'src/js/main.js',
  output: {
    file: 'serve/js/bundle.js',
    format: 'iife',
    name: 'App'
  },
  plugins: [
    // Process LESS files
    postcss({
      extract: true,
      minimize: !isDev,
      use: [
        ['less', {
          paths: ['src/less', 'assets/fonts/socicon'],
          javascriptEnabled: true
        }]
      ]
    }),
    
    // Copy static assets
    copy({
      targets: [
        {
          src: 'src/index.html',
          dest: 'serve'
        },
        {
          src: 'assets/fonts/**/*',
          dest: 'serve/fonts'
        },
        {
          src: 'assets/images/**/*',
          dest: 'serve/images'
        }
      ]
    }),

    // Development server and live reload
    ...(isDev ? [
      serve({
        open: true,
        contentBase: 'serve',
        host: 'localhost',
        port: 3000
      }),
      livereload({
        watch: 'serve'
      })
    ] : [])
  ]
};