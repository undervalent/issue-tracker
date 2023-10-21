"use client"
import React from 'react'
import { Button, TextArea, TextField } from '@radix-ui/themes';

export default function NewIssue() {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder='title'></TextField.Input>
      </TextField.Root>
      <TextArea placeholder='descripton' />
      <Button>Submit new issue</Button>
    </div>
  )
}
