const LOOPS_UPDATE_CONTACT_URL = "https://app.loops.so/api/v1/contacts/update";

type LoopsResponse = {
  success: boolean;
  id?: string;
  message?: string;
};

export async function addToWaitlist(email: string): Promise<LoopsResponse> {
  const apiKey = process.env.LOOPS_API_KEY;
  const mailingListId = process.env.LOOPS_WAITLIST_MAILING_LIST_ID;

  if (!apiKey || !mailingListId) {
    throw new Error("Missing Loops environment variables");
  }

  const response = await fetch(LOOPS_UPDATE_CONTACT_URL, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      source: "redux-website-waitlist",
      userGroup: "Waitlist",
      mailingLists: {
        [mailingListId]: true,
      },
    }),
  });

  return (await response.json()) as LoopsResponse;
}
