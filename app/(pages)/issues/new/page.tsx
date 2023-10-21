"use client"
import React from 'react'
import { Button, TextField, Callout } from '@radix-ui/themes';
import SimpleMde from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}

export default function NewIssue() {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  const [error, setError] = React.useState('')

  async function handleSubmission(data: IssueForm) {
    try {
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setError('An unexpected error occured');
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
          <TextField.Input placeholder='title' {...register('title')} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <SimpleMde placeholder='descripton' {...field} />}
        />

        <Button>Submit new issue</Button>
      </form>
    </section>
  );
}
