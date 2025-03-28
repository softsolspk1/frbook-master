import { Href } from "@/utils/constant";
import { About, Upgrade, Resources, Communication } from "@/utils/constant";
import Link from "next/link";

const PostStats = () => {
  return (
    <div className="post-stats">
      <ul
        style={{
          fontSize: "10px",
          color: "white",
          backgroundColor: "#00000000",
        }}
      >
        <li>
        <Link
            href={"/user"}
            style={{ fontSize: "10px", color: "white", fontWeight: "bold" }}>
            {About}
          </Link>
        </li>
        <li>
          <Link
            href={"/dashboard/repository"}
            style={{ fontSize: "10px", color: "white", fontWeight: "bold" }}>
            {Upgrade}
          </Link>
        </li>
        <li>
        <Link
            href={"/dashboard/resources"}
            style={{ fontSize: "10px", color: "white", fontWeight: "bold" }}>
            {Resources}
          </Link>
        </li>
        <li>
          <a style={{ fontSize: "10px", color: "white", fontWeight: "bold" }}>
            {Communication}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PostStats;
