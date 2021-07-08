import axios from 'axios';
import 'components/feature/main-page/bookmark/favicon.scss';
import React, { memo, useEffect } from 'react';

type Props = {
  faviconUrl: string;
  favicon: string;
  setFavicon: React.Dispatch<React.SetStateAction<string>>;
};

const Favicon = ({ faviconUrl, favicon, setFavicon }: Props) => {
  const getFavicon = async () => {
    try {
      const {
        data: { icons },
      } = await axios.get(`http://favicongrabber.com/api/grab/${faviconUrl}`);
      if (icons[0].src !== '') {
        setFavicon(icons[0].src);
      }
    } catch (error) {
      setFavicon(`http://www.google.com/s2/favicons?domain=${faviconUrl}`);
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
