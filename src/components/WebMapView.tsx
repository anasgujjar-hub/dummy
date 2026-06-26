import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map, 
  MapPin, 
  Play, 
  Plus, 
  List, 
  Activity, 
  Thermometer, 
  Compass, 
  Search, 
  Navigation, 
  Check, 
  Layers, 
  Tv, 
  HeartPulse, 
  Sparkles,
  Info 
} from 'lucide-react';
import L from 'leaflet';

interface SourcingHub {
  id: string;
  name: string;
  type: 'Corporate HQ' | 'Cooperative Farm' | 'Cold Storage' | 'Processing Center';
  coordinates: [number, number]; // [lat, lng]
  volume: string; // bulk dispatch metric
  temperature: string; // temperature sensor
  fatContent: string; // fat content metric
  snfPercent: string; // Solid Not Fat percentage
  moodIndex: string; // Animal-centric check
  milkpH: string; // Purity pH metric
  officer: string;
  status: 'Operational' | 'Dispatching' | 'In Maintenance';
}

const INITIAL_HUBS: SourcingHub[] = [
  {
    id: 'HUB-DELHI',
    name: 'Noida Corporate HQ & Bottling Hub',
    type: 'Corporate HQ',
    coordinates: [28.628, 77.382],
    volume: '45,000 Liters / Day',
    temperature: '3.6 °C',
    fatContent: '4.2 %',
    snfPercent: '8.8 %',
    moodIndex: 'Excellent (10/10)',
    milkpH: '6.6',
    officer: 'Dr. Anand Kurien',
    status: 'Operational'
  },
  {
    id: 'HUB-GUJARAT',
    name: 'Anand Organic Cooperative Grasslands',
    type: 'Cooperative Farm',
    coordinates: [22.564, 72.953],
    volume: '120,000 Liters / Day',
    temperature: '4.0 °C',
    fatContent: '4.5 %',
    snfPercent: '9.0 %',
    moodIndex: 'Exceptional (Pasture Rotated)',
    milkpH: '6.7',
    officer: 'Mrs. Devyani Patel',
    status: 'Dispatching'
  },
  {
    id: 'HUB-PUNJAB',
    name: 'Ludhiana Heritage Welfare Dairy',
    type: 'Cooperative Farm',
    coordinates: [30.901, 75.857],
    volume: '85,000 Liters / Day',
    temperature: '3.8 °C',
    fatContent: '4.1 %',
    snfPercent: '8.7 %',
    moodIndex: 'Very Calm (Active Music)',
    milkpH: '6.5',
    officer: 'Sardar Gurpreet Singh',
    status: 'Operational'
  },
  {
    id: 'HUB-MAHARASHTRA',
    name: 'Pune Cold Preservation Node',
    type: 'Cold Storage',
    coordinates: [18.520, 73.856],
    volume: '60,000 Liters Standby',
    temperature: '2.8 °C',
    fatContent: '4.3 %',
    snfPercent: '8.9 %',
    moodIndex: 'N/A (Transfer Facility)',
    milkpH: '6.6',
    officer: 'Mr. Rahul Deshmukh',
    status: 'Operational'
  },
  {
    id: 'HUB-BANGALORE',
    name: 'Bengaluru Southern Logistics Point',
    type: 'Processing Center',
    coordinates: [12.971, 77.594],
    volume: '75,000 Liters / Day',
    temperature: '3.5 °C',
    fatContent: '4.4 %',
    snfPercent: '8.8 %',
    moodIndex: 'Excellent (Ethically Sourced)',
    milkpH: '6.6',
    officer: 'Dr. Shruthi Naidu',
    status: 'Dispatching'
  }
];

