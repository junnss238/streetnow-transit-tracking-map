import { useEffect, useMemo, useState } from "react";
import { MessageCircle, MapPin, Clock, User, Phone, CheckCircle2, Utensils, Bike } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import L from "leaflet";

interface OrderTrackingProps {
  onOpenChat: () => void;
}

type StepKey = "placed" | "accepted" | "cooking" | "on_the_way" | "arrived" | "completed";

const STEPS: { key: StepKey; label: string; sub: string; icon: any; etaMin: number }[] = [
  { key: "placed", label: "Pesanan dibuat", sub: "Kami sudah menerima pesananmu", icon: CheckCircle2, etaMin: 0 },
  { key: "accepted", label: "Pedagang menerima", sub: "Pedagang menyiapkan pesanan", icon: User, etaMin: 2 },
  { key: "cooking", label: "Sedang dimasak", sub: "Pesanan sedang diproses", icon: Utensils, etaMin: 6 },
  { key: "on_the_way", label: "Menuju lokasi kamu", sub: "Pedagang OTW", icon: Bike, etaMin: 12 },
  { key: "arrived", label: "Sudah sampai", sub: "Pedagang di dekatmu", icon: MapPin, etaMin: 14 },
  { key: "completed", label: "Selesai", sub: "Selamat menikmati!", icon: CheckCircle2, etaMin: 15 },
];

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function FitToRoute({ route }: { route: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (!route.length) return;
    const id = setTimeout(() => {
      const bounds = L.latLngBounds(route.map((p) => L.latLng(p[0], p[1])));
      map.fitBounds(bounds, { padding: [30, 30] });
    }, 150);
    return () => clearTimeout(id);
  }, [map, route]);
  return null;
}

export function OrderTracking({ onOpenChat }: OrderTrackingProps) {
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [minutesToArrive, setMinutesToArrive] = useState<number>(15);
  const [progress, setProgress] = useState<number>(0);

  const vendorStart: [number, number] = [-6.2084, 106.8451];
  const userEnd: [number, number] = [-6.2088, 106.8456];

  const route: [number, number][] = [
    vendorStart,
    [-6.2086, 106.8452],
    [-6.2087, 106.8454],
    userEnd,
  ];

  const vendorPos = useMemo(() => {
    if (route.length < 2) return vendorStart;
    const totalSegs = route.length - 1;
    const t = progress / 100;
    const segFloat = t * totalSegs;
    const segIdx = Math.min(totalSegs - 1, Math.floor(segFloat));
    const localT = segFloat - segIdx;
    const [lat1, lng1] = route[segIdx];
    const [lat2, lng2] = route[segIdx + 1];
    return [lat1 + (lat2 - lat1) * localT, lng1 + (lng2 - lng1) * localT] as [number, number];
  }, [progress]);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((s) => (s < STEPS.length - 1 ? s + 1 : s));
    }, 12000);
    return () => clearInterval(stepTimer);
  }, []);

  useEffect(() => {
    const etaTimer = setInterval(() => {
      setMinutesToArrive((m) => (m > 0 ? m - 1 : 0));
    }, 60000);
    return () => clearInterval(etaTimer);
  }, []);

  useEffect(() => {
    if (STEPS[currentStep].key !== "on_the_way" && STEPS[currentStep].key !== "arrived") {
      setProgress(0);
      return;
    }
    let p = STEPS[currentStep].key === "arrived" ? 100 : 0;
    setProgress(p);

    const moveTimer = setInterval(() => {
      p = Math.min(100, p + 4);
      setProgress(p);
      if (p >= 100) clearInterval(moveTimer);
    }, 1000);

    return () => clearInterval(moveTimer);
  }, [currentStep]);

  const statusText = useMemo(() => {
    const k = STEPS[currentStep].key;
    if (k === "completed") return "Selesai";
    if (k === "arrived") return "Pedagang sudah dekat";
    if (k === "on_the_way") return "Pedagang OTW";
    if (k === "cooking") return "Sedang diproses";
    return "Menunggu";
  }, [currentStep]);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <p className="text-sm text-orange-100 mb-1">Pesanan #SNW12345</p>
        <h2 className="mb-2">{statusText}</h2>
        <Badge className="bg-white/20 text-white hover:bg-white/20">
          Estimasi tiba {minutesToArrive} menit
        </Badge>
      </div>

      <div className="relative h-64">
        <MapContainer center={vendorStart} zoom={16} className="h-full w-full">
          <FitToRoute route={route} />
          <TileLayer
            attribution="&copy; OpenStreetMap contributors &copy; CARTO"
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <Polyline positions={route} pathOptions={{ color: "#ef4444", weight: 5, dashArray: "8 6" }} />
          <Marker position={vendorPos}><Popup>Pak Joko (pedagang)</Popup></Marker>
          <Marker position={userEnd}><Popup>Lokasi kamu</Popup></Marker>
        </MapContainer>

        {(STEPS[currentStep].key === "on_the_way" || STEPS[currentStep].key === "arrived") && (
          <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur rounded-full px-3 py-2 text-xs shadow flex items-center justify-between">
            <span>Perjalanan</span>
            <span className="font-semibold">{progress}%</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="mb-3">Status Pesanan</h3>
        <div className="space-y-3">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const done = idx < currentStep;
            const active = idx === currentStep;
            return (
              <div key={step.key} className="flex items-start gap-3">
                <div className={`mt-0.5 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  done ? "bg-green-500 border-green-500 text-white" :
                  active ? "bg-orange-500 border-orange-500 text-white" :
                  "bg-white border-gray-300 text-gray-400"
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`${active ? "font-semibold" : ""}`}>{step.label}</p>
                    <p className="text-xs text-gray-500">{step.etaMin}m</p>
                  </div>
                  <p className="text-sm text-gray-600">{step.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-4 pb-4 mt-auto">
        <div className="p-4 border rounded-xl flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
            <User className="w-6 h-6 text-orange-600" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Pak Joko</p>
            <p className="text-sm text-gray-600">Pedagang Bakso • ⭐ 4.8</p>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <Clock className="w-3 h-3" />
              <span>{minutesToArrive} menit lagi</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Phone className="w-4 h-4" />
            </Button>
            <Button size="icon" onClick={onOpenChat}>
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Button className="w-full mt-3" variant="outline">
          Lihat detail pedagang
        </Button>
      </div>
    </div>
  );
}