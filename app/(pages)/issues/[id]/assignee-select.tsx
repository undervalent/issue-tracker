"use client"
import { Skeleton } from '@/lib/components';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import axios from 'axios';


function useAssigneeData({ issue }: { issue: Issue }) {

  const { data: users, error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>('/api/users').then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3

  })

  return [
    {
      users, error, isLoading
    },
    {
      handleValueChange: (userId: string) => axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === 'unassigned' ? null : userId
      }),

    }
  ]
}

export default function AssigneeSelect({ issue }: { issue: Issue }) {

  const [{ isLoading, error, users }, { handleValueChange }] = useAssigneeData({ issue })


  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return null;
  }
  return (
    <Select.Root onValueChange={handleValueChange} defaultValue={issue.assignedToUserId || 'unassigned'}>
      <Select.Trigger placeholder='Assign to...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>
            Suggestions
          </Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
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
