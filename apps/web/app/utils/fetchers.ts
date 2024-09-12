import { apiUrl } from "../env"
import { Player } from "../types"
export const fetchPlayers = async (): Promise<Player[]> => {
  const response = await fetch(`${apiUrl}/api/players`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}