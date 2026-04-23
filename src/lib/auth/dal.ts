import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { readSession, type SessionData } from "./session";

export const verifySession = cache(async (): Promise<SessionData> => {
  const session = await readSession();
  if (!session) {
    redirect("/login");
  }
  return session;
});
