import React from 'react'
import Link from 'next/link';
import { Pencil2Icon } from '@radix-ui/react-icons';

export default function EditButton({ issueId }: { issueId: number }) {
  return (
    <Link href={`/issues/edit/${issueId}`}> <Pencil2Icon /> Edit Issue</Link>
  )
}
