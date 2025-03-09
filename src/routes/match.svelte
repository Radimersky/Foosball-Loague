<script lang="ts">
	import { onMount } from "svelte";
	import elo from "elo-rating";
	import type { User } from "../types/types.ts";

	let users: User[] = [];
	let player1: string = "";
	let player2: string = "";
	let opponent1: string = "";
	let opponent2: string = "";
	let message: string = "";

	onMount(async () => {
		const res = await fetch("/api/users");
		users = await res.json();
	});

	async function submitMatch(): Promise<void> {
		if (!player1 || !player2 || !opponent1 || !opponent2) return;

		// Fetch ELO ratings
		const userStats: User[] = await Promise.all(
			[player1, player2, opponent1, opponent2].map(async (user) => {
				const res = await fetch(`/api/user/${user}`);
				return await res.json();
			})
		);

		const teamA_elo = (userStats[0].elo + userStats[1].elo) / 2;
		const teamB_elo = (userStats[2].elo + userStats[3].elo) / 2;

		// ELO calculation
		const newRatings = elo.calculate(teamA_elo, teamB_elo, true); // Team A wins

		const deltaA = (newRatings.playerRating - teamA_elo) / 2;
		const deltaB = (newRatings.opponentRating - teamB_elo) / 2;

		// Store new ELOs
		await Promise.all([
			fetch(`/api/user/${player1}`, { method: "PUT", body: JSON.stringify({ elo: userStats[0].elo + deltaA }) }),
			fetch(`/api/user/${player2}`, { method: "PUT", body: JSON.stringify({ elo: userStats[1].elo + deltaA }) }),
			fetch(`/api/user/${opponent1}`, { method: "PUT", body: JSON.stringify({ elo: userStats[2].elo + deltaB }) }),
			fetch(`/api/user/${opponent2}`, { method: "PUT", body: JSON.stringify({ elo: userStats[3].elo + deltaB }) }),
		]);

		message = "Match results saved!";
	}
</script>

<form on:submit|preventDefault={submitMatch}>
	<select bind:value={player1}>
		<option value="" disabled selected>Select Player 1</option>
		{#each users as user (user.id)} <option value={user.id}>{user.name}</option> {/each}
	</select>

	<select bind:value={player2}>
		<option value="" disabled selected>Select Player 2</option>
		{#each users as user (user.id)} <option value={user.id}>{user.name}</option> {/each}
	</select>

	<select bind:value={opponent1}>
		<option value="" disabled selected>Select Opponent 1</option>
		{#each users as user (user.id)} <option value={user.id}>{user.name}</option> {/each}
	</select>

	<select bind:value={opponent2}>
		<option value="" disabled selected>Select Opponent 2</option>
		{#each users as user (user.id)} <option value={user.id}>{user.name}</option> {/each}
	</select>

	<button type="submit">Submit Match</button>
	<p>{message}</p>
</form>

<style lang="scss">
  form {
    max-width: 400px;
    margin: auto;
    select {
      display: block;
      width: 100%;
      margin: 10px 0;
    }
  }
</style>
