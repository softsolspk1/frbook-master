import CustomImage from "@/Common/CustomImage";
import { GetStarted, ImagePath } from "../../../utils/constant";
import Image from "next/image";
import { Col, Container, Row } from "reactstrap";
import { Href } from "../../../utils/constant/index";
import Animation from "./Animation";
import banner from "../../../../public/assets/images/company-landing/home-laptop.png";

const CompanyHomeSection: React.FC = () => {
  const numbers = [1, 2, 3];
  return (
    <section className="home-section overflow-hidden bg-size blur-up lazyloaded">
      <CustomImage
        src={`${ImagePath}/company-landing/home-bg.jpg`}
        className="img-fluid blur-up lazyload bg-img"
        alt="image"
      />
      <div className="home-content">
        <Container>
          <Row>
            <Col lg="7" className="order-lg-2">
              <div className="content-screen">
                <div className="main-screen">
                  <Image
                    src={banner}
                    priority
                    height={320}
                    width={480}
                    alt="image"
                    className="img-fluid blur-up wow zoomIn lazyloaded"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.2s",
                      animationName: "zoomIn",
                    }}
                  />
                </div>
              </div>
            </Col>
            <Col lg="5" className="order-lg-1">
              <div className="content">
                <div>
                  <h1 style={{ fontSize: "24px" }}>
                    easy to connect with <span>medical community</span>
                  </h1>
                  <p style={{ fontSize: "15px" }}>
                    Talk with your peers, earn for your insights, solve
                    challenging patient cases, contribute to the world's largest
                    database of drug ratings - and even laugh at some great
                    jokes.
                  </p>
                  <a href="/login" className="btn btn-solid btn-lg">
                    {GetStarted}
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Animation />
    </section>
  );
};

export default CompanyHomeSection;
