'use client'
import { useQuery } from '@tanstack/react-query'
import { useQueryState } from 'nuqs'
import { Player } from '../types'
import { fetchPlayers } from './fetchers'

export function usePlayers() {
  const [p1] = useQueryState('p1')
  const [p2] = useQueryState('p2')
  const { data: players } = useQuery<Player[]>({
    queryKey: ['players'],
    queryFn: fetchPlayers,
  })
  const player1 = players?.find((p) => p.id === parseInt(p1 ?? '0'))
  const player2 = players?.find((p) => p.id === parseInt(p2 ?? '0'))
  return { player1, player2 }
}
