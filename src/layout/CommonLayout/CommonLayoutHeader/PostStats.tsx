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
          <a style={{ fontSize: "10px", color: "white", fontWeight: "bold" }}>
            {About}
          </a>
        </li>
        <li>
          <Link
            href={"/dashboard/repository"}
            style={{ fontSize: "10px", color: "white", fontWeight: "bold" }}>
            {Upgrade}
          </Link>
        </li>
        <li>
          <a style={{ fontSize: "10px", color: "white", fontWeight: "bold" }}>
            {Resources}
          </a>
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
