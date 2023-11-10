
import React from 'react'
import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button color='red'> <TrashIcon /> Delete Issue</Button>
  )
}
