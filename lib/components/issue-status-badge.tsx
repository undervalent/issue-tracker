import { Status } from '@prisma/client'
import React from 'react'
import { Badge } from '@radix-ui/themes'

interface Props {
  status: Status
}

const statusMap: Record<Status, { label: string, color: 'red'|'violet'|'green' }> = {
  OPEN: {
    label: 'Open',
    color: 'red'
  },
  CLOSED: {
    label: 'Closed',
    color: 'green'
  },
  IN_PROGRESS: {
    label: 'In progress',
    color:'violet'
  }

}

export function IssueStatusBadge({ status }: Props) {

  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  )
}
