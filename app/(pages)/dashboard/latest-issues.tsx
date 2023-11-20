import React from 'react'
import prisma from '@/prisma/client'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import Link from 'next/link'
import { IssueStatusBadge } from '@/lib/components'


export default async function LatestIssues() {

  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      assignedToUser: true
    }
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map(issue => <Table.Row key={issue.id}>
            <Table.Cell>
              <Flex justify="between">
                <Flex direction="column" align="start" gap="2">
                  <Link href={`/issues/${issue.id}`}>
                    {issue.title}
                  </Link>
                  <IssueStatusBadge status={issue.status} />
                </Flex>
                {issue.assignedToUser && (<Avatar
                  size="2"
                  radius="full"
                  src={issue.assignedToUser.image!} alt={issue.assignedToUser.name || ''} fallback="?" />)}
              </Flex>
            </Table.Cell>
          </Table.Row>)}
        </Table.Body>
      </Table.Root>
    </Card>
  )
}
