import LatestIssues from "./latest-issues"
import IssueSummary from "./issue-summary"
import prisma from "@/prisma/client"

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
  return <section>
    <LatestIssues />
    <IssueSummary open={open} closed={closed} inProgress={inProgress} />
  </section>
}
