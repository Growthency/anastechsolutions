/**
 * Server component that renders a JSON-LD <script> tag for structured data.
 * Use one per schema object — Google parses each tag independently.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // dangerouslySetInnerHTML is the standard pattern for JSON-LD; the payload
      // is built server-side from typed data, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
