import { User } from "@/layout/LayoutTypes";
import { Dispatch, SetStateAction } from "react";

export interface OverlayNames {
  color?: string;
  image: number;
}

export interface ShowFriendMenuInterFace {
  icon: "User" | "Search" | "Settings";
  detail: string;
}

export interface DropDownProps {
  darkIcon?: boolean;
}

export interface LikePageInterFace {
  tittle: string;
  type: string;
  member: number;
  active: boolean;
}

export interface postDropDownOptionInterface {
  iconName: "Bookmark" | "XSquare" | "X";
  post: string;
}


export interface CommentSimp {
  id: number;
  user_id: number;
  post_id: number;
  content: string;
  created_at: Date;
  name: string;
  profile_pic?: string;
}

export interface Post {
  comments_count?: number; // optional
  content?: string;        // optional
  created_at: Date;
  id: number;
  image?: string;          // optional
  liked?: boolean;         // optional
  likes?: number[];        // optional
  likes_count?: number;    // optional
  title?: string;          // optional
  user_id: number;
  name?: string;
  video?: string;
  profile_pic?: string;

  author_name?: string;
}

export interface Article {
  content?: string;        // optional
  created_at: Date;
  id: number;
  tags?: string[];         // optional
  photo?: string;          // optional
  title?: string;          // optional
  user_id: number;
  author_name?: string;
  description?: string;
  profile_pic?: string;
  pdf?: string;
}

export interface PostArray {
  currP: Post[];
  user?: User;
  friends?: User[];
  notfriends?: User[];
  reloadFriends?: () => void
}

export interface ArticlesArray {
  currA: Article[];
  user?: User;
  friends?: User[];
  notfriends?: User[];
  reloadFriends?: () => void
}

export interface ArticleArray {
  currA: Article;
  user?: User;
  friends?: User[];
  notfriends?: User[];
  reloadFriends?: () => void
}

export interface PostBoxInterface {
  post?: Post;
  setLike?: Dispatch<SetStateAction<number>>;
  setComment?: Dispatch<SetStateAction<number>>;
  like?: number;
  heading?: string;
  span?: string;
  comment?: number;
}

export interface ArticleBoxInterface {
  post?: Article;
  setLike?: Dispatch<SetStateAction<number>>;
  setComment?: Dispatch<SetStateAction<number>>;
  like?: number;
  heading?: string;
  span?: string;
  comment?: number;
}

export interface ArticleInterface {
  article?: Article;
  setLike?: Dispatch<SetStateAction<number>>;
  setComment?: Dispatch<SetStateAction<number>>;
  like?: number;
  heading?: string;
  span?: string;
  comment?: number;
}


export interface SufiyaElizaThirdPostInterface {
  fourthPost?: number;
  userImage: number;
  iframeLink?: string;
  post?: Post;
}

export interface CommonGalleryImageProps {
  imageName: number | undefined;
  onClickHandle: () => void;
}

export interface SufiyaElizaFirstPostInterFace {
  userImage: number;
  mainImage: number;
  className?: string
}

export interface PostDetailInterFace {
  mainImage: number;
}


export interface SufiyaElizaSecondPostInterFace {
  userImage: number;
}

export interface EventsCardInterFace {
  eventImage: number
  diffrentPath?: string
}

export interface BirthdayReminderInterFace {
  mainClass?: string

}

export interface SufiyaElizaMultiplePostInterFace {
  moreImage?: boolean
  diffrentImage?: boolean
  userImage?: number
  main: number, second: number, third: number
}

export interface SidebarPanelInterFace {
  showSideBar: boolean;
  ref: React.RefObject<HTMLDivElement>;
}

export interface SufiyaElizaTwoPhotoPostInterFace {
  diffrentImage?: boolean
}

export interface FriendSuggestionInterFace {
  mainClassName?: string
}
export interface StorySectionProps {
  storyShow?: number
}