"use client"
import React from 'react'
import { IssueStatuses } from './types'
import { Card } from '@radix-ui/themes'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

export default function IssueChart({ open, closed, inProgress }: IssueStatuses) {
  const data = [
    { label: 'Open', value: open },
    { label: 'In Progress', value: inProgress },
    { label: 'Closed', value: closed },
  ]
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" barSize={60} style={{ fill: 'var(--accent-9)' }} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
