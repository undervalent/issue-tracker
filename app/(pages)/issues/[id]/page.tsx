import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation';
import { Grid, Box, Flex } from '@radix-ui/themes';
import EditButton from './edit-button';
import IssueDetails from './issue-details';
import DeleteIssueButton from './delete-issue-button';
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
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </ Grid>
  )
}

export default IssueDetail

