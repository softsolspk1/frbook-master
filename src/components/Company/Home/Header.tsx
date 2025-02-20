import { Back, Login } from "../../../utils/constant";
import Image from "next/image";
import Link from "next/link";
import { FC, Fragment, useState } from "react";
import { Button, Container, NavItem, NavLink } from "reactstrap";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { companyNavData } from "@/Data/company";
import { Href } from "../../../utils/constant/index";
import iconLogo from "../../../../public/assets/images/icon/logo.png";

const CompanyHeader: FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <header className="no-sticky bg-transparent home-landing overflow-hidden">
      <Container>
        <div className="header-section">
          <div className="header-left">
            <div className="brand-logo">
              <Link href="/home">
                <Image
                  height={40}
                  width={80}
                  src={iconLogo}
                  alt="logo"
                  className="img-fluid blur-up lazyloaded"
                />
              </Link>
            </div>
          </div>
          <div className="header-right">
            <nav className="navbar navbar-expand-lg pe-0">
              <div className={`overlay-bg ${navOpen ? "show" : ""} `} />
              <Button
                className="navbar-toggler p-0"
                onClick={() => setNavOpen(!navOpen)}
              >
                <DynamicFeatherIcon
                  iconName="Menu"
                  className="icon iw-22 ih-22 icon-light"
                />
              </Button>
              <div className={`navbar-collapse  ${navOpen ? "show" : ""}`}>
                <ul className="navbar-nav">
                  <NavItem
                    className="d-block d-lg-none back-btn"
                    onClick={() => setNavOpen(!navOpen)}
                  >
                    <NavLink href={Href}>{Back}</NavLink>
                  </NavItem>
                  {companyNavData.map((data, index) => (
                    <Fragment key={index}>
                      <NavItem
                        className={`${data.title === "Home" ? "active" : ""}`}
                      >
                        <Link
                          className="nav-link"
                          href={data.navigate}
                          style={{ fontSize: "12px" }}
                        >
                          {data.title}
                        </Link>
                      </NavItem>
                    </Fragment>
                  ))}
                  <NavItem>
                    <Link
                      className="nav-link d-flex align-items-center btn"
                      href="/login"
                    >
                      <DynamicFeatherIcon
                        iconName="LogIn"
                        className="me-2 iw-18 ih-18"
                      />
                      {Login}
                    </Link>
                  </NavItem>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default CompanyHeader;
