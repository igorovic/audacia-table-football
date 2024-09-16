'use client'
import {
  ActionIcon,
  Flex,
  Loader,
  NumberInput,
  Stack,
  Text,
} from '@mantine/core'
import { IconCheck, IconMinus, IconPlus } from '@tabler/icons-react'
import { usePlayers } from '../app/utils/hooks'
import { useQueryState } from 'nuqs'
import {
  decrementGameGoals,
  incrementGameGoals,
  setGameGoals,
} from '../app/utils/mutations'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

function SavedFeedback() {
  const [style, setStyle] = useState({
    opacity: 1,
    transition: 'opacity 2s linear',
  })
  useEffect(() => {
    setTimeout(() => {
      setStyle({ opacity: 0, transition: 'opacity 2s linear' })
    }, 500)
  })
  return (
    <Flex style={style}>
      <IconCheck style={{ width: 20, height: 20, color: 'green' }} />
      <Text size="sm" c="green">
        saved
      </Text>
    </Flex>
  )
}

function GameTracker() {
  const { player1, player2 } = usePlayers()
  const [g1, setG1] = useQueryState('g1')
  const [g2, setG2] = useQueryState('g2')
  const [gameId] = useQueryState('gameId')
  const { mutate: incrementG, isPending: isIncrementing } = useMutation({
    mutationFn: incrementGameGoals,
    onSuccess: (data) => {
      if (player1?.id === data.playerId) {
        setG1(data.goals.toString())
      } else if (player2?.id === data.playerId) {
        setG2(data.goals.toString())
      }
    },
  })
  const { mutate: decrementG, isPending: isDecrementing } = useMutation({
    mutationFn: decrementGameGoals,
    onSuccess: (data) => {
      if (player1?.id === data.playerId) {
        setG1(data.goals.toString())
      } else if (player2?.id === data.playerId) {
        setG2(data.goals.toString())
      }
    },
  })
  const { mutate: setG, isPending: isSetting } = useMutation({
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
      <Flex align="center" justify="center" gap="md" py="md">
        <Text size="sm">
          {player1?.name} &nbsp;&nbsp; {g1} - {g2} &nbsp;&nbsp; {player2?.name}
        </Text>
        <Flex align="center" justify="center">
          {isSetting || isIncrementing || isDecrementing ? (
            <Loader size="xs" color="green" w={20} h={20} />
          ) : (
            <SavedFeedback />
          )}
        </Flex>
      </Flex>
    </Stack>
  )
}

export default GameTracker
