'use client';

import { useState } from 'react';
import { Job } from '../../types/job';
import JobCard from '../../components/JobCard';
import { v4 as uuid } from 'uuid';

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [newJob, setNewJob] = useState<Omit<Job, 'id'>>({ 
    title: '', 
    company: '', 
    link: '', 
    notes: '', 
    stage: 'Applied' 
  });

  function addJob() {
    setJobs(prev => [...prev, { id: uuid(), ...newJob }]);
    setNewJob({ title: '', company: '', link: '', notes: '', stage: 'Applied' });
  }

  function handleFollowUp(job: Job) {
    alert(`(Simulated) Follow-up generated for ${job.title} at ${job.company}`);
  }

  const grouped = {
    Applied: jobs.filter(j => j.stage === 'Applied'),
    Interviewing: jobs.filter(j => j.stage === 'Interviewing'),
    Offer: jobs.filter(j => j.stage === 'Offer'),
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">ApplyFlow</h1>

      {/* New Job Form */}
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Job Title"
          value={newJob.title}
          onChange={e => setNewJob(prev => ({ ...prev, title: e.target.value }))}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Company"
          value={newJob.company}
          onChange={e => setNewJob(prev => ({ ...prev, company: e.target.value }))}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Job Link"
          value={newJob.link}
          onChange={e => setNewJob(prev => ({ ...prev, link: e.target.value }))}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Notes"
          value={newJob.notes}
          onChange={e => setNewJob(prev => ({ ...prev, notes: e.target.value }))}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={addJob}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Job
        </button>
      </div>

      {/* Job Stages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['Applied', 'Interviewing', 'Offer'] as const).map(stage => (
          <div key={stage}>
            <h2 className="text-xl font-semibold mb-2">{stage}</h2>
            <div className="space-y-4">
              {grouped[stage].map(job => (
                <JobCard key={job.id} job={job} onFollowUp={() => handleFollowUp(job)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
