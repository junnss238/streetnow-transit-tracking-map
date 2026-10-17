import { useState } from 'react';
import { CheckCircle, Clock, Upload, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface RegistrationProps {
  onComplete: () => void;
}

export function Registration({ onComplete }: RegistrationProps) {
  const [step, setStep] = useState<'form' | 'verification'>('form');
  const [businessName, setBusinessName] = useState('');
  const [foodType, setFoodType] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    setStep('verification');
  };

  if (step === 'verification') {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <Clock className="w-10 h-10 text-amber-500" />
        </div>
        
        <h2 className="text-center mb-3 text-gray-900">
          Verifikasi Sedang Diproses
        </h2>
        
        <p className="text-center text-gray-600 mb-8 max-w-sm">
          Tim kami sedang memverifikasi data Anda. Proses ini biasanya memakan waktu 1-2 hari kerja.
        </p>

        <div className="bg-white rounded-lg p-4 mb-6 w-full max-w-sm">
          <div className="flex items-start gap-3 mb-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-900 text-sm">Data Diterima</p>
              <p className="text-gray-500 text-xs">Informasi Anda telah tersimpan</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-900 text-sm">Dalam Verifikasi</p>
              <p className="text-gray-500 text-xs">Tim sedang meninjau dokumen</p>
            </div>
          </div>
        </div>

        <Button
          onClick={onComplete}
          className="bg-orange-500 hover:bg-orange-600"
          size="lg"
        >
          Lanjutkan ke Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
        <h2 className="mb-2">Daftar sebagai Pedagang</h2>
        <p className="text-orange-100">
          Lengkapi informasi untuk memulai berjualan
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          <div>
            <label className="text-gray-700 mb-2 block">
              Nama Usaha <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Contoh: Bakso Pak Joko"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-700 mb-2 block">
              Jenis Makanan <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Contoh: Bakso & Mie"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-700 mb-2 block">
              Nomor HP/WhatsApp <span className="text-red-500">*</span>
            </label>
            <Input
              type="tel"
              placeholder="+62 812 3456 7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-700 mb-2 block">
              Deskripsi Usaha
            </label>
            <Textarea
              placeholder="Ceritakan sedikit tentang usaha Anda..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <label className="text-gray-700 mb-2 block">
              Upload KTP <span className="text-red-500">*</span>
            </label>
            <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-orange-500 hover:bg-orange-50 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">Klik untuk upload foto KTP</p>
              <p className="text-gray-400 text-xs mt-1">Format: JPG, PNG (Max 5MB)</p>
            </button>
          </div>

          <div>
            <label className="text-gray-700 mb-2 block">
              Foto Produk (Opsional)
            </label>
            <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-orange-500 hover:bg-orange-50 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">Upload foto makanan</p>
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
            <p className="text-blue-900 mb-1">💡 Tips:</p>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• Pastikan foto KTP jelas dan mudah dibaca</li>
              <li>• Gunakan foto produk yang menarik untuk meningkatkan penjualan</li>
              <li>• Verifikasi biasanya selesai dalam 1-2 hari kerja</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-6 border-t bg-white">
        <Button
          onClick={handleSubmit}
          className="w-full bg-orange-500 hover:bg-orange-600"
          size="lg"
          disabled={!businessName || !foodType || !phone}
        >
          Kirim Pendaftaran
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
