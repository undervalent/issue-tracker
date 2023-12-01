"use client"
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const statuses: { label: string, value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Closed', value: 'CLOSED' },
  { label: 'In Progress', value: 'IN_PROGRESS' }
]

function useStatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return [
    {
      defaultValue: searchParams.get('status') || "ALL",
    },
    {
      handleStatusChange: (status: string) => {
        const params = new URLSearchParams();
        const updatedStatus = status === 'ALL' ? '' : status;
        if (status) params.append('status', updatedStatus);
        if (searchParams.get('orderBy')) {
          params.append('orderBy', searchParams.get('orderBy')!)
        }
        const query = params.size ? `?${params.toString()}` : '';
        router.push(`/issues/${query}`)
      }
    }
  ]
}


export default function IssueStatusFitler() {
  const [{ defaultValue }, { handleStatusChange }] = useStatusFilter();

  return (
    <Select.Root
      defaultValue={defaultValue}
      onValueChange={handleStatusChange}>
      <Select.Trigger placeholder='Filter by status' />
      <Select.Content>
        {statuses.map(status => <Select.Item key={status.label} value={status.value || 'ALL'}>{status.label}</Select.Item>)}
      </Select.Content>
    </Select.Root>
  )
}
