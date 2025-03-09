declare module "elo-rating" {
	export function calculate(
		playerRating: number,
		opponentRating: number,
		playerWin: boolean,
		kFactor?: number
	): { playerRating: number; opponentRating: number };
}
