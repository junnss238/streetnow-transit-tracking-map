import { ArrowLeft, User, DollarSign, MapPin, History, Settings, HelpCircle, LogOut, ChevronRight, Award } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface VendorProfilePageProps {
  onBack: () => void;
  onLogout: () => void;
  onRadiusSettings: () => void;
}

export function VendorProfilePage({ onBack, onLogout, onRadiusSettings }: VendorProfilePageProps) {
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
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="mb-1">Bakso Pak Joko</h2>
            <p className="text-orange-100">Pak Joko</p>
            <p className="text-orange-100 text-sm mt-1">+62 812 3456 7890</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex gap-2">
          <Badge className="bg-green-500 hover:bg-green-500">
            ✓ Terverifikasi
          </Badge>
          <Badge className="bg-white/20 hover:bg-white/20 backdrop-blur-sm">
            ⭐ Rating 4.8
          </Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="bg-white p-4 border-b">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-1">Hari Ini</p>
            <p className="text-gray-900">24 pesanan</p>
          </div>
          <div className="text-center border-l border-r">
            <p className="text-gray-600 text-sm mb-1">Penjualan</p>
            <p className="text-green-600">Rp 450K</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-1">Bulan Ini</p>
            <p className="text-gray-900">312 order</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white rounded-xl shadow-sm mb-4">
          <button
            onClick={onRadiusSettings}
            className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 border-b"
          >
            <div className="bg-orange-100 rounded-lg p-2">
              <MapPin className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-gray-900">Pengaturan Radius</p>
              <p className="text-gray-600 text-sm">Atur area jangkauan dagangan</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 border-b">
            <div className="bg-blue-100 rounded-lg p-2">
              <History className="w-5 h-5 text-blue-500" />
            </div>
            <span className="flex-1 text-left text-gray-900">Riwayat Penjualan</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50">
            <div className="bg-green-100 rounded-lg p-2">
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <span className="flex-1 text-left text-gray-900">Laporan Keuangan</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm mb-4">
          <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 border-b">
            <div className="bg-purple-100 rounded-lg p-2">
              <Settings className="w-5 h-5 text-purple-500" />
            </div>
            <span className="flex-1 text-left text-gray-900">Pengaturan Toko</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50">
            <div className="bg-amber-100 rounded-lg p-2">
              <HelpCircle className="w-5 h-5 text-amber-500" />
            </div>
            <span className="flex-1 text-left text-gray-900">Bantuan Pedagang</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Achievement Card */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-100 rounded-lg p-2">
              <Award className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-gray-900">Pencapaian</p>
              <p className="text-gray-600 text-sm">Pedagang Populer 🏆</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Pelanggan</span>
              <span className="text-gray-900">234+ pelanggan</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Rating Rata-rata</span>
              <span className="text-gray-900">⭐ 4.8/5.0</span>
            </div>
          </div>
        </div>

        {/* Business Info */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <p className="text-gray-900 mb-3">Informasi Usaha</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Jenis Usaha</span>
              <span className="text-gray-900">Bakso & Mie</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nomor KTP</span>
              <span className="text-gray-900">3201***********</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bergabung Sejak</span>
              <span className="text-gray-900">15 Jan 2024</span>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="text-center text-gray-500 text-sm mb-4">
          <p>StreetNow v1.0.0 - Vendor</p>
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
