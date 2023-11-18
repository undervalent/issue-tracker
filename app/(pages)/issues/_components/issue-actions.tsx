import { Flex } from '@radix-ui/themes';
import Link from 'next/link'
import React from 'react'
import IssueStatusFitler from './issue-status-filter';

export function IssueActions() {
  return (
    <Flex justify="between">
      <IssueStatusFitler />
      <Link href="/issues/new">New issue</Link>

    </Flex>
  )
}

export default IssueActions;
