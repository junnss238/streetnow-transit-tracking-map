import { ArrowLeft, User, MapPin, Heart, History, Settings, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface ProfilePageProps {
  onBack: () => void;
  onLogout: () => void;
  onViewFavorites: () => void;
}

export function ProfilePage({ onBack, onLogout, onViewFavorites }: ProfilePageProps) {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
        <Button
          onClick={onBack}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Profile Info */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="mb-1">Ahmad Rifai</h2>
            <p className="text-orange-100">+62 812 3456 7890</p>
            <p className="text-orange-100 text-sm mt-1">ahmad.rifai@email.com</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white rounded-xl shadow-sm mb-4">
          <button
            onClick={onViewFavorites}
            className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 border-b"
          >
            <div className="bg-red-100 rounded-lg p-2">
              <Heart className="w-5 h-5 text-red-500" />
            </div>
            <span className="flex-1 text-left text-gray-900">Pedagang Favorit</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 border-b">
            <div className="bg-blue-100 rounded-lg p-2">
              <History className="w-5 h-5 text-blue-500" />
            </div>
            <span className="flex-1 text-left text-gray-900">Riwayat Pesanan</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50">
            <div className="bg-green-100 rounded-lg p-2">
              <MapPin className="w-5 h-5 text-green-500" />
            </div>
            <span className="flex-1 text-left text-gray-900">Alamat Tersimpan</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm mb-4">
          <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 border-b">
            <div className="bg-purple-100 rounded-lg p-2">
              <Settings className="w-5 h-5 text-purple-500" />
            </div>
            <span className="flex-1 text-left text-gray-900">Pengaturan</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50">
            <div className="bg-amber-100 rounded-lg p-2">
              <HelpCircle className="w-5 h-5 text-amber-500" />
            </div>
            <span className="flex-1 text-left text-gray-900">Bantuan & FAQ</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4 mb-4">
          <p className="text-gray-900 mb-3">Statistik Anda</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-gray-600 text-sm">Total Pesanan</p>
              <p className="text-gray-900 text-lg">24</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Pedagang Favorit</p>
              <p className="text-gray-900 text-lg">3</p>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="text-center text-gray-500 text-sm mb-4">
          <p>StreetNow v1.0.0</p>
          <p className="text-xs mt-1">© 2024 StreetNow. All rights reserved.</p>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t bg-white">
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full border-red-300 text-red-600 hover:bg-red-50"
          size="lg"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
