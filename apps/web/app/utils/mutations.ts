import { apiUrl } from '../env'
import { Game, Player, PlayerGoals } from '../types'

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

export const createGame = async (players: {
  player1Id: number
  player2Id: number
}): Promise<{ gameId: number }> => {
  const { player1Id, player2Id } = players
  const response = await fetch(`${apiUrl}/api/games`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ player1Id, player2Id }),
  })

  if (!response.ok) {
    throw new Error('Failed to create game')
  }

  return response.json()
}

export const incrementGameGoals = async (args: {gameId: number, playerId: number}): Promise<PlayerGoals> => {
  const { gameId, playerId } = args
  const response = await fetch(`${apiUrl}/api/games/${gameId}/increment-goals`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ playerId }),
  })

  if (!response.ok) {
    throw new Error('Failed to increment game goals')
  }

  return response.json()
}

export const decrementGameGoals = async (args: {gameId: number, playerId: number}): Promise<PlayerGoals> => {
  const { gameId, playerId } = args
  const response = await fetch(`${apiUrl}/api/games/${gameId}/decrement-goals`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ playerId }),
  })
  
  if (!response.ok) {
    throw new Error('Failed to decrement game goals')
  }

  return response.json()
} 

export const setGameGoals = async (args: {gameId: number, playerId: number, goals: number}): Promise<PlayerGoals> => {
  const { gameId, playerId, goals } = args
  const response = await fetch(`${apiUrl}/api/games/${gameId}/set-goals`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ playerId, goals }),
  })

  if (!response.ok) {
    throw new Error('Failed to set game goals')
  }

  return response.json()
} 