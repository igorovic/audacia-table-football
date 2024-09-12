'use client'

import { Box, Button, Card, Flex, Title } from '@mantine/core'
import Image from 'next/image'
import AppMenu from './menu'
import SelectPlayers from './select-player'

function SoccerField() {
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
          <Button color="green">Start game</Button>
        </Flex>
      </Card>
    </Box>
  )
}

export default SoccerField
