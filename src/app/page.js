"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) router.push("/practice");
      else router.push("/login");
    });
  }, [router]);

  return <div className="flex h-screen items-center justify-center text-xl">Loading ASCET Interview Hub...</div>;
}