"use client";
import AuthenticationMainSection from "@/components/auth/login/AuthenticationMainSection";
import LoginHeaderSection from "@/components/auth/login/LoginHeaderSection";
import LoadingLoader from "@/layout/LoadingLoader";

const Login = () => {
  return (
    <>
      <LoadingLoader />
      <section className="login-section">
        <LoginHeaderSection />
        <AuthenticationMainSection />
        <div className="how-work"></div>
      </section>
    </>
  );
};

export default Login;
