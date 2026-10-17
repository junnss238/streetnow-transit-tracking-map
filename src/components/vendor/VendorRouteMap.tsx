import { ArrowLeft, MapPin, Navigation } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";

interface VendorRouteMapProps {
  onBack: () => void;
}

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Level-1 demo: mock lokasi vendor + beberapa stop pembeli
const vendorLocation = { lat: -6.2146, lng: 106.8451 }; // sekitar Sudirman
const mockStops = [
  { id: "o1", name: "Ahmad Rifai", eta: "5-8 menit", lat: -6.2140, lng: 106.8505 },
  { id: "o2", name: "Rina Putri", eta: "10-14 menit", lat: -6.2192, lng: 106.8530 },
  { id: "o3", name: "Budi Santoso", eta: "15-20 menit", lat: -6.2210, lng: 106.8420 },
];

export function VendorRouteMap({ onBack }: VendorRouteMapProps) {
  const routeCoords: [number, number][] = [
    [vendorLocation.lat, vendorLocation.lng],
    ...mockStops.map((s) => [s.lat, s.lng] as [number, number]),
  ];

  return (
    <div className="relative h-full w-full bg-white">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur border-b">
        <div className="flex items-center justify-between px-3 py-3">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-100">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="font-semibold leading-tight">Rute Pengantaran</div>
              <div className="text-xs text-slate-500">
                {mockStops.length} pesanan dalam antrean
              </div>
            </div>
          </div>

          <Badge className="rounded-full bg-orange-500 hover:bg-orange-500">
            Demo
          </Badge>
        </div>
      </div>

      {/* Floating nav button */}
      <div className="absolute right-4 top-20 z-20">
        <Button size="icon" variant="outline" className="rounded-full bg-white shadow">
          <Navigation className="w-5 h-5" />
        </Button>
      </div>

      {/* Map */}
      <MapContainer
        center={[vendorLocation.lat, vendorLocation.lng]}
        zoom={15}
        className="h-full w-full z-0"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Garis rute sederhana (vendor -> stop 1 -> stop 2 -> stop 3) */}
        <Polyline positions={routeCoords} pathOptions={{ weight: 5, opacity: 0.8 }} />

        {/* Marker vendor */}
        <Marker position={[vendorLocation.lat, vendorLocation.lng]}>
          <Popup closeButton={false}>
            <div className="text-sm font-semibold">Lokasi Anda</div>
          </Popup>
        </Marker>

        {/* Marker stop pembeli */}
        {mockStops.map((s, idx) => (
          <Marker key={s.id} position={[s.lat, s.lng]}>
            <Popup closeButton={false}>
              <div className="space-y-1 min-w-[160px]">
                <div className="font-semibold text-sm">Stop #{idx + 1}</div>
                <div className="text-sm">{s.name}</div>
                <div className="text-xs text-slate-600 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  ETA {s.eta}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Bottom sheet antrean */}
      <div className="absolute bottom-3 left-3 right-3 z-20">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Antrean Stop</span>
            <span className="text-xs text-slate-500">
              Urutan demo (FIFO)
            </span>
          </div>

          <div className="mt-2 space-y-2">
            {mockStops.map((s, idx) => (
              <div key={s.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-50 text-orange-700 grid place-content-center text-xs font-semibold">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-medium">{s.name}</div>
                    <div className="text-xs text-slate-500">ETA {s.eta}</div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl"
                >
                  Detail
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
