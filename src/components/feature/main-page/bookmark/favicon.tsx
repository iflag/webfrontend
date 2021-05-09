import axios from "axios";
import "components/feature/main-page/bookmark/favicon.scss";
import React, { useEffect } from "react";
import { Bookmark } from "./bookmark-section";

type Props = {
  content: Bookmark;
  favicon: string;
  setFavicon: React.Dispatch<React.SetStateAction<string>>;
};

const Favicon = ({ content, favicon, setFavicon }: Props) => {
  const { url } = content;

  const getFavicon = async () => {
    const {
      data: { icons },
    } = await axios.get(`https://favicongrabber.com/api/grab/${url}`);
    if (icons[0].src !== "") {
      setFavicon(icons[0].src);
    }
  };

  useEffect(() => {
    getFavicon();
  }, []);

  return (
    <div>
      <img
        src={favicon}
        width="30"
        height="30"
        alt="icon"
        className="favicon"
      />
    </div>
  );
};

export default Favicon;
