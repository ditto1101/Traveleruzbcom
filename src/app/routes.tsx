import { createBrowserRouter, Outlet } from "react-router";
import { Home } from "./pages/Home";
import { Booking } from "./pages/Booking";
import { RouteDetail } from "./pages/RouteDetail";
import { Hotels } from "./pages/Hotels";
import { Routes } from "./pages/Routes";
import { Tours } from "./pages/Tours";
import { Transport } from "./pages/Transport";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "routes", Component: Routes },
      { path: "routes/:id", Component: RouteDetail },
      { path: "tours", Component: Tours },
      { path: "transport", Component: Transport },
      { path: "hotels", Component: Hotels },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "booking", Component: Booking },
      { path: "*", Component: NotFound },
    ],
  },
]);