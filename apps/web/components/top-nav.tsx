'use client'
import Image from 'next/image'
import { Flex, Title } from '@mantine/core'
import AppMenu from './menu'

function TopNav() {
  return (
    <Flex align="center" justify="space-between" pt="md">
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
  )
}

export default TopNav
