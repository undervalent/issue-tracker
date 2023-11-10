import React from 'react'
import Link from 'next/link';
import { Pencil2Icon } from '@radix-ui/react-icons';

export default function EditButton({ issueId }: { issueId: number }) {
  return (
    <Link href={`/issues/${issueId}/edit`}> <Pencil2Icon /> Edit Issue</Link>
  )
}
