'use client'
import { Box, Button, Card, Container, Flex, Text, Title } from '@mantine/core'
import TopNav from '../../components/top-nav'
import Link from 'next/link'
import GameTracker from '../../components/game-tracker'
import { usePlayers } from '../utils/hooks'

function GamePage() {
  const { player1, player2 } = usePlayers()
  return (
    <Container size="sm" h="100vh">
      <TopNav />
      <Flex p="md" align="center" justify="space-between">
        <Title order={2} mb={2} style={{ textAlign: 'center' }}>
          {player1?.name}
        </Title>
        <Title order={2} mb={2} style={{ flexGrow: 1, textAlign: 'center' }}>
          VS
        </Title>
        <Title order={2} mb={2} style={{ textAlign: 'center' }}>
          {player2?.name}
        </Title>
      </Flex>
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
      <Card radius={'md'} withBorder my="md">
        <GameTracker />
      </Card>
    </Container>
  )
}

export default GamePage
