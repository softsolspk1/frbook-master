import {
  SideBarDataInterFace,
  UserMenuDataInterFace,
  sideBarDataType,
} from "@/layout/LayoutTypes";
import LoadingLoader from "@/layout/LoadingLoader";
import Style1Skelton from "@/layout/Skelton/Style1Skelton";
import Style3Skelton from "@/layout/Skelton/Style3Skelton";
import Style4Skelton from "@/layout/Skelton/Style4Skelton";
import Style6Skelton from "@/layout/Skelton/Style6Skelton";
import Style7Skelton from "@/layout/Skelton/Style7Skelton";
import Style8Skelton from "@/layout/Skelton/Style8Skelton";
import Style9Skelton from "@/layout/Skelton/Style9Skelton";
import Style10Skelton from "@/layout/Skelton/Style10Skelton";
import Style11Skelton from "@/layout/Skelton/Style11Skelton";
import Style12Skelton from "@/layout/Skelton/Style12Skelton";
import FavoriteHomePage from "@/layout/Skelton/FavoriteHomePage";
import FavoriteAboutPage from "@/layout/Skelton/FavoriteAboutPage";
import FavoriteReviews from "@/layout/Skelton/FavoriteReviews";
import FavoriteGallery from "@/layout/Skelton/FavoriteGallery";
import MusicSkelton from "@/layout/Skelton/MusicSkelton";
import WeatherSkelton from "@/layout/Skelton/WeatherSkelton";
import EventSkelton from "@/layout/Skelton/EventSkelton";
import BirthDaySkelton from "@/layout/Skelton/BirthDaySkelton";
import GameSkelton from "@/layout/Skelton/GameSkelton";
import ProfileTimeLine from "@/layout/Skelton/ProfileTimeLine";
import AboutProfileSkelton from "@/layout/Skelton/AboutProfileSkelton";
import ProfileFriendSkelton from "@/layout/Skelton/ProfileFriendSkelton";
import ProfileGallery from "@/layout/Skelton/profileGallery";
import ActivityFeedProfileSkelton from "@/layout/Skelton/ActivityFeedProfileSkelton";
import PageList from "@/layout/Skelton/PageList";

export const userMessageData = [
  { status: "active", name: "Paige Turner", message: "Are you there ?" },
  { name: "Bob Frapples", message: "Are you there ?" },
  { status: "offline", name: "Paige Turner", message: "hello ! how are you ?" },
];

export const notificationList = [
  {
    image: 6,
    name: "Bob Frapples",
    message: "add their stories",
    time: "8 hour ago",
  },
  {
    image: 7,
    name: "Josephin water",
    message: "have birthday today",
    time: "sun at 5.55 AM",
  },
  {
    image: 2,
    name: "Petey Cruiser",
    message: "added a new photo",
    time: "sun at 5.40 AM",
  },
];

export const userMenuData: UserMenuDataInterFace[] = [
  {
    navigate: "/dashboard/profile/about",
    icon: "User",
    heading: "Profile",
    headingDetail: "Profile preview & settings",
  },
  {
    navigate: "/settings",
    icon: "Settings",
    heading: "setting & privacy",
    headingDetail: "all settings & privacy",
  },
  {
    navigate: "/helpandsupport",
    icon: "HelpCircle",
    heading: "help & support",
    headingDetail: "browse help here",
  },
];

export const sideBarData: sideBarDataType[] = [
  { path: "", icon: "File", tooltipTittle: "newsfeed" },
  { path: "", icon: "Star", tooltipTittle: "My courses" },
  { path: "", icon: "User", tooltipTittle: "Communities" },
  { path: "", icon: "Headphones", tooltipTittle: "Mentorship" },
  { path: "", icon: "Cloud", tooltipTittle: "Events" },
  { path: "", icon: "Calendar", tooltipTittle: "Learning Materialsss" },
];

