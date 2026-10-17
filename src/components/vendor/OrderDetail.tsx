import { ArrowLeft, MapPin, User, Phone, Navigation, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { useState } from 'react';

interface OrderDetailProps {
  orderId: string;
  onBack: () => void;
  onStartRoute: () => void;
}

export function OrderDetail({ orderId, onBack, onStartRoute }: OrderDetailProps) {
  const [orderStatus, setOrderStatus] = useState<'preparing' | 'on-way' | 'completed'>('preparing');

  const handleStartRoute = () => {
    setOrderStatus('on-way');
    onStartRoute();
  };

  const handleComplete = () => {
    setOrderStatus('completed');
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            onClick={onBack}
            variant="ghost"
            size="icon"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-gray-900">#{orderId}</h2>
            <p className="text-gray-600 text-sm">Detail Pesanan</p>
          </div>
        </div>
        <Badge className={
          orderStatus === 'completed' ? 'bg-green-500 hover:bg-green-500' :
          orderStatus === 'on-way' ? 'bg-blue-500 hover:bg-blue-500' :
          'bg-orange-500 hover:bg-orange-500'
        }>
          {orderStatus === 'completed' ? 'Selesai' :
           orderStatus === 'on-way' ? 'Dalam Perjalanan' :
           'Persiapan'}
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Customer Info */}
        <div className="p-4 bg-gray-50 border-b">
          <p className="text-gray-600 text-sm mb-3">Informasi Pembeli</p>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Ahmad Rifai</p>
                <p className="text-gray-600 text-sm">+62 812 3456 7890</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <Phone className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Delivery Location */}
        <div className="p-4 border-b">
          <p className="text-gray-600 text-sm mb-3">Lokasi Pengiriman</p>
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-gray-900 mb-1">Jl. Sudirman No. 123</p>
                <p className="text-gray-600 text-sm">Jakarta Pusat, DKI Jakarta</p>
                <p className="text-orange-500 text-sm mt-1">0.3 km dari Anda</p>
              </div>
            </div>
          </div>

          {/* Mini Map */}
          <div className="h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="border-b border-gray-400" style={{ height: '10%' }} />
              ))}
            </div>
            
            {/* Vendor Location */}
            <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-orange-500 rounded-full p-2 border-2 border-white shadow">
                <MapPin className="w-4 h-4 text-white fill-white" />
              </div>
            </div>

            {/* Buyer Location */}
            <div className="absolute bottom-1/4 right-1/3 transform translate-x-1/2 translate-y-1/2">
              <div className="bg-blue-500 rounded-full p-2 border-2 border-white shadow">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="p-4 border-b">
          <p className="text-gray-600 text-sm mb-3">Detail Pesanan</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">2x Bakso Urat</span>
              <span className="text-gray-900">Rp 30.000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">1x Bakso Campur</span>
              <span className="text-gray-900">Rp 18.000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">2x Es Teh Manis</span>
              <span className="text-gray-900">Rp 10.000</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span className="text-gray-900">Total</span>
              <span className="text-green-600">Rp 60.000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Metode Pembayaran</span>
              <span className="text-gray-900">Cash</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="p-4">
          <p className="text-gray-600 text-sm mb-2">Catatan Pembeli:</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-gray-700 text-sm">
              Tolong jangan terlalu pedas ya, terima kasih!
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t bg-white space-y-2">
        {orderStatus === 'preparing' && (
          <Button
            onClick={handleStartRoute}
            className="w-full bg-orange-500 hover:bg-orange-600"
            size="lg"
          >
            <Navigation className="w-5 h-5 mr-2" />
            Mulai Rute ke Pembeli
          </Button>
        )}

        {orderStatus === 'on-way' && (
          <Button
            onClick={handleComplete}
            className="w-full bg-green-500 hover:bg-green-600"
            size="lg"
          >
            SELESAI
          </Button>
        )}

        {orderStatus === 'completed' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-green-700">✓ Pesanan telah selesai!</p>
          </div>
        )}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full text-red-600 border-red-300 hover:bg-red-50"
              size="lg"
              disabled={orderStatus === 'completed'}
            >
              <AlertTriangle className="w-5 h-5 mr-2" />
              CANCEL ORDER
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Batalkan Pesanan?</AlertDialogTitle>
              <AlertDialogDescription>
                Pesanan akan dibatalkan dan pembeli akan diberitahu. Pastikan Anda memiliki alasan yang valid.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                Ya, Batalkan
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
