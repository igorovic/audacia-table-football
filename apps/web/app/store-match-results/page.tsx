import { Box, Button, Card, Container, Text, Title } from '@mantine/core'
import MatchResultInput from '../../components/match-result-input'
import TopNav from '../../components/top-nav'
import Link from 'next/link'

function StoreMatchResults() {
  return (
    <Container size="sm" h="100vh">
      <TopNav />
      <Box p="md">
        <Title order={2} mb={2}>
          Store match results
        </Title>
        <Text mb="md">Store the results of a match that has been played.</Text>
      </Box>
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
        <MatchResultInput />
      </Card>
    </Container>
  )
}

export default StoreMatchResults
