import { Flex } from '@mantine/core'
import SelectPlayers from './select-player'
import MatchGoalsInput from './match-goals-input'

function MatchResultInput() {
  return (
    <Flex gap="md" wrap="wrap">
      <SelectPlayers />
      <MatchGoalsInput />
    </Flex>
  )
}

export default MatchResultInput
