"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CreateChat from "@/components/chatGroup/CreateChat";
import DashNav from "@/components/chatGroup/DashNav";
import GroupChatCard from "@/components/chatGroup/GroupChatCard";
import { fetchChatGroups } from "@/fetch/groupFetch";

type GroupChatType = {
  id: string;
  title: string;
  passcode: string;
  created_at: string;
  user_id: number;
};

export default function Dashboard() {
  const [groups, setGroups] = useState<GroupChatType[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      // No token found, redirect to login
      router.push('/login');
      return;
    }

    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser({ ...parsedUser, token });
      
      const getGroups = async () => {
        try {
          const data = await fetchChatGroups(token);
          setGroups(data || []);
        } catch (error) {
          console.error('Failed to fetch groups:', error);
          // If token is invalid, redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
        }
        setLoading(false);
      };
      getGroups();
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div>
      <DashNav
        name={user?.name}
        image={user?.image ?? undefined}
      />
      <div className="container">
        <div className="mt-6 text-end">
          <CreateChat user={user} />
        </div>

        {/* If Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.length > 0 &&
            groups.map((item: GroupChatType, index: number) => (
              <GroupChatCard group={item} key={index} user={user} />
            ))}
        </div>
      </div>
    </div>
  );
}