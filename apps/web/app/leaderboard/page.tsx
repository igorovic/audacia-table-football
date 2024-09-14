import { Box, Button, Card, Container, Text, Title } from '@mantine/core'
import MatchResultInput from '../../components/match-result-input'
import TopNav from '../../components/top-nav'
import Link from 'next/link'
import { Leaderboard } from '../../components/Leaderboard'

function StoreMatchResults() {
  return (
    <Container size="sm" h="100vh">
      <TopNav />
      <Leaderboard />
    </Container>
  )
}

export default StoreMatchResults
