import pkg from './package.json'
import buble from 'rollup-plugin-buble'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import {minify} from 'uglify-es'

export default [
  {
    input: 'src/main.js',
    output: {
      name: 'PageMarked',
      file: 'dist/pageMarked.min.js',
      format: 'iife'
    },
    plugins: [
      resolve(),
      buble({
        transforms: {
          forOf: false
        },
        objectAssign: 'Object.assign',
        exclude: ['node_modules/**']
      }),
      uglify({}, minify)
    ]
  },
  {
    input: 'src/main.js',
    output: {file: pkg.main, format: 'es' },
    plugins: [
      resolve(),
      buble({
        transforms: {
          forOf: false
        },
        objectAssign: 'Object.assign',
        exclude: ['node_modules/**']
      }),
      uglify({}, minify)
    ]
  }
]