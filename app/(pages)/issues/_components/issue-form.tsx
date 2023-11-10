
"use client"
import React from 'react'
import { Button, TextField, Callout } from '@radix-ui/themes';
import SimpleMde from 'react-simplemde-editor';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from "@/lib/validation-schemas";
import z from 'zod'
import { ErrorMessage, Spinner } from '@/lib/components';

import 'easymde/dist/easymde.min.css';
import { Issue } from '@prisma/client';

type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue
}

export default function IssueForm({ issue }: Props) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  });
  const router = useRouter();
  const [error, setError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleSubmission(data: IssueFormData) {
    setIsSubmitting(true);
    if (issue) {
      try {
        await axios.patch(`/api/issues/${issue.id}`, data)
        setIsSubmitting(false);
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
        setIsSubmitting(false);
      } catch (error) {
        setError('An unexpected error occured');
        setIsSubmitting(false);
      }
    }

  }
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
