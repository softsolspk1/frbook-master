import Image from "next/image";
import Link from "next/link";
import iconLogo from "../../../../public/assets/images/icon/logo.png";

const LoginWelcome = () => {
  return (
    <div className="login-welcome">
      <div>
        <Link href="/home">
          <Image
            height={320}
            width={480}
            src={iconLogo}
            alt="logo"
            className="img-fluid blur-up lazyloaded"
          />
        </Link>
      </div>
    </div>
  );
};

export default LoginWelcome;
