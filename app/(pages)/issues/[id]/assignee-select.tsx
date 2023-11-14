"use client"
import { Select } from '@radix-ui/themes'
import React from 'react'

export default function AssigneeSelect() {
  return (
    <Select.Root>
      <Select.Trigger placeholder='Assign to...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>
            Suggestions
          </Select.Label>
          <Select.Item value="1">
            Jon Ochoa
          </Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}
