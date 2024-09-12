'use client'

import { Button, Card, Flex, Title } from '@mantine/core'
import Image from 'next/image'
import AppMenu from './menu'
import SelectPlayer from './select-player'

function SoccerField() {
  return (
    <Card w="100%" h="100%" radius="md" withBorder>
      <Card.Section p={'md'}>
        <Flex align="center" justify="space-between">
          <Image
            src="/soccer-ball.png"
            alt="soccer ball"
            width={64}
            height={64}
            layout="fixed"
          />
          <Title order={2}>Table football</Title>
          <AppMenu />
        </Flex>
      </Card.Section>
      <Card.Section>
        <Flex align="center" justify="space-between" px="md">
          <SelectPlayer />
          <Button color="green">Start game</Button>
        </Flex>
      </Card.Section>
    </Card>
  )
}

export default SoccerField
