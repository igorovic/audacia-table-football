'use client'
import { Button, Stack, TextInput, Text } from '@mantine/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPlayer } from '../app/utils/mutations'

function NewPlayer(props: { onSubmit?: (name: string) => void }) {
  const [name, setName] = useState('')
  const qc = useQueryClient()
  const { mutate, error } = useMutation({
    mutationFn: async (name: string) => {
      if (name.length < 1) {
        return Promise.resolve()
      }
      console.log('Creating player', name)
      return createPlayer(name)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['players'] })
      props.onSubmit?.(name)
    },
  })
  return (
    <Stack gap="xs">
      <TextInput
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        placeholder="Player name"
      />

      <Button color="green" variant="outline" onClick={() => mutate(name)}>
        Create player
      </Button>
      {error && (
        <Text c="red" size="xs">
          {error.message}
        </Text>
      )}
    </Stack>
  )
}

export default NewPlayer
