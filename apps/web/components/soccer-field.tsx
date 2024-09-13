'use client'

import { Box, Button, Card, Flex, Text } from '@mantine/core'
import SelectPlayers from './select-player'
import { useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'

function SoccerField() {
  const router = useRouter()
  const [player1] = useQueryState('p1')
  const [player2] = useQueryState('p2')
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
            onClick={() =>
              router.push(`/game?p1=${player1}&p2=${player2}&g1=0&g2=0`)
            }
            disabled={!player1 || !player2}
          >
            Start game
          </Button>
        </Flex>
        <Flex align="center" justify="center" mt="md">
          <Text>select players</Text>
        </Flex>
      </Card>
    </Box>
  )
}

export default SoccerField
