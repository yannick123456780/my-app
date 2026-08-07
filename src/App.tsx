// App.tsx - CORRIGÉ
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import AdListing from "./Pages/AdListing";
import { AuthProvider } from "@/Contexts/AuthContext";
import ProtectedRoute from "@/Routes/ProtectedRoute";
import AnnoncesPage from "@/Pages/AnnoncesPage";
import ListingDetails from "@/Pages/ListingDetails";
import NotFound from "./Pages/NotFound";

import { listingsLoader } from "@/routeGuards/listingsLoader";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/connexion", element: <SignUp /> },

  // taxonomy marketplace - SUPPRIMEZ LE SLASH FINAL
  { path: "/listings", element: <AnnoncesPage />,  loader: listingsLoader }, // ← Plus de slash à la fin

  {
    path: "/adlisting",
    element: (
      <ProtectedRoute>
        <AdListing />
      </ProtectedRoute>
    ),
  },
  { path: "/listing/:id", element: <ListingDetails />, },
  
  {
    path: "/404",
    element: <NotFound />,
  },
  // 👇 404 MUST BE LAST
  { path: "*", element: <NotFound /> },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
