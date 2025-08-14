export type JobStage = "Applied" | "Interviewing" | "Offer";

export interface Job {
  id: string;
  title: string;
  company: string;
  link: string;
  notes: string;
  stage: JobStage;
}
