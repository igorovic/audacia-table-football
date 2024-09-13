import { ActionIcon, Flex, NumberInput, Stack, Text } from '@mantine/core'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import { usePlayers } from '../app/utils/hooks'
import { useQueryState } from 'nuqs'

function GameTracker() {
  const { player1, player2 } = usePlayers()
  const [g1, setG1] = useQueryState('g1')
  const [g2, setG2] = useQueryState('g2')
  return (
    <Stack>
      <Text style={{ textAlign: 'center', flexGrow: 1 }} fw={700}>
        {player1?.name}
      </Text>
      <Flex align="center" justify="center" gap="md">
        <ActionIcon
          onClick={() =>
            setG1(g1 ? Math.max(parseInt(g1) - 1, 0).toString() : '0')
          }
        >
          <IconMinus />
        </ActionIcon>
        <NumberInput
          min={0}
          max={100}
          value={parseInt(g1 ?? '0')}
          onChange={(value) => setG1(value.toString())}
        />
        <ActionIcon
          onClick={() =>
            setG1(g1 ? Math.min(parseInt(g1) + 1, 100).toString() : '1')
          }
        >
          <IconPlus />
        </ActionIcon>
      </Flex>

      <Text style={{ textAlign: 'center', flexGrow: 1 }} fw={700}>
        {player2?.name}
      </Text>
      <Flex align="center" justify="center" gap="md">
        <ActionIcon
          onClick={() =>
            setG2(g2 ? Math.max(parseInt(g2) - 1, 0).toString() : '0')
          }
        >
          <IconMinus />
        </ActionIcon>
        <NumberInput
          min={0}
          max={100}
          value={parseInt(g2 ?? '0')}
          onChange={(value) => setG2(value.toString())}
        />
        <ActionIcon
          onClick={() =>
            setG2(g2 ? Math.min(parseInt(g2) + 1, 100).toString() : '1')
          }
        >
          <IconPlus />
        </ActionIcon>
      </Flex>
    </Stack>
  )
}

export default GameTracker
