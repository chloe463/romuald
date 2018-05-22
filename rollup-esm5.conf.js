export default {
  input: './builds/esm5/index.js',
  output: {
    file: './builds/esm5/romuald.js',
    format: 'es',
    globals: {
      '@angular/core': 'ng.core',
      'rxjs': 'rxjs',
      'rxjs/operators': 'rxjs_operators'
    }
  }
};
