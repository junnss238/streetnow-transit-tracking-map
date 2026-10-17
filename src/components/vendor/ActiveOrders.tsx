import { MapPin, Clock, DollarSign } from 'lucide-react';
import { Badge } from '../ui/badge';

interface ActiveOrdersProps {
  onOrderSelect: (orderId: string) => void;
}

const mockActiveOrders = [
  {
    id: 'SNW12345',
    buyer: 'Ahmad Rifai',
    destination: 'Jl. Sudirman No. 123',
    distance: '0.3 km',
    total: 60000,
    status: 'on-way',
    items: ['2x Bakso Urat', '1x Bakso Campur', '2x Es Teh'],
    eta: '5 menit'
  },
  {
    id: 'SNW12344',
    buyer: 'Siti Nurhaliza',
    destination: 'Jl. Gatot Subroto No. 45',
    distance: '0.5 km',
    total: 45000,
    status: 'preparing',
    items: ['3x Mie Ayam', '1x Es Teh'],
    eta: '8 menit'
  },
  {
    id: 'SNW12343',
    buyer: 'Budi Santoso',
    destination: 'Jl. Thamrin No. 78',
    distance: '0.7 km',
    total: 38000,
    status: 'preparing',
    items: ['1x Bakso Campur', '2x Mie Ayam'],
    eta: '12 menit'
  },
];

const statusConfig = {
  'on-way': { label: 'Dalam Perjalanan', color: 'bg-green-500' },
  'preparing': { label: 'Persiapan', color: 'bg-orange-500' },
  'pending': { label: 'Menunggu', color: 'bg-yellow-500' },
};

export function ActiveOrders({ onOrderSelect }: ActiveOrdersProps) {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <h2 className="text-gray-900 mb-1">Pesanan Aktif</h2>
        <p className="text-gray-600 text-sm">
          {mockActiveOrders.length} pesanan dalam antrian
        </p>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {mockActiveOrders.map((order) => {
          const status = statusConfig[order.status as keyof typeof statusConfig];
          
          return (
            <button
              key={order.id}
              onClick={() => onOrderSelect(order.id)}
              className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              {/* Order Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-gray-900 mb-1">#{order.id}</p>
                  <p className="text-gray-600 text-sm">{order.buyer}</p>
                </div>
                <Badge className={`${status.color} text-white hover:${status.color}`}>
                  {status.label}
                </Badge>
              </div>

              {/* Order Info */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700 flex-1">{order.destination}</span>
                  <span className="text-gray-500">{order.distance}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">ETA: {order.eta}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-gray-50 rounded-lg p-2 mb-3">
                <p className="text-gray-600 text-xs mb-1">Items:</p>
                <p className="text-gray-900 text-sm">{order.items.join(', ')}</p>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-gray-600 text-sm">Total:</span>
                </div>
                <span className="text-green-600">
                  Rp {order.total.toLocaleString('id-ID')}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">Total dari semua pesanan:</p>
          <p className="text-orange-500">
            Rp {mockActiveOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString('id-ID')}
          </p>
        </div>
      </div>
    </div>
  );
}
