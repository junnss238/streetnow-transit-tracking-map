import { useState } from 'react';
import { Mail, Phone, Chrome } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface LoginRegisterProps {
  onLogin: (userType: 'buyer' | 'vendor') => void;
}

export function LoginRegister({ onLogin }: LoginRegisterProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 p-8 text-white">
        <h1 className="text-center mb-2">StreetNow</h1>
        <p className="text-center text-orange-100">
          Makanan Keliling di Ujung Jari
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 p-6">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Masuk</TabsTrigger>
            <TabsTrigger value="register">Daftar</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div>
              <label className="text-gray-700 mb-2 block">Email</label>
              <Input
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-700 mb-2 block">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="text-orange-500 hover:text-orange-600">
              Lupa password?
            </button>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <div>
              <label className="text-gray-700 mb-2 block">Email</label>
              <Input
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-700 mb-2 block">Nomor HP</label>
              <Input
                type="tel"
                placeholder="+62 812 3456 7890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-700 mb-2 block">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-3 mt-6">
          <Button 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            size="lg"
            onClick={() => onLogin('buyer')}
          >
            Masuk sebagai Pembeli
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-gray-500">atau</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full"
            size="lg"
          >
            <Chrome className="mr-2 w-5 h-5" />
            Google
          </Button>

          <Button 
            variant="outline" 
            className="w-full"
            size="lg"
          >
            <Phone className="mr-2 w-5 h-5" />
            Nomor HP
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">Anda seorang pedagang?</p>
          <Button
            variant="link"
            className="text-orange-500 hover:text-orange-600"
            onClick={() => onLogin('vendor')}
          >
            Daftar sebagai Pedagang →
          </Button>
        </div>
      </div>
    </div>
  );
}
