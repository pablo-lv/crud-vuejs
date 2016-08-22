
var emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var vm = new Vue({
	el: '#UserController',

	data: {
		newUser: {
			name: '',
			email: '',
			address: ''
		}
	},

	methods: {
		fetchUser: function () {
			this.$http.get('/api/users').then((response) => {
				this.$set('users', response.data);
			});
		},

		AddNewUser: function () {

		}
	},

	computed: {
		validation: function () {
			return {
				name: !!this.newUser.name.trim(),
				email: emailRE.test(this.newUser.email),
				address: !!this.newUser.address.trim()
			}
		},

		isValid: function () {
			var validation = this.validation;
			return Object.keys(validation).every(function (key) {
				return validation[key];
			});
		}
	},

	ready: function () {
		this.fetchUser();
	}
});