import { apiUrl } from "../env"

export const fetchPlayers = async () => {
  const response = await fetch(`${apiUrl}/api/players`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}