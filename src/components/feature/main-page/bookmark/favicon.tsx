import axios from "axios";
import "components/feature/main-page/bookmark/favicon.scss";
import React, { memo, useEffect } from "react";
import { cleanUrl } from "./bookmark-item";

type Props = {
  url: string;
  favicon: string;
  setFavicon: React.Dispatch<React.SetStateAction<string>>;
};

const Favicon = ({ url, favicon, setFavicon }: Props) => {
  const getFavicon = async () => {
    const faviconUrl = cleanUrl(url);

    const {
      data: { icons },
    } = await axios.get(`http://favicongrabber.com/api/grab/${faviconUrl}`);
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
        width="25"
        height="25"
        alt="icon"
        className="favicon"
      />
    </div>
  );
};

export default memo(Favicon);
