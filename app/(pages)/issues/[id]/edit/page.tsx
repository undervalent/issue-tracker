import React from 'react'
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from '@/app/(pages)/issues/_components/issue-form-skeleton';


const IssueForm = dynamic(
  () => import('@/app/(pages)/issues/_components/issue-form'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
)


interface Props {
  params: { id: string }
}


export default async function EditIssuesPage({ params }: Props) {
  const { id } = params;
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  if (!issue) { notFound() };

  return (
    <IssueForm issue={issue} />
  )
}
