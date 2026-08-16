import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Intro } from './components/Intro';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BearLogo } from './components/BearLogo';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { AlertTriangle } from 'lucide-react';

// Lazy loading pages for Code Splitting (Performance Optimization)
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Kontakt = lazy(() => import('./pages/Kontakt').then(m => ({ default: m.Kontakt })));
const FaqPage = lazy(() => import('./pages/FaqPage').then(m => ({ default: m.FaqPage })));
const UeberUns = lazy(() => import('./pages/UeberUns').then(m => ({ default: m.UeberUns })));
const Theorie = lazy(() => import('./pages/Theorie').then(m => ({ default: m.Theorie })));
const KlasseDetail = lazy(() => import('./pages/KlasseDetail').then(m => ({ default: m.KlasseDetail })));
const Legal = lazy(() => import('./pages/Legal').then(m => ({ default: m.Legal })));


const AdminVideos = lazy(() => import('./pages/AdminVideos').then(m => ({ default: m.AdminVideos })));
const Karriere = lazy(() => import('./pages/Karriere').then(m => ({ default: m.Karriere })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

// Minimal Loading Spinner for Suspense Fallback
function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg/95 backdrop-blur-xl">
      <div className="relative flex items-center justify-center">
        {/* Core Logo */}
        <BearLogo className="w-12 h-12 object-contain z-10 animate-pulse drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
        {/* Minimal Spinner Ring */}
        <div className="absolute inset-[-1.5rem] border border-white/5 border-t-primary rounded-full animate-spin"></div>
      </div>
    </div>
  );
}



function MaintenanceScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-bg p-6 text-center">
      <AlertTriangle className="w-20 h-20 text-red-500 mb-6" />
      <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Wartungsarbeiten</h1>
      <p className="text-xl text-neutral-400 max-w-lg">
        Unsere Website wird aktuell aktualisiert und ist in Kürze wieder für dich erreichbar.
      </p>
    </div>
  );
}

function Layout() {
  const location = useLocation();

  const [maintenanceMode, setMaintenanceMode] = useState(false);
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'system'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setMaintenanceMode(!!data.maintenanceMode);
        }
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = location.pathname.startsWith('/admin');
  
  // Check if current path is a valid page
  const validPaths = ['/', '/kontakt', '/faq', '/karriere', '/ueber-uns', '/theorie', '/impressum', '/datenschutz', '/agb'];
  const isKnownPath = validPaths.includes(location.pathname) || location.pathname.startsWith('/klassen/') || isAdmin;

  // Only show intro if we are on a known, non-admin path
  const [showIntro, setShowIntro] = useState(() => {
    return isKnownPath && !isAdmin;
  });

  // If path changes and it's not known, hide intro
  useEffect(() => {
    if (!isKnownPath || isAdmin) {
      setShowIntro(false);
    }
  }, [isKnownPath, isAdmin]);

  
  if (maintenanceMode && !isAdmin) {
    return <MaintenanceScreen />;
  }

  return (
    <div className="bg-dark-bg min-h-screen text-neutral-200 font-sans selection:bg-primary selection:text-white">
      
      {showIntro && !isAdmin ? (
        <Intro onComplete={() => setShowIntro(false)} />
      ) : (
        <>
          {!isAdmin && <Navbar />}
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/admin" element={<AdminVideos />} />
              <Route path="/karriere" element={<Karriere />} />
              <Route path="/ueber-uns" element={<UeberUns />} />
              <Route path="/theorie" element={<Theorie />} />
              <Route path="/klassen/:id" element={<KlasseDetail />} />
              <Route path="/impressum" element={<Legal />} />
              <Route path="/datenschutz" element={<Legal />} />
              <Route path="/agb" element={<Legal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          {!isAdmin && <Footer />}
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollHandler />
      <Layout />
    </BrowserRouter>
  );
}
