import EducationProfile from "@/components/profile/EducationProfile";
import HobbiesProfile from "@/components/profile/HobbiesProfile";
import ProfileAbout from "@/components/profile/ProfileAbout";
import ProfileFriendList from "@/components/profile/ProfileFriendList";
import ProfileLayout from "@/layout/ProfileLayout";
import { Col, Container, Row } from "reactstrap";
import AboutProfile from "./About";
import { me } from "@/api/operations";


const Page = async () => {

  var meR = await me(); 

  return (
    <AboutProfile user={meR}></AboutProfile>
  );
};

export default Page;
