"use client"
import React from 'react'
import { TrashIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/lib/components';

function useDeleteData(issueId: number) {
  const router = useRouter();
  const [error, setError] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  return [
    {
      error,
      isDeleting
    },
    {
      deleteIssue: async () => {
        try {
          setIsDeleting(true)
          await axios.delete(`/api/issues/${issueId}`);
          router.push('/issues');
          router.refresh();
        } catch (error) {
          setError(true)
          setIsDeleting(false)
        }
      },
      closeErrorDialog: () => {
        setError(false)
      }
    }
  ]

}

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
  const [{ error, isDeleting }, { deleteIssue, closeErrorDialog }] = useDeleteData(issueId);

  if (!issueId) return null;

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red' disabled={isDeleting}> <TrashIcon />
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
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

              <Button color='red' variant='soft' onClick={deleteIssue}>Delete Issue</Button>
            </AlertDialog.Action>
          </Flex>

        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>This issue could not be deleted</AlertDialog.Description>
          <Button color='gray' variant='soft' mt="2" onClick={closeErrorDialog}>OK</Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}
