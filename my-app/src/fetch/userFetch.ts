import { USERS_URL } from "@/lib/apiAuthRoutes";

export async function fetchAllUsers() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const res = await fetch(USERS_URL, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return [];
}
