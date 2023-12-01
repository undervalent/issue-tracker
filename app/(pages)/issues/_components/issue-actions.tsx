import { Flex } from '@radix-ui/themes';
import Link from 'next/link'
import React from 'react'
import IssueStatusFitler from './issue-status-filter';
import { Button } from '@radix-ui/themes';
export function IssueActions() {
  return (
    <Flex justify="between">
      <IssueStatusFitler />
      <Button asChild>
        <Link href="/issues/new">New issue</Link>
      </Button>
    </Flex>
  )
}

export default IssueActions;
