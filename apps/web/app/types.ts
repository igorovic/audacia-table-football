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
