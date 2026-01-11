"use client";

import { useEffect, useState } from "react";
import { http } from "@/lib/http";

type Me = {
  id: number;
  email: string;
  username: string;
  avatar: string | null;
  social_avatar: string | null;
};

export function useMe() {
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    http
      .get("/api/me/")
      .then((r) => setMe(r.data))
      .catch(() => setMe(null));
  }, []);

  return me;
}
