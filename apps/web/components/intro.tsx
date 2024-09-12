'use client'
import { Box, Text, Title } from '@mantine/core'
function Intro() {
  return (
    <Box py="lg">
      <Title order={3}>
        Welcome to the Ultimate Table Football Scorekeeper!
      </Title>
      <Text>
        Tired of endless debates over who the real champion is? Let us settle
        the score for good! No more arguments, no more guesswork—just pure table
        football action, with every goal recorded and stats to back it up.
      </Text>
      <Box py="md" my="md">
        <Text>🏆 Track your scores in real-time!</Text>
        <Text>📊 Store your match results!</Text>
        <Text>📈 Check your stats and settle those champion debates!</Text>
      </Box>
    </Box>
  )
}

export default Intro
