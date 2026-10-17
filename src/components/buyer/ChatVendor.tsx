import { ArrowLeft, Send, Image, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';

interface ChatVendorProps {
  onBack: () => void;
}

const mockMessages = [
  { id: '1', sender: 'vendor', text: 'Halo! Pesanan Anda sedang saya siapkan.', time: '12:35' },
  { id: '2', sender: 'user', text: 'Baik terima kasih. Kira-kira berapa lama ya?', time: '12:36' },
  { id: '3', sender: 'vendor', text: 'Sekitar 5-8 menit lagi saya sampai di lokasi Anda.', time: '12:37' },
  { id: '4', sender: 'vendor', text: 'Saya sedang dalam perjalanan sekarang.', time: '12:40' },
];

export function ChatVendor({ onBack }: ChatVendorProps) {
  const [message, setMessage] = useState('');

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b bg-white flex items-center gap-3">
        <Button
          onClick={onBack}
          variant="ghost"
          size="icon"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h3 className="text-gray-900">Pak Joko</h3>
          <p className="text-gray-600 text-sm">Bakso Pak Joko</p>
        </div>
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
          <span className="text-orange-500">PJ</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {/* Date separator */}
          <div className="flex justify-center">
            <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
              Hari ini
            </span>
          </div>

          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  msg.sender === 'user'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-900 border'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-orange-100' : 'text-gray-500'
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}

          {/* Quick Actions */}
          <div className="flex gap-2 justify-center">
            <button className="bg-white border rounded-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Kirim Lokasi
            </button>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="flex-shrink-0"
          >
            <Image className="w-5 h-5" />
          </Button>
          <Input
            placeholder="Ketik pesan..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button
            className="bg-orange-500 hover:bg-orange-600 flex-shrink-0"
            size="icon"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
