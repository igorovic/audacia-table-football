'use client'
import { ActionIcon, Flex, NumberInput, Stack, Text } from '@mantine/core'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import { usePlayers } from '../app/utils/hooks'
import { useQueryState } from 'nuqs'
import {
  decrementGameGoals,
  incrementGameGoals,
  setGameGoals,
} from '../app/utils/mutations'
import { useMutation } from '@tanstack/react-query'

function GameTracker() {
  const { player1, player2 } = usePlayers()
  const [g1, setG1] = useQueryState('g1')
  const [g2, setG2] = useQueryState('g2')
  const [gameId] = useQueryState('gameId')
  const { mutate: incrementG } = useMutation({
    mutationFn: incrementGameGoals,
    onSuccess: (data) => {
      if (player1?.id === data.playerId) {
        setG1(data.goals.toString())
      } else if (player2?.id === data.playerId) {
        setG2(data.goals.toString())
      }
    },
  })
  const { mutate: decrementG } = useMutation({
    mutationFn: decrementGameGoals,
    onSuccess: (data) => {
      if (player1?.id === data.playerId) {
        setG1(data.goals.toString())
      } else if (player2?.id === data.playerId) {
        setG2(data.goals.toString())
      }
    },
  })
  const { mutate: setG } = useMutation({
    mutationFn: setGameGoals,
    onSuccess: (data) => {
      if (player1?.id === data.playerId) {
        setG1(data.goals.toString())
      } else if (player2?.id === data.playerId) {
        setG2(data.goals.toString())
      }
    },
  })
  return (
    <Stack>
      <Text style={{ textAlign: 'center', flexGrow: 1 }} fw={700}>
        {player1?.name} goals
      </Text>
      <Flex align="center" justify="center" gap="md">
        <ActionIcon
          onClick={() => {
            if (player1?.id && gameId) {
              decrementG({ gameId: Number(gameId), playerId: player1?.id ?? 0 })
            }
          }}
        >
          <IconMinus />
        </ActionIcon>
        <NumberInput
          min={0}
          max={100}
          value={parseInt(g1 ?? '0')}
          onChange={(value) =>
            setG({
              gameId: Number(gameId),
              //TODO: fix playerId should never be 0
              playerId: player1?.id ?? 0,
              goals: Number(value),
            })
          }
        />
        <ActionIcon
          onClick={() => {
            if (player1?.id && gameId) {
              incrementG({ gameId: Number(gameId), playerId: player1?.id ?? 0 })
            }
          }}
        >
          <IconPlus />
        </ActionIcon>
      </Flex>

      <Text style={{ textAlign: 'center', flexGrow: 1 }} fw={700}>
        {player2?.name} goals
      </Text>
      <Flex align="center" justify="center" gap="md">
        <ActionIcon
          onClick={() => {
            if (player2?.id && gameId) {
              decrementG({ gameId: Number(gameId), playerId: player2?.id ?? 0 })
            }
          }}
        >
          <IconMinus />
        </ActionIcon>
        <NumberInput
          min={0}
          max={100}
          value={parseInt(g2 ?? '0')}
          onChange={(value) =>
            setG({
              gameId: Number(gameId),
              //TODO: fix playerId should never be 0
              playerId: player2?.id ?? 0,
              goals: Number(value),
            })
          }
        />
        <ActionIcon
          onClick={() => {
            if (player2?.id && gameId) {
              incrementG({ gameId: Number(gameId), playerId: player2?.id ?? 0 })
            }
          }}
        >
          <IconPlus />
        </ActionIcon>
      </Flex>
    </Stack>
  )
}

export default GameTracker
