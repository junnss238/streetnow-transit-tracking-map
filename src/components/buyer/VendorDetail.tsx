import { ArrowLeft, Star, MapPin, Clock, Heart, Plus, Minus } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useCartStore } from "../../store/cartStore";

interface VendorDetailProps {
  vendorId: string;
  onBack: () => void;
  onAddToCart: () => void;
}

const mockMenuItems = [
  {
    id: '1',
    name: 'Bakso Urat',
    price: 15000,
    description: 'Bakso urat dengan kuah kaldu sapi segar',
    image: 'https://images.unsplash.com/photo-1727249293947-00754cf44bdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwc3RyZWV0JTIwZm9vZHxlbnwxfHx8fDE3NjMzNDc3NTd8MA&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: '2',
    name: 'Bakso Campur',
    price: 18000,
    description: 'Kombinasi bakso urat, tahu, dan pangsit',
    image: 'https://images.unsplash.com/photo-1652937916838-09b9c2ff8b45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG5vb2RsZXMlMjBib3dsfGVufDF8fHx8MTc2MzM5MTEyMXww&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: '3',
    name: 'Mie Ayam',
    price: 13000,
    description: 'Mie ayam dengan topping ayam jamur',
    image: 'https://images.unsplash.com/photo-1652937916838-09b9c2ff8b45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG5vb2RsZXMlMjBib3dsfGVufDF8fHx8MTc2MzM5MTEyMXww&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: '4',
    name: 'Es Teh Manis',
    price: 5000,
    description: 'Teh manis dingin yang menyegarkan',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop'
  },
];

export function VendorDetail({ vendorId, onBack, onAddToCart }: VendorDetailProps) {
  const addMany = useCartStore(s => s.addMany);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isFavorite, setIsFavorite] = useState(false);

  const incrementQuantity = (itemId: string) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const decrementQuantity = (itemId: string) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) - 1)
    }));
  };

  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = mockMenuItems.reduce((sum, item) => {
    return sum + (item.price * (quantities[item.id] || 0));
  }, 0);

  const handleAddToCart = () => {
    addMany(mockMenuItems, quantities);
    onAddToCart();
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header Image */}
      <div className="relative h-48 bg-gradient-to-br from-orange-400 to-red-400">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1762081570991-6762c6952c41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwY2FydCUyMHZlbmRvcnxlbnwxfHx8fDE3NjM0Mzg2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Vendor"
          className="w-full h-full object-cover"
        />
        
        {/* Back Button */}
        <Button
          onClick={onBack}
          className="absolute top-4 left-4 rounded-full bg-white text-gray-900 hover:bg-gray-100"
          size="icon"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Favorite Button */}
        <Button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 rounded-full bg-white hover:bg-gray-100"
          size="icon"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-900'}`} />
        </Button>
      </div>

      {/* Vendor Info */}
      <div className="p-4 border-b">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-gray-900 mb-1">Bakso Pak Joko</h2>
            <p className="text-gray-600">Bakso & Mie</p>
          </div>
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Buka
          </Badge>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-gray-900">4.8</span>
            <span className="text-gray-500">(234 review)</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>0.3 km</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>5-10 min</span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-gray-900 mb-3">Menu</h3>
        
        <div className="space-y-3">
          {mockMenuItems.map((item) => (
            <div key={item.id} className="bg-gray-50 rounded-lg p-3">
              <div className="flex gap-3">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">{item.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  <p className="text-orange-500">
                    Rp {item.price.toLocaleString('id-ID')}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-2">
                  {quantities[item.id] > 0 ? (
                    <>
                      <Button
                        onClick={() => incrementQuantity(item.id)}
                        size="icon"
                        className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <span className="text-gray-900">{quantities[item.id]}</span>
                      <Button
                        onClick={() => decrementQuantity(item.id)}
                        size="icon"
                        className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => incrementQuantity(item.id)}
                      size="icon"
                      className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t bg-white">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            size="lg"
            disabled={totalItems === 0}
          >
            Pre-Order
          </Button>
          <Button
            className="flex-1 bg-orange-500 hover:bg-orange-600"
            size="lg"
            disabled={totalItems === 0}
            onClick={handleAddToCart}
          >
            Pesan Sekarang
            {totalItems > 0 && (
              <span className="ml-2 bg-orange-600 px-2 py-0.5 rounded">
                {totalItems} • Rp {totalPrice.toLocaleString('id-ID')}
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
