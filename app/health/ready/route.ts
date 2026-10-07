export function GET() {
  return Response.json(
    { status: "ok", service: "sharhan-portfolio" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
