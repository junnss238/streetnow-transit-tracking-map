import { ArrowLeft, MapPin, Info, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { useState } from 'react';

interface RadiusSettingsProps {
  onBack: () => void;
  onSave: (radius: number) => void;
}

export function RadiusSettings({ onBack, onSave }: RadiusSettingsProps) {
  const [radius, setRadius] = useState(500);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onSave(radius);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Calculate circle size based on radius (for visual representation)
  const circleSize = Math.min((radius / 1000) * 100 + 20, 80);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b flex items-center gap-3">
        <Button
          onClick={onBack}
          variant="ghost"
          size="icon"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-gray-900">Pengaturan Radius</h2>
          <p className="text-gray-600 text-sm">Atur area jangkauan dagangan</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Map View */}
        <div className="h-80 bg-gradient-to-br from-green-100 to-blue-100 relative">
          {/* Map Grid Background */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="border-b border-gray-400" style={{ height: '5%' }} />
            ))}
          </div>

          {/* Vendor Location (Center) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              {/* Radius Circle */}
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500/20 rounded-full border-4 border-orange-500/40 transition-all duration-300"
                style={{ 
                  width: `${circleSize}%`, 
                  height: `${circleSize}%`,
                  aspectRatio: '1'
                }}
              />
              
              {/* Vendor Pin */}
              <div className="relative bg-orange-500 rounded-full p-4 shadow-xl border-4 border-white z-10">
                <MapPin className="w-8 h-8 text-white fill-white" />
              </div>
              
              {/* Pulsing Effect */}
              <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-20" />
            </div>
          </div>

          {/* Radius Badge */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-white text-gray-900 hover:bg-white shadow-lg px-4 py-2">
              Radius: {radius}m
            </Badge>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6">
          {/* Info Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900 mb-1">Tentang Radius Jangkauan</p>
                <p className="text-blue-700 text-sm">
                  Pembeli dalam radius yang Anda tetapkan dapat melihat dagangan Anda di peta dan menerima notifikasi.
                </p>
              </div>
            </div>
          </div>

          {/* Radius Slider */}
          <div className="mb-6">
            <label className="text-gray-900 mb-3 block">
              Atur Radius Jangkauan (dalam meter):
            </label>
            
            <Slider
              value={[radius]}
              onValueChange={(value) => setRadius(value[0])}
              min={100}
              max={1000}
              step={50}
              className="mb-4"
            />

            <div className="flex justify-between text-sm text-gray-600">
              <span>100m</span>
              <span>550m</span>
              <span>1000m</span>
            </div>
          </div>

          {/* Current Radius Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-600 text-sm mb-2">Status Saat Ini:</p>
            <p className="text-gray-900">
              Pembeli dalam radius <span className="text-orange-500 font-medium">{radius} meter</span> dapat melihat dagangan Anda.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="mb-6">
            <p className="text-gray-700 mb-3 text-sm">Preset Cepat:</p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={radius === 250 ? "default" : "outline"}
                onClick={() => setRadius(250)}
                className={radius === 250 ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                250m
              </Button>
              <Button
                variant={radius === 500 ? "default" : "outline"}
                onClick={() => setRadius(500)}
                className={radius === 500 ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                500m
              </Button>
              <Button
                variant={radius === 1000 ? "default" : "outline"}
                onClick={() => setRadius(1000)}
                className={radius === 1000 ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                1km
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <p className="text-green-600 text-sm mb-1">Perkiraan Jangkauan</p>
              <p className="text-green-900 text-lg">{Math.round(radius * 3.14 / 100)} pembeli</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
              <p className="text-purple-600 text-sm mb-1">Area Coverage</p>
              <p className="text-purple-900 text-lg">{((radius * radius * 3.14) / 1000000).toFixed(2)} km²</p>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-900 mb-2">💡 Tips:</p>
            <ul className="text-amber-700 text-sm space-y-1">
              <li>• Radius kecil (100-300m): Cocok untuk area padat seperti perkantoran</li>
              <li>• Radius sedang (400-700m): Ideal untuk area perumahan</li>
              <li>• Radius besar (800-1000m): Untuk area yang lebih luas</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="p-4 border-t bg-white">
        {isSaved ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <p className="text-green-700">✓ Perubahan berhasil disimpan!</p>
          </div>
        ) : (
          <Button
            onClick={handleSave}
            className="w-full bg-orange-500 hover:bg-orange-600"
            size="lg"
          >
            <Save className="w-5 h-5 mr-2" />
            Simpan Perubahan
          </Button>
        )}
      </div>
    </div>
  );
}
