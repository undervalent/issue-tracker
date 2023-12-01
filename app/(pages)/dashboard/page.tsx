import LatestIssues from "./latest-issues"
import IssueSummary from "./issue-summary"
import IssueChart from "./issue-chart"
import prisma from "@/prisma/client"
import { Flex, Grid } from "@radix-ui/themes"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues'
}

async function useIssueCounts() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } })
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } })
  const inProgress = await prisma.issue.count({ where: { status: "IN_PROGRESS" } })

  return [{
    open,
    closed,
    inProgress
  }]
}

export default async function Dashboard() {
  const [{ open, closed, inProgress }] = await useIssueCounts();
  return <Grid columns={{ initial: '1', md: '2' }} gap="5">
    <Flex direction="column" gap="5">
      <IssueSummary open={open} closed={closed} inProgress={inProgress} />
      <IssueChart open={open} closed={closed} inProgress={inProgress} />
    </Flex>
    <LatestIssues />
  </Grid>
}
