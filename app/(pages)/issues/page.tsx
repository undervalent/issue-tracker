import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import { IssueStatusBadge } from "@/lib/components/issue-status-badge";

export default async function Issues() {
  const issues = await prisma.issue.findMany();

  return <section>
    <header className="mb-5">
    <Link href="/issues/new">New issue</Link>
</header>
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Issue

          </Table.ColumnHeaderCell>

          <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map(issue => <Table.Row key={issue.id}>
          <Table.Cell>
            {issue.title}
            <div className="block md:hidden"><IssueStatusBadge status={issue.status} /></div>
          </Table.Cell>
          <Table.Cell className="hidden md:table-cell"> <IssueStatusBadge status={issue.status} /></Table.Cell>
          <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
        </Table.Row>)}
      </Table.Body>
    </Table.Root>
  </section>
}
