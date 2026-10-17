import { Bell, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PushNotificationMockupProps {
  vendorName: string;
  distance: string;
  onClose: () => void;
  onClick: () => void;
}

export function PushNotificationMockup({ vendorName, distance, onClose, onClick }: PushNotificationMockupProps) {
  return (
    <div className="absolute top-4 left-4 right-4 z-50 animate-in slide-in-from-top">
      <button
        onClick={onClick}
        className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow"
      >
        <div className="flex gap-3 p-4">
          {/* App Icon */}
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
            <Bell className="w-6 h-6 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 text-left">
            <div className="flex items-center justify-between mb-1">
              <p className="text-gray-900 text-sm">StreetNow</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              <span className="font-medium">{vendorName}</span> sedang berjualan dalam radius {distance} dari Anda! 🎉
            </p>
            <p className="text-gray-500 text-xs mt-1">Sekarang</p>
          </div>
        </div>

        {/* Action Hint */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2">
          <p className="text-white text-xs text-center">Ketuk untuk lihat detail</p>
        </div>
      </button>
    </div>
  );
}
