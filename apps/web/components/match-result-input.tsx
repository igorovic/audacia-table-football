'use client'
import { Button, Flex, Stack, Text } from '@mantine/core'
import SelectPlayers from './select-player'
import MatchGoalsInput from './match-goals-input'
import { useMutation } from '@tanstack/react-query'
import { storeMatchResults } from '../app/utils/mutations'
import { useQueryState } from 'nuqs'

function MatchResultInput() {
  const [player1Id, setPlayer1Id] = useQueryState('p1')
  const [player2Id, setPlayer2Id] = useQueryState('p2')
  const [goalsPlayer1, setGoalsPlayer1] = useQueryState('g1')
  const [goalsPlayer2, setGoalsPlayer2] = useQueryState('g2')
  const { mutate, error, isPending, isSuccess } = useMutation({
    mutationFn: storeMatchResults,
    onSuccess: () => {
      setPlayer1Id(null)
      setPlayer2Id(null)
      setGoalsPlayer1(null)
      setGoalsPlayer2(null)
    },
  })
  return (
    <Stack>
      <Flex gap="md" wrap="wrap">
        <SelectPlayers />
        <MatchGoalsInput />
      </Flex>
      <Button
        disabled={!player1Id || !player2Id || !goalsPlayer1 || !goalsPlayer2}
        color="green"
        loading={isPending}
        onClick={() =>
          mutate({
            player1Id: Number(player1Id),
            player2Id: Number(player2Id),
            goalsPlayer1: Number(goalsPlayer1),
            goalsPlayer2: Number(goalsPlayer2),
          })
        }
      >
        Store match results
      </Button>
      {error && (
        <Text c="red" size="sm" fw={500}>
          {error.message}
        </Text>
      )}
      {isSuccess && (
        <Text c="green" size="sm" fw={500}>
          Match results stored successfully
        </Text>
      )}
    </Stack>
  )
}

export default MatchResultInput
