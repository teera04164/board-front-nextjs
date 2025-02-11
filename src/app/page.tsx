"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTE_PATH } from "@/constants/route";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(ROUTE_PATH.BORD);
  }, [router]);

  return null;
}
