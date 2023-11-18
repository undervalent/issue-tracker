import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import { IssueStatusBadge, Link } from "@/lib/components";
import { IssueActions } from './_components/issue-actions';
import { Issue, Status } from "@prisma/client";
import NextLink from 'next/link'
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import Pagination from "@/lib/components/pagination";
interface SearchParams {
  status: Status
  orderBy: keyof Issue
  page: string
}
interface Props {

  searchParams: {
    status: Status
    orderBy: keyof Issue
    page: string
  }
}

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
    {
      label: 'Issue',
      value: 'title'
    },
    {
      label: 'Status',
      value: 'status',
      className: "hidden md:table-cell"
    },
    {
      label: 'Created',
      value: 'createdAt',
      className: "hidden md:table-cell"
    },
  ]
async function useIssues(searchParams: SearchParams) {

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const orderBy = columns.map(column => column.value).includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined
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

  return <section>
    <IssueActions />
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {
            columns.map(column => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}>
                <NextLink href={{
                  query: { ...searchParams, orderBy: column.value }
                }}>
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && <ArrowUpIcon className="inline" />}
              </Table.ColumnHeaderCell>
            ))
          }

        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map(issue => <Table.Row key={issue.id}>
          <Table.Cell>
            <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

            <div className="block md:hidden"><IssueStatusBadge status={issue.status} /></div>
          </Table.Cell>
          <Table.Cell className="hidden md:table-cell"> <IssueStatusBadge status={issue.status} /></Table.Cell>
          <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
        </Table.Row>)}
      </Table.Body>
    </Table.Root>
    <Pagination itemCount={issueCount} currentPage={page} pageSize={pageSize} />
  </section >
}

export const dynamic = 'force-dynamic';
