'use client'
import { ActionIcon, Flex, Loader, Modal, Select, Stack } from '@mantine/core'
import { fetchPlayers } from '../app/utils/fetchers'
import { useQuery } from '@tanstack/react-query'
import { IconPlus } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { useQueryState } from 'nuqs'
import NewPlayer from './new-player'
import { useMemo } from 'react'

function SelectPlayers() {
  const [p1, setP1] = useQueryState('p1')
  const [p2, setP2] = useQueryState('p2')
  const [opened, { open, close }] = useDisclosure(false)
  const { data: players, isLoading } = useQuery({
    queryKey: ['players'],
    queryFn: fetchPlayers,
    select: (players) =>
      players.map((player) => ({
        value: String(player.id),
        label: player.name,
      })),
  })
  const player1Choices = useMemo(
    () =>
      players?.map((p) => {
        if (p.value !== p2) {
          return p
        }
        return Object.assign(p, { disabled: true })
      }),
    [p1, p2, players],
  )
  const player2Choices = useMemo(
    () =>
      players?.map((p) => {
        if (p.value !== p1) {
          return p
        }
        return Object.assign(p, { disabled: true })
      }),
    [p1, p2, players],
  )
  return (
    <Stack>
      <Flex gap="xs" align="end">
        <Select
          data={player1Choices}
          label="Player 1"
          disabled={isLoading || !players?.length}
          rightSection={isLoading ? <Loader size="xs" /> : undefined}
          searchable
          placeholder={players?.length ? 'Select player' : 'No players found'}
          value={p1}
          onChange={(value) => setP1(value)}
          clearable
        />
        <ActionIcon variant="outline" size="xs" color="green" onClick={open}>
          <IconPlus />
        </ActionIcon>
      </Flex>
      <Flex gap="xs" align="end">
        <Select
          data={player2Choices}
          label="Player 2"
          disabled={isLoading || !players?.length}
          rightSection={isLoading ? <Loader size="xs" /> : undefined}
          searchable
          placeholder={players?.length ? 'Select player' : 'No players found'}
          value={p2}
          onChange={(value) => setP2(value)}
          clearable
        />
        <ActionIcon variant="outline" size="xs" color="green" onClick={open}>
          <IconPlus />
        </ActionIcon>
      </Flex>
      <Modal opened={opened} onClose={close} title="Add player">
        <NewPlayer onSubmit={close} />
      </Modal>
    </Stack>
  )
}

export default SelectPlayers
