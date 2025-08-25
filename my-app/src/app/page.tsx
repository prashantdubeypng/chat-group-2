"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/base/Navbar";
import HeroSection from "@/components/base/HeroSection";
import FeatureSection from "@/components/base/FeatureSection";
import UserReviews from "@/components/base/UserReviews";
import Footer from "@/components/base/Footer";

export default function LandingPage() {
  const router = useRouter();
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Show redirect message after 3 seconds
      const timer = setTimeout(() => {
        setShowRedirectMessage(true);
        // Redirect after another 2 seconds
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Show redirect message for logged-in users */}
      {showRedirectMessage && (
        <div className="bg-blue-500 text-white text-center p-2">
          You are already logged in. Redirecting to dashboard...
        </div>
      )}
      
      {/* Header */}
      <Navbar />
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* User Reviews Section */}
      <UserReviews />

      {/* Footer */}
      <Footer />
    </div>
  );
}