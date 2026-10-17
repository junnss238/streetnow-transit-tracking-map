import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, CheckCircle } from 'lucide-react';

export function FeatureDemo() {
  const [activeDemo, setActiveDemo] = useState<'auth' | 'radius' | 'favorites'>('auth');

  return (
    <div className="h-screen bg-gradient-to-br from-orange-50 to-red-50 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center mb-2 text-gray-900">
          StreetNow - Fitur Baru
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Demo interaktif dari 3 fitur utama yang telah diimplementasikan
        </p>

        {/* Feature Selector */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setActiveDemo('auth')}
            className={`p-4 rounded-xl border-2 transition-all ${
              activeDemo === 'auth'
                ? 'border-orange-500 bg-white shadow-lg'
                : 'border-gray-200 bg-white hover:border-orange-300'
            }`}
          >
            <Badge className="bg-orange-500 hover:bg-orange-500 mb-2">Fitur 1</Badge>
            <p className="text-gray-900 mb-1">Flow Autentikasi</p>
            <p className="text-gray-600 text-sm">Role Management</p>
          </button>

          <button
            onClick={() => setActiveDemo('radius')}
            className={`p-4 rounded-xl border-2 transition-all ${
              activeDemo === 'radius'
                ? 'border-orange-500 bg-white shadow-lg'
                : 'border-gray-200 bg-white hover:border-orange-300'
            }`}
          >
            <Badge className="bg-blue-500 hover:bg-blue-500 mb-2">Fitur 2</Badge>
            <p className="text-gray-900 mb-1">Pengaturan Radius</p>
            <p className="text-gray-600 text-sm">Untuk Pedagang</p>
          </button>

          <button
            onClick={() => setActiveDemo('favorites')}
            className={`p-4 rounded-xl border-2 transition-all ${
              activeDemo === 'favorites'
                ? 'border-orange-500 bg-white shadow-lg'
                : 'border-gray-200 bg-white hover:border-orange-300'
            }`}
          >
            <Badge className="bg-red-500 hover:bg-red-500 mb-2">Fitur 3</Badge>
            <p className="text-gray-900 mb-1">Favorit & Notifikasi</p>
            <p className="text-gray-600 text-sm">Untuk Pembeli</p>
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {activeDemo === 'auth' && (
            <div>
              <h2 className="text-gray-900 mb-4">Flow Autentikasi & Role Management</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 mb-1">Login dengan Pemilihan Role</p>
                    <p className="text-gray-600 text-sm">
                      Pengguna memilih masuk sebagai Pembeli atau Pedagang di halaman login
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 mb-1">Peringatan Switch Role</p>
                    <p className="text-gray-600 text-sm">
                      Jika mencoba akses fitur role berbeda, muncul modal peringatan dengan opsi "Logout & Lanjutkan" atau "Kembali"
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 mb-1">Halaman Profil dengan Logout</p>
                    <p className="text-gray-600 text-sm">
                      Tombol logout yang jelas dan mudah diakses di halaman profil untuk kedua role
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-900 mb-2">💡 Cara Mengetes:</p>
                <ol className="text-orange-700 text-sm space-y-1 list-decimal list-inside">
                  <li>Login sebagai Pembeli dari halaman login</li>
                  <li>Buka halaman Profil (tab paling kanan)</li>
                  <li>Klik tombol Logout merah di bawah</li>
                  <li>Login kembali dengan role yang berbeda</li>
                </ol>
              </div>
            </div>
          )}

          {activeDemo === 'radius' && (
            <div>
              <h2 className="text-gray-900 mb-4">Pengaturan Radius untuk Pedagang</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 mb-1">Peta Interaktif dengan Visualisasi</p>
                    <p className="text-gray-600 text-sm">
                      Peta menampilkan lokasi pedagang dengan lingkaran radius yang dapat disesuaikan
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 mb-1">Slider Pengaturan Radius</p>
                    <p className="text-gray-600 text-sm">
                      Slider dari 100m - 1000m dengan preset cepat (250m, 500m, 1km)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 mb-1">Informasi Real-time</p>
                    <p className="text-gray-600 text-sm">
                      Menampilkan estimasi jangkauan pembeli dan area coverage dalam km²
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 mb-1">Tips Berdasarkan Area</p>
                    <p className="text-gray-600 text-sm">
                      Rekomendasi radius berdasarkan jenis area (perkantoran, perumahan, area luas)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-900 mb-2">💡 Cara Mengetes:</p>
                <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
                  <li>Login sebagai Pedagang</li>
                  <li>Buka tab Profil (paling kanan)</li>
                  <li>Klik "Pengaturan Radius"</li>
                  <li>Geser slider atau pilih preset</li>
                  <li>Lihat perubahan visual pada peta</li>
                  <li>Klik "Simpan Perubahan"</li>
                </ol>
              </div>
            </div>
          )}

          {activeDemo === 'favorites' && (
            <div>
              <h2 className="text-gray-900 mb-4">Sistem Favorit & Notifikasi Proaktif</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 mb-1">Halaman Pedagang Favorit</p>
                    <p className="text-gray-600 text-sm">
                      Tab khusus untuk melihat semua pedagang yang telah di-follow dengan status online/offline
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 mb-1">Toggle Notifikasi</p>
                    <p className="text-gray-600 text-sm">
                      Switch untuk mengaktifkan/menonaktifkan notifikasi kedatangan pedagang favorit
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 mb-1">Permission Dialog</p>
                    <p className="text-gray-600 text-sm">
                      Pop-up sistem yang meminta izin untuk mengirim push notification
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 mb-1">Mockup Push Notification</p>
                    <p className="text-gray-600 text-sm">
                      Preview notifikasi iOS/Android yang muncul saat pedagang favorit berjualan di dekat Anda
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-900 mb-2">💡 Cara Mengetes:</p>
                <ol className="text-red-700 text-sm space-y-1 list-decimal list-inside">
                  <li>Login sebagai Pembeli</li>
                  <li>Buka tab "Favorit" (ikon hati)</li>
                  <li>Aktifkan toggle "Notifikasi Pedagang Favorit"</li>
                  <li>Klik "Izinkan" pada pop-up permission</li>
                  <li>Tunggu 2 detik untuk melihat demo push notification</li>
                  <li>Klik notifikasi untuk melihat detail pedagang</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="bg-orange-100 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
              <span className="text-2xl">🔐</span>
            </div>
            <h3 className="text-gray-900 mb-2">Role-Based Auth</h3>
            <p className="text-gray-600 text-sm">
              Sistem keamanan yang mencegah konflik role dengan logout wajib
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="bg-blue-100 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
              <span className="text-2xl">📍</span>
            </div>
            <h3 className="text-gray-900 mb-2">Dynamic Radius</h3>
            <p className="text-gray-600 text-sm">
              Pedagang dapat mengontrol jangkauan visibilitas mereka di peta
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="bg-red-100 rounded-lg w-12 h-12 flex items-center justify-center mb-3">
              <span className="text-2xl">🔔</span>
            </div>
            <h3 className="text-gray-900 mb-2">Smart Notifications</h3>
            <p className="text-gray-600 text-sm">
              Notifikasi proaktif untuk pedagang favorit yang berjualan nearby
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
