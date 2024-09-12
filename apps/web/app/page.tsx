import { Container } from '@mantine/core'
import SoccerField from '../components/soccer-field'
import Intro from '../components/intro'
import TopNav from '../components/top-nav'
import { Suspense } from 'react'

export default function Home() {
  return (
    <Container size="sm" h="100vh">
      <TopNav />
      <Intro />
      <Suspense fallback={<div>Loading...</div>}>
        <SoccerField />
      </Suspense>
    </Container>
  )
}
