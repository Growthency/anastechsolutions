import "server-only";
import { google } from "googleapis";

function readServiceAccount(): { client_email: string; private_key: string } | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed.client_email && parsed.private_key) {
        return {
          client_email: parsed.client_email,
          private_key: String(parsed.private_key).replace(/\\n/g, "\n"),
        };
      }
    } catch {
      // fall through
    }
  }
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (email && key) {
    return { client_email: email, private_key: key.replace(/\\n/g, "\n") };
  }
  return null;
}

export function hasAnalyticsConfig(): boolean {
  return !!readServiceAccount() && !!process.env.GA4_PROPERTY_ID;
}

export function hasSearchConsoleConfig(): boolean {
  return !!readServiceAccount() && !!process.env.SEARCH_CONSOLE_SITE_URL;
}

function getAuth(scopes: string[]) {
  const sa = readServiceAccount();
  if (!sa) throw new Error("Google service account credentials are not configured");
  return new google.auth.JWT({
    email: sa.client_email,
    key: sa.private_key,
    scopes,
  });
}

export function getAnalyticsDataClient() {
  const auth = getAuth(["https://www.googleapis.com/auth/analytics.readonly"]);
  return google.analyticsdata({ version: "v1beta", auth });
}

export function getSearchConsoleClient() {
  const auth = getAuth(["https://www.googleapis.com/auth/webmasters.readonly"]);
  return google.searchconsole({ version: "v1", auth });
}

export function getGa4PropertyPath(): string {
  const id = process.env.GA4_PROPERTY_ID;
  if (!id) throw new Error("GA4_PROPERTY_ID env var is not set");
  return id.startsWith("properties/") ? id : `properties/${id}`;
}

export function getSearchConsoleSiteUrl(): string {
  const url = process.env.SEARCH_CONSOLE_SITE_URL;
  if (!url) throw new Error("SEARCH_CONSOLE_SITE_URL env var is not set");
  return url;
}
