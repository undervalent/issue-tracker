"use client"
import React from 'react'
import { Button, TextField } from '@radix-ui/themes';
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
  const router = useRouter()

  async function handleSubmission(data:any) {
    await axios.post('/api/issues', data);
    router.push('/issues');
}
  return (
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
        render={({field}) => <SimpleMde placeholder='descripton' {...field} />}
      />

      <Button>Submit new issue</Button>
    </form>
  );
}
