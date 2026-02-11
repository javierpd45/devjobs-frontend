import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import { Header } from "./components/Header/Header.jsx";
import { Footer } from "./components/Footer/Footer.jsx";

import { Loading } from "./components/Loading/Loading.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute.jsx";

const HomePage = lazy(() => import("./pages/Home.jsx"));
const SearchPage = lazy(() => import("./pages/Search.jsx"));
const NotFoundPage = lazy(() => import("./pages/404.jsx"));
const JobDetail = lazy(() => import("./pages/Detail.jsx"));
const ContactPage = lazy(() => import("./pages/Contact.jsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));

export default function App() {
  return (
    <>
      <Header />

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/jobs/:jobId" element={<JobDetail />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute redirectTo="/login">
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}
