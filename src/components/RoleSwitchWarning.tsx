import { AlertTriangle, LogOut, X } from 'lucide-react';
import { Button } from './ui/button';

interface RoleSwitchWarningProps {
  currentRole: 'buyer' | 'vendor';
  targetRole: 'buyer' | 'vendor';
  onCancel: () => void;
  onLogout: () => void;
}

const roleNames = {
  buyer: 'Pembeli',
  vendor: 'Pedagang'
};

export function RoleSwitchWarning({ currentRole, targetRole, onCancel, onLogout }: RoleSwitchWarningProps) {
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in slide-in-from-bottom">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-amber-100 rounded-full p-4">
            <AlertTriangle className="w-12 h-12 text-amber-500" />
          </div>
        </div>

        {/* Header */}
        <h3 className="text-center text-gray-900 mb-2">
          Peringatan Ganti Role
        </h3>

        {/* Message */}
        <p className="text-center text-gray-600 mb-6">
          Anda sedang login sebagai <span className="text-orange-500">{roleNames[currentRole]}</span>. 
          Untuk mengakses fitur <span className="text-orange-500">{roleNames[targetRole]}</span>, 
          silakan logout terlebih dahulu.
        </p>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
          <p className="text-blue-900 text-sm text-center">
            💡 Anda tidak dapat menggunakan dua role secara bersamaan
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            onClick={onLogout}
            className="w-full bg-orange-500 hover:bg-orange-600"
            size="lg"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout & Lanjutkan
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="w-full"
            size="lg"
          >
            <X className="w-5 h-5 mr-2" />
            Kembali
          </Button>
        </div>
      </div>
    </div>
  );
}
