import React, { useEffect, useState } from "react";
import { Redirect, Slot } from "expo-router";
import { getCurrentUser } from "@/lib/appwrite";

export default function Layout() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  if (!user) return <Redirect href="/sign-in" />;

  return <Slot />;
}
