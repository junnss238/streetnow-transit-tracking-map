import { useState } from 'react';
import { VendorHome } from './vendor/VendorHome';
import { OrderNotification } from './vendor/OrderNotification';
import { ActiveOrders } from './vendor/ActiveOrders';
import { OrderDetail } from './vendor/OrderDetail';
import { VendorRouteMap } from './vendor/VendorRouteMap';
import { Registration } from './vendor/Registration';
import { RadiusSettings } from './vendor/RadiusSettings';
import { VendorProfilePage } from './vendor/ProfilePage';
import { Home, ClipboardList, MapPin, User } from 'lucide-react';

interface VendorDashboardProps {
  onSwitchMode: () => void;
  onLogout: () => void;
}

type VendorScreen = 'home' | 'registration' | 'orders' | 'order-detail' | 'route-map' | 'radius-settings' | 'profile';

export function VendorDashboard({ onSwitchMode, onLogout }: VendorDashboardProps) {
  const [activeScreen, setActiveScreen] = useState<VendorScreen>('home');
  const [showNotification, setShowNotification] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(true); // Set to true for demo, false for registration flow
  const [vendorRadius, setVendorRadius] = useState(500);

  const handleAcceptOrder = () => {
    setShowNotification(false);
    setActiveScreen('orders');
  };

  const handleOrderSelect = (orderId: string) => {
    setSelectedOrder(orderId);
    setActiveScreen('order-detail');
  };

  const handleStartRoute = () => {
    setActiveScreen('route-map');
  };

  const handleSaveRadius = (radius: number) => {
    setVendorRadius(radius);
  };

  if (!isVerified) {
    return <Registration onComplete={() => setIsVerified(true)} />;
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeScreen === 'home' && (
          <VendorHome 
            onNewOrder={() => setShowNotification(true)}
            onViewOrders={() => setActiveScreen('orders')}
          />
        )}
        {activeScreen === 'orders' && (
          <ActiveOrders onOrderSelect={handleOrderSelect} />
        )}
        {activeScreen === 'order-detail' && selectedOrder && (
          <OrderDetail 
            orderId={selectedOrder}
            onBack={() => setActiveScreen('orders')}
            onStartRoute={handleStartRoute}
          />
        )}
        {activeScreen === 'route-map' && (
          <VendorRouteMap onBack={() => setActiveScreen('orders')} />
        )}
        {activeScreen === 'radius-settings' && (
          <RadiusSettings
            onBack={() => setActiveScreen('profile')}
            onSave={handleSaveRadius}
          />
        )}
        {activeScreen === 'profile' && (
          <VendorProfilePage
            onBack={() => setActiveScreen('home')}
            onLogout={onLogout}
            onRadiusSettings={() => setActiveScreen('radius-settings')}
          />
        )}
      </div>

      {/* Order Notification Popup */}
      {showNotification && (
        <OrderNotification
          onAccept={handleAcceptOrder}
          onSkip={() => setShowNotification(false)}
        />
      )}

      {/* Bottom Navigation */}
      <div className="border-t bg-white">
        <div className="flex justify-around items-center py-2">
          <button
            onClick={() => setActiveScreen('home')}
            className={`flex flex-col items-center p-2 ${
              activeScreen === 'home' ? 'text-orange-500' : 'text-gray-400'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Beranda</span>
          </button>
          <button
            onClick={() => setActiveScreen('orders')}
            className={`flex flex-col items-center p-2 ${
              activeScreen === 'orders' ? 'text-orange-500' : 'text-gray-400'
            }`}
          >
            <ClipboardList className="w-6 h-6" />
            <span className="text-xs mt-1">Pesanan</span>
          </button>
          <button
            onClick={() => setActiveScreen('route-map')}
            className={`flex flex-col items-center p-2 ${
              activeScreen === 'route-map' ? 'text-orange-500' : 'text-gray-400'
            }`}
          >
            <MapPin className="w-6 h-6" />
            <span className="text-xs mt-1">Rute</span>
          </button>
          <button
            onClick={() => setActiveScreen('profile')}
            className={`flex flex-col items-center p-2 ${
              activeScreen === 'profile' ? 'text-orange-500' : 'text-gray-400'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Profil</span>
          </button>
        </div>
      </div>
    </div>
  );
}