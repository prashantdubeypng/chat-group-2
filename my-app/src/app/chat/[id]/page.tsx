"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChatBase from "@/components/chat/ChatBase";
import { fetchChats } from "@/fetch/chatsfetch";
import { fetchChatGroup, fetchChatGroupUsers } from "@/fetch/groupFetch";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [chatGroup, setChatGroup] = useState<GroupChatType | null>(null);
  const [chatGroupUsers, setChatGroupUsers] = useState<Array<GroupChatUserType>>([]);
  const [chats, setChats] = useState<Array<MessageType>>([]);

  useEffect(() => {
    async function fetchData() {
      if (!params?.id) return;

      // Check authentication first
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      console.log('Token:', token ? 'exists' : 'missing');
      console.log('User data:', userData ? 'exists' : 'missing');
      
      if (!token || !userData) {
        // No token found, redirect to login
        console.log('No authentication found, redirecting to login');
        router.push('/login');
        return;
      }
      
      try {
        console.log('Fetching chat group data...');
        const group = await fetchChatGroup(params.id as string);
        setChatGroup(group);
        
        if (group) {
          const users = await fetchChatGroupUsers(params.id as string);
          setChatGroupUsers(users);
          const messages = await fetchChats(params.id as string);
          setChats(messages);
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
        // If token is invalid, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
      }
      
      setLoading(false);
    }
    
    fetchData();
  }, [params, router]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!chatGroup) return <div className="p-4">Chat group not found.</div>;

  return (
    <div>
      <ChatBase group={chatGroup} users={chatGroupUsers} oldMessages={chats} />
    </div>
  );
}