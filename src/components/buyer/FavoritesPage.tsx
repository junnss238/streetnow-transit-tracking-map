import { ArrowLeft, Heart, MapPin, Star, Bell, BellOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface FavoritesPageProps {
  onBack: () => void;
  onVendorSelect: (vendorId: string) => void;
  onRequestNotification: () => void;
}

const mockFavoriteVendors = [
  {
    id: '1',
    name: 'Bakso Pak Joko',
    type: 'Bakso & Mie',
    rating: 4.8,
    reviews: 234,
    isOnline: true,
    distance: '0.3 km',
    image: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    name: 'Sate Ayam Bu Sri',
    type: 'Sate & Gule',
    rating: 4.9,
    reviews: 456,
    isOnline: true,
    distance: '0.5 km',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    name: 'Es Kelapa Muda',
    type: 'Minuman Segar',
    rating: 4.7,
    reviews: 189,
    isOnline: false,
    distance: '-',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop'
  },
];

export function FavoritesPage({ onBack, onVendorSelect, onRequestNotification }: FavoritesPageProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleToggleNotification = (checked: boolean) => {
    if (checked) {
      onRequestNotification();
    }
    setNotificationsEnabled(checked);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="icon"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-gray-900">Pedagang Favorit</h2>
            <p className="text-gray-600 text-sm">{mockFavoriteVendors.length} pedagang</p>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="bg-orange-100 rounded-lg p-2 flex-shrink-0">
              {notificationsEnabled ? (
                <Bell className="w-5 h-5 text-orange-500" />
              ) : (
                <BellOff className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-gray-900">Notifikasi Pedagang Favorit</p>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={handleToggleNotification}
                />
              </div>
              <p className="text-gray-600 text-sm">
                Dapatkan notifikasi saat pedagang favorit berjualan di dekat Anda
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Favorites List */}
      <div className="flex-1 overflow-y-auto p-4">
        {mockFavoriteVendors.length > 0 ? (
          <div className="space-y-3">
            {mockFavoriteVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="flex gap-3 p-3">
                  {/* Vendor Image */}
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden relative">
                    <ImageWithFallback
                      src={vendor.image}
                      alt={vendor.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Favorite Icon */}
                    <button className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-lg">
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    </button>
                  </div>

                  {/* Vendor Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-gray-900">{vendor.name}</h3>
                      {vendor.isOnline ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                          Online
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100 text-xs">
                          Offline
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-2">{vendor.type}</p>

                    <div className="flex items-center gap-3 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-gray-900">{vendor.rating}</span>
                        <span className="text-gray-500">({vendor.reviews})</span>
                      </div>
                      {vendor.isOnline && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{vendor.distance}</span>
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={() => onVendorSelect(vendor.id)}
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      size="sm"
                      disabled={!vendor.isOnline}
                    >
                      {vendor.isOnline ? 'Lihat Menu' : 'Sedang Offline'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-gray-100 rounded-full p-6 mb-4">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-900 mb-2">Belum Ada Favorit</p>
            <p className="text-gray-600 text-sm text-center max-w-xs">
              Tekan ikon hati pada pedagang untuk menambahkan ke favorit
            </p>
          </div>
        )}
      </div>

      {/* Info Footer */}
      {mockFavoriteVendors.length > 0 && (
        <div className="p-4 bg-blue-50 border-t border-blue-200">
          <p className="text-blue-900 text-sm text-center">
            💡 Pedagang yang online akan muncul di bagian atas
          </p>
        </div>
      )}
    </div>
  );
}
