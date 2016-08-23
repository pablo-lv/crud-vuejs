@extends('layout')

@section('content')
	<div id="UserController" style="margin-top: 2em">
		
		<div class="alert alert-danger" v-if="!isValid">
			<ul>
				<li v-show="!validation.name">Name field is required.</li>
				<li v-show="!validation.email">Input a valid email address.</li>
				<li v-show="!validation.address">Address field is required.</li>
			</ul>
		</div>

		<form action="#" @submit.prevent="AddNewUser" method="POST">

			<div class="form-group">
				<label for="name">Name:</label>
				<input v-model="newUser.name" type="text" class="form-control" name="name">
			</div>

			<div class="form-group">
				<label for="email">Email:</label>
				<input v-model="newUser.email" type="text" class="form-control" name="email">
			</div>

			<div class="form-group">
				<label for="address">Address:</label>
				<input v-model="newUser.address" type="text" class="form-control" name="address">
			</div>

			<div class="form-group">
				<button :disabled="!isValid" v-if="!edit" class="btn btn-default" type="submit">Add New User</button>
				<button :disabled="!isValid" v-if="edit" @click.prevent="EditUser(newUser.id)" class="btn btn-primary" type="submit">Edit User</button>
			</div>
		</form>

		<div class="alert alert-success" transition="success" v-if="success">Add new user successful</div>

		<hr>
		<table class="table">
			<thead>
				<th>#</th>
				<th>Name</th>
				<th>Email</th>
				<th>Address</th>
				<th>Created at</th>
				<th>Updated at</th>
				<th>Actions</th>
			</thead>
			<tbody>
				<tr v-for="user in users">
					<td>@{{ user.id }}</td>
					<td>@{{ user.name }}</td>
					<td>@{{ user.email }}</td>
					<td>@{{ user.address }}</td>
					<td>@{{ user.created_at }}</td>
					<td>@{{ user.updated_at }}</td>
					<td>
						<button class="btn btn-default btn-sm" @click="ShowUser(user.id)">Edit</button>
						<button class="btn btn-danger btn-sm"  @click="RemoveUser(user.id)">remove</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
@stop

@push('scripts')
	<script src="/js/script.js"></script>

	<style>
		.success-transition {
			transition: all .5s ease-in-out;
		}
		.success-enter, .success-leave {
			opacity: 0
		}
	</style>
@endpush