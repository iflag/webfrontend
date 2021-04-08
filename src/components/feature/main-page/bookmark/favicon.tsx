import axios from "axios";
import React, { useState, useEffect } from "react";
import { Bookmark, FolderInfo } from "./bookmark";

type Props = {
  content: FolderInfo | Bookmark;
};

const cleanUrl = (url: string) => {
  // url에서 호스트만 추출한다.
  let cleanedUrl = url.includes("https")
    ? url.slice(8)
    : url.includes("http")
    ? url.slice(7)
    : "";
  if (cleanedUrl) {
    cleanedUrl = (cleanedUrl as string).includes("/")
      ? (cleanedUrl as string).split("/")[0]
      : cleanedUrl;
  }
  return cleanedUrl;
};

const Favicon = ({ content }: Props) => {
  const siteUrl = cleanUrl((content as Bookmark).url);
  const [favicon, setFavicon] = useState();
  const [isReady, setIsReady] = useState(false);
  const [isError, setError] = useState(false);

  const getFavicon = async (url: string) => {
    // grabber api 사용
    try {
      const {
        data: { icons },
      } = await axios.get(`https://favicongrabber.com/api/grab/${url}`);
      if (icons[0].src !== "") {
        setFavicon(icons[0].src);
      } else {
        throw new Error("undefined url");
      }
    } catch (error) {
      setError(true);
    }
    setIsReady(true);
  };

  useEffect(() => {
    getFavicon(siteUrl);
  }, []);

  return (
    <div>
      {isReady ? (
        isError ? (
          <>
            <img
              src={`http://www.google.com/s2/favicons?domain=${siteUrl}`}
              width="30"
              height="30"
              alt="icon"
            />
          </>
        ) : (
          <>
            <img src={favicon} width="30" height="30" alt="icon" />
          </>
        )
      ) : (
        <>
          <img
            src={`http://www.google.com/s2/favicons?domain=${siteUrl}`}
            width="30"
            height="30"
            alt="icon"
          />
        </>
      )}
    </div>
  );
};

export default Favicon;
