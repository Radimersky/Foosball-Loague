<script lang="ts">
	let username: string = "";
	let password: string = "";

	async function register(): Promise<void> {
		const res = await fetch("/api/register", {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: { "Content-Type": "application/json" }
		});
		if (res.ok) alert("Registration successful!");
	}
</script>

<form on:submit|preventDefault={register}>
	<input type="text" bind:value={username} placeholder="Username" />
	<input type="password" bind:value={password} placeholder="Password" />
	<button type="submit">Register</button>
</form>

<style lang="scss">
  form {
    max-width: 300px;
    margin: auto;
    input {
      display: block;
      margin: 10px 0;
    }
  }
</style>
