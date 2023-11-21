import prisma from "@/prisma/client";
import { IssueActions } from './_components/issue-actions';
import { Status } from "@prisma/client";
import Pagination from "@/lib/components/pagination";
import { IssueTable, IssueQuery, columnNames } from "./_components/issue-table";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";


interface Props {
  searchParams: IssueQuery;
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues'
}
async function useIssues(searchParams: IssueQuery) {

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const orderBy = columnNames.includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const where = { status };

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({ where });

  return [{ issues, issueCount, page, pageSize }]
}

export default async function Issues({ searchParams }: Props) {
  const [{ issues, issueCount, page, pageSize }] = await useIssues(searchParams)

  return <Flex direction="column" gap="3">
    <IssueActions />
    <IssueTable searchParams={searchParams} issues={issues} />
    <Pagination itemCount={issueCount} currentPage={page} pageSize={pageSize} />
  </Flex>
}

export const dynamic = 'force-dynamic';
