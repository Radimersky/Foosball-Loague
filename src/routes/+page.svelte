<script lang="ts">
	import { API_BASE_URL } from '../config.js';

	let username = '';
	let password = '';

	async function register(username: string, password: string) {
		const response = await fetch(`${API_BASE_URL}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});

		const data = await response.json();
		if (response.ok) {
			alert('Registration successful! Please log in.');
		} else {
			alert(`Registration failed: ${data.message}`);
		}
	}

	async function login(username: string, password: string) {
		const response = await fetch(`${API_BASE_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});

		const data = await response.json();
		if (response.ok) {
			// Store the JWT token
			localStorage.setItem('jwt_token', data.token);
			alert('Login successful!');
			// Redirect or perform other actions (e.g., go to the dashboard)
		} else {
			alert('Login failed: Invalid credentials');
		}
	}

</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<!-- Registration Form -->
<div>
	<h2>Register</h2>
	<form on:submit|preventDefault={() => register(username, password)}>
		<input type="text" bind:value={username} placeholder="Username" required />
		<input type="password" bind:value={password} placeholder="Password" required />
		<button type="submit">Register</button>
	</form>
</div>

<!-- Login Form -->
<div>
	<h2>Login</h2>
	<form on:submit|preventDefault={() => login(username, password)}>
		<input type="text" bind:value={username} placeholder="Username" required />
		<input type="password" bind:value={password} placeholder="Password" required />
		<button type="submit">Login</button>
	</form>
</div>
