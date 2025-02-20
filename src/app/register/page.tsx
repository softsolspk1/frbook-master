"use client";
import RegisterMainPage from "@/components/auth/Register/RegisterMainPage";
import LoginHeaderSection from "@/components/auth/login/LoginHeaderSection";
import ThemeCustomizer from "@/layout/CommonLayout/ThemeCustomizer";
import LoadingLoader from "@/layout/LoadingLoader";

const RegisterPage = () => {
  return (
    <>
      <LoadingLoader />
      <section className="login-section">
        <LoginHeaderSection />
        <RegisterMainPage />
      </section>
      <ThemeCustomizer />
    </>
  );
};

export default RegisterPage;
