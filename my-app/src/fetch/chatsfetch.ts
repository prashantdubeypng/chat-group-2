
import Env from "@/lib/env";

export async function fetchChats(groupId: string) {
  const baseUrl = Env.BACKEND_URL;
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const res = await fetch(`${baseUrl}/chat-group-get-message/${groupId}`, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return [];
}