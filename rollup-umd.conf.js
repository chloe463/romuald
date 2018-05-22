export default {
  input: './builds/esm2015/index.js',
  output: {
    file: './builds/bundles/romuald.umd.js',
    format: 'umd',
    name: 'romuald',
    globals: {
      '@angular/core': 'ng.core',
      'rxjs': 'rxjs',
      'rxjs/operators': 'rxjs_operators'
    }
  }
};
