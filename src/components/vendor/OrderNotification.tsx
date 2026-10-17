import { MapPin, Clock, DollarSign, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface OrderNotificationProps {
  onAccept: () => void;
  onSkip: () => void;
}

export function OrderNotification({ onAccept, onSkip }: OrderNotificationProps) {
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in slide-in-from-bottom">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-gray-900 mb-1">Pesanan Baru!</h3>
            <p className="text-gray-600 text-sm">#SNW12346</p>
          </div>
          <button
            onClick={onSkip}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="bg-blue-100 rounded-lg p-2">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-600 text-sm">Jarak</p>
              <p className="text-gray-900">0.4 km dari lokasi Anda</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="bg-green-100 rounded-lg p-2">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-600 text-sm">Total Pesanan</p>
              <p className="text-gray-900">Rp 48.000</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="bg-orange-100 rounded-lg p-2">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-600 text-sm">Estimasi Waktu</p>
              <p className="text-gray-900">7-10 menit</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm mb-2">Detail Pesanan:</p>
          <div className="bg-gray-50 rounded-lg p-3 space-y-1">
            <p className="text-gray-900 text-sm">• 1x Bakso Urat</p>
            <p className="text-gray-900 text-sm">• 2x Mie Ayam</p>
            <p className="text-gray-900 text-sm">• 1x Es Teh Manis</p>
          </div>
        </div>

        {/* Timer */}
        <div className="mb-6 text-center">
          <p className="text-gray-600 text-sm mb-2">Waktu untuk menerima:</p>
          <div className="text-orange-500 text-2xl animate-pulse">
            00:15
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            onClick={onAccept}
            className="w-full bg-orange-500 hover:bg-orange-600"
            size="lg"
          >
            TERIMA PESANAN
          </Button>
          <Button
            onClick={onSkip}
            variant="outline"
            className="w-full"
            size="lg"
          >
            SKIP (Tolak)
          </Button>
        </div>

        {/* Warning */}
        <p className="text-gray-500 text-xs text-center mt-4">
          ⚠️ Jika tidak merespons, pesanan akan dialihkan ke pedagang lain
        </p>
      </div>
    </div>
  );
}
