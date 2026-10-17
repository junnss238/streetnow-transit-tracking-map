# 🗺️ StreetNow: Hyperlocal Transit & Real-Time Vendor Tracking Marketplace

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand-443E36)](https://github.com/pmndrs/zustand)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**StreetNow** is a modern geospatial web application designed for hyperlocal, real-time discovery and transit tracking of mobile street vendors and micro-merchants. Built with a mobile-first philosophy, it bridges the information gap between roaming street vendors and local buyers through continuous route telemetry, interactive vector maps, live ordering state machines, and vendor management analytics.

---

## 🚀 Key Highlights & Architectural Features

### 1. 📍 Real-Time Geospatial Map Engine
* **Interactive Map Integration:** High-performance vector tiles powered by Leaflet and React-Leaflet with zero layout shift.
* **Continuous Vendor Telemetry:** Visualizes live moving vendor coordinates, route traces, speed vectors, and operational proximity radiuses.
* **Custom SVG Geo-Markers:** Category-based visual indicators (Culinary, Artisan Crafts, Beverages) with contextual status badges (*Open*, *Moving*, *Resting*).

### 2. 👥 Dual-Persona Operational Interface
* **Buyer Experience:**
  * **Proximity Radar:** Detects approaching vendors in the neighborhood.
  * **Menu Discovery & Cart Management:** Multi-vendor cart persistence managed via Zustand.
  * **Interactive Push Notifications:** Simulated web notifications for vendor arrivals within user-defined geofences.
* **Vendor Operations (Merchant Dashboard):**
  * **Route Broadcasting:** Broadcasts real-time transit state to local consumers.
  * **Live Order Pipeline:** Order ingestion, validation, and fulfillment status updates.
  * **Performance Analytics:** Financial metrics, popular items, and customer retention charts powered by Recharts.

### 3. 🎨 Design System & Accessibility
* **Headless Primitives:** Built on top of Radix UI primitives for robust accessibility (WAI-ARIA compliant).
* **Fluid Mobile Typography & Modern Motion:** Polished micro-interactions, responsive sheets via Vaul, and smooth feedback toasts via Sonner.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18, TypeScript (Strict Typing) |
| **Build & Bundler** | Vite 6 (SWC Fast Refresh) |
| **Geospatial & Mapping** | Leaflet 1.9, React-Leaflet |
| **State Management** | Zustand (Modular store architecture) |
| **Styling & Design System** | Tailwind CSS, Radix UI Primitives, Lucide Icons |
| **Data Visualization** | Recharts, D3 Interpolation |
| **Forms & Notification** | React Hook Form, Sonner, Vaul Drawer |

---

## 📂 Project Architecture

```plaintext
streetnow-transit-tracking-map/
├── src/
│   ├── components/
│   │   ├── buyer/              # Consumer-facing discovery and live tracking
│   │   │   └── BuyerHome.tsx
│   │   ├── vendor/             # Merchant dispatch and inventory control
│   │   ├── common/             # Shared layout and geolocation modals
│   │   ├── ui/                 # Radix UI headless atomic component primitives
│   │   ├── VendorDashboard.tsx # Comprehensive vendor telemetry & analytics
│   │   ├── Onboarding.tsx      # Dual-role authentication & onboarding
│   │   └── LoginRegister.tsx   # Access control interface
│   ├── store/
│   │   └── cartStore.ts        # Zustand global state for cross-vendor carts
│   ├── data/
│   │   └── vendors.ts          # Mock vendor telemetry datasets and geo-coordinates
│   ├── types/
│   │   └── vendor.ts           # TypeScript interfaces for vendors, menus, and coordinates
│   ├── styles/
│   │   └── globals.css         # Theme tokens and fluid CSS variables
│   ├── App.tsx                 # Root application routing and role context
│   └── main.tsx                # Application bootstrap entrypoint
├── index.html
├── vite.config.ts
├── package.json
└── tsconfig.json
```

---

## ⚡ Quickstart & Development

### Prerequisites
* Node.js (v18.0.0 or higher)
* npm, yarn, or pnpm

### 1. Clone the Repository
```bash
git clone https://github.com/junnss238/streetnow-transit-tracking-map.git
cd streetnow-transit-tracking-map
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

### 4. Build for Production
```bash
npm run build
```
Optimized assets will be compiled into the `dist/` directory.

---

## 👤 Author
* **M Arjun Nabila** — [GitHub (@junnss238)](https://github.com/junnss238)
* Undergraduate Student in Informatics (TI) at UPN "Veteran" Yogyakarta & Sharia Economic Law (HES).

## 📄 License
This project is licensed under the [MIT License](LICENSE).
