import "server-only";
import {
  getAnalyticsDataClient,
  getGa4PropertyPath,
  getSearchConsoleClient,
  getSearchConsoleSiteUrl,
} from "./google";

export interface DailyPoint {
  date: string;
  value: number;
}

export interface TopItem {
  label: string;
  value: number;
  extra?: string;
}

export interface SearchRow {
  key: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface AnalyticsSnapshot {
  users30d: number;
  users7d: number;
  usersToday: number;
  newUsers30d: number;
  sessions30d: number;
  pageViews30d: number;
  activeUsersTotal: number;
  dailyActiveUsers: DailyPoint[];
  topPages: TopItem[];
  topCountries: TopItem[];
  searchKeywords: SearchRow[];
  searchPages: SearchRow[];
  errors: string[];
}

function today(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

async function runReport(
  startDate: string,
  endDate: string,
  metrics: string[],
  dimensions: string[] = [],
  limit = 25,
  orderByMetric?: string,
) {
  const client = getAnalyticsDataClient();
  const property = getGa4PropertyPath();
  const res = await client.properties.runReport({
    property,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      metrics: metrics.map((name) => ({ name })),
      dimensions: dimensions.map((name) => ({ name })),
      limit: String(limit),
      orderBys: orderByMetric
        ? [{ metric: { metricName: orderByMetric }, desc: true }]
        : undefined,
    },
  });
  return res.data;
}

function firstMetricValue(data: any): number {
  const v = data?.rows?.[0]?.metricValues?.[0]?.value;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export async function fetchGa4Snapshot(): Promise<
  Pick<
    AnalyticsSnapshot,
    | "users30d"
    | "users7d"
    | "usersToday"
    | "newUsers30d"
    | "sessions30d"
    | "pageViews30d"
    | "activeUsersTotal"
    | "dailyActiveUsers"
    | "topPages"
    | "topCountries"
  >
> {
  const end = today();
  const start30 = daysAgo(30);
  const start7 = daysAgo(7);

  const [
    d30,
    d7,
    dToday,
    dNew,
    dSessions,
    dPageviews,
    dActiveTotal,
    dDaily,
    dPages,
    dCountries,
  ] = await Promise.all([
    runReport(start30, end, ["activeUsers"]),
    runReport(start7, end, ["activeUsers"]),
    runReport("today", "today", ["activeUsers"]),
    runReport(start30, end, ["newUsers"]),
    runReport(start30, end, ["sessions"]),
    runReport(start30, end, ["screenPageViews"]),
    runReport("2020-01-01", end, ["activeUsers"]),
    runReport(start30, end, ["activeUsers"], ["date"], 100),
    runReport(
      start30,
      end,
      ["screenPageViews"],
      ["pageTitle", "pagePath"],
      25,
      "screenPageViews",
    ),
    runReport(
      start30,
      end,
      ["activeUsers"],
      ["country"],
      25,
      "activeUsers",
    ),
  ]);

  const dailyRows = (dDaily.rows ?? []).map((r: any) => ({
    date: String(r.dimensionValues?.[0]?.value ?? ""),
    value: Number(r.metricValues?.[0]?.value ?? 0),
  }));
  dailyRows.sort((a, b) => a.date.localeCompare(b.date));

  const topPages: TopItem[] = (dPages.rows ?? []).map((r: any) => ({
    label: String(r.dimensionValues?.[0]?.value ?? "—"),
    extra: String(r.dimensionValues?.[1]?.value ?? ""),
    value: Number(r.metricValues?.[0]?.value ?? 0),
  }));

  const topCountries: TopItem[] = (dCountries.rows ?? []).map((r: any) => ({
    label: String(r.dimensionValues?.[0]?.value ?? "—"),
    value: Number(r.metricValues?.[0]?.value ?? 0),
  }));

  return {
    users30d: firstMetricValue(d30),
    users7d: firstMetricValue(d7),
    usersToday: firstMetricValue(dToday),
    newUsers30d: firstMetricValue(dNew),
    sessions30d: firstMetricValue(dSessions),
    pageViews30d: firstMetricValue(dPageviews),
    activeUsersTotal: firstMetricValue(dActiveTotal),
    dailyActiveUsers: dailyRows.map((r) => ({
      date: r.date.length === 8
        ? `${r.date.slice(0, 4)}-${r.date.slice(4, 6)}-${r.date.slice(6, 8)}`
        : r.date,
      value: r.value,
    })),
    topPages,
    topCountries,
  };
}

export async function fetchSearchConsole(): Promise<{
  searchKeywords: SearchRow[];
  searchPages: SearchRow[];
}> {
  const client = getSearchConsoleClient();
  const siteUrl = getSearchConsoleSiteUrl();
  const endDate = today();
  const startDate = daysAgo(30);

  const [kw, pg] = await Promise.all([
    client.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["query"],
        rowLimit: 25,
      },
    }),
    client.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["page"],
        rowLimit: 25,
      },
    }),
  ]);

  const mapRow = (r: any): SearchRow => ({
    key: String(r.keys?.[0] ?? ""),
    clicks: Number(r.clicks ?? 0),
    impressions: Number(r.impressions ?? 0),
    ctr: Number(r.ctr ?? 0),
    position: Number(r.position ?? 0),
  });

  return {
    searchKeywords: (kw.data.rows ?? []).map(mapRow),
    searchPages: (pg.data.rows ?? []).map(mapRow),
  };
}
