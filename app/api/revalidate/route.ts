import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Wird von Sanity aufgerufen, sobald jemand im Studio auf «Publish» tippt.
 *
 * Ohne diesen Endpunkt wuerde eine Aenderung erst nach Ablauf der
 * 60-Sekunden-Frist sichtbar (siehe sanity/fetch.ts). Mit ihm ist sie nach
 * wenigen Sekunden da — das ist der Unterschied, den der Kunde spuert.
 *
 * Einrichtung in Sanity: API → Webhooks → neuer Webhook
 *   URL     https://<domain>/api/revalidate
 *   Trigger Create, Update, Delete
 *   Secret  derselbe Wert wie SANITY_REVALIDATE_SECRET in Vercel
 */
export async function POST(request: NextRequest) {
  const expected = process.env.SANITY_REVALIDATE_SECRET;

  if (!expected) {
    // Ohne gesetztes Geheimnis koennte jeder die Seite neu bauen lassen.
    // Dann lieber gar nichts tun als eine offene Tuer stehen lassen.
    return NextResponse.json(
      { revalidated: false, message: "SANITY_REVALIDATE_SECRET ist nicht gesetzt." },
      { status: 500 },
    );
  }

  const provided =
    request.headers.get("sanity-webhook-secret") ??
    request.nextUrl.searchParams.get("secret") ??
    "";

  if (provided !== expected) {
    return NextResponse.json({ revalidated: false, message: "Nicht erlaubt." }, { status: 401 });
  }

  revalidateTag("sanity");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
