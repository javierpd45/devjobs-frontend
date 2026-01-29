import { useState, useEffect } from "react";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";

import { HomePage } from "./pages/Home.jsx";
import { SearchPage } from "./pages/Search.jsx";
import { NoutFoundPage } from "./pages/404.jsx";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  let page = <NoutFoundPage />;
  if (currentPath === "/") {
    page = <HomePage />;
  } else if (currentPath.toLowerCase() === "/search") {
    page = <SearchPage />;
  }

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  );
}

export default App;
