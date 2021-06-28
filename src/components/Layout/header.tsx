import React, { useEffect, useState } from "react";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import "components/Layout/header.scss";
import UserData from "utils/user-data";
import Auth from "components/feature/header/auth/auth";
import styled from "styled-components";
import GithubIcon from "assets/images/github.svg";
import DDGIcon from "assets/images/ddg.svg";
import GoogleIcon from "assets/images/google.svg";
import NaverIcon from "assets/images/naver.png";
import WAIcon from "assets/images/wa.svg";
import Logo from "assets/images/iflag-logo.svg";
import AuthStore from "stores/auth-store";
import { observer } from "mobx-react";

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
  @media screen and (max-width: 768px) {
    width: 0.8rem;
    height: 0.8rem;
  }
`;

type Props = {
  userData: UserData;
  authStore: AuthStore;
};

export type SelectedForm = "close" | "login" | "register" | "findPassword";

type SearchEngineInfo = {
  key: number;
  name: string;
  image: string;
  abbreviation: string;
  fullName?: string;
};

const Header = observer(({ userData, authStore }: Props) => {
  const [toggleButtonList, setToggleButtonList] = useState(false);
  const [selectedSearchEngine, setSelectedSearchEngine] =
    useState<SearchEngineInfo>({
      key: 1,
      name: "Google",
      image: GoogleIcon,
      abbreviation: "G",
      fullName: "google",
    });
  const [searchEngines, setSearchEngines] = useState<SearchEngineInfo[]>([
    {
      key: 1,
      name: "Google",
      image: GoogleIcon,
      abbreviation: "G",
      fullName: "google",
    },
    {
      key: 2,
      name: "Naver",
      image: NaverIcon,
      abbreviation: "N",
      fullName: "naver",
    },
    {
      key: 3,
      name: "DDG",
      image: DDGIcon,
      abbreviation: "D",
      fullName: "duckduckgo",
    },
    {
      key: 4,
      name: "Github",
      image: GithubIcon,
      abbreviation: "GH",
      fullName: "github",
    },
    {
      key: 5,
      name: "WA",
      image: WAIcon,
      abbreviation: "WA",
      fullName: "wolfram alpha",
    },
  ]);
  const [searchContent, setSearchContent] = useState("");
  const [showSelectedForm, setShowSelectedForm] =
    useState<SelectedForm>("close");

  const saveSeletedSearchEngine = async () => {
    if (!authStore.onLogin) return;
    try {
      await userData.selectSearchEngine(selectedSearchEngine.abbreviation);
    } catch (error) {
      alert(error.request.response);
    }
  };

  const sortSearchEngineList = (newSelectedSearchEngine: SearchEngineInfo) => {
    const newSearchEngines = searchEngines.filter(
      (s) => s.key !== newSelectedSearchEngine.key
    );
    newSearchEngines.sort((a, b) => a.key - b.key);
    setSearchEngines([newSelectedSearchEngine, ...newSearchEngines]);
  };

  const setInitialSearchEngine = async () => {
    const result = await userData.getSelectedSearchEngine();
    const newSelectedSearchEngine = searchEngines.find(
      (s) => s.fullName === result.portal
    );
    if (newSelectedSearchEngine) {
      setSelectedSearchEngine(newSelectedSearchEngine);
      sortSearchEngineList(newSelectedSearchEngine);
    }
  };

  useEffect(() => {
    try {
      setInitialSearchEngine();
    } catch (error) {
      if (error.request.status === 403) {
        authStore.logout();
      }
    }
  }, []);

  useEffect(() => {
    saveSeletedSearchEngine();
  }, [selectedSearchEngine]);

  useEffect(() => {
    if (authStore.onLogin) {
      setShowSelectedForm("close");
    } else {
      setShowSelectedForm("login");
    }
  }, [authStore.onLogin]);

  const browseInNewTab = () => {
    const searchQuery =
      selectedSearchEngine.name === "DDG"
        ? ""
        : `!${selectedSearchEngine.name.toLowerCase()}+`;
    window.open(
      `https://duckduckgo.com/?q=${searchQuery}${searchContent}`,
      "_blank"
    );
  };

  return (
    <header className="header">
      <div className="header-main">
        <img className="header-logo" src={Logo} alt="logo" />
        <div className="header-search">
          <ul className="header-buttonList">
            {searchEngines.map(
              (
                searchEngine: SearchEngineInfo
              ): React.DetailedHTMLProps<
                React.LiHTMLAttributes<HTMLLIElement>,
                HTMLLIElement
              > => (
                <li key={searchEngine.key} className="header-buttonItem">
                  <button
                    className={`header-searchEngine ${
                      toggleButtonList ||
                      selectedSearchEngine.name === searchEngine.name
                        ? "visible"
                        : ""
                    }`}
                    onClick={() => {
                      setToggleButtonList((prev) => !prev);
                      setSelectedSearchEngine(searchEngine);
                      sortSearchEngineList(searchEngine);
                    }}
                  >
                    <SearchEngine imgUrl={searchEngine.image} />
                    {searchEngine.name}
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
        {authStore.onLogin ? (
          <button
            className="header-logoutButton"
            onClick={() => {
              authStore.logout();
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
          authStore={authStore}
          showSelectedForm={showSelectedForm}
          setShowSelectedForm={setShowSelectedForm}
        />
      )}
    </header>
  );
});

export default Header;
