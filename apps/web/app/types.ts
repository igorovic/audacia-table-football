export interface Player {
  id: number
  name: string
}

export interface Game {
  player1Id: number
  player2Id: number
  goalsPlayer1: number
  goalsPlayer2: number
  gameId: number
}
export interface PlayerGoals {
  gameId: number
  playerId: number
  goals: number
}

export interface PlayerStats {
  gamesPlayed: number
  gamesWon: number
  gamesLost: number
  winRatio: number
  goalsFor: number
  goalsAgainst: number
  goalsDifference: number
}

export interface RankedPlayer extends Player, PlayerStats {}
