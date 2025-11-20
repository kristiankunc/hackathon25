interface GameState {
	players: Player[];
}

interface Player {
	id: string;
	positionX: number;
	health: number;
}
