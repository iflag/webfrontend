import React, { useEffect, useState } from "react";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import "components/Layout/header.scss";
import UserData from "utils/user-data";
import Auth from "components/feature/header/auth/auth";
import AuthService from "utils/auth-service";
import { useUserDispatch, useUserState } from "contexts/user-context";
import styled from "styled-components";
import GithubIcon from "assets/images/Github.svg";
import DDGIcon from "assets/images/DDG.svg";
import GoogleIcon from "assets/images/Google.svg";
import NaverIcon from "assets/images/Naver.png";
import WAIcon from "assets/images/WA.svg";

type styleProps = {
  imgUrl: string;
};

const SearchEngine = styled.figure`
  position: absolute;
  width: 1rem;
  height: 1rem;
  margin: 0;
  background-image: url(${({ imgUrl }: styleProps) => imgUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

type Props = {
  userData: UserData;
  authService: AuthService;
};

export type SelectedForm = "close" | "login" | "register" | "findPassword";

const Header = ({ userData, authService }: Props) => {
  const userState = useUserState();
  const userDispatch = useUserDispatch();

  // const [logined, setLogined] = useState(false);
  const [toggleButtonList, setToggleButtonList] = useState(false);
  const [selectedSearchEngine, setSelectedSearchEngine] = useState("Google");
  const [searchEngines, setSearchEngines] = useState([
    "Google",
    "Naver",
    "DDG",
    "Github",
    "WA",
  ]);
  const [searchContent, setSearchContent] = useState("");
  const [showSelectedForm, setShowSelectedForm] = useState<SelectedForm>(
    "close"
  );

  const [searchEngineImgs, setSearchEngineImgs] = useState([
    GoogleIcon,
    NaverIcon,
    DDGIcon,
    GithubIcon,
    WAIcon,
  ]);

  useEffect(() => {
    userData
      .selectSearchEngine(selectedSearchEngine)
      .then((response) => console.log(response));
  }, [selectedSearchEngine]);

  useEffect(() => {
    if (!userData.onLogin()) {
      setShowSelectedForm("login");
    }
  }, [userState.onLogin]);

  const browseInNewTab = () => {
    if (selectedSearchEngine === "Google") {
      window.open(
        `https://duckduckgo.com/?q=!google+${searchContent}`,
        "_blank"
      );
    }
    if (selectedSearchEngine === "Naver") {
      window.open(
        `https://duckduckgo.com/?q=!naver+${searchContent}`,

        "_blank"
      );
    }
    if (selectedSearchEngine === "DDG") {
      window.open(`https://duckduckgo.com/?q=${searchContent}`, "_blank");
    }
    if (selectedSearchEngine === "Github") {
      window.open(
        `https://duckduckgo.com/?q=!github+${searchContent}`,
        "_blank"
      );
    }
    if (selectedSearchEngine === "WA") {
      window.open(`https://duckduckgo.com/?q=!wa+${searchContent}`, "_blank");
    }
    authService.refreshToken();
  };

  return (
    <header className="header">
      <div className="header-main">
        <figure className="header-logo" />
        <div className="header-search">
          <ul className="header-buttonList">
            {searchEngines.map(
              (
                searchEngine: string,
                idx: number
              ): React.DetailedHTMLProps<
                React.LiHTMLAttributes<HTMLLIElement>,
                HTMLLIElement
              > => (
                <li key={idx} className="header-buttonItem">
                  <button
                    className={`header-searchEngine ${
                      toggleButtonList || selectedSearchEngine === searchEngine
                        ? "visible"
                        : ""
                    }`}
                    onClick={() => {
                      setToggleButtonList((prev) => !prev);
                      setSelectedSearchEngine(searchEngine);
                      searchEngines.splice(idx, 1);
                      searchEngines.unshift(searchEngine);

                      const selectedSearchEngineImg = searchEngineImgs[idx];
                      searchEngineImgs.splice(idx, 1);
                      searchEngineImgs.unshift(selectedSearchEngineImg);
                    }}
                  >
                    <SearchEngine imgUrl={searchEngineImgs[idx]} />
                    {searchEngine}
                  </button>
                </li>
              )
            )}
          </ul>
          <form
            className="header-searchForm"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              browseInNewTab();
              userData.saveSearchHistory(searchContent);
            }}
          >
            <input
              className="header-searchInput"
              value={searchContent}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setSearchContent(e.target.value);
              }}
            />
            <button className="header-searchButton" type="submit">
              <HiOutlineArrowCircleRight />
            </button>
          </form>
        </div>
        {userState.onLogin ? (
          <button
            className="header-logoutButton"
            onClick={() => {
              authService.logout();
              userDispatch({ type: "LOGOUT" });
            }}
          >
            Logout
          </button>
        ) : (
          <button
            className="header-loginButton"
            onClick={() => setShowSelectedForm("login")}
          >
            Login
          </button>
        )}
      </div>

      {/* <div className="header-recentSearch">
        <p>Recently</p>
        최근 검색어는 배열을 받아와서 map으로 보이게하고 클릭하면 검색되도록
        <p>iflag</p>
      </div> */}
      {showSelectedForm !== "close" && (
        <Auth
          authService={authService}
          showSelectedForm={showSelectedForm}
          setShowSelectedForm={setShowSelectedForm}
        />
      )}
    </header>
  );
};

export default Header;
