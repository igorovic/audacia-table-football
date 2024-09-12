import { apiUrl } from "../env";
import { Player } from "../types";

export const createPlayer = async (name: string): Promise<Player> => {
  const response = await fetch(`${apiUrl}/api/players`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error('Failed to create player');
  }

  return response.json();
};
