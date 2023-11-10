import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

const IssueForm = dynamic(() => import('@/app/(pages)/issues/_components/issue-form'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />

})

export default function NewIssuePage() {
  return (
    <IssueForm />
  );
}
