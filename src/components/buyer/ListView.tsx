import { Search, SlidersHorizontal, Star, MapPin } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface ListViewProps {
  onVendorSelect: (vendorId: string) => void;
}

const mockVendors = [
  {
    id: '1',
    name: 'Bakso Pak Joko',
    type: 'Bakso & Mie',
    distance: '0.3 km',
    rating: 4.8,
    reviews: 234,
    status: 'Buka',
    eta: '5-10 menit',
    image: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    name: 'Sate Ayam Bu Sri',
    type: 'Sate & Gule',
    distance: '0.5 km',
    rating: 4.9,
    reviews: 456,
    status: 'Buka',
    eta: '10-15 menit',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    name: 'Es Kelapa Muda',
    type: 'Minuman Segar',
    distance: '0.2 km',
    rating: 4.7,
    reviews: 189,
    status: 'Buka',
    eta: '3-5 menit',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    name: 'Nasi Goreng Gila',
    type: 'Nasi & Mie Goreng',
    distance: '0.7 km',
    rating: 4.6,
    reviews: 312,
    status: 'Buka',
    eta: '15-20 menit',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop'
  },
];

export function ListView({ onVendorSelect }: ListViewProps) {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <h2 className="mb-4 text-gray-900">Pedagang Terdekat</h2>
        
        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Cari makanan atau pedagang..."
            className="pl-10"
          />
        </div>

        {/* Filter & Sort */}
        <div className="flex gap-2 overflow-x-auto">
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="w-4 h-4 mr-1" />
            Filter
          </Button>
          <Button variant="outline" size="sm">Terdekat</Button>
          <Button variant="outline" size="sm">Rating Tertinggi</Button>
          <Button variant="outline" size="sm">Tercepat</Button>
        </div>
      </div>

      {/* Vendor List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {mockVendors.map((vendor) => (
          <button
            key={vendor.id}
            onClick={() => onVendorSelect(vendor.id)}
            className="w-full bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="flex gap-3 p-3">
              {/* Vendor Image */}
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                <img 
                  src={vendor.image} 
                  alt={vendor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Vendor Info */}
              <div className="flex-1 text-left">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-gray-900">{vendor.name}</h3>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    {vendor.status}
                  </Badge>
                </div>

                <p className="text-gray-600 text-sm mb-2">{vendor.type}</p>

                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-gray-900">{vendor.rating}</span>
                    <span className="text-gray-500">({vendor.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{vendor.distance}</span>
                  </div>
                </div>

                <div className="mt-2 inline-block bg-orange-50 text-orange-600 px-2 py-1 rounded text-xs">
                  ETA: {vendor.eta}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
