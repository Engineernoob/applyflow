"use client";

import { useState } from "react";
import { Job } from "../../types/job";
import JobCard from "../../components/JobCard";
import { v4 as uuid } from "uuid";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [newJob, setNewJob] = useState<Omit<Job, "id">>({
    title: "",
    company: "",
    link: "",
    notes: "",
    stage: "Applied",
  });

  function addJob() {
    setJobs((prev) => [...prev, { id: uuid(), ...newJob }]);
    setNewJob({
      title: "",
      company: "",
      link: "",
      notes: "",
      stage: "Applied",
    });
  }

  function handleFollowUp(job: Job) {
    alert(`(Simulated) Follow-up generated for ${job.title} at ${job.company}`);
  }

  function handleDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    // Updating the job's stage
    setJobs((prev) =>
      prev.map((job) =>
        job.id === draggableId
          ? { ...job, stage: destination.droppableId as Job["stage"] }
          : job
      )
    );
  }

  const grouped = {
    Applied: jobs.filter((j) => j.stage === "Applied"),
    Interviewing: jobs.filter((j) => j.stage === "Interviewing"),
    Offer: jobs.filter((j) => j.stage === "Offer"),
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">ApplyFlow</h1>

      {/* New Job Form */}
      <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded shadow space-y-4">
        <h2 className="text-lg font-semibold">Add New Job</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Job Title"
            value={newJob.title}
            onChange={(e) =>
              setNewJob((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full p-2 border rounded bg-white dark:bg-zinc-800"
          />

          <input
            type="text"
            placeholder="Company"
            value={newJob.company}
            onChange={(e) =>
              setNewJob((prev) => ({ ...prev, company: e.target.value }))
            }
            className="w-full p-2 border rounded bg-white dark:bg-zinc-800"
          />

          <input
            type="text"
            placeholder="Job Link"
            value={newJob.link}
            onChange={(e) =>
              setNewJob((prev) => ({ ...prev, link: e.target.value }))
            }
            className="w-full p-2 border rounded bg-white dark:bg-zinc-800 col-span-full"
          />

          <textarea
            placeholder="Notes"
            value={newJob.notes}
            onChange={(e) =>
              setNewJob((prev) => ({ ...prev, notes: e.target.value }))
            }
            className="w-full p-2 border rounded bg-white dark:bg-zinc-800 col-span-full"
            rows={3}
          />
        </div>

        <button
          onClick={addJob}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Job
        </button>
      </div>

      {/* Job Stages */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(["Applied", "Interviewing", "Offer"] as const).map((stage) => (
            <Droppable droppableId={stage} key={stage}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-zinc-900 p-3 rounded border min-h-[300px]"
                >
                  <h2 className="text-xl font-semibold mb-2">{stage}</h2>

                  {grouped[stage].map((job, index) => (
                    <Draggable key={job.id} draggableId={job.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-4"
                        >
                          <JobCard
                            job={job}
                            onFollowUp={() => handleFollowUp(job)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
