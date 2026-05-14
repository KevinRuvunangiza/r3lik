import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import LandingPage from "./pages/LandingPage";
import CatalogPage from "./pages/CatalogPage";
import ArchivePage from "./pages/ArchivePage";
import ProductDetailPage from "./pages/ProductDetailPage"; // <-- Newly added import

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The RootLayout wraps all routes inside it */}
        <Route path="/" element={<RootLayout />}>
          {/* Index route maps to exactly "/" */}
          <Route index element={<LandingPage />} />

          {/* Other routes */}
          <Route path="catalog" element={<CatalogPage />} />
          
          {/* The new dynamic route for the detailed item screen */}
          <Route path="catalog/:id" element={<ProductDetailPage />} />

          <Route path="archive" element={<ArchivePage />} />

          {/* Catch-all for 404 */}
          <Route
            path="*"
            element={
              <div className="flex-grow flex items-center justify-center font-mono text-zinc-500">
                ERR_404: DIRECTORY_NOT_FOUND
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}