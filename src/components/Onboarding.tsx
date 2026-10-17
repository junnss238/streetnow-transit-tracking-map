import { useState } from 'react';
import { ChevronRight, MapPin, Users, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: MapPin,
    title: 'Temukan Pedagang Terdekat',
    description: 'Lihat pedagang makanan keliling di sekitar Anda secara real-time di peta interaktif',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50'
  },
  {
    icon: Users,
    title: 'Pesan dengan Mudah',
    description: 'Pesan makanan favorit dan lacak posisi pedagang secara langsung',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50'
  },
  {
    icon: Clock,
    title: 'Hemat Waktu',
    description: 'Pre-order untuk menghemat waktu dan lihat antrian digital secara real-time',
    color: 'text-red-500',
    bgColor: 'bg-red-50'
  }
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const currentData = slides[currentSlide];
  const Icon = currentData.icon;

  return (
    <div className="h-screen flex flex-col">
      {/* Skip Button */}
      <div className="p-4 flex justify-end">
        <button 
          onClick={onComplete}
          className="text-gray-500 hover:text-gray-700"
        >
          Lewati
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className={`${currentData.bgColor} rounded-full p-12 mb-8`}>
          <Icon className={`w-24 h-24 ${currentData.color}`} />
        </div>
        
        <h1 className="text-center mb-4 text-gray-900">
          {currentData.title}
        </h1>
        
        <p className="text-center text-gray-600 max-w-sm">
          {currentData.description}
        </p>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'w-8 bg-orange-500' 
                : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Next Button */}
      <div className="p-6">
        <Button 
          onClick={handleNext}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          size="lg"
        >
          {currentSlide < slides.length - 1 ? 'Selanjutnya' : 'Mulai'}
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
