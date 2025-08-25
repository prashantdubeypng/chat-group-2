import { CHAT_GROUP, CHAT_GROUP_SINGLE, CHAT_GROUP_USERS } from "@/lib/apiAuthRoutes";

export async function fetchChatGroups(token: string) {
  const res = await fetch(CHAT_GROUP, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 60 * 60,
      tags: ["dashboard"],
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return [];
}

export async function fetchChatGroup(id: string) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  console.log('fetchChatGroup called with token:', token ? 'exists' : 'missing');
  const res = await fetch(`${CHAT_GROUP_SINGLE}/${id}`, {
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
  return null;
}

export async function fetchChatGroupUsers(id: string) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const res = await fetch(`${CHAT_GROUP_USERS}?group_id=${id}`, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    cache: "no-cache",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return [];
}