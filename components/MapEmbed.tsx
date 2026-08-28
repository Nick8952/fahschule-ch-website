import { site } from "@/lib/data";

export default function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-panel">
      <iframe
        title={`Karte: ${site.address.street}, ${site.address.zip} ${site.address.city}`}
        loading="lazy"
        referrerPolicy="no-referrer"
        src="https://www.openstreetmap.org/export/embed.html?bbox=8.4970%2C47.3735%2C8.5090%2C47.3800&layer=mapnik&marker=47.37675%2C8.50300"
        className="h-[280px] w-full border-0 [filter:saturate(0.92)]"
      />
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-white px-4 py-3.5 text-[0.9rem]">
        <strong className="font-display">
          {site.address.street}, {site.address.zip} {site.address.city}
        </strong>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapQuery)}`}
          target="_blank"
          rel="noopener"
          className="font-semibold text-pine hover:text-signal"
        >
          Route öffnen →
        </a>
      </div>
    </div>
  );
}
