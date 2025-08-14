export async function generateFollowUp(
  title: string,
  company: string
): Promise<string> {
  const prompt = `
  You're a professional job-seeker writing a concise follow-up email.
  
  Job Title: ${title}
  Company: ${company}
  
  Write a warm and clear email to follow up on an application for this job.
  Keep it under 100 words.
  `;

  const userApiKey = localStorage.getItem("openai_api_key");

  const response = await fetch("/api/followup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, userApiKey }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data.text;
}
