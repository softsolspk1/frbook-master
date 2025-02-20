import { ImagePath, OurFeatures } from "../../../utils/constant";
import Image from "next/image";
import { Col, Container, Row } from "reactstrap";
import Animation from "./Animation";

const FeatureSection: React.FC = () => {
  const names = [
    "Digital E-Learning",
    "Courses",
    "RESPONSIVE Video Lecture",
    "Live Session",
    "Assignments",
    "Certificates",
  ];
  return (
    <section className="feature-section section-pt-space sm-pb-space overflow-hidden">
      <Container>
        <Row>
          <Col xs="12">
            <div className="title-sec">
              <h4>Best Healthcare LMS</h4>
              <h3>E-Learning</h3>
            </div>
          </Col>
          {names.map((data, index) => (
            <Col lg="4" xs="6" className="mobile-w100" key={index}>
              <div className="feature-box">
                <div className="icon-box">
                  <Image
                    height={50}
                    width={50}
                    src={`${ImagePath}/company-landing/icon/feature${
                      index + 1
                    }.png`}
                    className="img-fluid blur-up lazyloaded"
                    alt=""
                  />
                </div>
                <div className="feature-content">
                  <h3>{data}</h3>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <Animation />
    </section>
  );
};

export default FeatureSection;
