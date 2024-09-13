import { apiUrl } from '../env'
import { Game, Player } from '../types'

export const createPlayer = async (name: string): Promise<Player> => {
  const response = await fetch(`${apiUrl}/api/players`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  })

  if (!response.ok) {
    throw new Error('Failed to create player')
  }

  return response.json()
}

export const storeMatchResults = async (score: {
  player1Id: number
  player2Id: number
  goalsPlayer1: number
  goalsPlayer2: number
}): Promise<Game> => {
  const { player1Id, player2Id, goalsPlayer1, goalsPlayer2 } = score
  const response = await fetch(`${apiUrl}/api/games/store-match-results`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ player1Id, player2Id, goalsPlayer1, goalsPlayer2 }),
  })

  if (!response.ok) {
    throw new Error('Failed to store match results')
  }

  return response.json()
}