export const smallSideBarData: SideBarDataInterFace[] = [
  { title: "newsfeed", icon: "File", path: "/dashboard/feed" },
  { title: "Repository", icon: "Cloud", path: "/dashboard/repository" },
  { title: "Resources", icon: "Cloud", path: "/dashboard/resources" },
];
export const newsFeedLayoutData = [
  { title: "style 2", navigate: "/newsfeed/style2" },
  { title: "style 3", navigate: "/newsfeed/style3" },
  { title: "style 4", navigate: "/newsfeed/style4" },
  { title: "style 5", navigate: "/newsfeed/style5" },
  { title: "style 6", navigate: "/newsfeed/style6" },
  { title: "style 7", navigate: "/newsfeed/style7" },
  { title: "style 8", navigate: "/newsfeed/style8" },
  { title: "style 9", navigate: "/newsfeed/style9" },
  { title: "style 10", navigate: "/newsfeed/style10" },
  { title: "style 11", navigate: "/newsfeed/style11" },
  { title: "style 12", navigate: "/newsfeed/style12" },
];

export const profilePagesData = [
  { title: "timeline", navigate: "" },
  { title: "about", navigate: "" },
  { title: "friends", navigate: "" },
  { title: "gallery", navigate: "" },
  { title: "Acitivity Feed", navigate: "" },
  { title: "tab", navigate: "" },
  { title: "friend profile", navigate: "" },
];
export const favouritePagesData = [
  { title: "Page Listing", navigate: "" },
  { title: "Page Home", navigate: "" },
  { title: "About", navigate: "" },
  { title: "Review", navigate: "" },
  { title: "Gallery", navigate: "" },
  { title: "Tab", navigate: "" },
];
export const otherPagesData = [
  { diffrentImage: "events", title: "Event & Calender", navigate: "/event" },
  { diffrentImage: "birthday", title: "Birthday", navigate: "/birthday" },
  { diffrentImage: "weather", title: "Weather", navigate: "/weather" },
  { diffrentImage: "music", title: "Music", navigate: "/music" },
  { diffrentImage: "events", title: "Games", navigate: "/games" },
  { diffrentImage: "login", title: "Login", navigate: "/auth/login" },
  { diffrentImage: "register", title: "Register", navigate: "/auth/register" },
  {
    diffrentImage: "help",
    title: "Help & Support",
    navigate: "/helpandsupport",
  },
  { diffrentImage: "messanger", title: "Messenger", navigate: "/messanger" },
  { diffrentImage: "setting", title: "Setting", navigate: "/settings" },
  { diffrentImage: "help", title: "help Article", navigate: "/helparticle" },
];
export const companyPagesData = [
  { diffrentImage: "home", title: "Home", navigate: "/company/home" },
  { diffrentImage: "about", title: "About", navigate: "/company/about" },
  { diffrentImage: "blog", title: "Blog", navigate: "/company/blog" },
  {
    diffrentImage: "blog-details",
    title: "Blog Details",
    navigate: "/company/blog-details",
  },
  { diffrentImage: "faq", title: "Faq", navigate: "/company/faq" },
  { diffrentImage: "career", title: "Career", navigate: "/company/careers" },
  {
    diffrentImage: "career-details",
    title: "Career Details",
    navigate: "/company/careers-details",
  },
  {
    diffrentImage: "coming-soon",
    title: "Coming soon",
    navigate: "/company/comingsoon",
  },
  { diffrentImage: "404", title: "404", navigate: "/company/404" },
];
export const elementPagesData = [
  {
    diffrentImage: "typography",
    title: "typography",
    navigate: "/element/typography",
  },
  {
    diffrentImage: "widget",
    title: "SideBar widgets",
    navigate: "/element/widget",
  },
  {
    diffrentImage: "calendar",
    title: "calendar",
    navigate: "/element/calender",
  },
  { diffrentImage: "map", title: "maps", navigate: "/element/map" },
  { diffrentImage: "icons", title: "icons", navigate: "/element/icons" },
  { diffrentImage: "modal", title: "modal", navigate: "/element/modal" },
  { diffrentImage: "buttons", title: "buttons", navigate: "/element/buttons" },
];

