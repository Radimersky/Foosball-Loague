export interface User {
	id: string;
	name: string;
	elo: number;
}

export interface MatchResult {
	player1: string;
	player2: string;
	opponent1: string;
	opponent2: string;
}
