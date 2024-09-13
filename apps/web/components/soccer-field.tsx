'use client'

import { Box, Button, Card, Flex, Text } from '@mantine/core'
import SelectPlayers from './select-player'
import { useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { createGame } from '../app/utils/mutations'
import { useMutation } from '@tanstack/react-query'

function SoccerField() {
  const router = useRouter()
  const [player1] = useQueryState('p1')
  const [player2] = useQueryState('p2')
  const { mutate, error } = useMutation({
    mutationFn: createGame,
    onSuccess: (data) => {
      router.push(`/game?gameId=${data.gameId}&p1=${player1}&p2=${player2}`)
    },
  })
  return (
    <Box h="100vh" p="md">
      <Card radius="md" my="md" withBorder>
        <Flex
          align="center"
          justify="space-between"
          px="md"
          wrap="wrap"
          gap="md"
        >
          <SelectPlayers />
          <Button
            color="green"
            onClick={() => {
              if (player1 && player2) {
                mutate({
                  player1Id: parseInt(player1),
                  player2Id: parseInt(player2),
                })
              }
            }}
            disabled={!player1 || !player2}
          >
            Start game
          </Button>
        </Flex>
        <Flex align="center" justify="center" mt="md">
          <Text>select players</Text>
        </Flex>
        {error && <Text c="red">{error.message}</Text>}
      </Card>
    </Box>
  )
}

export default SoccerField
