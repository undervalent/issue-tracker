import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { IssueStatusBadge } from '@/lib/components/issue-status-badge';
interface Props {
  params: {id: string}
}

export async function IssueDetail({ params }: Props) {

const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
});
  if (!issue) {
    notFound();
  }

  return (
    <div>
      <Heading>{ issue.title}</Heading>
      <Flex gap="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>{issue.description}</p>
      </Card>
    </div>
  )
}

export default IssueDetail
