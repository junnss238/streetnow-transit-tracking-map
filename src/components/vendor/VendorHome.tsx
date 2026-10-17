import { DollarSign, ShoppingBag, TrendingUp, ChevronRight, Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { useState } from 'react';

interface VendorHomeProps {
  onNewOrder: () => void;
  onViewOrders: () => void;
}

export function VendorHome({ onNewOrder, onViewOrders }: VendorHomeProps) {
  const [isOnRoute, setIsOnRoute] = useState(false);

  const handleToggleStatus = (checked: boolean) => {
    setIsOnRoute(checked);
    if (checked) {
      // Simulate new order coming in after going online
      setTimeout(() => {
        onNewOrder();
      }, 2000);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-orange-100 text-sm mb-1">Selamat Datang</p>
            <h2>Bakso Pak Joko</h2>
          </div>
          <button className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
              3
            </span>
          </button>
        </div>

        {/* Status Toggle */}
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1">Status Berjualan</p>
              <p className="text-orange-100 text-sm">
                {isOnRoute ? 'Anda sedang online' : 'Anda sedang offline'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={isOnRoute}
                onCheckedChange={handleToggleStatus}
                className="data-[state=checked]:bg-green-500"
              />
              <Badge className={isOnRoute ? 'bg-green-500 hover:bg-green-500' : 'bg-gray-400 hover:bg-gray-400'}>
                {isOnRoute ? 'ON ROUTE' : 'OFFLINE'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-4">
        <h3 className="text-gray-900 mb-3">Ringkasan Hari Ini</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-green-100 rounded-lg p-2">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm">Total Penjualan</p>
            <p className="text-gray-900 mt-1">Rp 450.000</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-blue-100 rounded-lg p-2">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm">Pesanan Selesai</p>
            <p className="text-gray-900 mt-1">24 pesanan</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-orange-100 rounded-lg p-2">
                <ShoppingBag className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm">Pesanan Aktif</p>
            <p className="text-gray-900 mt-1">5 pesanan</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-purple-100 rounded-lg p-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm">Rata-rata Rating</p>
            <p className="text-gray-900 mt-1">4.8 ⭐</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4">
        <h3 className="text-gray-900 mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button
            onClick={onViewOrders}
            className="w-full bg-white rounded-xl p-4 shadow-sm flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 rounded-lg p-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">Pesanan Aktif</p>
                <p className="text-gray-600 text-sm">5 pesanan menunggu</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full bg-white rounded-xl p-4 shadow-sm flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 rounded-lg p-2">
                <DollarSign className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">Riwayat Penjualan</p>
                <p className="text-gray-600 text-sm">Lihat performa harian</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Active Capacity Indicator */}
      {isOnRoute && (
        <div className="p-4">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-900">Kapasitas Pesanan</p>
              <Badge className="bg-orange-500 text-white hover:bg-orange-500">
                5/10
              </Badge>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-orange-500 h-full rounded-full transition-all"
                style={{ width: '50%' }}
              />
            </div>
            <p className="text-gray-600 text-xs mt-2">
              Anda dapat menerima 5 pesanan lagi
            </p>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="p-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-900 mb-2">💡 Tips Hari Ini</p>
          <p className="text-blue-700 text-sm">
            Waktu sibuk biasanya antara jam 12:00-13:00 dan 18:00-20:00. Pastikan Anda online di jam-jam tersebut!
          </p>
        </div>
      </div>
    </div>
  );
}
