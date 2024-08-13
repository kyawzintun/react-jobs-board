import { LoaderFunction } from 'react-router-dom';
import { Job, NewJob } from '@/src/types/index';

export const addJob = async (job: NewJob) => {
  await fetch('/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(job),
  });
};

export const updateJob = async (job: Job) => {
  await fetch(`/api/jobs/${job.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(job),
  });
};

export const deleteJob = async (id: string) => {
  await fetch(`/api/jobs/${id}`, {
    method: 'DELETE',
  });
};

export const jobLoader: LoaderFunction = async ({ params }) => {
  const res = await fetch(`/api/jobs/${params.id}`);
  const data = await res.json();
  return data;
};
