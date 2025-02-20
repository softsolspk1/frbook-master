import { ImagePath } from "../../../utils/constant";
import Image from "next/image";
import Link from "next/link";

const BrandLogo = ({ differentLogo }: { differentLogo?: string }) => {
  return (
    <div className="brand-logo">
      <Link href="/home">
        <Image
          width={64}
          height={32}
          src={`${ImagePath}/icon/${
            differentLogo ? differentLogo : "logo.png"
          }`}
          alt="logo"
          className="img-fluid blur-up lazyloaded"
        />
      </Link>
    </div>
  );
};

export default BrandLogo;
