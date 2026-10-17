import type { Vendor } from "../types/vendor";

export const vendors: Vendor[] = [
  {
    id: "v1",
    name: "Bakso Pak Joko",
    type: "bakso",
    lat: -6.2084,
    lng: 106.8451,
    distanceKm: 0.3,
    rating: 4.8,
    isActive: true,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800&auto=format&fit=crop",
    menu: [
      { id: "1", name: "Bakso Urat", price: 15000, description: "Bakso urat dengan kuah kaldu sapi segar", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop" },
      { id: "2", name: "Bakso Campur", price: 18000, description: "Kombinasi bakso urat, tahu, pangsit", image: "https://images.unsplash.com/photo-1604908554152-8f09884a9457?q=80&w=600&auto=format&fit=crop" },
      { id: "3", name: "Es Teh Manis", price: 5000, description: "Teh manis segar dingin", image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  {
    id: "v2",
    name: "Sate Madura Bu Ani",
    type: "sate",
    lat: -6.2092,
    lng: 106.8469,
    distanceKm: 0.6,
    rating: 4.7,
    isActive: true,
    image: "https://images.unsplash.com/photo-1604908176997-125f25b9b337?q=80&w=800&auto=format&fit=crop",
    menu: [
      { id: "4", name: "Sate Ayam", price: 20000, description: "10 tusuk sate ayam + lontong", image: "https://images.unsplash.com/photo-1630914441891-0f2c7d80b5e9?q=80&w=600&auto=format&fit=crop" },
      { id: "5", name: "Sate Kambing", price: 28000, description: "10 tusuk sate kambing empuk", image: "https://images.unsplash.com/photo-1676302400068-a7f3d378e3e0?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  {
    id: "v3",
    name: "Es Kopi Keliling",
    type: "minuman",
    lat: -6.2076,
    lng: 106.8442,
    distanceKm: 0.9,
    rating: 4.6,
    isActive: false,
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=800&auto=format&fit=crop",
    menu: [
      { id: "6", name: "Es Kopi Susu", price: 12000, description: "Kopi susu gula aren", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop" },
    ],
  },
];