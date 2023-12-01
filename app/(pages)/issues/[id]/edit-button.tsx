import React from 'react'
import Link from 'next/link';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';

export default function EditButton({ issueId }: { issueId: number }) {
  return (
    <Button asChild>
      <Link href={`/issues/edit/${issueId}`}> <Pencil2Icon /> Edit Issue</Link>
    </Button>
  )
}
