import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import routes from "./tempo-routes";
import { Loader2 } from "lucide-react";

// Lazy load components for better performance
const Home = lazy(() => import("./components/home"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Wardrobe = lazy(() => import("./pages/wardrobe"));
const OutfitSuggestions = lazy(() => import("./pages/outfit-suggestions"));
const SavedOutfits = lazy(() => import("./pages/saved-outfits"));
const AccountSettings = lazy(() => import("./pages/account-settings"));
const HelpPage = lazy(() => import("./pages/help"));

function App() {
  const LoadingFallback = (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-lg font-medium text-gray-700 animate-pulse">
          Loading your style experience...
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-background min-h-screen">
      <Suspense fallback={LoadingFallback}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/outfit-suggestions" element={<OutfitSuggestions />} />
          <Route path="/saved-outfits" element={<SavedOutfits />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/help" element={<HelpPage />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" element={<div />} />
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </Suspense>
    </div>
  );
}

export default App;
