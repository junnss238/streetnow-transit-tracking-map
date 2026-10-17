import { ArrowLeft, MapPin, Wallet, CreditCard, Banknote, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useState } from 'react';
import { useCartStore } from "../../store/cartStore";
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CartProps {
  onBack: () => void;
  onCheckout: () => void;
}


export function Cart({ onBack, onCheckout }: CartProps) {
  const items = useCartStore(s => s.items);
  const inc = useCartStore(s => s.increment);
  const dec = useCartStore(s => s.decrement);
  const remove = useCartStore(s => s.remove);

  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'gopay' | 'ovo'>('cash');
  const [deliveryAddress, setDeliveryAddress] = useState('Jl. Sudirman No. 123, Jakarta');

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const serviceFee = 2000;
  const total = subtotal + serviceFee;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b flex items-center gap-3">
        <Button
          onClick={onBack}
          variant="ghost"
          size="icon"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-gray-900">Keranjang</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Vendor Info */}
        <div className="p-4 bg-orange-50 border-b">
          <p className="text-gray-600 text-sm mb-1">Memesan dari:</p>
          <p className="text-gray-900">Bakso Pak Joko</p>
          <p className="text-orange-500 text-sm mt-1">ETA: 5-10 menit</p>
        </div>

        {/* Cart Items */}
        <div className="p-4">
          <h3 className="text-gray-900 mb-3">Pesanan Anda</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-gray-900">{item.name}</p>
                  <p className="text-gray-500 text-sm">x{item.quantity}</p>
                </div>
                <p className="text-gray-900">
                  Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Delivery Location */}
        <div className="p-4">
          <h3 className="text-gray-900 mb-3">Lokasi Pengiriman</h3>
          <button className="w-full bg-gray-50 rounded-lg p-3 flex items-start gap-3 hover:bg-gray-100">
            <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-left">
              <p className="text-gray-900 text-sm mb-1">Lokasi Saya</p>
              <p className="text-gray-600 text-sm">{deliveryAddress}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* Mini Map Preview */}
          <div className="mt-3 h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="border-b border-gray-400" style={{ height: '10%' }} />
              ))}
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-blue-500 rounded-full p-2 border-2 border-white shadow">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Payment Method */}
        <div className="p-4">
          <h3 className="text-gray-900 mb-3">Metode Pembayaran</h3>
          <div className="space-y-2">
            <button
              onClick={() => setPaymentMethod('cash')}
              className={`w-full p-3 rounded-lg border-2 flex items-center gap-3 ${
                paymentMethod === 'cash' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 bg-white'
              }`}
            >
              <Banknote className="w-5 h-5 text-gray-700" />
              <span className="flex-1 text-left text-gray-900">Cash</span>
              {paymentMethod === 'cash' && (
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </button>

            <button
              onClick={() => setPaymentMethod('gopay')}
              className={`w-full p-3 rounded-lg border-2 flex items-center gap-3 ${
                paymentMethod === 'gopay' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 bg-white'
              }`}
            >
              <Wallet className="w-5 h-5 text-gray-700" />
              <span className="flex-1 text-left text-gray-900">GoPay</span>
              {paymentMethod === 'gopay' && (
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </button>

            <button
              onClick={() => setPaymentMethod('ovo')}
              className={`w-full p-3 rounded-lg border-2 flex items-center gap-3 ${
                paymentMethod === 'ovo' 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 bg-white'
              }`}
            >
              <CreditCard className="w-5 h-5 text-gray-700" />
              <span className="flex-1 text-left text-gray-900">OVO</span>
              {paymentMethod === 'ovo' && (
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Summary */}
      <div className="border-t bg-white p-4">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Biaya Layanan</span>
            <span className="text-gray-900">Rp {serviceFee.toLocaleString('id-ID')}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-gray-900">Total</span>
            <span className="text-orange-500">Rp {total.toLocaleString('id-ID')}</span>
          </div>
        </div>

        <Button
          onClick={onCheckout}
          className="w-full bg-orange-500 hover:bg-orange-600"
          size="lg"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
