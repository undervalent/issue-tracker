"use client"
import React from 'react'
import { TrashIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
  const router = useRouter();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'> <TrashIcon /> Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue?
          This action cannot be undone.
        </AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button color='gray' variant='soft'>Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>

            <Button color='red' variant='soft' onClick={async () => {
              axios.delete(`/api/issues/${issueId}`);
              router.push('/issues');
              router.refresh();
            }}>Delete Issue</Button>
          </AlertDialog.Action>
        </Flex>

      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
