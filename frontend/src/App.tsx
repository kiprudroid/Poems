import type { ReactNode } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { HomeView } from "@/features/home/components/HomeView";
import { PoemDetailView } from "@/features/poem/components/PoemDetailView";
import { PoetDetailView } from "@/features/poet/components/PoetDetailView";
import { PoetIndexView } from "@/features/poet/components/PoetIndexView";

const LegacyAuthorRedirect = (): ReactNode => {
  const { authorName = "" } = useParams();
  return (
    <Navigate to={`/poet/${authorName}${window.location.search}`} replace />
  );
};

export const App = (): ReactNode => (
  <Routes>
    <Route path="/" element={<HomeView />} />
    <Route path="/poets" element={<PoetIndexView />} />
    <Route path="/poet/:poetName" element={<PoetDetailView />} />
    <Route path="/poem/:title" element={<PoemDetailView />} />
    <Route path="/authors" element={<Navigate to="/poets" replace />} />
    <Route path="/author/:authorName" element={<LegacyAuthorRedirect />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
