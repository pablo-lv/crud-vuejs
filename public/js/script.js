
var emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var vm = new Vue({
	
	http: {
      root: '/root',
      headers: {
        'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value')
      }
    },

	el: '#UserController',

	data: {
		newUser: {
			id: '',
			name: '',
			email: '',
			address: ''
		},

		success: false,

		edit: false
	},

	methods: {
		fetchUser: function () {
			this.$http.get('/api/users').then((response) => {
				this.$set('users', response.data);
			});
		},

		AddNewUser: function () {
			var user = this.newUser;
			this.newUser = { name: '', email: '', address:''};
			this.$http.post('/api/users', user);

			self = this;
			this.success = true;
			setTimeout(function () {
				self.success = false;
			}, 5000);
			this.fetchUser();
		},

		ShowUser: function (id) {
			this.edit = true;
			this.$http.get('/api/user/' + id).then((response) => {
				this.newUser.id = response.data.id;
				this.newUser.name = response.data.name;
				this.newUser.email= response.data.email;
				this.newUser.address = response.data.address;
			});
		},

		EditUser: function (id) {
			var user = this.newUser;
			this.newUser = { name: '', email: '', address:''};
			this.$http.patch('/api/user/' + id, user).then((response) => {
				console.log(response.data);
			});

			this.fetchUser();
			this.edit = false;
		},

		RemoveUser: function (id) {
			var ConfirmBox = confirm("Are you sure, you want to delete this user?");

			if(ConfirmBox)
			{				
				this.$http.delete('/api/user/' + id).then((response) => {
				});
			}

			this.fetchUser();
			

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