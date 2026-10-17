import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Search, Navigation, Star, MapPin } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { vendors } from "../../data/vendors";

interface MapViewProps {
  onVendorSelect: (vendorId: string) => void;
}

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Adapted to VendorType in src/types/vendor.ts
const categories = [
  "Semua",
  "bakso",
  "sate",
  "minuman",
  "nasi-goreng",
];

export function MapView({ onVendorSelect }: MapViewProps) {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("Semua");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return vendors.filter((v) => {
      const matchQuery =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.type.toLowerCase().includes(q);
      const matchCat =
        activeCat === "Semua" ||
        v.type.toLowerCase() === activeCat.toLowerCase();
      return matchQuery && matchCat;
    });
  }, [query, activeCat]);

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[-6.2, 106.816666]}
        zoom={14}
        className="h-full w-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filtered.map((v) => (
          <Marker key={v.id} position={[v.lat, v.lng]}>
            <Popup closeButton={false}>
              <div className="space-y-2 min-w-[180px]">
                <div className="font-semibold leading-tight">{v.name}</div>
                <div className="text-xs text-slate-600 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {v.distanceKm.toFixed(1)} km • {v.type}
                </div>
                <div className="text-xs flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current text-orange-500" />
                  {v.rating}
                  <span className="text-slate-500">
                    {v.isActive ? " • Aktif" : " • Offline"}
                  </span>
                </div>
                <Button
                  size="sm"
                  className="w-full rounded-xl"
                  onClick={() => onVendorSelect(v.id)}
                >
                  Lihat Detail
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Top overlay: search + categories */}
      <div className="absolute top-3 left-3 right-3 z-10 space-y-2">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 border border-white">
          <Search className="w-4 h-4 text-slate-500" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari pedagang, menu, atau kategori..."
            className="border-0 focus-visible:ring-0 bg-transparent h-9"
          />
          <Badge variant="secondary" className="rounded-xl">
            {filtered.length}
          </Badge>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((c) => {
            const active = c === activeCat;
            return (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={[
                  "px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition capitalize",
                  active
                    ? "bg-orange-500 text-white shadow"
                    : "bg-white/90 text-slate-700 hover:bg-white",
                ].join(" ")}
              >
                {c === "nasi-goreng" ? "Nasi Goreng" : c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating locate button */}
      <div className="absolute right-4 bottom-36 z-10">
        <Button
          size="icon"
          className="rounded-full shadow-lg bg-white text-slate-700 hover:bg-white"
          variant="outline"
          onClick={() => {
            // nanti bisa dihubungkan ke geolocation
          }}
        >
          <Navigation className="w-5 h-5" />
        </Button>
      </div>

      {/* Bottom vendor carousel */}
      <div className="absolute bottom-3 left-3 right-3 z-10">
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {filtered.map((v) => (
            <button
              key={v.id}
              onClick={() => onVendorSelect(v.id)}
              className="min-w-[240px] bg-white rounded-2xl shadow-xl p-3 text-left border border-slate-100 active:scale-[0.99] transition"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold leading-tight">
                    {v.name}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 capitalize">
                    {v.type} • {v.distanceKm.toFixed(1)} km
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-medium">
                  <Star className="w-3.5 h-3.5 fill-current text-orange-500" />
                  {v.rating}
                </div>
              </div>

              <div className="mt-2 flex items-center gap-2">
                {v.isActive ? (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                    Aktif sekarang
                  </span>
                ) : (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Offline
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
