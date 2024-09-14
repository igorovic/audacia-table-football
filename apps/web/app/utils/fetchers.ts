import { apiUrl } from "../env"
import { Player, PlayerStats, RankedPlayer } from "../types"
export const fetchPlayers = async (): Promise<Player[]> => {
  const response = await fetch(`${apiUrl}/api/players`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const fetchPlayerStats = async (playerId: number): Promise<PlayerStats> => {
  const response = await fetch(`${apiUrl}/api/players/${playerId}/stats`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
} 

export const fetchRankedPlayers = async (): Promise<RankedPlayer[]> => {
  const response = await fetch(`${apiUrl}/api/ranked-players`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}
