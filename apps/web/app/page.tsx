import { Container } from '@mantine/core'
import SoccerField from '../components/soccer-field'

export default function Home() {
  return (
    <Container size="sm" h="100vh">
      <SoccerField />
    </Container>
  )
}
