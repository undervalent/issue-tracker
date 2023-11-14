"use client"
import React from 'react'
import { Select } from '@radix-ui/themes'
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/lib/components';

import axios from 'axios';

export default function AssigneeSelect() {

  const { data: users, error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>('/api/users').then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3

  })

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return null;
  }
  return (
    <Select.Root>
      <Select.Trigger placeholder='Assign to...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>
            Suggestions
          </Select.Label>
          {users?.map((user) => {
            return (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            )
          })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}
