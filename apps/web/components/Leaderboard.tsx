'use client'
import { Table, Title, Text, Loader, Center, Box, Button } from '@mantine/core'
import { fetchRankedPlayers } from '../app/utils/fetchers'
import { useQuery } from '@tanstack/react-query'
import { Player } from '../app/types'
import { usePlayerStats } from '../app/utils/hooks'
import Link from 'next/link'

//TODO: optimize this code since player argument has aleardy all the required data and we dont need to fetch it again
function PlayerStats({ player }: { player: Player }) {
  const { data: playerStats } = usePlayerStats(player.id)
  return (
    <Table.Tr>
      <Table.Td>{player.name}</Table.Td>
      <Table.Td>{playerStats?.gamesPlayed}</Table.Td>
      <Table.Td>{playerStats?.gamesWon}</Table.Td>
      <Table.Td>{playerStats?.gamesLost}</Table.Td>
      <Table.Td>{(playerStats?.winRatio ?? 0 * 100).toFixed(2)}%</Table.Td>
      <Table.Td>{playerStats?.goalsFor}</Table.Td>
      <Table.Td>{playerStats?.goalsAgainst}</Table.Td>
      <Table.Td>{playerStats?.goalsDifference}</Table.Td>
    </Table.Tr>
  )
}

export function Leaderboard() {
  const {
    data: players,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['rankedPlayers'],
    queryFn: fetchRankedPlayers,
  })

  if (isLoading) {
    return (
      <Center>
        <Loader size="xl" />
      </Center>
    )
  }

  if (error) {
    return <Text c="red">{error.message}</Text>
  }

  return (
    <Box py="md">
      <Box>
        <Button
          component={Link}
          href="/"
          variant="outline"
          mb="md"
          c="green"
          size="xs"
        >
          Home
        </Button>
      </Box>
      <Title order={2} mb="md">
        Leaderboard
      </Title>
      <Table.ScrollContainer minWidth={500} type="native">
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              {/* <Table.Th>Rank</Table.Th> */}
              <Table.Th>Name</Table.Th>
              <Table.Th>Games Played</Table.Th>
              <Table.Th>Wins</Table.Th>
              <Table.Th>Losses</Table.Th>
              <Table.Th>Ratio (Games Played/Win)</Table.Th>
              <Table.Th>Goals For</Table.Th>
              <Table.Th>Goals Against</Table.Th>
              <Table.Th>Goal Difference</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {players?.map((player) => (
              <PlayerStats key={player.id} player={player} />
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Box>
  )
}
