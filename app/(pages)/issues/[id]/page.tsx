import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation';
import { Grid, Box } from '@radix-ui/themes';
import EditButton from './edit-button';
import IssueDetails from './issue-details';
interface Props {
  params: { id: string }
}

export async function IssueDetail({ params }: Props) {

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  });
  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditButton issueId={issue.id} />
      </Box>
    </ Grid>
  )
}

export default IssueDetail