export const closeFriendsData = [
  { id: 1, name: "Paige Turner", image: "1", message: ["demo1"] },
  { id: 2, name: "Bob Frapples", image: "2", message: ["demo2"] },
];

export const recentChatsData = [
  { id: 3, name: "Josephin Water", image: "3", message: ["demo1"] },
  { id: 4, name: "Petey Cruiser", image: "4", message: ["demo2"] },
  { id: 5, name: "Anna Sthesia", image: "5", message: ["demo2"] },
  { id: 6, name: "Paul Molive", image: "6", message: ["demo2"] },
  { id: 7, name: "Anna Mull", image: "7", message: ["demo2"] },
];

export const profileUserData = [
  { value: "546", title: "following" },
  { value: "26335", title: "likes" },
  { value: "6845", title: "followers" },
];

interface dataInterFace {
  name: string;
  navigate: string;
  icon: "Clock" | "Info" | "Users" | "Image" | "List";
}
export const profileMenuData: dataInterFace[] = [
  { navigate: "/dashboard/profile/timeline", name: "timeline", icon: "Clock" },
  { navigate: "/dashboard/profile/about", name: "about", icon: "Info" },
  { navigate: "/dashboard/profile/friends", name: "friends", icon: "Users" },
  { navigate: "/dashboard/profile/gallery", name: "photos", icon: "Image" },
  { navigate: "/dashboard/profile/acitivityfeed", name: "acitivity feed", icon: "List" },
];

export const layoutFooterData = [
  {
    mainTittle: "my account",
    children: [
      { title: "timeline" },
      { title: "about" },
      { title: "friends" },
      { title: "gallery" },
      { title: "settings" },
    ],
  },
  {
    mainTittle: "quick links",
    children: [
      { title: "settings" },
      { title: "help & support" },
      { title: "messanger" },
      { title: "pages" },
      { title: "company" },
    ],
  },
  {
    mainTittle: "pages",
    children: [
      { title: "Home" },
      { title: "E-learning" },
      { title: "Repository" },
      { title: "Resources" },
      { title: "Communication" },
    ],
  },
  {
    mainTittle: "company",
    children: [
      { title: "about us" },
      { title: "blog" },
      { title: "contact us" },
      { title: "faq" },
      { title: "careers" },
    ],
  },
];

export const companyNavBarData = [
  { title: "Home", navigate: "" },
  { title: "about", navigate: "" },
  { title: "career", navigate: "" },
  { title: "blog", navigate: "" },
  { title: "FAQ", navigate: "" },
];
export const skeltonLoaderList: { [key: string]: React.ReactElement } = {
  defaultLoader: <LoadingLoader />,
  style1: <Style1Skelton />,
  style3: <Style3Skelton />,
  style4: <Style4Skelton />,
  style6: <Style6Skelton />,
  style7: <Style7Skelton />,
  style8: <Style8Skelton />,
  style9: <Style9Skelton />,
  style10: <Style10Skelton />,
  style11: <Style11Skelton />,
  style12: <Style12Skelton />,
  pageList: <PageList />,
  favoriteHomePage: <FavoriteHomePage />,
  favoriteAboutPage: <FavoriteAboutPage />,
  favoriteReviews: <FavoriteReviews />,
  favoriteGallery: <FavoriteGallery />,
  music: <MusicSkelton />,
  weatherSkelton: <WeatherSkelton />,
  eventSkelton: <EventSkelton />,
  birthDayLoader: <BirthDaySkelton />,
  gameSkelton: <GameSkelton />,
  profileTimeLine: <ProfileTimeLine />,
  aboutProfileSkelton: <AboutProfileSkelton />,
  profileFriend: <ProfileFriendSkelton />,
  profileGallery: <ProfileGallery />,
  activityFeedProfile: <ActivityFeedProfileSkelton />,
};
