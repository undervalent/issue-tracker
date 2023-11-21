import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation';
import { Grid, Box, Flex } from '@radix-ui/themes';
import EditButton from './edit-button';
import IssueDetails from './issue-details';
import DeleteIssueButton from './delete-issue-button';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/auth-options';
import AssigneeSelect from './assignee-select';
import { Metadata } from 'next';

interface Props {
  params: { id: string }
}

async function useIssueDetail(
  { params }: Props
) {

  const session = await getServerSession(authOptions);

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  });

  return [
    { issue, session }
  ]
}

export async function generateMetadata(props: Props) {
  const [{ issue }] = await useIssueDetail(props)

  return {
    title: issue?.title,
    description: `Details of issue ${issue?.id}`
  }
}



export async function IssueDetail(props: Props) {
  const [{ issue, session }] = await useIssueDetail(props)
  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session &&
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>}
    </ Grid>
  )
}

export default IssueDetail

