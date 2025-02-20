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
import { useRouter } from "next/navigation";

const RegisterMainPage: React.FC = () => {

  const router = useRouter();

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
                <h2>Verify Your Account</h2>
              </div>
              <div className="login-discription">
                <h3>OTP sent to your email!</h3>
                <h4>Resend?</h4>

              </div>
              <div className="form-sec">
                <div>
                  <RegisterForm />
                  <div style={
                    {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "20px",
                      cursor: "pointer",
                    }
                  }>
                    <h6>
                      <span onClick={
                        async () => {
                          const resp = await fetch("/api/logout", {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                          })
                          if (resp.status === 200) {
                            router.replace('/login')
                          }
                        }
                      }>Logout?</span>
                    </h6>
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
