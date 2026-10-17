import { Bell, X } from 'lucide-react';
import { Button } from './ui/button';

interface NotificationPermissionProps {
  onAllow: () => void;
  onDeny: () => void;
}

export function NotificationPermission({ onAllow, onDeny }: NotificationPermissionProps) {
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in slide-in-from-bottom">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-orange-100 rounded-full p-4">
            <Bell className="w-12 h-12 text-orange-500" />
          </div>
        </div>

        {/* Header */}
        <h3 className="text-center text-gray-900 mb-2">
          Izinkan Notifikasi?
        </h3>

        {/* Message */}
        <p className="text-center text-gray-600 mb-6">
          "StreetNow" ingin mengirimkan notifikasi saat pedagang favorit Anda berjualan di dekat Anda.
        </p>

        {/* Example Notification Preview */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex gap-3 items-start">
            <div className="bg-orange-500 rounded p-1.5 flex-shrink-0">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-gray-900 text-sm mb-1">StreetNow</p>
              <p className="text-gray-700 text-sm">
                <span className="font-medium">Bakso Pak Joko</span> sedang berjualan dalam radius 500m dari Anda! 🎉
              </p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
          <p className="text-blue-900 text-sm text-center">
            💡 Anda dapat mengubah pengaturan ini kapan saja
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            onClick={onAllow}
            className="w-full bg-orange-500 hover:bg-orange-600"
            size="lg"
          >
            <Bell className="w-5 h-5 mr-2" />
            Izinkan
          </Button>
          <Button
            onClick={onDeny}
            variant="outline"
            className="w-full"
            size="lg"
          >
            <X className="w-5 h-5 mr-2" />
            Tolak
          </Button>
        </div>
      </div>
    </div>
  );
}
