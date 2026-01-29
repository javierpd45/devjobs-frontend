import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";

import { HomePage } from "./pages/Home.jsx";
import { SearchPage } from "./pages/Search.jsx";
import { NoutFoundPage } from "./pages/404.jsx";
import { useRouter } from "./hooks/useRouter.js";

function App() {
  const { currentPath } = useRouter();

  let page = <NoutFoundPage />;

  if (currentPath === "/") {
    page = <HomePage />;
  } else if (currentPath.toLowerCase() === "/search") {
    page = <SearchPage />;
  }

  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  );
}

export default App;
