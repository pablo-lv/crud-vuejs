var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {

	var npm_dir = 'node_modules/',
		js_dir  = 'resources/assets/js';

	mix.copy(npm_dir + 'vue/dist/vue.min.js', js_dir);
	mix.copy(npm_dir + 'vue-resource/dist/vue-resource.min.js', js_dir);
	

	mix.scripts([
		'vue.min.js',
		'vue-resource.min.js'
	], 'public/js/vendor.js');


});
