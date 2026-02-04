import { Routes, Route } from "react-router";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { SearchPage } from "./pages/Search.jsx";
import { HomePage } from "./pages/Home.jsx";
import { NotFoundPage } from "./pages/404.jsx";
import ContactPage from "./pages/Contact.jsx";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}