export default function WebMapView() {
  const [hubs, setHubs] = useState<SourcingHub[]>(INITIAL_HUBS);
  const [selectedHub, setSelectedHub] = useState<SourcingHub>(INITIAL_HUBS[0]);
  const [activeTab, setActiveTab] = useState<'hubs' | 'routes' | 'add'>('hubs');
  
  // Custom batch tracking state
  const [batchId, setBatchId] = useState('MR-BATCH-2026');
  const [isSimulatingRoute, setIsSimulatingRoute] = useState(false);
  const [routeInfo, setRouteInfo] = useState<string | null>(null);

  // New location adder form state
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<SourcingHub['type']>('Cooperative Farm');
  const [newLat, setNewLat] = useState('26.846'); // Default Lucknow latitude
  const [newLng, setNewLng] = useState('80.946'); // Default Lucknow longitude
  const [newVolume, setNewVolume] = useState('30,000 Liters / Day');
  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);

  // Leaflet elements refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const polylineRef = useRef<L.Polyline | null>(null);

  // Inject beautiful marker animations to document head safely
  useEffect(() => {
    const styleId = 'leaflet-custom-marker-animations';
    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.innerHTML = `
        @keyframes customPulse {
          0% { transform: scale(0.65); opacity: 1; }
          100% { transform: scale(1.75); opacity: 0; }
        }
        .leaflet-container {
          background-color: #f1f5f9 !important;
          border-radius: 1.5rem;
        }
      `;
      document.head.appendChild(styleElement);
    }
  }, []);

  // Initialize or update stylesheet for leaflet map
  useEffect(() => {
    const linkId = 'leaflet-core-stylesheet';
    if (!document.getElementById(linkId)) {
      const linkElement = document.createElement('link');
      linkElement.id = linkId;
      linkElement.rel = 'stylesheet';
      linkElement.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(linkElement);
    }
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing instance
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    // Create Map
    const map = L.map(mapContainerRef.current, {
      center: [21.5, 78.9], // Centered nicely to show the whole of India
      zoom: 5,
      zoomControl: true,
      attributionControl: true,
    });

    // Elegant Voyager (light) theme for our premium organic layout
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors © CARTO',
      subdomains: 'abcd',
      maxZoom: 18,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Custom Icon generator with inline style fallback for perfect animations
  const createMarkerIcon = (color: string) => {
    return L.divIcon({
      className: 'custom-animated-marker',
      html: `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px;">
          <!-- Glowing Ring -->
          <div style="position: absolute; width: 34px; height: 34px; border-radius: 50%; border: 2px solid ${color}; opacity: 0.8; transform: scale(1); animation: customPulse 1.6s infinite ease-in-out;"></div>
          <!-- Outer core shadow -->
          <div style="position: absolute; width: 20px; height: 20px; border-radius: 50%; background-color: ${color}; opacity: 0.25;"></div>
          <!-- Inner solid core -->
          <div style="position: relative; width: 14px; height: 14px; border-radius: 50%; background-color: ${color}; border: 2px solid #ffffff; box-shadow: 0 2px 5px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center;">
          </div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
      popupAnchor: [0, -12]
    });
  };

  // Re-render pins whenever hubs array changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear previous markers
    const previousMarkers = Object.values(markersRef.current) as L.Marker[];
    previousMarkers.forEach(marker => marker.remove());
    markersRef.current = {};

    // Determine colors for each hub type
    const getColor = (type: SourcingHub['type']) => {
      switch (type) {
        case 'Corporate HQ': return '#f59e0b'; // Amber
        case 'Cooperative Farm': return '#1d4ed8'; // Royal Blue
        case 'Cold Storage': return '#06b6d4'; // Cyan
        case 'Processing Center': return '#10b981'; // Emerald
      }
    };

    hubs.forEach(hub => {
      const color = getColor(hub.type);
      const icon = createMarkerIcon(color);
      
      const marker = L.marker(hub.coordinates, { icon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: inherit; width: 180px;" class="p-1 space-y-2">
            <div style="font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px; display: inline-block; background-color: ${color}20; color: ${color};">
              ${hub.type}
            </div>
            <h4 style="font-size: 13px; font-weight: 700; margin: 4px 0 2px 0; color: #0f172a;">${hub.name}</h4>
            <p style="font-size: 11px; color: #475569; margin: 0;">Capacity: ${hub.volume}</p>
            <p style="font-size: 11px; color: #475569; margin: 0 0 4px 0;">Temp: <strong>${hub.temperature}</strong></p>
          </div>
        `);

      marker.on('click', () => {
        setSelectedHub(hub);
      });

      markersRef.current[hub.id] = marker;
    });
  }, [hubs]);

  // Center view on selected hub
  const handleHubSelect = (hub: SourcingHub) => {
    setSelectedHub(hub);
    const map = mapRef.current;
    if (map) {
      map.flyTo(hub.coordinates, 8, {
        animate: true,
        duration: 1.2
      });
      // Trigger marker popup open automatically
      const marker = markersRef.current[hub.id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  // Simulate routing line animation
  const handleSimulateRoute = () => {
    if (isSimulatingRoute) return;
    
    setIsSimulatingRoute(true);
    setRouteInfo('Initializing real-time cold chain tracer...');

    const map = mapRef.current;
    if (!map) return;

    // Clear old polyline
    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    // Build route: Anand (Gujarat) -> Pune (Cold Preservation) -> Noida (HQ)
    const points: [number, number][] = [
      [22.564, 72.953], // Gujarat
      [18.520, 73.856], // Pune
      [28.628, 77.382]  // Noida
    ];

    // Fly to first point
    map.flyTo(points[0], 6, { duration: 1.0 });

    setTimeout(() => {
      setRouteInfo('Batch MR-BATCH-2026 dispatched. Monitoring temperature at 4.0°C...');
      // Draw path
      const polyline = L.polyline([], {
        color: '#f59e0b',
        weight: 4,
        opacity: 0.8,
        dashArray: '5, 10'
      }).addTo(map);

      polylineRef.current = polyline;

      let step = 0;
      const interval = setInterval(() => {
        if (step < points.length) {
          polyline.addLatLng(points[step]);
          map.panTo(points[step], { animate: true });
          
          if (step === 1) {
            setRouteInfo('Batch reached Pune Cold Preservation Node. Active sanitization verification: Verified.');
          } else if (step === 2) {
            setRouteInfo('Batch arrived safely at Noida Bottling Plant. Total trace latency: 14 hours. Temperature maintained < 4.0 °C. Standard locked.');
          }
          step++;
        } else {
          clearInterval(interval);
          setIsSimulatingRoute(false);
          // Solid line on complete
          polyline.setStyle({ dashArray: undefined, color: '#10b981' });
        }
      }, 2000);
    }, 1500);
  };

  // Clear simulated lines
  const handleClearRoutes = () => {
    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }
    setRouteInfo(null);
    const map = mapRef.current;
    if (map) {
      map.flyTo([21.5, 78.9], 5, { animate: true });
    }
  };

  // Handle addition of new hub
  const handleAddHubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(newLat);
    const lng = parseFloat(newLng);

    if (isNaN(lat) || isNaN(lng)) {
      alert('Please submit valid numeric coordinates for Latitude & Longitude.');
      return;
    }

    if (!newName.trim()) {
      alert('Please fill out the cooperative/farm name field.');
      return;
    }

    const newId = 'HUB-CUSTOM-' + Math.floor(1000 + Math.random() * 9000);
    const addedHub: SourcingHub = {
      id: newId,
      name: newName,
      type: newType,
      coordinates: [lat, lng],
      volume: newVolume,
      temperature: '4.2 °C',
      fatContent: '4.3 %',
      snfPercent: '8.8 %',
      moodIndex: 'Calm (Fresh Pasture)',
      milkpH: '6.6',
      officer: 'Registered Local Steward',
      status: 'Operational'
    };

    setHubs(prev => [...prev, addedHub]);
    setSelectedHub(addedHub);
    setNewName('');
    setFormSuccessMessage(`Success! Registered "${newName}" successfully on the Live GIS Ledger.`);

    // Fly to new marker on the map
    setTimeout(() => {
      const map = mapRef.current;
      if (map) {
        map.flyTo([lat, lng], 8, { animate: true });
      }
      setFormSuccessMessage(null);
    }, 4000);
  };

  // Helper type colors
  const getTypeBadgeStyles = (type: SourcingHub['type']) => {
    switch (type) {
      case 'Corporate HQ':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Cooperative Farm':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cold Storage':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'Processing Center':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-10" id="webmap-console-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-milk-100 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-butter-600 font-mono text-xs uppercase tracking-wider font-bold mb-1">
              <Activity className="w-3.5 h-3.5 animate-pulse" /> Live B2B Cooperative Ledger
            </div>
            <h1 className="font-display font-extrabold text-3xl text-milk-900 tracking-tight">
              Sourcing GIS & Routing Console
            </h1>
            <p className="text-xs text-milk-500 font-light mt-1">
              Real-time temperature telemetry, Single-origin trace paths, and Humane-certified dairy centers.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <span className="px-3.5 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-[10px] font-mono flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> CONNECTED TO LABS
            </span>
            <span className="px-3.5 py-1.5 rounded-full border border-milk-200 bg-milk-50 text-milk-700 text-[10px] font-mono font-bold">
              ALL STATIONS 100% SECURE
            </span>
          </div>
        </div>

        {/* Master Console Widget */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT PANEL: MAP CONTROLS & TELEMETRY */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Tabs Selector */}
            <div className="bg-white p-1.5 rounded-2xl border border-milk-100 shadow-sm flex items-center justify-between gap-1">
              <button
                onClick={() => setActiveTab('hubs')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'hubs' 
                    ? 'bg-milk-900 text-white shadow-sm' 
                    : 'text-milk-600 hover:text-milk-900 hover:bg-milk-50'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                Hub Directory
              </button>
              <button
                onClick={() => setActiveTab('routes')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'routes' 
                    ? 'bg-milk-900 text-white shadow-sm' 
                    : 'text-milk-600 hover:text-milk-900 hover:bg-milk-50'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                Line Tracer
              </button>
              <button
                onClick={() => setActiveTab('add')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'add' 
                    ? 'bg-milk-900 text-white shadow-sm' 
                    : 'text-milk-600 hover:text-milk-900 hover:bg-milk-50'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                Register Hub
              </button>
            </div>

            {/* Tab Contents Panel */}
            <div className="bg-white p-6 rounded-3xl border border-milk-100 shadow-sm flex-grow min-h-[380px] flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                {activeTab === 'hubs' && (
                  <motion.div
                    key="tab-hubs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4 flex-grow flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-milk-50">
                        <span className="text-xs font-mono font-bold text-milk-400">SELECT STATION</span>
                        <span className="text-[10px] font-mono text-butter-700 bg-butter-50 px-2 py-0.5 rounded-full font-bold">
                          {hubs.length} ACTIVE CO-OPS
                        </span>
                      </div>
                      
                      {/* Hub Scroll Window */}
                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                        {hubs.map((hub) => (
                          <button
                            key={hub.id}
                            onClick={() => handleHubSelect(hub)}
                            className={`w-full p-3 rounded-2xl border text-left transition-all ${
                              selectedHub.id === hub.id
                                ? 'bg-milk-900 text-white border-milk-900 shadow-md'
                                : 'bg-milk-50 text-milk-900 border-milk-100 hover:bg-milk-100/70'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className="font-display font-bold text-xs line-clamp-1">{hub.name}</span>
                              <span className={`text-[8px] font-mono uppercase tracking-widest border px-1.5 py-0.5 rounded-lg ${
                                selectedHub.id === hub.id 
                                  ? 'bg-white/10 text-butter-300 border-white/20' 
                                  : 'bg-white text-milk-600 border-milk-200'
                              }`}>
                                {hub.type.split(' ')[0]}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 mt-2 text-[10px] opacity-80 font-mono">
                              <span className="flex items-center gap-1">
                                <Thermometer className="w-3 h-3 text-butter-500" /> {hub.temperature}
                              </span>
                              <span>•</span>
                              <span>Volume: {hub.volume.split(' ')[0]} L</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Selected Hub Live Telemetry Card */}
                    <div className="mt-4 p-4 rounded-2xl bg-dairy-cream border border-milk-150/60 font-mono space-y-2.5">
                      <div className="flex justify-between items-center pb-1.5 border-b border-milk-200/50">
                        <span className="text-[9px] text-milk-600 font-bold block uppercase flex items-center gap-1">
                          <Activity className="w-3 h-3 text-butter-600 shrink-0" /> HUB TELEMETRY
                        </span>
                        <span className="text-[9px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold uppercase shrink-0">
                          {selectedHub.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[11px] text-milk-850">
                        <div>
                          <span className="text-[9px] text-milk-400 block">COOPERATIVE ID</span>
                          <span className="font-bold">{selectedHub.id}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-milk-400 block">FAT DENSITY</span>
                          <span className="font-bold text-amber-700">{selectedHub.fatContent}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-milk-400 block">MILK PH</span>
                          <span className="font-bold">{selectedHub.milkpH} (Pristine)</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-milk-400 block">SNF %</span>
                          <span className="font-bold">{selectedHub.snfPercent}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-milk-200/40 text-[10px] text-milk-500">
                        <span className="text-[9px] text-milk-450 block">ANIMAL WELFARE INDEX</span>
                        <div className="flex items-center gap-1.5 text-milk-900 mt-0.5">
                          <HeartPulse className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="font-bold">{selectedHub.moodIndex}</span>
                        </div>
                      </div>
                      
                      <div className="text-[9px] text-milk-450">
                        <span>Lead Veterinarian: </span>
                        <strong className="text-milk-800">{selectedHub.officer}</strong>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'routes' && (
                  <motion.div
                    key="tab-routes"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2 pb-2 border-b border-milk-50">
                      <span className="text-xs font-mono font-bold text-milk-400 block uppercase">Cold Chain Route Tracer</span>
                      <p className="text-[11px] text-milk-500 leading-relaxed font-light">
                        Trace bulk milk shipping tankers directly from rural pastures to processing headquarters with live temperature logging.
                      </p>
                    </div>

                    <div className="space-y-3 font-mono text-[11px] text-milk-800">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-milk-400 font-bold uppercase block">Enter Sourcing Batch ID</label>
                        <div className="flex rounded-xl overflow-hidden border border-milk-200 bg-milk-50 p-1">
                          <input
                            type="text"
                            value={batchId}
                            onChange={(e) => setBatchId(e.target.value)}
                            placeholder="e.g. MR-BATCH-2026"
                            className="bg-transparent text-milk-900 text-xs px-3 py-2 flex-grow focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-milk-900 text-white min-h-[110px] flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[9px] text-butter-300 font-bold mb-2">
                            <span>ACTIVE LINE STATUS</span>
                            <span className="animate-pulse">● TELEMETRY LOG</span>
                          </div>
                          <p className="text-[10px] font-sans font-light leading-relaxed text-milk-200">
                            {routeInfo || 'Ready to begin simulation. Click "Simulate Path" below to begin tracking dairy logistics pipelines.'}
                          </p>
                        </div>
                        {isSimulatingRoute && (
                          <div className="w-full bg-milk-800 h-1.5 rounded-full overflow-hidden mt-3">
                            <div className="bg-butter-500 h-full rounded-full animate-marquee" style={{ width: '45%' }} />
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={handleSimulateRoute}
                          disabled={isSimulatingRoute}
                          className="flex-1 py-3 text-xs font-bold text-white bg-milk-900 hover:bg-milk-800 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          {isSimulatingRoute ? 'Tracing...' : 'Simulate Path'}
                        </button>
                        <button
                          onClick={handleClearRoutes}
                          className="px-4 py-3 text-xs font-bold text-milk-700 hover:text-milk-900 bg-milk-100 hover:bg-milk-200/70 rounded-xl transition-all"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'add' && (
                  <motion.div
                    key="tab-add"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="space-y-1 pb-2 border-b border-milk-50">
                      <span className="text-xs font-mono font-bold text-milk-400 block uppercase">REGISTER PARTNER CO-OP</span>
                      <p className="text-[11px] text-milk-500 leading-relaxed font-light">
                        Add a local farmer cooperative or milk collection center dynamically to our interactive GIS webmap database.
                      </p>
                    </div>

                    {formSuccessMessage ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-emerald-50 rounded-2xl text-emerald-800 border border-emerald-100 text-xs flex gap-2 font-mono"
                      >
                        <Check className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                        <div>{formSuccessMessage}</div>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleAddHubSubmit} className="space-y-3 text-[11px] font-mono text-milk-800">
                        <div className="space-y-1">
                          <label className="text-[9px] text-milk-400 font-bold uppercase block">Cooperative Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Lucknow Pureland Dairy"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full px-3 py-2 border border-milk-150 rounded-xl bg-milk-50 text-xs font-sans text-milk-900 focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[9px] text-milk-400 font-bold uppercase block">Latitude</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. 26.846"
                              value={newLat}
                              onChange={(e) => setNewLat(e.target.value)}
                              className="w-full px-3 py-2 border border-milk-150 rounded-xl bg-milk-50 text-xs text-milk-900 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] text-milk-400 font-bold uppercase block">Longitude</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. 80.946"
                              value={newLng}
                              onChange={(e) => setNewLng(e.target.value)}
                              className="w-full px-3 py-2 border border-milk-150 rounded-xl bg-milk-50 text-xs text-milk-900 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[9px] text-milk-400 font-bold uppercase block">Hub Classification</label>
                            <select
                              value={newType}
                              onChange={(e) => setNewType(e.target.value as SourcingHub['type'])}
                              className="w-full px-3 py-2 border border-milk-150 rounded-xl bg-milk-50 text-xs text-milk-900 focus:outline-none font-sans"
                            >
                              <option value="Cooperative Farm">Co-op Farm</option>
                              <option value="Processing Center">Process Facility</option>
                              <option value="Cold Storage">Cold Hub</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] text-milk-400 font-bold uppercase block">Est Capacity</label>
                            <input
                              type="text"
                              required
                              placeholder="Liters per Day"
                              value={newVolume}
                              onChange={(e) => setNewVolume(e.target.value)}
                              className="w-full px-3 py-2 border border-milk-150 rounded-xl bg-milk-50 text-xs text-milk-900 focus:outline-none"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 mt-2 text-xs font-bold text-white bg-milk-900 hover:bg-milk-800 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Register Hub
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

          {/* RIGHT PANEL: INTERACTIVE GEOGRAPHICAL MAP */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Legend & Instructions Bar */}
            <div className="bg-white px-5 py-3 rounded-2xl border border-milk-100 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs text-milk-600">
              <div className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-butter-600" />
                <span className="font-light">Interactive GIS WebMap. Click elements to inspect and trace bulk milk routing.</span>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-mono">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block" /> HQ
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-700 block" /> Co-op Farm
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 block" /> Cold Hub
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block" /> Process Facility
                </span>
              </div>
            </div>

            {/* Geographical Map Frame */}
            <div className="relative rounded-3xl overflow-hidden shadow-md border border-milk-120 bg-slate-100 h-[520px] lg:h-full flex-grow">
              <div ref={mapContainerRef} className="w-full h-full" style={{ minHeight: '450px' }} />
              
              {/* Overlay HUD overlay info showing currently selected point */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-milk-100 shadow-lg max-w-xs z-[1000] hidden sm:block">
                <span className="text-[9px] font-mono text-milk-400 font-bold block uppercase mb-1">FOCUS COORDINATES</span>
                <h3 className="font-display font-extrabold text-[13px] text-milk-900 leading-snug">{selectedHub.name}</h3>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-milk-100 font-mono text-[10px] text-milk-600">
                  <span>Lat: {selectedHub.coordinates[0].toFixed(4)}</span>
                  <span>Lng: {selectedHub.coordinates[1].toFixed(4)}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Feature Bottom Card: Trace details */}
        <div className="p-6 sm:p-8 rounded-3xl bg-milk-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
          <div className="grid md:grid-cols-3 gap-8 items-center relative z-10">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-1 px-2 text-[9px] font-mono font-bold bg-butter-500 text-milk-950 rounded uppercase">Certified Traceability</span>
                <span className="text-butter-300">•</span>
                <span className="text-xs text-milk-200">100% Digitized Ledgers</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight leading-snug">
                Verified Single-Origin Supply Technology
              </h2>
              <p className="text-xs text-milk-200 font-light leading-relaxed max-w-2xl">
                Unlike traditional, untraceable bulk milk which gets co-mingled in massive bulk industrial vats, Milk Rush retains batch distinction. Our state-of-the-art cold-truck telemetry reports live temperatures and somatic values to the GIS map to let your businesses assure final consumers of unmatched ethical origin transparency.
              </p>
            </div>
            <div className="bg-milk-850 p-5 rounded-2xl border border-milk-800 scale-100 md:scale-95 space-y-3 font-mono text-[11px] text-milk-200">
              <div className="flex items-center gap-1.5 text-butter-300 text-xs font-bold border-b border-milk-800 pb-2">
                <Sparkles className="w-4 h-4 shrink-0" /> Sourcing Ledger Specs
              </div>
              <ul className="space-y-1.5 text-xs font-light">
                <li className="flex justify-between">
                  <span>Total Managed Area:</span>
                  <strong className="text-white">12,400 Hectares</strong>
                </li>
                <li className="flex justify-between">
                  <span>Active Shipping Routes:</span>
                  <strong className="text-white">18 National Lines</strong>
                </li>
                <li className="flex justify-between">
                  <span>Certified Welfare Index:</span>
                  <strong className="text-white">99.8% Perfect Rank</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
