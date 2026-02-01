import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";

import { SearchPage } from "./pages/Search.jsx";
import { HomePage } from "./pages/Home.jsx";
import { NoutFoundPage } from "./pages/404.jsx";
import { Route } from "./components/Route.jsx";
import ContactPage from "./pages/Contact.jsx";

export default function App() {
  return (
    <>
      <Header />
      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/404" component={NoutFoundPage} />
      <Route path="/contact" component={ContactPage} />
      <Footer />
    </>
  );
}
