import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth/session";
import {
  hasAnalyticsConfig,
  hasSearchConsoleConfig,
} from "@/lib/analytics/google";
import {
  fetchGa4Snapshot,
  fetchSearchConsole,
  type AnalyticsSnapshot,
} from "@/lib/analytics/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const errors: string[] = [];
  const ga4Connected = hasAnalyticsConfig();
  const gscConnected = hasSearchConsoleConfig();

  let ga: Awaited<ReturnType<typeof fetchGa4Snapshot>> | null = null;
  let gsc: Awaited<ReturnType<typeof fetchSearchConsole>> | null = null;

  if (ga4Connected) {
    try {
      ga = await fetchGa4Snapshot();
    } catch (e: any) {
      errors.push(`GA4: ${e?.message ?? "failed to fetch"}`);
    }
  } else {
    errors.push("GA4 not configured (set GA4_PROPERTY_ID + service account)");
  }

  if (gscConnected) {
    try {
      gsc = await fetchSearchConsole();
    } catch (e: any) {
      errors.push(`Search Console: ${e?.message ?? "failed to fetch"}`);
    }
  } else {
    errors.push(
      "Search Console not configured (set SEARCH_CONSOLE_SITE_URL + service account)",
    );
  }

  const snapshot: AnalyticsSnapshot = {
    users30d: ga?.users30d ?? 0,
    users7d: ga?.users7d ?? 0,
    usersToday: ga?.usersToday ?? 0,
    newUsers30d: ga?.newUsers30d ?? 0,
    sessions30d: ga?.sessions30d ?? 0,
    pageViews30d: ga?.pageViews30d ?? 0,
    activeUsersTotal: ga?.activeUsersTotal ?? 0,
    dailyActiveUsers: ga?.dailyActiveUsers ?? [],
    topPages: ga?.topPages ?? [],
    topCountries: ga?.topCountries ?? [],
    searchKeywords: gsc?.searchKeywords ?? [],
    searchPages: gsc?.searchPages ?? [],
    errors,
  };

  return NextResponse.json({
    ga4Connected: ga4Connected && !errors.some((e) => e.startsWith("GA4:")),
    gscConnected:
      gscConnected && !errors.some((e) => e.startsWith("Search Console:")),
    snapshot,
  });
}
