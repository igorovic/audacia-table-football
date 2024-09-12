import { ActionIcon, Menu as MantineMenu } from '@mantine/core'
import { IconMenu2, IconSoccerField, IconTrophy } from '@tabler/icons-react'

function AppMenu() {
  return (
    <MantineMenu>
      <MantineMenu.Target>
        <ActionIcon variant="transparent" c={'green'}>
          <IconMenu2 />
        </ActionIcon>
      </MantineMenu.Target>
      <MantineMenu.Dropdown>
        <MantineMenu.Item leftSection={<IconTrophy />}>
          Leaderboard
        </MantineMenu.Item>
        <MantineMenu.Item leftSection={<IconSoccerField />}>
          Store match results
        </MantineMenu.Item>
      </MantineMenu.Dropdown>
    </MantineMenu>
  )
}

export default AppMenu
