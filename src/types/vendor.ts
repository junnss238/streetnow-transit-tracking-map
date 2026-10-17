export type VendorType = "bakso" | "sate" | "minuman" | "nasi-goreng";

export interface VendorMenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface Vendor {
  id: string;
  name: string;
  type: VendorType;
  lat: number;
  lng: number;
  distanceKm: number;
  rating: number;
  isActive: boolean;
  image: string;
  menu: VendorMenuItem[];
}