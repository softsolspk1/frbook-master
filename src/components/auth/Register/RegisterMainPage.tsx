import { Col, Container, Row } from "reactstrap";
import SocialLinks from "../login/SocialLinks";
import { Register } from "../../../utils/constant";
import RegisterForm from "./RegisterForm";
import {
  HelloEveryoneWelcome,
  WelcomeFriendBookLoginAccount,
} from "../../../utils/constant";
import iconLogo from "../../../../public/assets/images/icon/logo.png";
import Image from "next/image";

const RegisterMainPage: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col xl="6" lg="5" className=" d-none d-lg-block">
          <div className="login-welcome">
            <div>
              <Image
                height={320}
                width={480}
                src={iconLogo}
                alt="logo"
                className="img-fluid blur-up lazyloaded"
              />
            </div>
          </div>
        </Col>
        <Col xl="6" lg="7" md="10" xs="12" className="m-auto">
          <div className="login-form">
            <div>
              <div className="login-title">
                <h2>{Register}</h2>
              </div>
              <div className="login-discription">
                <h3>{HelloEveryoneWelcome}</h3>
                <h4>{WelcomeFriendBookLoginAccount}</h4>
              </div>
              <div className="form-sec">
                <div>
                  <RegisterForm />
                  <div className="connect-with">
                    <h6>
                      <span>OR Connect With</span>
                    </h6>
                    <SocialLinks />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterMainPage;
