import { useState } from 'react';
import { MapView } from './buyer/MapView';
import { ListView } from './buyer/ListView';
import { VendorDetail } from './buyer/VendorDetail';
import { Cart } from './buyer/Cart';
import { OrderTracking } from './buyer/OrderTracking';
import { ChatVendor } from './buyer/ChatVendor';
import { FavoritesPage } from './buyer/FavoritesPage';
import { ProfilePage } from './buyer/ProfilePage';
import { NotificationPermission } from './NotificationPermission';
import { PushNotificationMockup } from './PushNotificationMockup';
import { Home, List, ShoppingCart, User, MapPin, Heart } from 'lucide-react';

interface BuyerHomeProps {
  onSwitchMode: () => void;
  onLogout: () => void;
}

type BuyerScreen = 'map' | 'list' | 'vendor-detail' | 'cart' | 'tracking' | 'chat' | 'favorites' | 'profile';

export function BuyerHome({ onSwitchMode, onLogout }: BuyerHomeProps) {
  const [activeScreen, setActiveScreen] = useState<BuyerScreen>('map');
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<number>(0);
  const [showNotificationPermission, setShowNotificationPermission] = useState(false);
  const [showPushNotification, setShowPushNotification] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleVendorSelect = (vendorId: string) => {
    setSelectedVendor(vendorId);
    setActiveScreen('vendor-detail');
  };

  const handleAddToCart = () => {
    setCartItems(prev => prev + 1);
    setActiveScreen('cart');
  };

  const handleCheckout = () => {
    setActiveScreen('tracking');
  };

  const handleRequestNotification = () => {
    setShowNotificationPermission(true);
  };

  const handleAllowNotification = () => {
    setNotificationsEnabled(true);
    setShowNotificationPermission(false);
    // Show a demo push notification after 2 seconds
    setTimeout(() => {
      setShowPushNotification(true);
      setTimeout(() => setShowPushNotification(false), 5000);
    }, 2000);
  };

  const handleDenyNotification = () => {
    setShowNotificationPermission(false);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Push Notification Mockup */}
      {showPushNotification && (
        <PushNotificationMockup
          vendorName="Bakso Pak Joko"
          distance="500m"
          onClose={() => setShowPushNotification(false)}
          onClick={() => {
            setShowPushNotification(false);
            handleVendorSelect('1');
          }}
        />
      )}

      {/* Notification Permission Dialog */}
      {showNotificationPermission && (
        <NotificationPermission
          onAllow={handleAllowNotification}
          onDeny={handleDenyNotification}
        />
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeScreen === 'map' && (
          <MapView onVendorSelect={handleVendorSelect} />
        )}
        {activeScreen === 'list' && (
          <ListView onVendorSelect={handleVendorSelect} />
        )}
        {activeScreen === 'vendor-detail' && selectedVendor && (
          <VendorDetail 
            vendorId={selectedVendor} 
            onBack={() => setActiveScreen('map')}
            onAddToCart={handleAddToCart}
          />
        )}
        {activeScreen === 'cart' && (
          <Cart 
            onBack={() => setActiveScreen('map')}
            onCheckout={handleCheckout}
          />
        )}
        {activeScreen === 'tracking' && (
          <OrderTracking onOpenChat={() => setActiveScreen('chat')} />
        )}
        {activeScreen === 'chat' && (
          <ChatVendor onBack={() => setActiveScreen('tracking')} />
        )}
        {activeScreen === 'favorites' && (
          <FavoritesPage
            onBack={() => setActiveScreen('map')}
            onVendorSelect={handleVendorSelect}
            onRequestNotification={handleRequestNotification}
          />
        )}
        {activeScreen === 'profile' && (
          <ProfilePage
            onBack={() => setActiveScreen('map')}
            onLogout={onLogout}
            onViewFavorites={() => setActiveScreen('favorites')}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="border-t bg-white">
        <div className="flex justify-around items-center py-2">
          <button
            onClick={() => setActiveScreen('map')}
            className={`flex flex-col items-center p-2 ${
              activeScreen === 'map' ? 'text-orange-500' : 'text-gray-400'
            }`}
          >
            <MapPin className="w-6 h-6" />
            <span className="text-xs mt-1">Peta</span>
          </button>
          <button
            onClick={() => setActiveScreen('list')}
            className={`flex flex-col items-center p-2 ${
              activeScreen === 'list' ? 'text-orange-500' : 'text-gray-400'
            }`}
          >
            <List className="w-6 h-6" />
            <span className="text-xs mt-1">Daftar</span>
          </button>
          <button
            onClick={() => setActiveScreen('favorites')}
            className={`flex flex-col items-center p-2 ${
              activeScreen === 'favorites' ? 'text-orange-500' : 'text-gray-400'
            }`}
          >
            <Heart className="w-6 h-6" />
            <span className="text-xs mt-1">Favorit</span>
          </button>
          <button
            onClick={() => setActiveScreen('cart')}
            className={`flex flex-col items-center p-2 relative ${
              activeScreen === 'cart' ? 'text-orange-500' : 'text-gray-400'
            }`}
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems}
              </span>
            )}
            <span className="text-xs mt-1">Keranjang</span>
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