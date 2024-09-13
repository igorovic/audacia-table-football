'use client'
import { Flex, NumberInput, Stack } from '@mantine/core'
import { useQueryState } from 'nuqs'

function MatchGoalsInput() {
  const [p1] = useQueryState('p1')
  const [p2] = useQueryState('p2')
  const [g1, setG1] = useQueryState('g1')
  const [g2, setG2] = useQueryState('g2')
  return (
    <Stack>
      <Flex gap="xs" align="end">
        <NumberInput
          label="Player 1 goals"
          min={0}
          disabled={!p1}
          value={parseInt(g1 ?? '0')}
          onChange={(value) => setG1(value.toString())}
        />
      </Flex>
      <Flex gap="xs" align="end">
        <NumberInput
          label="Player 2 goals"
          min={0}
          disabled={!p2}
          value={parseInt(g2 ?? '0')}
          onChange={(value) => setG2(value.toString())}
        />
      </Flex>
    </Stack>
  )
}

export default MatchGoalsInput
