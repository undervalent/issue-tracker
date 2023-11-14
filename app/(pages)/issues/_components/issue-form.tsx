
"use client"
import { ErrorMessage, Spinner } from '@/lib/components';
import { issueSchema } from "@/lib/validation-schemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMde from 'react-simplemde-editor';
import z from 'zod';

import { Issue } from '@prisma/client';
import 'easymde/dist/easymde.min.css';

type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue
}

interface State {
  error: string;
  isSubmitting: boolean;
}
interface Handlers {
  handleSubmission(data: IssueFormData): void;
}

function useFormData(issue?: Issue): [State, Handlers] {

  const router = useRouter();
  const [error, setError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);


  const handlers = {
    handleSubmission: async (data: IssueFormData) => {
      setIsSubmitting(true);
      if (issue) {
        try {
          await axios.patch(`/api/issues/${issue.id}`, data)
          setIsSubmitting(false);
          router.push('/issues');
          router.refresh();
        }
        catch (error) {
          setError('An unexpected error occured');
          setIsSubmitting(false);
        }
      }
      else {
        try {
          await axios.post('/api/issues', data);
          router.push('/issues');
          router.refresh();
        } catch (error) {
          setError('An unexpected error occured');
          setIsSubmitting(false);
        }
      }

    }
  }

  const state = {
    error,
    isSubmitting
  }

  return [
    state,
    handlers
  ]
}


export default function IssueForm({ issue }: Props) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  });
  const [{ error, isSubmitting }, { handleSubmission }] = useFormData(issue)

  return (
    <section className="max-w-xl space-y-3">
      {error && <Callout.Root color="red" className="mb-5">
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(handleSubmission)}
      >
        <TextField.Root>
          <TextField.Input defaultValue={issue?.title} placeholder='title' {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => <SimpleMde placeholder='descripton' {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>Submit issue {isSubmitting && <Spinner />}</Button>
      </form>
    </section>
  );
}
