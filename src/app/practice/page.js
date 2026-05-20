"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Editor from "@monaco-editor/react";

export default function Practice() {
  const [code, setCode] = useState("// Start coding here");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setCode(docSnap.data().code);
      } else {
        router.push("/login");
      }
    });
  }, [router]);

  const saveCode = async () => {
    if (user) {
      await setDoc(doc(db, "users", user.uid), { code });
      alert("Code saved!");
    }
  };

  const handleLogout = () => signOut(auth);

  if (!user) return <div className="flex h-screen items-center justify-center bg-gray-900 text-white">Loading...</div>;

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <div className="flex justify-between items-center p-4 bg-gray-800">
        <h1 className="text-white text-xl">ASCET Interview Hub</h1>
        <div>
          <button onClick={saveCode} className="bg-green-600 px-4 py-2 rounded text-white mr-2">Save</button>
          <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded text-white">Logout</button>
        </div>
      </div>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
}