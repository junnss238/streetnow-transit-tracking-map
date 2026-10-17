import { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { LoginRegister } from './components/LoginRegister';
import { BuyerHome } from './components/BuyerHome';
import { VendorDashboard } from './components/VendorDashboard';
import { RoleSwitchWarning } from './components/RoleSwitchWarning';

type Screen = 'onboarding' | 'login' | 'buyer-home' | 'vendor-dashboard';
type UserType = 'buyer' | 'vendor' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [userType, setUserType] = useState<UserType>(null);
  const [showRoleWarning, setShowRoleWarning] = useState(false);
  const [targetRole, setTargetRole] = useState<'buyer' | 'vendor' | null>(null);

  const handleOnboardingComplete = () => {
    setCurrentScreen('login');
  };

  const handleLogin = (type: 'buyer' | 'vendor') => {
    setUserType(type);
    if (type === 'buyer') {
      setCurrentScreen('buyer-home');
    } else {
      setCurrentScreen('vendor-dashboard');
    }
  };

  const handleSwitchMode = (newRole: 'buyer' | 'vendor') => {
    if (userType && userType !== newRole) {
      setTargetRole(newRole);
      setShowRoleWarning(true);
    }
  };

  const handleLogout = () => {
    setUserType(null);
    setCurrentScreen('login');
    setShowRoleWarning(false);
    setTargetRole(null);
  };

  const handleLogoutAndSwitch = () => {
    if (targetRole) {
      setUserType(null);
      setShowRoleWarning(false);
      setCurrentScreen('login');
      // Could auto-login to targetRole here if desired
      setTargetRole(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile App Container */}
      <div className="mx-auto max-w-md min-h-screen bg-white shadow-xl relative">
        {currentScreen === 'onboarding' && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}
        {currentScreen === 'login' && (
          <LoginRegister onLogin={handleLogin} />
        )}
        {currentScreen === 'buyer-home' && (
          <BuyerHome 
            onSwitchMode={() => handleSwitchMode('vendor')}
            onLogout={handleLogout}
          />
        )}
        {currentScreen === 'vendor-dashboard' && (
          <VendorDashboard 
            onSwitchMode={() => handleSwitchMode('buyer')}
            onLogout={handleLogout}
          />
        )}

        {/* Role Switch Warning Modal */}
        {showRoleWarning && userType && targetRole && (
          <RoleSwitchWarning
            currentRole={userType}
            targetRole={targetRole}
            onCancel={() => {
              setShowRoleWarning(false);
              setTargetRole(null);
            }}
            onLogout={handleLogoutAndSwitch}
          />
        )}
      </div>
    </div>
  );
}