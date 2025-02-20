"use client";
import CreatePost from "@/Common/CreatePost";
import PostBox from "@/components/NewsFeed/Style1/ContentCenter/PostBox";
import SufiyaElizaFirstPost from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaFirstPost";
import SufiyaElizaSecondPost from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaSecondPost";
import SufiyaElizaThirdPost from "@/components/NewsFeed/Style1/ContentCenter/SufiyaElizaThirdPost";
import { Post, PostArray } from "@/components/NewsFeed/Style1/Style1Types";
import GemixStore from "@/components/NewsFeed/Style3/ContentCenter/GemixStore";
import SufiyaElizaMultiplePost from "@/components/NewsFeed/Style3/ContentCenter/SufiyaElizaMultiplePost";
import { User } from "@/layout/LayoutTypes";
import WithUserLayout from "@/layout/WithUserLayout";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Col, Container, Input, Row } from "reactstrap";
import RichTextEditor from "./Rtx";
import axios from "axios";
import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { DocumentPlusIcon, PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const NewsFeedStyle10: FC<PostArray> = ({ currP = [], user }) => {

  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imgUrl, setImgUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [friends1, setFriends] = useState<User[]>([]);
  const [notfriends1, setNotFriends] = useState<User[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef2 = useRef<HTMLInputElement | null>(null);
  const reloadAllFr = async () => {
    var resp = await fetch(`/api/friends`);
    if (resp.status === 200) {
      var data = await resp.json();
      setFriends(data);
    } else {
      setFriends([]);
    }

    var resp2 = await fetch(`/api/notfriends`);
    if (resp2.status === 200) {
      var data2 = await resp2.json();
      setNotFriends(data2);
    } else {
      setNotFriends([]);
    }
  };


  const formSubmitHandle = async () => {
    const resp = await fetch(`/api/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
        tags: tag,
        image: imgUrl,
        description: description,
        pdf: pdfUrl,
        author_name: author,
      }),
    });

    if (resp.status === 200) {
      toast.success("Post created successfully");
      router.push("/dashboard/repository");
    } else {
      const message = await resp.json();
      toast.error(message || "Something went wrong");
    }
  };


  const handleClick = () => {
    fileInputRef!.current!.click();
  };

  const handleClick2 = () => {
    fileInputRef2!.current!.click();
  };

  const handleImg = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("yolo");

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_API_BASE + "/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(data);

    if (!data) {
      return;
    }

    setImgUrl(data);
  };

  const handlePdf = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("yolo");

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_API_BASE + "/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(data);

    if (!data) {
      return;
    }

    setPdfUrl(data);
  };


  const handleContentChange = (content: string) => {
    setContent(content);
  };


  useEffect(() => {
    setTimeout(() => {
      document.documentElement.style.setProperty(
        "--theme-color",
        "3, 137, 201"
      );
    }, 3500);
    reloadAllFr();

    return () => {
      document.documentElement.style.setProperty(
        "--theme-color",
        "3, 137, 201"
      );
    };
  }, []);

  return (
    <>
      <WithUserLayout
        friends={friends1}
        notfriends={notfriends1}
        reloadFriends={reloadAllFr}
        loaderName="style10"
        user={user}
      >
        <div className="page-center">
          <div className="pb-2">
            <div className="md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  New Article
                </h2>
              </div>
              <div className="flex md:ml-4 md:mt-0">
                <button
                  onClick={formSubmitHandle}
                  type="button"
                  style={
                    {
                      // use theme color for background color
                      backgroundColor: "rgba(3, 137, 201, 1)",
                    }
                  }
                  className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
          <Container fluid className="px-0 mt-2 pt-2 border-t-2 ">
            <div>
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                  type="text"
                  placeholder="Fundamental of Medicine"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-full mt-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Author Name
              </label>
              <div className="mt-2">
                <input
                  id="author"
                  onChange={(e) => setAuthor(e.target.value)}
                  name="author"
                  type="text"
                  placeholder="Dr. John Doe"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full mt-4">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Cover Image
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <div className="relative">
                  <UserCircleIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                  {imgUrl && (
                    <img
                      src={process.env.NEXT_PUBLIC_API_BASE + "/assets/" + imgUrl}
                      alt="Selected cover"
                      className="absolute inset-0 h-12 w-12 object-cover"
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleClick}
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImg}
                  className="hidden"
                />
              </div>
            </div>
            <div className="col-span-full mt-4">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Pdf
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <div className="relative">
                  <DocumentPlusIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                </div>
                <button
                  type="button"
                  onClick={handleClick2}
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
                <input
                  type="file"
                  ref={fileInputRef2}
                  accept="application/pdf"
                  onChange={handlePdf}
                  className="hidden"
                />
              </div>
              {pdfUrl && (
                <label htmlFor="photo" className="block font-small leading-6 text-gray-900">
                  Pdf Uploaded
                </label>
              )}
            </div>
            <div className="col-span-full mt-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Tags (comma separated)
              </label>
              <div className="mt-2">
                <input
                  id="tag"
                  onChange={(e) => setTag(e.target.value)}
                  name="tag"
                  type="text"
                  placeholder="medicine, health, science"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-full mt-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="tag"
                  onChange={(e) => setDescription(e.target.value)}
                  name="tag"
                  placeholder="..."
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="title" className="block  text-sm mb-2 font-medium leading-6 text-gray-900">
                Content
              </label>
              <RichTextEditor value={content} onChange={handleContentChange}></RichTextEditor>
            </div>

          </Container>
        </div >
      </WithUserLayout >
    </>
  );
};

export default NewsFeedStyle10;
