import { ActionIcon, Menu as MantineMenu } from '@mantine/core'
import { IconMenu2, IconSoccerField, IconTrophy } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

function AppMenu() {
  const router = useRouter()
  return (
    <MantineMenu>
      <MantineMenu.Target>
        <ActionIcon variant="transparent" c={'green'}>
          <IconMenu2 />
        </ActionIcon>
      </MantineMenu.Target>
      <MantineMenu.Dropdown>
        <MantineMenu.Item
          leftSection={<IconTrophy />}
          onClick={() => router.push('/leaderboard')}
        >
          Leaderboard
        </MantineMenu.Item>
        <MantineMenu.Item
          leftSection={<IconSoccerField />}
          onClick={() => router.push('/store-match-results')}
        >
          Store match results
        </MantineMenu.Item>
      </MantineMenu.Dropdown>
    </MantineMenu>
  )
}

export default AppMenu
