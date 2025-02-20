import SvgIconCommon from "@/Common/SvgIconCommon";

const SocialLinks = () => {
  const names = [
    { link: "https://www.google.com/", name: "google" },
    { link: "https://www.facebook.com/", name: "facebook" },
  ];
  return (
    <ul className="social-links">
      {names.map((data, index) => (
        <li className={data.name} key={index}>
          <a href={data.link} target="_blank">
            <SvgIconCommon iconName={data.name} />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
