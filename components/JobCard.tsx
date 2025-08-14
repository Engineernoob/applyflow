'use client';

import { Job } from '../types/job';

export default function JobCard({ job, onFollowUp }: { job: Job; onFollowUp: () => void }) {
  return (
    <div className="p-4 rounded border bg-white dark:bg-zinc-800 shadow">
      <h3 className="text-lg font-bold">{job.title}</h3>
      <p className="text-sm">{job.company}</p>
      <a href={job.link} className="text-blue-500 text-sm" target="_blank">View job</a>
      <p className="text-sm mt-2">{job.notes}</p>
      <button
        className="mt-3 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
        onClick={onFollowUp}
      >
        Generate Follow-Up
      </button>
    </div>
  );
}
